# Nexora AI Studio prototype

This isolated folder contains the initial static prototype for the AI anime and manga creation studio. The existing God-Legacy storefront files at repository root are untouched.

## Preview / deploy

Cloudflare Pages can deploy this folder as a separate Pages project. Set the Git repository to `flyingcrows/God-Legacy`, production branch to `nexora-ai-studio`, build command to none (static), and root directory to `nexora-ai`. The Pages deployment will serve `index.html`.

This is a UI prototype. The prompt form is interactive but no AI generation, authentication, database, credit tracking, billing, or admin security is connected yet. Do not market the quotas/pricing as active.

## Planned implementation phases
1. Auth and owner role with unlimited app-level quota.
2. Server-enforced daily quotas and resets for public tiers; failed jobs refunded.
3. AI image generation API and secure server-side provider secrets.
4. Projects, assets, characters and generation-job database.
5. Video, manga/storyboard, editing and audio workflows.
6. Subscription and credit checkout; admin pricing and cost monitoring.
7. Abuse controls, privacy, content policies, observability and production tests.

Free deployment does not imply free inference. Provider charges and their terms need evaluation before turning generation on.
