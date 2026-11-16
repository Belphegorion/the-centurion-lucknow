import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const isProduction =
    process.env.VERCEL_ENV === "production" && process.env.DEMO_MODE === "false";

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://thecenturionlucknow.com");

  return {
    rules: isProduction
      ? {
          userAgent: "*",
          allow: "/",
          disallow: ["/api/"],
        }
      : {
          userAgent: "*",
          disallow: "/",
        },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
