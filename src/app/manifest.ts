import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.brand,
    short_name: SITE.brand,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#05060A",
    theme_color: "#05060A",
    icons: [
      {
        src: "/brand/favicon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/brand/favicon.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/brand/app-icon.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand/app-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
