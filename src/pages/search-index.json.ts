import { getCollection, type CollectionEntry } from 'astro:content';
import type { APIRoute } from 'astro';

// Tipe data untuk item yang akan diindeks (hanya properti yang diminta)
interface IndexItem {
  url: string;
  title: string;
  description: string;
  author?: string;
  editor?: string;
}

// Mengembalikan struktur asli untuk membangun URL yang berbeda per koleksi
const COLLECTIONS: Record<string, (slug: string) => string> = {
  posts: (slug) => `/${slug}/`,
  authors: (slug) => `/penulis/${slug}/`,
  listing: (slug) => `/listing/${slug}/`,
  pages: (slug) => `/${slug}/`,
};

export const GET: APIRoute = async () => {
  let allItems: IndexItem[] = [];

  // Kembali menggunakan Object.entries untuk mendapatkan nama dan fungsi buildUrl
  for (const [name, buildUrl] of Object.entries(COLLECTIONS)) {
    try {
      const items: CollectionEntry<typeof name>[] = await getCollection(name as any);

      // Filter item yang bukan draf
      const publishedItems = items.filter(p => !p.data.draft);

      // Petakan item ke format yang diinginkan
      const normalized = publishedItems.map((p): IndexItem => ({
        url: buildUrl(p.slug),
        title: p.data.title || p.data.name || '',
        description: p.data.description || p.data.bio || '',
        author: p.data.author,
        editor: p.data.editor,
      }));

      allItems = allItems.concat(normalized);
    } catch (e) {
      console.warn(`[search-index] Koleksi '${name}' dilewati (tidak ditemukan).`);
    }
  }

  return new Response(JSON.stringify(allItems), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};