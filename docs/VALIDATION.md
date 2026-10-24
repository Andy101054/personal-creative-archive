# 本地验证记录

交付时完成以下检查：

- 最终 `pnpm build`：12 个静态页面，0 类型错误、0 警告、0 hints，117 处本地引用有效。
- `pnpm test`：5 项行为测试通过，覆盖组合筛选、搜索、未知日期排序、Markdown 图片检查及 base 改写。
- 分别临时注入 private 标记、缺失封面、无效日期，Astro 构建都因对应 schema 错误失败；随后恢复原文件。
- `/creative-archive/` 子路径构建成功；临时 MDX 条目中的 Markdown 图片、站内链接和画廊资源成功加载。
- 浏览器测试：搜索 GNN + Programming 只展示 1/8 条；重置后恢复 8/8；浅色主题刷新后保留。
- 默认桌面视口与 390×844 移动视口检查首页、档案筛选和作品详情；移动页没有横向溢出。
- 使用明确标注的临时 QA SVG 测试图库：点击放大、Escape 关闭、焦点返回原图片链接，图片加载正常。
- 所有临时 QA 条目和素材均已移除，最终只保留指定的八件占位作品。

实际 GitHub Actions 执行、Pages 上线及自定义域名尚未验证，需先由本人确认上传与公开，再配置远程仓库。未进行全浏览器矩阵或正式无障碍审计；当前已检查语义结构、焦点与键盘弹窗操作。

桌面与移动预览图位于项目外的 outputs 目录，不会随网站源码自动发布。

## 当前仓库部署准备复查

- 目标 origin：`https://github.com/Andy101054/personal-creative-archive.git`，仅配置本地 remote，未推送。
- 只读远程检查成功，当时 HEAD/main 没有提交。
- 默认 site/base 已更新为 `https://andy101054.github.io` 与 `/personal-creative-archive/`；Astro 和产物检查共用 `site.config.mjs`。
- 再次运行 pnpm test：5/5 通过；pnpm build：12 页、117 处本地引用、0 类型错误/警告/hints。全部 canonical 指向目标 Pages 路径。
- 审核的公开候选文件仅包括网站源码、锁文件、文档、测试、模板、工作流和八件作品占位条目；public 仅有 favicon 与空图库标记。
- 常见凭据、私钥、带密码 URL、个人本机绝对路径模式扫描未发现命中；不将此扫描视为对未来新增素材的隐私保证。
- .env、private、raw、node_modules、dist、zip 均不进入待提交清单。完整公开审核仍需由本人在首次上传前完成。
