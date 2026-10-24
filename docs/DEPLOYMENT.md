# GitHub Pages 部署准备

目标仓库：[Andy101054/personal-creative-archive](https://github.com/Andy101054/personal-creative-archive)。

预期部署地址：`https://andy101054.github.io/personal-creative-archive/`。这是部署后的目标地址，尚不表示网站已经上线。

## 1. 审核与本地运行

本地项目已初始化 main，部署准备阶段仅做本地检查、提交与 origin 配置，**不执行推送**。先审阅作品文字、个人介绍与全部待提交文件；首次提交的作者名称和邮箱也会随公开 Git 历史公开。

```sh
pnpm test
pnpm build
pnpm preview
```

默认预览地址：`http://127.0.0.1:4321/personal-creative-archive/`。若环境限制 Astro 遥测偏好写入，使用 `ASTRO_TELEMETRY_DISABLED=1 pnpm build`。

`site.config.mjs` 同时供 Astro 和构建产物链接检查使用，默认值：

```text
site: https://andy101054.github.io
base: /personal-creative-archive/
```

允许通过 `SITE_URL`、`BASE_PATH` 覆盖。域名必须是没有路径和凭据的 HTTPS origin；base 以 / 开头和结尾。需要在根路径预览时运行 `BASE_PATH=/ pnpm build` 和 `BASE_PATH=/ pnpm preview`；部署前重新使用默认配置构建。

## 2. 检查本地提交和远程

```sh
git status --short
git log -1 --oneline
git show --stat HEAD
git show HEAD
git remote -v
```

origin 应指向：`https://github.com/Andy101054/personal-creative-archive.git`。GitHub 身份验证使用本人的凭据管理器或 SSH；不要在命令或文件中填写 token。如果使用 HTTPS，登录时由本人完成凭据授权，不使用 GitHub 账号密码作为 Git 密码。

不要把 private/raw、.env、源文件、压缩包、node_modules 或 dist 提交至网站仓库。项目外 outputs 的源码包、截图和 work 的检查日志也不在本仓库提交范围。

## 3. 本人确认公开之后才推送

**以下命令会把本地提交上传到 GitHub；请先检查完整提交内容。**

```sh
git push -u origin main
```

若提示 non-fast-forward，先停止并检查远程变更，不能使用强制推送覆盖已有内容。部署准备阶段只读检查时远程尚无 HEAD/main，远程可能在之后发生变化。

## 4. 启用 Pages

打开仓库 Settings → Pages → Build and deployment → Source，选择 **GitHub Actions**。推送 main 会触发 `Check and deploy archive`；如果先推送再启用 Pages，启用后在 Actions 中手动 Run workflow。

工作流只上传 dist 为 Pages artifact；PR 仅检查、不部署；部署 job 单独申请 pages:write 和 id-token:write，构建 job 只读源码，不访问私人档案。

工作流自动计算此仓库的 site/base，与本地默认配置一致。Repository Actions Variables `SITE_URL` 和 `BASE_PATH` 通常无需设置；若已有同名变量，请检查它们是否覆盖了预期配置。

## 5. 确认上线

1. Actions 中 build 与 deploy 都成功。
2. 打开部署 job 返回的网站地址。
3. 检查首页、档案馆、作品详情、CSS/图片、主题和筛选功能。

只有本地构建成功不能确认 Pages 已经上线。GitHub 登录、Pages 设置、权限、环境审批及域名检查需要在上传获准后验证。

## 自定义域名（可选）

按 GitHub 官方说明配置 DNS、Pages 域名与 HTTPS，再将 Repository Actions Variables 设置为 `SITE_URL=https://your-domain.example` 与 `BASE_PATH=/`，重新运行工作流。public/CNAME 可用于保存域名，当前 public 白名单允许该文件。同步更新本地配置或设置本地同名环境变量。

官方参考：[Astro GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)、[GitHub Pages 发布源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。
