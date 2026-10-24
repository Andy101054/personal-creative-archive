# 绘画与摄影图片整合

已按本人确认的文件名公开 15 件绘画和 2 件摄影。Dogma、Maggots of Brain 沿用现有条目；Butterfly 标题改为 Happiness is a butterfly，仍保留 `/projects/butterfly/`。Max、Spring、双叶、夜鹭中的参考图与软件界面完整保留，没有自动裁剪。

## 文件与条目

| 文件 | 公开标题 | 分类 | 高清像素 |
| --- | --- | --- | --- |
| AA星星.PNG | AA星星 | Digital Art | 2360 × 1640 |
| Happiness is a butterfly.PNG | Happiness is a butterfly | Digital Art | 2480 × 3508 |
| Maggots of brain.JPG | Maggots of Brain | Digital Art | 2581 × 1080 |
| Max.JPG | Max | Digital Art | 1527 × 1079 |
| Spring.JPG | Spring | Digital Art | 1554 × 1080 |
| banana.JPG | banana | Digital Art | 1528 × 1080 |
| berber.JPG | berber | Digital Art | 1080 × 1080 |
| dogma.jpg | Dogma | Digital Art | 1714 × 4096 |
| 双叶.JPG | 双叶 | Digital Art | 1080 × 1554 |
| 夜鹭.JPG | 夜鹭 | Digital Art | 1528 × 1080 |
| 家.JPG | 家 | Digital Art | 1527 × 1079 |
| 海参.JPG | 海参 | Digital Art | 1080 × 1080 |
| 灵机一动的奇特角度.HEIC | 灵机一动的奇特角度 | Photography & Others | 4032 × 3024 |
| 猫猫-秋季高定.JPG | 猫猫-秋季高定 | Digital Art | 814 × 816 |
| 纽约晚霞.HEIC | 纽约晚霞 | Photography & Others | 4284 × 5712 |
| 腐化.JPG | 腐化 | Digital Art | 1080 × 1528 |
| 雨中曲.JPG | 雨中曲 | Digital Art | 1080 × 1080 |

## 展示副本

每件作品仅有三个公开 WebP 文件：thumb（最长边最多 800px）、display（最长边最多 1600px）、full（保持方向修正后的原生像素尺寸，未放大）。三个版本均使用完整画面，重新编码并清理 EXIF、GPS、XMP 等源文件元数据。含色彩配置的图片先转换到 sRGB，透明通道保留。

列表加载 thumb，详情页加载 display，点击放大才请求 full；弹窗内可在新标签打开高清网页副本，使用浏览器原生缩放。full 是经过有损 WebP 编码的展示副本，不是可替代原稿的无损存档。

17 张缩略图合计约 0.58 MB、展示图约 2.03 MB、高清副本约 8.77 MB。较大的高清图按需加载。原始 JPG、PNG、HEIC 留在用户原目录；未写入 public、Git 或 dist。

作品日期、状态、背景、工具与版本没有根据文件属性推断；未填写的详情字段不显示。后续可在对应 Markdown 中补充真实记录。

## 提交更新

本次没有自动 commit 或 push。先在本地检查 `git diff`、新增 Markdown 和 public/images 的 WebP 文件，然后提交 README、docs、src 与 public/images 的本次变更。main 推送会触发现有 Pages 工作流。
