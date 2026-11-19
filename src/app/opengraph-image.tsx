import { ImageResponse } from "next/og";
import { SITE } from "@/data/site";

export const alt = `${SITE.brand} — Web Design, Development & AI Video Studio`;
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
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 64 64"
              style={{ display: "flex" }}
            >
              <rect width="64" height="64" rx="14" fill="#B6FF4A" />
              <path
                d="M18.47 15H28.53A17 17 0 0 1 28.53 49H18.47Z"
                fill="none"
                stroke="#090A10"
                strokeWidth="6.2"
                strokeLinejoin="miter"
              />
              <path
                d="M18.47 23.5H36.42M18.47 32H33.26M18.47 40.5H36.42"
                fill="none"
                stroke="#090A10"
                strokeWidth="6.2"
              />
            </svg>
            <span style={{ fontSize: "26px", fontWeight: 700, letterSpacing: "0.08em" }}>
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
            6+ Years · 25+ Team · 200+ Orders · 4.7 Rating
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "66px",
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-0.04em",
            }}
          >
            {SITE.tagline}
          </div>
          <div
            style={{
              fontSize: "25px",
              color: "#A5ACB9",
              maxWidth: "1000px",
              lineHeight: 1.35,
            }}
          >
            Wix · Squarespace · WordPress · Webflow · React · Mobile Apps · AI Automation ·
            2D/3D · AI Video
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
          <span>{SITE.nameLine}</span>
          <span style={{ color: "#B6FF4A" }}>{SITE.email}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
