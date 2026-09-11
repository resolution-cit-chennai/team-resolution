export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    // Revalidate every 5 seconds so Vercel Edge Config dashboard updates reflect immediately
    'Cache-Control': 'public, max-age=5, s-maxage=5, stale-while-revalidate=10',
  };

  try {
    // Vercel automatically populates EDGE_CONFIG or GLOBAL_CONFIG when Edge Config is connected
    const connectionString = process.env.GLOBAL_CONFIG || process.env.EDGE_CONFIG;

    if (connectionString) {
      const url = new URL(connectionString);
      // Query /items to get all key-value pairs stored in Edge Config
      if (!url.pathname.endsWith('/items')) {
        url.pathname = url.pathname.replace(/\/$/, '') + '/items';
      }

      const res = await fetch(url.toString(), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const items = await res.json();
        return new Response(JSON.stringify(items), {
          status: 200,
          headers,
        });
      }
    }
  } catch (error) {
    console.error('Failed to read from Edge Config:', error);
  }

  // Fallback: read from /site-config.json (public directory)
  try {
    const origin = new URL(request.url).origin;
    const siteConfigRes = await fetch(`${origin}/site-config.json`, { cache: 'no-store' });
    if (siteConfigRes.ok) {
      const siteConfig = await siteConfigRes.json();
      return new Response(JSON.stringify(siteConfig), {
        status: 200,
        headers,
      });
    }
  } catch (err) {
    console.error('Failed to read site-config.json:', err);
  }

  // Last-resort default
  return new Response(
    JSON.stringify({
      isInMaintenance: false,
    }),
    {
      status: 200,
      headers,
    }
  );
}
