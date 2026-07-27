import { spawnSync } from "node:child_process";

const vinext = process.platform === "win32" ? "vinext.cmd" : "vinext";

process.env.WRANGLER_LOG_PATH ??= ".wrangler/wrangler.log";
process.env.STATIC_EXPORT = "false";

const build = spawnSync(vinext, ["build"], {
  cwd: process.cwd(),
  env: process.env,
  shell: process.platform === "win32",
  stdio: "inherit",
});

if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status ?? 1);
