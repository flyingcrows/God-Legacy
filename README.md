# ZAVO — zero-budget storefront foundation

**Brand:** ZAVO  
**Tagline:** GOOD FINDS. BETTER EVERYDAY.  
**Positioning:** Curated smart-living, fitness, everyday utility and travel/tech products.

## Current status

The current production deployment remains a pre-launch preview. The `shopify-dynamic-storefront` branch contains the first headless Shopify integration pass; it must be preview-tested and merged before production uses it. Only real products published and available through Shopify should appear. The site must not be used to accept orders until payment, supplier fulfilment and launch checks are complete.

## Zero-cost hosting recommendation

Use **Cloudflare Pages Free** with the existing GitHub repository. It provides a free `*.pages.dev` address and can automatically redeploy when changes are pushed to GitHub. GitHub Pages is not the recommended host for a commercial store: GitHub's own Pages policy says it is not intended for sites primarily facilitating commercial transactions.

Deployment instructions: [CLOUDFLARE-DEPLOY.md](CLOUDFLARE-DEPLOY.md)

## What is ready

- Brand identity and responsive storefront presentation
- Category and product-preview layout
- About, contact, FAQ and customer-information page drafts
- Shopify-powered dynamic catalogue/cart integration prepared on `shopify-dynamic-storefront`
- Supplier due-diligence and launch checklists
- Preliminary supplier shortlist and outreach template (`SUPPLIER-RESEARCH.md`)
- Product discovery and validation framework (`PRODUCT-RESEARCH-PLAN.md`)
- Backend, order-management and zero-budget launch plan (`BACKEND-AND-LAUNCH-PLAN.md`)

## What is not live yet

- No verified supplier or approved sellable product inventory
- Shopify checkout integration is prepared on the feature branch; payment gateway readiness and full end-to-end order processing are not yet verified
- No customer database or live order tracking
- Contact/newsletter submissions are not connected to a form backend
- Shipping, returns, privacy and terms pages are drafts and must be completed for the actual business and markets

## Important zero-cost boundaries

A free static host can display a professional website, but it does not automatically provide a full ecommerce backend. Payment processors, suppliers, shipping, refunds and any required tax/business compliance can involve costs. Do not accept payment or promise delivery until those pieces are verified and tested.

Never commit passwords, API keys, payment credentials or customer personal information to this public repository.

## Project working documents

- [Supplier research](SUPPLIER-RESEARCH.md)
- [Product research plan](PRODUCT-RESEARCH-PLAN.md)
- [Backend and launch plan](BACKEND-AND-LAUNCH-PLAN.md)

## Repository

https://github.com/flyingcrows/God-Legacy
