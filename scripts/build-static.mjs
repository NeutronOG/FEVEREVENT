import { cp, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const vinext = process.platform === "win32" ? "vinext.cmd" : "vinext";

process.env.WRANGLER_LOG_PATH ??= ".wrangler/wrangler.log";

const build = spawnSync(vinext, ["build"], {
  cwd: root,
  env: process.env,
  shell: process.platform === "win32",
  stdio: "inherit",
});

if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status ?? 1);

const staticOutput = resolve(root, "dist/client");
const exportDirectory = resolve(root, "out");

await rm(exportDirectory, { force: true, recursive: true });
await cp(staticOutput, exportDirectory, { recursive: true });

console.log("Static export created in out/");
