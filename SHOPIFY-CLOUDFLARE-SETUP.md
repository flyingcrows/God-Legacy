# Shopify + Cloudflare setup checklist for ZAVO

## What has been prepared

The `shopify-dynamic-storefront` branch contains the first storefront integration. It reads public products from the Shopify Storefront API, renders available products, keeps a local cart in the visitor's browser, creates a Shopify cart at checkout and sends the visitor to Shopify checkout.

The public catalogue/cart features use Shopify's tokenless Storefront API access. Do not add Admin API credentials or private Storefront tokens to JavaScript or GitHub.

## 1. Confirm product publishing

In Shopify Admin:

1. Open **Products**.
2. Open a product only after its supplier details have been verified.
3. Confirm the product is **Active**, not Draft.
4. In publishing/sales channels, make it available to the custom storefront's sales channel as required by Shopify.
5. Confirm price, variants, inventory tracking and shipping profile.
6. Save. The custom site will display products that Shopify makes available through its Storefront API and marks as available for sale.

Do not publish demo products or unverified supplier listings.

## 2. Confirm CJ account connection

1. Open Shopify Admin → **Apps** → **CJdropshipping: Much Faster**.
2. Open the app and check whether the correct CJ account is connected.
3. Confirm the connected Shopify store shown inside CJ is `hujnfh-bk.myshopify.com`.
4. Do not import or publish products until exact SKU, variants, stock, landed cost, destination shipping, processing/delivery estimates and return terms have been checked.

An installed app is not proof of an authenticated CJ account or working fulfilment sync.

## 3. Cloudflare preview and deployment

1. Open Cloudflare Dashboard → **Workers & Pages** → the existing ZAVO Pages project.
2. Confirm Git integration points to `flyingcrows/God-Legacy`.
3. Keep production branch `main`, build command blank, and output directory `.`.
4. Review the `shopify-dynamic-storefront` branch preview before merging it into `main`.
5. After the preview passes, merge the branch. Cloudflare should build the production deployment from `main`.

If branch previews are disabled, enable preview deployments in the Pages project settings before testing.

## 4. Test checklist

- Homepage loads on mobile and desktop.
- Product catalogue loads real Shopify products only.
- Search filters the displayed catalogue.
- Add to cart, quantity changes and remove actions work.
- Checkout creates a Shopify cart and opens Shopify checkout.
- Shopify checkout displays correct INR pricing, shipping, taxes and available payment methods.
- Out-of-stock or draft products are not shown as purchasable.
- No test order is placed without explicit approval.

## 5. Do not launch until

- CJ account connection and supplier product mapping are verified.
- Supplier stock, shipping and return/defect terms are documented.
- Shopify plan permits selling.
- Payment gateway KYC and settlement are approved.
- Shipping, returns/refunds, privacy, terms, seller details and customer support are accurate.
- A full test order, fulfilment, tracking, cancellation and refund workflow has been verified.

Keep the free Cloudflare address. Do not purchase a domain, theme, app, hosting or ads without approval.
