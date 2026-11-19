import { execSync } from "node:child_process";

const isCloudflareWorkersCI =
  process.env.WORKERS_CI === "1" ||
  process.env.WORKERS_CI === "true" ||
  Boolean(process.env.WORKERS_CI_BUILD_UUID);

const shouldRunOpenNextBuild =
  isCloudflareWorkersCI && process.env.OPENNEXT_SKIP_WRAPPER !== "1";

const command = shouldRunOpenNextBuild
  ? "npx opennextjs-cloudflare build"
  : "npx next build";

try {
  execSync(command, {
    stdio: "inherit",
    env: {
      ...process.env,
      OPENNEXT_SKIP_WRAPPER: "1",
    },
  });
} catch (error) {
  const exitCode =
    typeof error === "object" && error !== null && "status" in error && typeof error.status === "number"
      ? error.status
      : 1;
  process.exit(exitCode || 1);
}
