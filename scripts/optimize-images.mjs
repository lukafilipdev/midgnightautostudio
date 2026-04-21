// Image optimizer for /public
//
// - Moves original raster images to /public/_originals/ (preserved, .gitignore'd)
// - Emits AVIF+WebP re-encoded versions to /public/ with the original stem
// - SVGs are left untouched
//
// Rules:
//   * Photo-like sources (JPG, or PNG w/o alpha) -> resized to a sensible max
//     width, WebP quality 82, AVIF quality 55
//   * Logo-like sources (PNG w/ alpha) -> resized, WebP quality 88 (lossless
//     disabled — savings are huge and visually indistinguishable at this size)
//   * Small files (<50 KB) are still re-encoded to pick up format gains
//
// Run:  node scripts/optimize-images.mjs

import { mkdir, readdir, rename, stat, access, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = new URL("../public/", import.meta.url).pathname.replace(/^\//, "");
const ORIGINALS_DIR = join(PUBLIC_DIR, "_originals");

// Max width budget per "purpose" — matches actual on-screen render size @ 2x DPR.
const MAX_WIDTHS = {
  hero: 2400,      // full-bleed hero
  photo: 2000,     // large editorial photos (before/after, studio shots)
  gallery: 1800,
  card: 1400,      // featured cards / mid-size
  logo: 400,       // brand logos shown at <=200 px
};

// Filename -> purpose. Anything not listed defaults to "card".
const PURPOSE = {
  "before.png": "photo",
  "before1.png": "photo",
  "after1.png": "photo",
  "guarantee.png": "photo",
  "midnight-studio.png": "hero",
  "audiproject.jpg": "photo",
  "porscheproject.jpg": "photo",
  "window1.png": "photo",
  "window2.png": "photo",
  "bmw.png": "logo",
  "audi.png": "logo",
  "porsche.png": "logo",
  "mercedes.png": "logo",
  "amg.png": "logo",
  "3m.png": "logo",
  "avery.png": "logo",
  "skyfol.png": "logo",
  "stek.png": "logo",
  "logo.png": "logo",
};

const RASTER_EXT = new Set([".png", ".jpg", ".jpeg"]);

async function fileExists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function fmtBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

async function run() {
  await mkdir(ORIGINALS_DIR, { recursive: true });

  const entries = await readdir(PUBLIC_DIR, { withFileTypes: true });

  const rows = [];
  let totalBefore = 0;
  let totalAfter = 0;

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const ext = extname(entry.name).toLowerCase();
    if (!RASTER_EXT.has(ext)) continue;

    const stem = basename(entry.name, ext);
    const srcInPublic = join(PUBLIC_DIR, entry.name);
    const archived = join(ORIGINALS_DIR, entry.name);
    const webpOut = join(PUBLIC_DIR, `${stem}.webp`);
    const avifOut = join(PUBLIC_DIR, `${stem}.avif`);

    // Skip files already under _originals (shouldn't happen w/ top-level read).
    if (srcInPublic.startsWith(ORIGINALS_DIR)) continue;

    // Move original to _originals on first run. On re-runs, prefer the archived
    // copy so we always re-encode from the pristine source.
    let sourcePath = srcInPublic;
    if (!(await fileExists(archived))) {
      await rename(srcInPublic, archived);
      sourcePath = archived;
    } else {
      sourcePath = archived;
    }

    const srcStat = await stat(sourcePath);
    const meta = await sharp(sourcePath).metadata();
    const purpose = PURPOSE[entry.name] ?? "card";
    const maxWidth = MAX_WIDTHS[purpose];

    const hasAlpha = meta.hasAlpha === true;
    const resizeOpts = meta.width && meta.width > maxWidth
      ? { width: maxWidth, withoutEnlargement: true }
      : null;

    const base = sharp(sourcePath).rotate();
    const resized = resizeOpts ? base.resize(resizeOpts) : base;

    // WebP
    const webpQ = purpose === "logo" ? 88 : 82;
    await resized
      .clone()
      .webp({ quality: webpQ, effort: 6, alphaQuality: 90 })
      .toFile(webpOut);

    // AVIF — skipped for very small logos (overhead dominates) and images we
    // just want a single modern fallback for.
    let avifBytes = 0;
    if (purpose !== "logo" || srcStat.size > 150 * 1024) {
      const avifQ = purpose === "logo" ? 60 : 55;
      await resized
        .clone()
        .avif({ quality: avifQ, effort: 5 })
        .toFile(avifOut);
      avifBytes = (await stat(avifOut)).size;
    }

    const webpBytes = (await stat(webpOut)).size;
    const bestNew = avifBytes ? Math.min(webpBytes, avifBytes) : webpBytes;

    totalBefore += srcStat.size;
    totalAfter += bestNew;
    rows.push({
      name: entry.name,
      purpose,
      dims: `${meta.width}x${meta.height}${hasAlpha ? "α" : ""}`,
      before: srcStat.size,
      webp: webpBytes,
      avif: avifBytes,
      saved: srcStat.size - bestNew,
    });
  }

  rows.sort((a, b) => b.saved - a.saved);

  console.log("\nImage optimization report");
  console.log("=========================");
  for (const r of rows) {
    const avifStr = r.avif ? fmtBytes(r.avif) : "—";
    console.log(
      `${r.name.padEnd(24)} ${r.purpose.padEnd(7)} ${r.dims.padEnd(12)} ` +
        `${fmtBytes(r.before).padStart(9)} -> webp ${fmtBytes(r.webp).padStart(9)} ` +
        `· avif ${avifStr.padStart(9)}  saved ${fmtBytes(r.saved)}`
    );
  }
  console.log("---");
  console.log(
    `Total: ${fmtBytes(totalBefore)} -> ${fmtBytes(totalAfter)} ` +
      `(saved ${fmtBytes(totalBefore - totalAfter)}, ${(
        ((totalBefore - totalAfter) / totalBefore) *
        100
      ).toFixed(1)}%)`
  );

  // Touch a marker so the next git commit can include _originals in .gitignore
  // but we document what was done.
  await writeFile(
    join(ORIGINALS_DIR, "README.txt"),
    "Original, unoptimized raster assets archived here.\n" +
      "They are kept for re-encoding only and are gitignored.\n" +
      "Do NOT reference these paths from the app.\n"
  );
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
