import type { NextConfig } from "next";

const ONE_YEAR = 60 * 60 * 24 * 365;

const nextConfig: NextConfig = {
  // gzip/brotli server response compression (default true, explicit for clarity).
  compress: true,

  // Strip the `x-powered-by: Next.js` header — one less byte per response and
  // one less fingerprint for scanners.
  poweredByHeader: false,

  // React strict double-invokes effects in dev only (no prod cost); catches
  // perf-relevant bugs like subscriptions that never clean up.
  reactStrictMode: true,

  // Image optimizer config. Currently the app renders with plain <img>, so this
  // only takes effect when/if a component is migrated to `next/image` — but
  // having it set means a migration is a one-line change per component.
  images: {
    // AVIF first (≈20% smaller than WebP at visually identical quality),
    // WebP fallback for browsers that don't support AVIF.
    formats: ["image/avif", "image/webp"],

    // Cache optimized variants at the edge/filesystem for a year. Source file
    // changes still invalidate because the optimizer hashes the URL + query.
    minimumCacheTTL: ONE_YEAR,

    // Only the widths we actually render at — smaller manifest, faster build,
    // smaller client srcset strings.
    deviceSizes: [640, 828, 1080, 1200, 1600, 1920, 2400],
    imageSizes: [64, 96, 128, 200, 256, 384],

    // Allow the external hosts already referenced in the landing page.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.coverr.co", pathname: "/**" },
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/**" },
    ],
  },

  // Long-cache any hand-placed fonts under /public. Next.js already sets
  // `Cache-Control: public, max-age=31536000, immutable` on /_next/static/**
  // (fingerprinted chunks + next/font output) in production, so we don't
  // override that route here.
  async headers() {
    return [
      {
        source: "/:path*.(woff|woff2|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${ONE_YEAR}, immutable`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
