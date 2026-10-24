import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { existsSync, realpathSync, statSync } from 'node:fs';
import { resolve, sep } from 'node:path';
const localImage = z.string().refine((value) => {
  if (!/^\/images\/[a-zA-Z0-9/_-]+\.(png|jpe?g|webp|avif|svg)$/.test(value)) return false;
  const root = resolve('public/images');
  const file = resolve('public', value.slice(1));
  return existsSync(file) && statSync(file).isFile() && realpathSync(file).startsWith(realpathSync(root) + sep);
}, '图片必须存在于 public/images，使用 /images/... 路径');
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(v => {const d=new Date(v);return !isNaN(+d)&&d.toISOString().slice(0,10)===v}, '请填写有效的 YYYY-MM-DD 日期');
const url = z.url().refine(v => new URL(v).protocol === 'https:', '链接必须使用 HTTPS');
const projects = defineCollection({
 loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects', generateId: ({entry}) => entry.replace(/\.(md|mdx)$/, '') }),
 schema: z.object({
  title: z.string().min(1), slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  date: date.nullable().default(null), updated: date.nullable().default(null),
  category: z.enum(['game-development','game-design','programming','digital-art','photography-others']),
  tags: z.array(z.string().min(1)).default([]),
  status: z.enum(['concept','in-progress','completed','archived']).nullable().default(null),
  visibility: z.literal('public'), featured: z.boolean().default(false),
  cover: localImage.optional(), coverAlt: z.string().min(1).optional(),
  gallery: z.array(z.object({src: localImage, alt: z.string().min(1), caption: z.string().optional()})).default([]),
  description: z.string().min(1), repositoryUrl: url.optional(), demoUrl: url.optional(),
  version: z.string().optional(), placeholder: z.boolean().default(false),
  changelog: z.array(z.object({date, text: z.string().min(1)})).default([])
 }).superRefine((d,c)=>{if(d.cover&&!d.coverAlt)c.addIssue({code:'custom',message:'封面需要 coverAlt'});if(d.updated&&d.date&&d.updated<d.date)c.addIssue({code:'custom',message:'updated 不能早于 date'});})
});
export const collections = { projects };
