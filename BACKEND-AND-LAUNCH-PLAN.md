# GOD LEGACY — backend and zero-budget launch plan

## Current technical foundation

- Static storefront hosted at Cloudflare Pages: https://god-legacy.pages.dev/
- Source repository: https://github.com/flyingcrows/God-Legacy
- Frontend is plain HTML/CSS/JavaScript.
- This is a pre-launch catalogue, not a production ecommerce store.
- Cloudflare Pages static hosting does not itself provide checkout, payment processing, customer accounts, stock synchronisation or fulfilment.

## Zero-budget architecture (phased)

### Phase A — catalogue and enquiry MVP
Use the current static website and repository-managed JSON catalogue.
- Replace demo products with supplier-verified listings only.
- Store SKU, supplier reference, supplier verification status, base price, shipping quote, destination eligibility, dispatch estimate and last-checked date.
- Product enquiry / “notify me” flow can be implemented with a free form endpoint or a Cloudflare Pages Function. Before collecting customer data, publish a real privacy notice and secure the endpoint against spam.
- Until a working secure form exists, use a clearly displayed business contact channel; do not show a fake submit success.

### Phase B — order enquiry workflow
- Customer requests product availability / quote.
- Admin manually confirms stock, destination, shipping, total price and delivery estimate with supplier.
- Customer receives a written quote and clear terms.
- Do not collect payment until gateway approval and refund process are in place.
- Maintain an order ledger with order ID, customer contact, consent, SKU, supplier quote, destination, status, tracking, refund status and timestamps. Keep personal data out of the public Git repository.

### Phase C — secure payments and order management
Evaluate payment providers available to an India-based business, their KYC/business requirements, settlement delays, international-card support, currency conversion, refunds and fees. Do not select a provider solely because signup is free.
- Payment gateway fees are unavoidable when a transaction is processed.
- Supplier must be paid before fulfilment; customer payout may arrive later. This creates a working-capital gap.
- Implement signed payment webhooks, idempotent order creation, server-side price validation, secure secrets, order-status transitions and admin authentication.
- Never store card data or payment credentials in the website or GitHub.

### Phase D — automation
Only after repeated successful orders:
- supplier API or CSV order workflow
- stock and price refresh
- tracking sync
- email notifications
- returns/refund workflow

## Free infrastructure limits and design constraints

Cloudflare Pages static asset hosting has published free limits. Pages Functions consume Workers Free quota; the official documentation currently lists 100,000 Workers requests per day. A Function is not a substitute for secure design, backups or a tested payment system. Review limits before relying on them.

Use static files for public catalogue data only. Do not put private customer/order records, API keys or supplier login credentials in the repository.

## Pre-launch blockers

1. No verified supplier or approved SKU.
2. No supplier-specific landed cost / destination shipping matrix.
3. No published, legally reviewed business identity, privacy, returns/refund and shipping terms.
4. No confirmed payment gateway and settlement/cash-flow plan.
5. No working order database/admin access.
6. No tested fulfilment, tracking, cancellation and refund workflow.
7. No customer-support email/address/service hours.
8. No final decision on countries served and excluded destinations.

## Zero-spend launch policy

- No WordPress, paid hosting, paid plugins, paid themes, paid supplier directories or ads.
- Do not purchase samples or stock under the current ₹0 budget.
- Do not accept paid orders until supplier cash flow, payment settlement and refunds can be covered.
- If no working capital is available to pay a supplier before payout, start with audience-building, product research and waitlist/enquiry only; do not promise immediate fulfilment.
- Free tiers can change; check provider terms and limits before enabling any production feature.
