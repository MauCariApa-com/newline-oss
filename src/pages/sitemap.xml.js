export async function GET() {
  const baseUrl = 'https://maucariapa.com';

  // Static pages (tanpa slash di depan agar tidak double)
  const staticPages = [
    '',
    'series',
    'about-us',
    'kontak',
    'kerjasama',
    'donasi',
    'proyek-open-source',
    'branding',
  ];

  // Dynamic content
  const { getCollection } = await import('astro:content');

  const posts = await getCollection('posts');
  const publishedPosts = posts.filter(post => !post.data.draft);
  const pages = await getCollection('pages');

  // Unique series
  const seriesNames = [...new Set(
    publishedPosts
      .map(post => post.data.series)
      .filter(series => typeof series === 'string')
  )];

  const now = new Date().toISOString();

  // Build XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => {
    // Menghasilkan https://maucariapa.com/ untuk home, dan https://maucariapa.com/path/ untuk lainnya
    const loc = page === '' ? `${baseUrl}/` : `${baseUrl}/${page}/`;
    return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`;
  }).join('')}

  ${publishedPosts.map(post => `
  <url>
    <loc>${baseUrl}/${post.slug}/</loc>
    <lastmod>${(post.data.updatedDate || post.data.pubDate).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`).join('')}

  ${pages.map(page => `
  <url>
    <loc>${baseUrl}/${page.slug}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}

  ${seriesNames.map(series => `
  <url>
    <loc>${baseUrl}/series/${series.toLowerCase().replace(/\s+/g, '-')}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`.trim();

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}