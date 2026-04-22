import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Midnight Auto Studio",
    short_name: "Midnight Auto",
    description:
      "Premium PPF, wrap, window tint and detailing studio for BMW M, Audi RS and Porsche.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    categories: ["automotive", "business", "lifestyle"],
    lang: "sl",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/logo.webp",
        sizes: "512x512",
        type: "image/webp",
        purpose: "any",
      },
    ],
  };
}
