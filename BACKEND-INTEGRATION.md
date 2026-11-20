# ZAVO — Shopify-powered Cloudflare storefront

## Architecture decision

ZAVO uses a custom, mobile-first storefront hosted on Cloudflare Pages Free, with Shopify as the commerce backend.

- **Frontend:** plain HTML, CSS and JavaScript in this repository.
- **Hosting:** Cloudflare Pages at the existing `god-legacy.pages.dev` address.
- **Commerce backend:** Shopify store `hujnfh-bk.myshopify.com`.
- **Catalogue and checkout:** Shopify Storefront API; Shopify remains the source of truth for products, variants, prices, inventory, carts and checkout.
- **Supplier fulfilment:** CJdropshipping Shopify app, after the merchant confirms its CJ account connection and verifies each imported supplier listing.

This is a headless Shopify architecture. The Cloudflare site is the branded storefront; Shopify handles checkout and order records.

## Current implementation branch

The `shopify-dynamic-storefront` branch contains the first integration pass:

- The homepage product area loads available products from Shopify rather than showing demo product cards.
- Product cards use Shopify product data, images, prices and available variants.
- A cart drawer supports adding/removing items and changing quantities.
- Checkout creates a Shopify cart and redirects the buyer to Shopify's hosted checkout.
- The browser uses Shopify's tokenless Storefront API access for public products and cart operations; no Admin API secret or private Storefront token is placed in browser code or this public repository.

The integration is not production-ready until it has been deployed to a Cloudflare preview and tested against the real store.

## Shopify API details

- Store: `hujnfh-bk.myshopify.com`
- Storefront API endpoint: `https://hujnfh-bk.myshopify.com/api/2026-10/graphql.json`
- The initial storefront uses tokenless access for public product/catalogue and cart features. Shopify documents tokenless access for products, collections, search and cart read/write.
- If later features require token-based access (for example, customer accounts), create credentials through Shopify's Headless sales channel and keep private tokens server-side only.

## Required Shopify setup

1. Confirm that the correct Shopify store is connected.
2. Ensure products are Active and published to the sales channel used by the custom storefront. Draft products do not appear to shoppers.
3. Import only supplier-verified CJ products. Check exact SKU/variant, stock, item cost, destination shipping cost, dispatch estimate, delivery estimate, tracking, returns and defect/loss terms.
4. Confirm Shopify checkout, store currency, shipping zones, taxes/duties disclosures and payment provider availability for the India-based business.
5. Do not publish products or accept paid orders until supplier and payment operations are ready.

## CJdropshipping connection

Shopify confirms that the `CJdropshipping: Much Faster` app is installed. App installation alone does not prove that the merchant's CJ account is linked or that product/order synchronisation is active.

The merchant must confirm the app's connection status inside Shopify/CJ. Never ask for or store CJ passwords in this repository or chat. Use the official app's own authorization flow.

## Cloudflare deployment

The existing Pages project should remain connected to this GitHub repository with:

- Production branch: `main`
- Framework preset: None
- Build command: blank
- Build output directory: repository root (`.`)

The implementation branch is intentionally separate from `main`. Review and test its Cloudflare branch preview first. Merge to `main` only after the storefront preview has been checked. If Cloudflare branch previews are disabled, enable them in the Pages project settings or deploy the branch manually.

No Cloudflare secret is required for the initial tokenless public catalogue/cart integration. Never add Shopify Admin API credentials, payment credentials, customer data or private supplier credentials to the repository.

## Launch blockers

- Existing Shopify products were previously found as drafts; they need supplier verification and intentional publication.
- The Shopify store is on a Trial plan. Shopify has reported: `Plan: trial — you'll need to upgrade before you can start selling and unlock full features`.
- A payment provider and its India-specific KYC/settlement/refund requirements must be confirmed.
- CJ account authorization, supplier SKU mapping and fulfilment workflow must be verified.
- Shipping, returns/refunds, privacy, terms, seller identity, support contact and applicable tax/business disclosures must be completed.
- Complete an end-to-end test order (including cancellation/refund and supplier fulfilment) before launch.

## Zero-spend guardrails

- Keep Cloudflare Pages Free and the existing `pages.dev` address for now.
- Do not buy a domain, paid theme, app, plugin, hosting plan or advertising.
- Do not upgrade Shopify or activate a paid service without the merchant's explicit approval.
- A free storefront build does not make payment processing, supplier fulfilment, refunds or working capital free.
- If the merchant cannot pay the supplier before customer funds settle, use a waitlist/enquiry-only launch rather than accepting orders that cannot be fulfilled.

## Security and privacy

- Never commit Admin API tokens, private Storefront API tokens, payment credentials, supplier logins or customer personal data.
- Treat Shopify checkout as the only payment collection surface; do not collect card details on the Cloudflare site.
- Keep order/customer administration inside Shopify and connected approved systems.
- Collect only data needed for the transaction and publish accurate privacy and customer terms before collecting customer information.
