// Shared by Astro and the output link checker. Environment variables support custom domains.
export const site = process.env.SITE_URL || 'https://andy101054.github.io';
export const base = process.env.BASE_PATH || '/personal-creative-archive/';
const siteUrl = new URL(site);
if (siteUrl.protocol !== 'https:' || siteUrl.username || siteUrl.password || siteUrl.pathname !== '/' || siteUrl.search || siteUrl.hash) {
  throw new Error('SITE_URL must be an HTTPS origin without credentials, path, query or fragment');
}
if (!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(base)) {
  throw new Error('BASE_PATH must start and end with /, e.g. /personal-creative-archive/ or /');
}
