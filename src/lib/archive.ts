import { getCollection } from 'astro:content';
export const categories: Record<string,string> = {'game-development':'Game Development','game-design':'Game Design',programming:'Programming','digital-art':'Digital Art','photography-others':'Photography & Others'};
export const statuses: Record<string,string> = {concept:'构想中','in-progress':'进行中',completed:'已完成',archived:'已归档'};
export const href = (path='') => `${import.meta.env.BASE_URL.replace(/\/$/,'')}/${path.replace(/^\//,'')}`;
export const dateLabel = (v: string | null) => v || '日期待补充';
export async function allProjects() {
 const items=await getCollection('projects');
 const seen=new Set<string>();
 for(const p of items){if(seen.has(p.data.slug))throw new Error(`重复 slug: ${p.data.slug}`);seen.add(p.data.slug);}
 return items.sort((a,b)=>(b.data.date||'').localeCompare(a.data.date||'')||a.data.title.localeCompare(b.data.title));
}

export function hasDescription(data: {title: string; description: string}) {
 return ![data.title, `${data.title} · 数字绘画`, `${data.title} · 摄影作品`].includes(data.description.trim());
}
