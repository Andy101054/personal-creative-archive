import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import contentImages from './scripts/content-images.mjs';
import { site, base } from './site.config.mjs';
export default defineConfig({ site, base, integrations: [mdx()], markdown: { processor: unified({remarkPlugins: [[contentImages, {base}]]}) }, output: 'static', trailingSlash: 'always' });
