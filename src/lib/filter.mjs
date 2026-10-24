export function matches(d,f){
 return (!f.q||d.search.includes(f.q.trim().toLocaleLowerCase()))&&(!f.category||d.category===f.category)&&(!f.status||d.status===f.status)&&(!f.tag||JSON.parse(d.tags).includes(f.tag))&&(!f.year||(f.year==='unknown'?!d.date:d.date.startsWith(f.year)));
}
export function compareProjects(a,b,sort){
 if(sort==='title')return a.title.localeCompare(b.title);
 if(!a.date&&b.date)return 1;if(a.date&&!b.date)return -1;
 return (sort==='oldest'?a.date.localeCompare(b.date):b.date.localeCompare(a.date))||a.title.localeCompare(b.title);
}
