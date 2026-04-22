import { ImageResponse } from "next/og";

export const alt = "Midnight Auto Studio — Premium PPF, Wrap, Tint & Detailing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#000",
          backgroundImage:
            "radial-gradient(ellipse 90% 70% at 80% 20%, rgba(255,255,255,0.12), transparent 60%), radial-gradient(ellipse 70% 60% at 10% 90%, rgba(120,120,255,0.08), transparent 60%)",
          color: "#fff",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            fontSize: 22,
            color: "rgba(255,255,255,0.62)",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "0",
            }}
          >
            M
          </div>
          <span>Midnight Auto Studio</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              lineHeight: 1,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            MIDNIGHT
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              lineHeight: 1,
              fontWeight: 300,
              letterSpacing: "-0.02em",
              color: "rgba(255,255,255,0.75)",
            }}
          >
            AUTO STUDIO
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              lineHeight: 1.3,
              maxWidth: 900,
              color: "rgba(255,255,255,0.7)",
              marginTop: 18,
            }}
          >
            Premium PPF · Wrap · Window Tint · Detailing
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 20,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          <span>BMW M · Audi RS · Porsche</span>
          <span>midnightautostudio.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
