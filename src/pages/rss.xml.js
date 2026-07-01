import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const siteUrl = context.site || 'https://maucariapa.com';

  const posts = await getCollection('posts');
  const authors = await getCollection('authors');

  const authorsMap = new Map(authors.map((author) => [author.slug, author.data]));

  const publishedPosts = posts
    .filter((post) => !post.data.draft)
    .filter((post) => post.data.title && post.data.pubDate) // pastikan dua ini ada
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'MauCariApa.com',
    description: 'Platform berbagi pengetahuan teknologi, tutorial, dan insight untuk tech enthusiasts dan kreator digital.',
    site: siteUrl,
    stylesheet: '/rss-styles.xsl',
    items: publishedPosts.map((post) => {
      const {
        title,
        description,
        pubDate,
        heroImage,
        authors: authorSlugs,
        tags = [],
        category = [],
        series,
      } = post.data;

      const postAuthors = (authorSlugs || [])
        .map((slug) => authorsMap.get(slug)?.name)
        .filter(Boolean)
        .join(', ') || 'MauCariApa.com';

      const fullUrl = `${siteUrl}/${post.slug}/`;

      return {
        title,
        description: description || 'Tidak ada deskripsi.',
        pubDate,
        link: `/${post.slug}/`,
        author: postAuthors,
        categories: [...category, ...tags],
        content: `
          <p>${description || 'Tidak ada deskripsi.'}</p>
          <p><small>${pubDate.toLocaleDateString('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}</small></p>
          ${heroImage
            ? `<img src="${heroImage}" alt="${title}" style="max-width: 100%; height: auto;" />`
            : ''
          }
          ${category.length > 0 ? `<p><strong>Kategori:</strong> ${category.join(', ')}</p>` : ''}
          ${tags.length > 0 ? `<p><strong>Tags:</strong> ${tags.join(', ')}</p>` : ''}
          ${series ? `<p><strong>Series:</strong> ${series}</p>` : ''}
          <p><a href="${fullUrl}/">Baca selengkapnya →</a></p>
        `,
        customData: `
          <guid isPermaLink="true">${fullUrl}</guid>
          ${heroImage
            ? `<enclosure url="${heroImage}" type="image/jpeg" />`
            : ''
          }
          <source url="${siteUrl}/rss.xml">MauCariApa.com</source>
        `,
      };
    }),
    customData: `
      <language>id-ID</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <generator>Astro RSS</generator>
      <webMaster>kontak@maucariapa.com (MauCariApa.com)</webMaster>
      <managingEditor>editor@maucariapa.com (Tim Editor MauCariApa.com)</managingEditor>
      <copyright>© ${new Date().getFullYear()} MauCariApa.com. Semua hak dilindungi.</copyright>
      <category>Technology</category>
      <category>Programming</category>
      <category>Web Development</category>
      <category>Tutorial</category>
      <ttl>60</ttl>
      <image>
        <url>${siteUrl}/favicon.ico</url>
        <title>MauCariApa.com</title>
        <link>${siteUrl}</link>
        <description>Platform pembelajaran teknologi dengan artikel berkualitas tinggi</description>
        <width>144</width>
        <height>144</height>
      </image>
    `,
  });
}