// Quick one-off audit of translation coverage.
// Parses the I18N object literal in app/page.tsx and compares keys across sl/en/de.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(
  join(__dirname, "..", "app", "page.tsx"),
  "utf8",
);

// Extract the block between `const I18N ... = {` and the matching closing `};`
const startIdx = src.indexOf("const I18N");
if (startIdx === -1) throw new Error("I18N not found");
const openBrace = src.indexOf("{", startIdx);
let depth = 0;
let endIdx = -1;
for (let i = openBrace; i < src.length; i++) {
  const c = src[i];
  if (c === "{") depth++;
  else if (c === "}") {
    depth--;
    if (depth === 0) {
      endIdx = i;
      break;
    }
  }
}
const block = src.slice(openBrace, endIdx + 1);

// Split into per-language sub-blocks. Match `  sl: {`, `  en: {`, `  de: {`
const langs = ["sl", "en", "de"];
const langBlocks = {};
for (const l of langs) {
  const re = new RegExp(`\\b${l}:\\s*\\{`);
  const m = re.exec(block);
  if (!m) throw new Error(`Missing ${l} block`);
  let d = 0;
  let start = m.index + m[0].length - 1; // position of `{`
  let end = -1;
  for (let i = start; i < block.length; i++) {
    const c = block[i];
    if (c === "{") d++;
    else if (c === "}") {
      d--;
      if (d === 0) {
        end = i;
        break;
      }
    }
  }
  langBlocks[l] = block.slice(start + 1, end);
}

// Extract top-level keys from each sub-block.
function extractKeys(sub) {
  const keys = new Set();
  let depth = 0;
  let i = 0;
  const len = sub.length;
  while (i < len) {
    const c = sub[i];
    if (c === "{" || c === "[") depth++;
    else if (c === "}" || c === "]") depth--;
    else if (c === '"' || c === "'" || c === "`") {
      const q = c;
      i++;
      while (i < len) {
        if (sub[i] === "\\") {
          i += 2;
          continue;
        }
        if (sub[i] === q) break;
        i++;
      }
    } else if (depth === 0 && /[A-Za-z_]/.test(c)) {
      let j = i;
      while (j < len && /[A-Za-z0-9_]/.test(sub[j])) j++;
      // require a following ':'
      let k = j;
      while (k < len && /\s/.test(sub[k])) k++;
      if (sub[k] === ":") {
        keys.add(sub.slice(i, j));
        i = k + 1;
        continue;
      }
      i = j;
      continue;
    }
    i++;
  }
  return keys;
}

const keysByLang = {};
for (const l of langs) keysByLang[l] = extractKeys(langBlocks[l]);

const all = new Set([...keysByLang.sl, ...keysByLang.en, ...keysByLang.de]);

console.log(`Total unique keys: ${all.size}`);
for (const l of langs) {
  console.log(`  ${l}: ${keysByLang[l].size}`);
}

const missing = { sl: [], en: [], de: [] };
for (const k of all) {
  for (const l of langs) {
    if (!keysByLang[l].has(k)) missing[l].push(k);
  }
}

let hasMissing = false;
for (const l of langs) {
  if (missing[l].length) {
    hasMissing = true;
    console.log(`\nMissing in ${l} (${missing[l].length}):`);
    for (const k of missing[l].sort()) console.log(`  - ${k}`);
  }
}

// Extra check: find t("...") references in page.tsx that have no matching key.
const tRefs = new Set();
const tRe = /\bt\(\s*["']([A-Za-z0-9_]+)["']\s*\)/g;
let m2;
while ((m2 = tRe.exec(src)) !== null) tRefs.add(m2[1]);

const unreferenced = [...all].filter((k) => !tRefs.has(k)).sort();
const missingRefs = [...tRefs].filter((k) => !all.has(k)).sort();

if (missingRefs.length) {
  hasMissing = true;
  console.log(`\nt() keys referenced in JSX but missing from ALL dicts (${missingRefs.length}):`);
  for (const k of missingRefs) console.log(`  - ${k}`);
}

if (unreferenced.length) {
  console.log(`\nKeys present in dicts but never used via t() [${unreferenced.length}] (not an error, just dead weight):`);
  for (const k of unreferenced) console.log(`  - ${k}`);
}

if (!hasMissing) console.log("\nAll languages have identical key coverage and no missing references.");
process.exit(hasMissing ? 1 : 0);
