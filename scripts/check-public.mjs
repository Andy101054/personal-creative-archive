import { readdirSync,lstatSync } from 'node:fs';
import { join } from 'node:path';
function walk(dir){for(const item of readdirSync(dir)){const path=join(dir,item);const stat=lstatSync(path);if(stat.isSymbolicLink())throw new Error(`public 禁止符号链接: ${path}`);if(stat.isDirectory()){walk(path);continue;}if(path==='public/favicon.svg'||path==='public/CNAME'||path==='public/images/.gitkeep')continue;if(!/^public\/images\/[a-zA-Z0-9/_-]+\.(png|jpe?g|webp|avif|svg)$/.test(path))throw new Error(`public 只允许展示图片、favicon 和 CNAME: ${path}`);}}
walk('public');console.log('Public asset allowlist verified.');
