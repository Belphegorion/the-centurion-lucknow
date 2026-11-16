import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site.config";

export const runtime = "edge";

export const alt = "The Centurion Restaurant and Lounge Lucknow";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0C0A09",
          backgroundImage:
            "radial-gradient(circle at 50% 40%, rgba(201, 162, 75, 0.15) 0%, transparent 60%)",
          color: "#F5EFE3",
          fontFamily: "serif",
          position: "relative",
          padding: "60px",
          border: "2px solid rgba(201, 162, 75, 0.3)",
        }}
      >
        {/* Decorative Arch Border */}
        <div
          style={{
            position: "absolute",
            top: "30px",
            bottom: "30px",
            left: "30px",
            right: "30px",
            border: "1px solid rgba(201, 162, 75, 0.25)",
            borderRadius: "140px 140px 14px 14px",
            pointerEvents: "none",
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            fontSize: "16px",
            letterSpacing: "6px",
            textTransform: "uppercase",
            color: "#C9A24B",
            marginBottom: "16px",
          }}
        >
          Wave Mall • 3rd Floor (Top Floor) • Lucknow
        </div>

        {/* Wordmark */}
        <div
          style={{
            fontSize: "68px",
            fontWeight: "bold",
            color: "#F5EFE3",
            letterSpacing: "-1px",
            marginBottom: "14px",
            textAlign: "center",
          }}
        >
          {siteConfig.name}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "24px",
            color: "#9A918A",
            maxWidth: "750px",
            textAlign: "center",
            lineHeight: 1.4,
            marginBottom: "32px",
          }}
        >
          Grand Dining, Live Counters, Supervised Kids Play Area & Skyline Rooftop Lounge
        </div>

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: "#171311",
            padding: "10px 24px",
            borderRadius: "30px",
            border: "1px solid #C9A24B",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#C9A24B",
            }}
          />
          <div
            style={{
              fontSize: "14px",
              color: "#C9A24B",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Daily 12:00 PM – 11:30 PM (IST)
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
