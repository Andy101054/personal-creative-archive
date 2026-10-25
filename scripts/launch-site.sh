#!/bin/bash
set -euo pipefail

# Works from Finder or any current directory, including paths containing spaces.
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_DIR"

fail() {
  local code=$?
  printf '\n启动失败（退出码 %s），请查看上面的错误。\n' "$code" >&2
  if [ -t 0 ]; then read -r -p '按回车关闭…' _reply; fi
  exit "$code"
}
trap fail ERR

OPEN_BROWSER=true
case "${1:-}" in
  '') ;;
  --no-open) OPEN_BROWSER=false ;;
  --help|-h) printf '用法：bash scripts/launch-site.sh [--no-open]\n构建并启动本地网站。按 Ctrl+C 停止预览。\n'; exit 0 ;;
  *) printf '未知参数：%s\n' "$1" >&2; exit 2 ;;
esac

export ASTRO_TELEMETRY_DISABLED=1
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
# Optional local Codex runtime; no personal machine path is committed.
RUNTIME_DIR="${HOME}/.cache/codex-runtimes/codex-primary-runtime/dependencies"
if ! command -v node >/dev/null 2>&1 && [ -x "$RUNTIME_DIR/node/bin/node" ]; then
  export PATH="$RUNTIME_DIR/node/bin:$PATH"
fi
if ! command -v pnpm >/dev/null 2>&1 && [ -x "$RUNTIME_DIR/bin/fallback/pnpm" ]; then
  export PATH="$PATH:$RUNTIME_DIR/bin/fallback"
fi
if ! command -v node >/dev/null 2>&1; then
  printf '需要 Node.js 24 LTS。请安装后重新双击启动脚本。\n' >&2
  false
fi
node -e 'if(Number(process.versions.node.split(".")[0])<24){console.error("需要 Node.js 24 或更高版本。");process.exit(1)}'

if command -v pnpm >/dev/null 2>&1; then
  PNPM=(pnpm)
elif command -v corepack >/dev/null 2>&1; then
  PNPM=(corepack pnpm)
elif command -v npm >/dev/null 2>&1; then
  PNPM=(npm exec --yes --package=pnpm@10.11.0 -- pnpm)
else
  printf '找不到 pnpm。请安装 pnpm 10 后重试。\n' >&2
  false
fi

# Install only when dependencies are missing or their inputs have changed.
INPUT_HASH="$(node --input-type=module -e 'import {readFileSync} from "node:fs";import {createHash} from "node:crypto";const h=createHash("sha256");for(const f of ["package.json","pnpm-lock.yaml"])h.update(readFileSync(f));console.log(h.digest("hex"))')"
STAMP='node_modules/.archive-launch-inputs'
if [ ! -x node_modules/.bin/astro ] || [ ! -f "$STAMP" ] || [ "$(cat "$STAMP")" != "$INPUT_HASH" ]; then
  printf '\n安装项目依赖…\n'
  "${PNPM[@]}" install --frozen-lockfile
  printf '%s\n' "$INPUT_HASH" > "$STAMP"
fi

printf '\n检查并生成网站…\n'
"${PNPM[@]}" run build
printf '\n启动本地预览。保持此窗口打开，按 Ctrl+C 停止。\n'
if [ "$OPEN_BROWSER" = true ]; then
  exec "${PNPM[@]}" exec astro preview --host 127.0.0.1 --ignore-lock --open
else
  exec "${PNPM[@]}" exec astro preview --host 127.0.0.1 --ignore-lock
fi
