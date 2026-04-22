This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Google Analytics & cookie consent

This site ships with a GDPR/ePrivacy-compliant cookie consent flow and Google
Analytics 4 integration that is **opt-in only**.

1. Copy `.env.example` to `.env.local`.
2. Set `NEXT_PUBLIC_GA_ID` to your GA4 measurement ID (e.g. `G-XXXXXXXXXX`).
3. Restart the dev server / rebuild.

How it works:

- `app/components/ConsentBootstrap.tsx` runs an inline script in `<head>` with
  `strategy="beforeInteractive"`, sets Google Consent Mode v2 defaults to
  `denied`, and replays any previously saved consent from `localStorage`.
- `app/components/CookieConsent.tsx` is the banner + preferences modal.
  It writes to `localStorage` under `mas_consent_v1` and dispatches a
  `mas:consent-change` event. It listens for `mas:open-cookie-settings` so the
  footer (or any other component) can re-open the dialog.
- `app/components/Analytics.tsx` only injects `gtag.js` once the user has
  granted analytics consent AND `NEXT_PUBLIC_GA_ID` is set. IP anonymisation
  and advertising features are explicitly disabled.
- Legal pages live at `/privacy` and `/cookies` with SL/EN/DE translations.

If you later add marketing/ads scripts, gate them behind the `marketing` flag
in the consent object (same pattern as `Analytics.tsx`).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
