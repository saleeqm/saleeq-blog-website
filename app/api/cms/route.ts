import { NextRequest, NextResponse } from 'next/server';

const CMS_API_URL = process.env.NEXT_PUBLIC_CMS_API_URL || 'http://localhost:8787';

/**
 * Proxy requests to the SonicJS CMS backend.
 *
 * Browsers block direct cross-origin fetch to the CMS (localhost:8787) because
 * SonicJS's CORS implementation omits Access-Control-Allow-Origin on GET responses.
 * Server-side Node.js fetch has no such restriction, so we proxy through a same-origin route.
 *
 * Usage:
 *   GET /api/cms?collection=blog-posts        → proxies to CMS /api/content?collection=blog-posts
 *   GET /api/cms?id=<uuid>                    → proxies to CMS /api/content/<uuid>
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const collection = searchParams.get('collection');
    const id = searchParams.get('id');

    let url: string;
    if (id) {
      url = `${CMS_API_URL}/api/content/${encodeURIComponent(id)}`;
    } else if (collection) {
      url = `${CMS_API_URL}/api/content?collection=${encodeURIComponent(collection)}`;
    } else {
      return NextResponse.json({ error: 'Missing "collection" or "id" query parameter' }, { status: 400 });
    }

    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }

    // If a direct ID lookup failed and we have a collection, try slug-based lookup
    // by fetching all items and filtering by slug.
    if (id && collection) {
      const listUrl = `${CMS_API_URL}/api/content?collection=${encodeURIComponent(collection)}`;
      const listRes = await fetch(listUrl, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (listRes.ok) {
        const allData = await listRes.json();
        const items = Array.isArray(allData)
          ? allData
          : (allData?.data || allData?.items || []);
        const found = items.find(
          (p: any) => (p.slug || p.data?.slug) === id
        );
        if (found) {
          return NextResponse.json({ data: found });
        }
      }
    }

    return NextResponse.json(
      { error: `CMS responded with ${res.status}` },
      { status: res.status }
    );
  } catch (error) {
    console.error('CMS proxy error:', error);
    return NextResponse.json({ error: 'Failed to reach CMS backend' }, { status: 502 });
  }
}
