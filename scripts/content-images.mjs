import { existsSync,realpathSync,statSync } from 'node:fs';
import { resolve,sep } from 'node:path';
export default function contentImages({base='/' }={}){
 return tree=>{function walk(node){
  if(node.type==='image'){
   const url=node.url;
   if(!node.alt?.trim())throw new Error('Markdown 图片必须有替代文字');
   const root=resolve('public/images');const file=resolve('public',url.slice(1));
   if(!/^\/images\/[a-zA-Z0-9/_-]+\.(png|jpe?g|webp|avif|svg)$/.test(url)||!existsSync(file)||!statSync(file).isFile()||!realpathSync(file).startsWith(realpathSync(root)+sep))throw new Error(`Markdown 图片无效或缺失: ${url}`);
   node.url=base.replace(/\/$/,'')+url;
  }
  if(node.type==='link'&&node.url.startsWith('/')&&!node.url.startsWith('//'))node.url=base.replace(/\/$/,'')+node.url;
  node.children?.forEach(walk);
 }walk(tree)};
}
