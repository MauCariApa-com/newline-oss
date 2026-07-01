# MauCariApa.com

Where every line of code tells a story, and every story starts a new line.

## Features

- **Astro Framework**: Modern static site with Island Architecture (v5.x)
- **Content Collections**: Structured for blog posts, authors, and pages
- **SEO Optimized**: Meta tags, sitemap, RSS feed, and structured data
- **Responsive Design**: Mobile-first with Tailwind CSS
- **Performance First**: Optimized for Core Web Vitals

## Tech Stack

- **Framework**: Astro 5.18.1
- **Styling**: Tailwind CSS
- **Content**: Markdown
- **Deployment**: Vercel/Netlify/CloudFlare

## Installation

```bash
# Clone repository
git clone https://github.com/MauCariApa-com/newline-oss.git
cd newline-oss

# Install dependencies
npm install

# Start development server
npm run dev
```

## Content Management

### Blog Posts

Create file at `src/content/posts/`:

```markdown
---
title: "Article Title"
description: "Article description"
date: 2024-01-15
authors: ["author-slug"]
heroImage: "https://example.com/image.jpg"
category: "Tutorial"
tags: ["tag1", "tag2"]
series: "Series Name"
draft: false
---

Content goes here...
```

### Authors

Create file at `src/content/authors/`:

```markdown
---
name: "Author Name"
avatar: "https://example.com/avatar.jpg"
bio: "Short bio of author"
social:
  twitter: "username"
  github: "username"
  linkedin: "username"
---

Long bio of author...
```

### Astro Config

- **Sitemap**: Auto-generated at `/sitemap.xml`
- **RSS Feed**: Available at `/rss.xml` with styling
- **Structured Data**: JSON-LD for better SEO
- **Meta Tags**: Open Graph and Twitter Cards
- **Performance**: Optimized images and lazy loading

## Customization

### Themes

Edit `tailwind.config.mjs` for custom colors:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          // ... other shades
          900: '#312e81',
        }
      }
    }
  }
}
```

### Layouts

- `BaseLayout.astro`: Base Layout with header/footer
- `PostLayout.astro`: Post Layout with blog features
- `PageLayout.astro`: Page Layout for common static pages
- `PrivacyLayout.astro`: Privacy Layout for privacy policy

## Deployment

### Vercel

```bash
npm run build
vercel --prod
```

### Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

### Manual

```bash
npm run build
# Upload dist/ folder to your hosting
```

## Performance

### Optimization Features

- **Zero JavaScript by default**: Only load JS when needed
- **Code splitting**: Per-page bundles
- **Minimal CSS**: Purged unused styles

### Core Web Vitals

Target metrics:
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

## License

MIT License - see [LICENSE](LICENSE) file for details.
