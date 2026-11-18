# GOD LEGACY — Backend integration specification

## Objective
Connect a real commerce platform (preferred evaluation: self-hosted WordPress + WooCommerce) to the existing brand and storefront without rebuilding the customer experience.

## Architecture decision
GitHub Pages is static hosting only. It may remain useful for a brochure/preview site, but it cannot host WooCommerce. A WooCommerce launch requires a separate WordPress-compatible hosting account, domain/DNS configuration, SSL, WordPress, WooCommerce, database, backups and security maintenance.

## Integration sequence
1. Choose and register the business domain after checking availability, renewal price and trademark conflicts.
2. Choose WordPress-compatible hosting with current supported PHP, database, SSL, backups, staging and adequate resources.
3. Install WordPress and WooCommerce; configure store country, currency, tax settings, shipping zones, customer accounts and email sender.
4. Import the reviewed product catalogue. Replace all demo products, images, prices, SKUs and descriptions with supplier-verified information.
5. Configure payment gateway(s) available to the registered Indian business and the intended customer countries. Complete KYC and test mode first.
6. Configure shipping methods, delivery estimates, duties/taxes disclosures, returns and refund workflows for each destination.
7. Connect transactional email, customer support and order tracking.
8. Connect analytics and consent-aware tracking only after privacy disclosures and settings are reviewed.
9. Test the complete journey: browse → product → cart → checkout → payment → confirmation → supplier fulfilment → tracking → refund/cancellation.
10. Launch only after a successful test order and documented rollback/backup plan.

## Data model to map
- Products: product_id, SKU, title, slug, category, description, images, price, compare-at price, currency, dimensions, weight, variants, stock status, supplier reference, compliance files, shipping profile, status.
- Suppliers: supplier_id, legal/business name, contact, country, verification status, sample status, fulfilment countries, processing time, shipping services, tracking, return address, defect/loss terms, product-media rights, backup supplier.
- Orders: order_id, timestamp, customer reference, line items, quantities, currency, item subtotal, shipping, taxes/duties disclosure, total, payment status, fulfilment status, tracking number, cancellation/refund status.
- Customers: customer_id, email, name, delivery address, consent/preferences and order history. Collect only necessary data and protect it.
- Support cases: case_id, order reference, issue type, status, timestamps and resolution.

## Integration constraints
- Never place secret API keys, payment credentials or private customer information in this public repository or browser JavaScript.
- Payment creation, verification, refunds and webhooks must run server-side through the selected platform/plugin.
- Use official gateway plugins and signed webhook verification.
- Keep staging/test mode separate from production.
- Use role-based admin accounts, strong unique passwords, MFA, updates, backups and least-privilege access.
- The static cart on GitHub Pages is a visual prototype only; it is not a real cart shared across devices and it cannot securely take payments.

## Required business inputs before live configuration
Legal seller name and address, business registration/tax details where applicable, customer-support email, return/refund address and terms, shipping origin, target countries, payment-gateway approval and verified supplier/product records. Do not invent these values.
