# ZAVO Shopify connection setup

The custom storefront calls the same-origin Cloudflare Pages Function at `/api/shopify`. The Function forwards Storefront GraphQL requests to the connected Shopify store and reads the Storefront API public access token from a Cloudflare Pages secret. The token is never committed to GitHub.

## One-time Shopify setup

1. Open Shopify Admin for `hujnfh-bk.myshopify.com`.
2. Open **Settings → Apps and sales channels** and install/open the **Headless** sales channel if it is not already available.
3. In Headless, create a storefront for **ZAVO Custom Storefront**.
4. Open its Storefront API credentials and copy the **public Storefront API access token**. Do not use an Admin API token or a private Storefront token.
5. In Cloudflare Dashboard, open **Workers & Pages → god-legacy → Settings → Variables and Secrets**.
6. Add a secret named exactly `SHOPIFY_STOREFRONT_TOKEN` with the public Storefront API access token as its value.
7. Save and redeploy the Pages project so the Function receives the secret.

## Verify before launch

- In Shopify Admin, make sure products are published to the Online Store / Headless storefront sales channel as appropriate.
- Confirm each product has real supplier-backed inventory, correct variant prices, images, shipping details and return terms.
- Test product loading, add-to-bag, quantity changes and Shopify checkout on both desktop and mobile.
- Never add supplier inventory or set stock quantities based on assumptions.

## Current store checks (2026-11-21)

- Store: `hujnfh-bk.myshopify.com`, currency INR.
- The existing ZAVO phone holder listing is active but has zero inventory and no featured image. It is not ready to sell.
- The Shopify Collective supplier catalog is not available for this store's country/currency. Use a sourcing app that supports India and verify supplier shipping, landed cost and return terms before importing products.
- The newsletter form is a front-end placeholder and is not connected to an email marketing provider.
