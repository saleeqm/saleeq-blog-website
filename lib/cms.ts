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

// In the browser, use our Next.js API route proxy to avoid CORS issues with the
// SonicJS CMS backend (which omits Access-Control-Allow-Origin on GET responses).
// Server components can call the CMS directly since server-side Node.js has no CORS.
const CMS_CLIENT_URL = '/api/cms';

function formatDisplayDate(rawDate?: string, fallbackTimestamp?: string): string {
  if (rawDate) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
      const [year, month, day] = rawDate.split('-').map(Number);
      const d = new Date(Date.UTC(year, month - 1, day));
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
    }
    const d = new Date(rawDate);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    return rawDate;
  }
  if (fallbackTimestamp) {
    const d = new Date(fallbackTimestamp);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  }
  return 'May 2025';
}

function normalizeImageUrl(val: any): string {
  if (!val) return '';
  if (Array.isArray(val)) {
    return normalizeImageUrl(val[0]);
  }
  if (typeof val === 'object') {
    return normalizeImageUrl(val.url || val.path || val.src || val.filename || '');
  }
  const str = String(val).trim();
  if (!str) return '';
  // CMS returns relative paths like /files/uploads/... for uploaded media.
  // Rewrite them to /cms-files/... so Next.js proxies the request to the CMS
  // backend — avoiding its private-IP SSRF guard on the image optimizer.
  if (str.startsWith('/files/')) {
    return `/cms-files/${str.slice('/files/'.length)}`;
  }
  // Handle full http://localhost:8787/files/... URLs returned in some CMS versions
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/files\//.test(str)) {
    const url = new URL(str);
    return `/cms-files/${url.pathname.slice('/files/'.length)}`;
  }
  return str;
}

export async function fetchCMSPosts(): Promise<CMSPost[]> {
  try {
    const res = await fetch(`${CMS_API_URL}/api/content?collection=blog-posts`, {
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
      date: formatDisplayDate(item.date || item.data?.date, item.createdAt || item.created_at || item.publishedAt),
      imageUrl: normalizeImageUrl(item.imageUrl || item.data?.imageUrl || item.coverImage || item.featuredImage || item.data?.featuredImage),
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
    // Attempt to fetch by UUID first, or fallback to fetching the collection and filtering by slug
    const res = await fetch(`${CMS_API_URL}/api/content/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 10 },
    });

    let json = await res.json();
    
    // If not found, it might be a slug. Let's try fetching the collection by slug.
    if (!res.ok || json.error) {
      const slugRes = await fetch(`${CMS_API_URL}/api/content?collection=blog-posts`, {
        headers: { 'Content-Type': 'application/json' },
        next: { revalidate: 10 },
      });
      if (slugRes.ok) {
        const allData = await slugRes.json();
        const items = Array.isArray(allData) ? allData : (allData?.data || allData?.items || []);
        const found = items.find((p: any) => (p.slug || p.data?.slug) === id);
        if (found) {
          json = found;
        } else {
          return null;
        }
      } else {
        return null;
      }
    }

    const item = json?.data ?? json;
    if (!item || (!item.id && !item.slug)) return null;

    return {
      id: item.id || item.slug,
      title: item.title || item.data?.title || '',
      slug: item.slug || item.data?.slug || '',
      category: item.category || item.data?.category || 'ലേഖനങ്ങൾ',
      date: formatDisplayDate(item.date || item.data?.date, item.created_at || item.createdAt || item.publishedAt),
      imageUrl: normalizeImageUrl(item.imageUrl || item.data?.imageUrl || item.coverImage || item.featuredImage || item.data?.featuredImage),
      excerpt: item.excerpt || item.data?.excerpt || '',
      content: item.content || item.data?.content || '',
    };
  } catch (error) {
    console.error('Error fetching single post from CMS:', error);
    return null;
  }
}

// ── Client-safe versions (use API proxy to avoid CORS) ──────────────────────

export async function fetchCMSPostsClient(): Promise<CMSPost[]> {
  try {
    const res = await fetch(`${CMS_CLIENT_URL}?collection=blog-posts`);
    if (!res.ok) {
      console.warn(`CMS proxy request failed with status: ${res.status}`);
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
      title: item.title || item.data?.title || 'Untitled',
      slug: item.slug || item.data?.slug || '',
      category: item.category || item.data?.category || 'General',
      date: formatDisplayDate(item.date || item.data?.date, item.createdAt || item.created_at || item.publishedAt),
      imageUrl: normalizeImageUrl(item.imageUrl || item.data?.imageUrl || item.coverImage || item.featuredImage || item.data?.featuredImage),
      excerpt: item.excerpt || item.data?.excerpt || '',
      content: item.content || item.data?.content || '',
    }));
  } catch (error) {
    console.error('Error fetching posts from CMS proxy:', error);
    return [];
  }
}

export async function fetchCMSPostClient(id: string): Promise<CMSPost | null> {
  try {
    const res = await fetch(`${CMS_CLIENT_URL}?id=${encodeURIComponent(id)}&collection=blog-posts`);
    if (!res.ok) return null;
    const json = await res.json();
    const item = json?.data ?? json;
    if (!item || (!item.id && !item.slug)) return null;

    return {
      id: item.id || item.slug,
      title: item.title || item.data?.title || '',
      slug: item.slug || item.data?.slug || '',
      category: item.category || item.data?.category || 'General',
      date: formatDisplayDate(item.date || item.data?.date, item.created_at || item.createdAt || item.publishedAt),
      imageUrl: normalizeImageUrl(item.imageUrl || item.data?.imageUrl || item.coverImage || item.featuredImage || item.data?.featuredImage),
      excerpt: item.excerpt || item.data?.excerpt || '',
      content: item.content || item.data?.content || '',
    };
  } catch (error) {
    console.error('Error fetching single post from CMS proxy:', error);
    return null;
  }
}
