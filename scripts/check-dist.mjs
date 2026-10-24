import { readdirSync,readFileSync,existsSync } from 'node:fs';
import {resolve,join} from 'node:path';
import { base as configuredBase } from '../site.config.mjs';
const root=resolve('dist');const base=configuredBase.replace(/\/$/,'');
function walk(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(dir,e.name)):[join(dir,e.name)]);}
const files=walk(root);const pages=files.filter(f=>f.endsWith('.html'));let checks=0;
for(const file of files){if(/\.(mdx?|psd|blend|env)$/i.test(file))throw new Error(`Unexpected source file in dist: ${file}`);}
for(const file of pages){const html=readFileSync(file,'utf8');for(const [,url] of html.matchAll(/(?:href|src)="([^"#?]+)[^"]*"/g)){
 if(!url.startsWith('/')||url.startsWith('//'))continue;
 const clean=decodeURIComponent(url.split(/[?#]/)[0]);
 if(base&&clean!==base&&!clean.startsWith(base+'/'))throw new Error(`Missing base in ${file}: ${url}`);
 const target=join(root,clean.slice(base.length));
 if(!existsSync(target)&&!existsSync(join(target,'index.html')))throw new Error(`Broken local link in ${file}: ${url}`);checks++;
}}
console.log(`Verified ${pages.length} pages and ${checks} local references. No raw Markdown in dist.`);
