export async function onRequestPost({ request, env }) {
  if (!env.SHOPIFY_STOREFRONT_TOKEN) {
    return new Response(JSON.stringify({ error: "Shopify storefront token is not configured." }), {
      status: 503,
      headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
    });
  }

  const origin = new URL(request.url).origin;
  const incomingOrigin = request.headers.get("Origin");
  if (incomingOrigin && incomingOrigin !== origin) {
    return new Response("Forbidden", { status: 403 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (!body || typeof body.query !== "string" || body.query.length > 100000) {
    return new Response("Invalid GraphQL request", { status: 400 });
  }

  const upstream = await fetch("https://hujnfh-bk.myshopify.com/api/2026-10/graphql.json", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-Shopify-Storefront-Access-Token": env.SHOPIFY_STOREFRONT_TOKEN
    },
    body: JSON.stringify(body)
  });

  const responseBody = await upstream.text();
  return new Response(responseBody, {
    status: upstream.status,
    headers: {
      "content-type": upstream.headers.get("content-type") || "application/json",
      "cache-control": "no-store"
    }
  });
}

export async function onRequest({ request }) {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: { Allow: "POST" } });
  }
  return new Response("Method Not Allowed", { status: 405, headers: { Allow: "POST" } });
}
