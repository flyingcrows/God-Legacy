# Deploy GOD LEGACY on Cloudflare Pages Free

This repository is plain HTML/CSS/JavaScript; it does not need WordPress or a build command.

## Before you start

- Create a free Cloudflare account at https://dash.cloudflare.com/sign-up.
- Keep the GitHub repository public or private as you prefer; Cloudflare Pages Git integration supports both.
- Do not enter payment details or upgrade to a paid plan for this static preview.

## Connect the existing GitHub repository

1. Sign in to Cloudflare.
2. Open **Workers & Pages**.
3. Choose **Create application** → **Pages** → **Connect to Git**.
4. Choose GitHub and authorize Cloudflare to access the `flyingcrows/God-Legacy` repository.
5. Select the repository and production branch **main**.
6. Set **Framework preset** to **None**.
7. Leave **Build command** blank.
8. Set **Build output directory** to `/` (repository root). If the dashboard rejects that value, use `.` as the root output directory.
9. Click **Save and Deploy**.

Cloudflare will assign a free address similar to `god-legacy.pages.dev`. The exact address is confirmed by Cloudflare after project creation and may be unavailable if another account already uses the name.

## Automatic updates

After Git integration is connected, commits pushed to the production branch automatically trigger new deployments. Check the deployment status in the Cloudflare Pages project.

## Free plan boundaries

Cloudflare Pages Free has published usage limits, including 500 builds per month and up to 20,000 files per site. Static hosting does not provide WooCommerce, a payment gateway, supplier fulfilment or order management by itself.

## Do not launch sales yet

The current products and prices are demo content. Before taking orders, verify each supplier, actual stock, product quality, shipping destinations and delivery estimates, returns/refunds, local legal/tax obligations, and a supported payment provider. Do not claim worldwide shipping or secure checkout until those services are actually configured.

## Official documentation

- Git integration: https://developers.cloudflare.com/pages/get-started/git-integration/
- Pages limits: https://developers.cloudflare.com/pages/platform/limits/
- GitHub Pages policy: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
