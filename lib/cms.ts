export interface CMSPost {
  id: string | number;
  title: string;
  slug?: string;
  category: string;
  date?: string;
  imageUrl?: string;
  excerpt?: string;
  content?: string;
  createdAt?: string;
}

const CMS_API_URL = process.env.NEXT_PUBLIC_CMS_API_URL || 'http://localhost:8787';

export async function fetchCMSPosts(): Promise<CMSPost[]> {
  try {
    const res = await fetch(`${CMS_API_URL}/api/posts`, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 10 }, // ISR / caching revalidation
    });

    if (!res.ok) {
      console.warn(`CMS request failed with status: ${res.status}`);
      return [];
    }

    const data = await res.json();

    let items: any[] = [];
    if (Array.isArray(data)) {
      items = data;
    } else if (data && Array.isArray(data.data)) {
      items = data.data;
    } else if (data && Array.isArray(data.items)) {
      items = data.items;
    }

    return items.map((item) => ({
      id: item.id || item._id || item.slug,
      title: item.title || item.data?.title || 'സീർഷകമില്ലാത്ത സൃഷ്ടി',
      slug: item.slug || item.data?.slug || '',
      category: item.category || item.data?.category || 'ലേഖനങ്ങൾ',
      date: item.date || item.data?.date || (item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'May 2025'),
      imageUrl: item.imageUrl || item.data?.imageUrl || item.coverImage || '',
      excerpt: item.excerpt || item.data?.excerpt || '',
      content: item.content || item.data?.content || '',
    }));
  } catch (error) {
    console.error('Error fetching posts from SonicJS CMS:', error);
    return [];
  }
}

export async function fetchCMSPost(id: string): Promise<CMSPost | null> {
  try {
    const res = await fetch(`${CMS_API_URL}/api/posts/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 10 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    const item = json?.data ?? json;
    if (!item || !item.id) return null;

    return {
      id: item.id,
      title: item.title || item.data?.title || '',
      slug: item.slug || item.data?.slug || '',
      category: item.category || item.data?.category || 'ലേഖനങ്ങൾ',
      date: item.date || item.data?.date || (item.created_at ? new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'May 2025'),
      imageUrl: item.imageUrl || item.data?.imageUrl || item.coverImage || '',
      excerpt: item.excerpt || item.data?.excerpt || '',
      content: item.content || item.data?.content || '',
    };
  } catch (error) {
    console.error('Error fetching single post from CMS:', error);
    return null;
  }
}
