# 添加与维护作品

## 最短流程

1. 复制 `templates/project.md` 到 `src/content/projects/my-project.md`（或 `.mdx`）。
2. 填写前置 YAML 字段，并在 `---` 后写正文。不要把模板本身移入 `public/`。
3. 如有可公开图片，放入 `public/images/my-project/`，在字段里引用 `/images/my-project/cover.webp`。
4. `pnpm test && pnpm build`，用 `pnpm dev` 或 `pnpm preview` 检查页面。
5. 检查 `git diff` 和待提交文件。仓库公开及推送已获本人确认后再提交推送，Actions 自动重建。

## 完整示例（示意数据，不是实际作品记录）

```yaml
---
title: "我的实验"
slug: my-experiment
date: "2026-10-24" # 替换为真实创作日期；未知则 null
updated: "2026-10-24" # 实际内容更新日期；不自动伪造
category: programming
tags: [Python, 实验]
status: in-progress
visibility: public
featured: false
placeholder: false
cover: /images/my-experiment/cover.webp
coverAlt: "界面中展示的实际内容"
gallery:
  - src: /images/my-experiment/detail.webp
    alt: "实际细节的文字描述"
    caption: "这张图片记录的阶段"
description: "准确的一两句话简介。"
repositoryUrl: https://github.com/USERNAME/PROJECT
demoUrl: https://example.com/play
version: "0.1"
changelog:
  - date: "2026-10-24"
    text: "描述实际变化"
---
```

日期必须用引号写成真实 `YYYY-MM-DD`，例如不存在的 2 月 30 日会报错。更新日期不能早于创作日期。slug 小写字母、数字和连字符，全站唯一；发布后尽量保持稳定，改变会使旧链接失效。

`category` 为 `game-development` / `game-design` / `programming` / `digital-art` / `photography-others`。`status` 为 `concept` / `in-progress` / `completed` / `archived`，未知用 `null`。`archived` 是创作状态，仍然公开展示，绝不代表隐藏。日期未知始终排在末尾。标签是任意非空字符串，筛选精确匹配，保持拼写一致。

`title`、`slug`、`category`、`visibility`、`description` 必填。日期、状态可空；精选默认 false，画廊和标签默认空数组。没有图片或链接时直接省略字段，不要用空字符串。正文就是 `content`，无需再添加同名 YAML 字段。

## 图片与正文

展示图推荐 WebP / AVIF / JPEG，宽度约 1200–2000px，通常压到几百 KB；不要上传 PSD、未筛选的原片或含私人信息的截图。先在本机清除 EXIF/GPS 和其他元数据，Git 与构建检查不会自动替你清理。

封面与画廊必须有 alt，路径只允许 `/images/` 下的本地文件，名称使用英文、数字、短横线、下划线和目录。允许 png/jpg/jpeg/webp/avif/svg。文件存在、扩展名、路径越界及符号链接会被检查。SVG 只使用可信、经过审查的内容。

正文图片：

```md
![真实画面描述](/images/my-experiment/detail.webp)
```

Markdown 图片也会检查文件和 alt，并自动附加 Pages base。正文站内链接使用 `/archive/` 等根相对路径，会自动适配 base。正文外链使用 HTTPS。

MDX 内自己写的 `<img>`、HTML、组件以及 HTML 原始标签不能由 Markdown 图片检查器完全检查，路径需手动调用基础路径辅助函数或使用相对 URL，并自行审核。优先使用 frontmatter 画廊或普通 Markdown 图片。

## 保留创作记录

建议正文按「关于作品 → 创作背景 → 设计选择 → 过程与迭代 → 反思」组织。简短变更写入 `changelog`，较长过程直接写 Markdown 小节。源代码仓库和试玩使用外部链接，不复制整个项目源码。

更新后填写真实 `updated`；首页按它排序，不会把 Git 提交日期冒充创作日期。移除占位提示时将 `placeholder: false`。调整首页精选只需修改 `featured`。

## 常见错误

- `visibility: private`：构建故意失败。立即把文件移到站外私有仓库，而不是改成 public 来消除错误。
- 图片找不到：检查大小写、路径和扩展名。macOS 可能不区分大小写，但 GitHub runner 区分。
- YAML 报错：检查缩进和冒号，描述里有冒号时用引号。
- 重复 slug：更改尚未发布的新条目 slug。
- `public` 检查失败：public 是直接复制到部署产物的目录，仅允许展示图片、favicon 和可选 CNAME。

## 扩展分类

新增作品不需改组件。只有新增分类时，在 `src/content.config.ts` 的 category 枚举与 `src/lib/archive.ts` 的 categories 映射各加一项。新增状态同理。保持现有值稳定，迁移时一次性更新受影响条目。
