import { MetadataRoute } from "next";
import { siteConfig } from "@/data/site.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Centurion • Lucknow",
    short_name: "The Centurion",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0C0A09",
    theme_color: "#0C0A09",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
