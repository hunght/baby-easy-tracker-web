# BabyEase Web

This is the web repository for BabyEase.

## Introduction

BabyEase Web is the landing page and blog for BabyEase, a lightweight baby tracking app that helps caregivers record and visualize a baby's daily activities.

## Features

- Responsive design
- SEO-friendly
- Markdown support
- Syntax highlighting
- Customizable theme

## Getting Started

To get started with BabyEase Web, follow these steps:

1. Clone the repository: `git clone https://github.com/hunght/baby-easy-tracker-web.git`
2. Install the dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser and navigate to `http://localhost:3000`

## Email Campaign Admin

An admin page is available at `/{locale}/admin/email-campaign` (example: `/en/admin/email-campaign`).

Required env vars for web:

- `CONVEX_URL` (or `NEXT_PUBLIC_CONVEX_URL`) pointing to the same Convex deployment used by mobile.
- `CAMPAIGN_ADMIN_TOKEN` (must match Convex backend `CAMPAIGN_ADMIN_TOKEN`)
- `ADMIN_BASIC_AUTH_USER` (protects `/[locale]/admin/*` and `/api/admin/*`)
- `ADMIN_BASIC_AUTH_PASSWORD` (protects `/[locale]/admin/*` and `/api/admin/*`)

Required env vars for Convex backend (mobile repo):

- `RESEND_API_KEY`
- `EMAIL_FROM`
- `CAMPAIGN_ADMIN_TOKEN`

### Option B: Pull Convex client metadata into web

This repo supports a decoupled "consumer" workflow:

1. Install/login Convex CLI in this repo (`npm i -D convex` and `npx convex login` if needed).
2. Set deployment selection env (for example `CONVEX_DEPLOYMENT=dev:your-deployment` in `.env.local`).
3. Pull function metadata from deployment:

```bash
npm run convex:client:pull
```

4. Generate a stable client map used by the web admin API route:

```bash
npm run convex:client:gen
```

Or run both:

```bash
npm run convex:client:sync
```

To generate only admin-related functions (smaller generated map):

```bash
npm run convex:client:sync:admin
```

Important: this pulls function metadata from the selected deployment. If a new backend function (e.g. `emailCampaigns:*`) is not deployed yet, it will not appear in generated output and admin endpoints depending on it will fail at runtime.

Generated file:

- `lib/convex-api.generated.ts`

## Customization

You can customize the theme by modifying the CSS files in the `styles` directory. Feel free to experiment and make it your own!

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.
