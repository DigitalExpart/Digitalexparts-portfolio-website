import { ImageResponse } from "next/og";
import { SITE } from "@/data/site";

export const alt = `${SITE.brand} — Websites, No-Code, Brand & AI Video Studio`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#05060A",
          color: "#F4F5F7",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          border: "1px solid rgba(244,245,247,0.12)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "6px",
                backgroundColor: "#B6FF4A",
              }}
            />
            <span style={{ fontSize: "24px", fontWeight: 700, letterSpacing: "0.08em" }}>
              {SITE.brandUpper}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 20px",
              borderRadius: "9999px",
              border: "1px solid rgba(182,255,74,0.45)",
              backgroundColor: "rgba(182,255,74,0.12)",
              color: "#B6FF4A",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            Solo &amp; Vetted Team · Worldwide
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "84px",
              fontWeight: 800,
              lineHeight: 0.98,
              letterSpacing: "-0.04em",
            }}
          >
            Websites that move people.
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#A5ACB9",
              maxWidth: "960px",
              lineHeight: 1.35,
            }}
          >
            Custom Web · No-Code (Webflow, WordPress, Wix, Squarespace) · UI/UX · Branding ·
            Email · AI Video
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(244,245,247,0.16)",
            paddingTop: "24px",
            fontSize: "20px",
            color: "#A5ACB9",
          }}
        >
          <span>Led by {SITE.owner}</span>
          <span style={{ color: "#B6FF4A" }}>digital-expert</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
