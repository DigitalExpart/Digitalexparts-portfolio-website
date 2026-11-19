import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config = defineCloudflareConfig({
  // For incremental R2 caching later, provision an R2 bucket and pass r2IncrementalCache here.
});

// Explicit Next.js build command avoids recursion when `npm run build` routes through `scripts/build.mjs`.
config.buildCommand = "npm run build:next";

export default config;
