import {test} from 'node:test';
import assert from 'node:assert/strict';
import contentImages from '../scripts/content-images.mjs';
import {mkdirSync,writeFileSync,rmSync} from 'node:fs';
test('Markdown images reject missing files and missing alt',()=>{
 const transform=contentImages({base:'/museum/'});
 assert.throws(()=>transform({type:'image',url:'/images/no-file.webp',alt:'test'}),/缺失/);
 assert.throws(()=>transform({type:'image',url:'/images/test.webp',alt:''}),/替代文字/);
 assert.throws(()=>transform({type:'image',url:'/images/../favicon.svg',alt:'test'}),/无效/);
});
test('Markdown links and images respect project base',()=>{
 mkdirSync('public/images/test-fixture',{recursive:true});const file='public/images/test-fixture/image.svg';
 try{writeFileSync(file,'<svg xmlns="http://www.w3.org/2000/svg"/>');const tree={type:'root',children:[{type:'image',url:'/images/test-fixture/image.svg',alt:'Test fixture'},{type:'link',url:'/archive/'},{type:'link',url:'https://example.com/'}]};contentImages({base:'/museum/'})(tree);assert.equal(tree.children[0].url,'/museum/images/test-fixture/image.svg');assert.equal(tree.children[1].url,'/museum/archive/');assert.equal(tree.children[2].url,'https://example.com/');}finally{rmSync('public/images/test-fixture',{recursive:true,force:true});}
});
