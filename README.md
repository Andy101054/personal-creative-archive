# Personal Creative Archive

一座持续生长的个人创作档案馆：收藏构想、过程、实验与完成的作品。

## 一键打开网站（macOS）

- 双击根目录的 **启动网站.command**：检查 Node.js、按需安装依赖、构建网站，再启动本机预览并打开默认浏览器。保持终端窗口打开，按 Ctrl+C 停止。若端口占用，预览会使用可用端口，浏览器打开实际地址。
- 双击 **打开线上网站.command**：直接打开已部署的网站，不构建、不需要 Node.js。更新线上内容仍需正常提交和推送，脚本不会自动上传。

本地生成需要 Node.js 24 LTS。脚本优先使用现有 pnpm，其次使用 Corepack 或 npm 临时运行 pnpm 10；不会修改全局 Git/Node 配置。依赖首次安装需要网络。此电脑若有 Codex 自带运行时，也会自动查找。启动脚本和 scripts 目录应保留在完整仓库中，不要只复制 command 文件。

若 GitHub ZIP 下载后双击提示没有执行权限，在仓库目录运行：

```sh
chmod +x 启动网站.command 打开线上网站.command scripts/launch-site.sh
```

也可在任意终端执行 `bash scripts/launch-site.sh`；验证而不打开浏览器使用 `bash scripts/launch-site.sh --no-open`。本地 URL 使用 `site.config.mjs` 的 base（默认 `/personal-creative-archive/`）。若未来更换线上域名，需同步修改打开线上网站.command 中的地址。

## 本地运行

需要 **Node.js 24 LTS**、pnpm 10。安装 Node 后：

```sh
corepack enable
corepack prepare pnpm@10.11.0 --activate
pnpm install --frozen-lockfile
pnpm dev
```

打开终端显示的本地地址，默认 `http://127.0.0.1:4321/personal-creative-archive/`。

```sh
pnpm test       # 搜索、组合筛选、日期排序的行为测试
pnpm build      # 公开资源检查、类型/内容校验、静态构建、产物链接检查
pnpm preview    # 预览 dist，默认 http://127.0.0.1:4321/personal-creative-archive/
```

构建时如不希望 Astro 写入系统遥测偏好，可使用 `ASTRO_TELEMETRY_DISABLED=1 pnpm build`。Windows PowerShell 使用 `$env:ASTRO_TELEMETRY_DISABLED="1"` 后运行构建。

## 已实现

- Home / Archive / Project / About / 404，中文优先，默认深色，可切换浅色并记住选择。
- 类别、年份、状态、精确标签组合筛选；名称/简介/标签搜索；日期和名称排序；筛选写入 URL，可分享。
- 精选条目、真实更新时间排序、响应式画廊、原生 dialog 放大图片、键盘关闭与焦点恢复。
- Markdown / MDX 内容集合、构建时 schema 验证、唯一 slug、日期与图片检查。
- 页标题、描述、Open Graph、配置生产域名后的 canonical；语义 HTML、跳过导航、图片替代文字、键盘焦点、减少动态效果支持。
- GitHub Actions 检查和 Pages 部署。Pull request 仅检查，main 推送部署。

当前包含 **15 件 Digital Art、2 件摄影作品，以及 5 件游戏/编程占位档案**。绘画和摄影使用本人选择的公开图片重新编码的 WebP 副本，原始文件不进入仓库。占位项目仍明确标记，不包含虚构截图、日期、版本、实验结果、开发细节或公开链接。精选可修改。`date/status: null` 表示待补充；最近更新为空时会如实显示。没有外部字体、追踪器、后端或数据库。

## 架构与目录

```text
src/
  content/projects/          # 仅可公开的 md / mdx
  content.config.ts         # 字段、路径、日期验证
  config.ts                 # 名称、个人简介、公开 GitHub 联系方式
  lib/                      # 内容查询、基础路径、筛选函数
  components/Card.astro
  layouts/Layout.astro
  pages/                    # 首页、档案馆、关于、详情、404
  styles/global.css
public/images/              # 仅经过整理的公开展示图片
site.config.mjs             # 生产域名与 Pages 子路径（构建检查共用）
scripts/                    # Markdown 图片检查、public 白名单、产物链接检查
templates/project.md        # 新条目模板，不参与页面生成
docs/                       # 添加作品、架构和隐私、部署教程
tests/                      # 有实际行为断言的测试
.github/workflows/pages.yml
```

保留 Astro：生成普通静态 HTML，作品正文无需浏览器 JavaScript，GitHub Pages 即可托管。浏览器仅为筛选、主题与图片弹窗运行少量脚本，不引入 React/Vue、CMS 或搜索服务。Markdown 默认最简单；需要组件时才使用 MDX。MDX 可执行代码，只接收本人信任的内容。框架和直接依赖已固定版本，锁文件一并提交，升级另开分支验证。

筛选当前将公开条目的元数据直接附于卡片 DOM，适用于个人档案的数百件作品；增长至数千件时可加分页/分片索引，内容文件和 schema 不必整体重写。分类集中在 schema 与显示映射，日常新增作品不改组件。

## 开始维护

1. 在 `src/config.ts` 补充个人简介和公开 GitHub 地址；更完整的 About 正文在 `src/pages/about.astro`。
2. 按 [添加作品教程](docs/ADDING-PROJECTS.md) 复制模板并放入展示素材；已有绘画与摄影的对应关系见 [图片整合记录](docs/ARTWORKS.md)。
3. 阅读 [仓库组织与私人档案](docs/ARCHITECTURE-PRIVACY.md)，将原始资料放在网站仓库以外。
4. 执行测试与构建；按 [GitHub Pages 部署教程](docs/DEPLOYMENT.md) 连接远程仓库。

网站仓库为 [Andy101054/personal-creative-archive](https://github.com/Andy101054/personal-creative-archive)。默认生产域名为 `https://andy101054.github.io`，路径为 `/personal-creative-archive/`，统一配置在 `site.config.mjs`，环境变量可覆盖。部署工作流在你确认并将项目推送到 main、启用 Pages 后才运行。

## 参考

- [Astro 内容集合](https://docs.astro.build/en/guides/content-collections/)
- [Astro 部署至 GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
- [GitHub Pages 使用限制](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)

网站代码的开源许可与作品版权应分开决定。本项目没有擅自选择开源许可证；公开前请明确你希望授予的使用权限。
