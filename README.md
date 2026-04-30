# Rado Web Studio

Premium marketing website for Rado Web Studio, built with Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, Lucide React, Framer Motion, Vercel Analytics, and Speed Insights.

This version is intentionally frontend-only. Authentication, dashboards, Supabase, payments, and backend logic are not included yet.

## Local Setup

Install dependencies:

```bash
npm install
```

Create a local environment file if you want real form submissions:

```bash
cp .env.example .env.local
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If the port is busy, Next.js will print another local URL.

## Scripts

```bash
npm run dev
npm run lint
npm run build
```

## Environment Variables

Only one environment variable is needed for production form submissions:

```bash
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

If this variable is missing, the contact form falls back to a prefilled email draft to `radigoig@gmail.com`.

## Formspree Setup

1. Create a Formspree account and form.
2. Copy the form endpoint.
3. Add it to `.env.local` for local testing.
4. Add it to Vercel Project Settings → Environment Variables for Preview and Production.
5. Submit safe test data through `/contact`.
6. Confirm the submission arrives in Formspree and redirects to `/thank-you`.

## Vercel Deployment

Recommended path:

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Confirm the framework preset is Next.js.
4. Add `NEXT_PUBLIC_FORMSPREE_ENDPOINT` if using Formspree.
5. Deploy a Preview build.
6. Test the Preview URL using `LAUNCH_CHECKLIST.md`.
7. Promote or deploy to Production after checks pass.

CLI path:

```bash
npm install
npm run lint
npm run build
vercel
vercel --prod
```

## Analytics

The site uses Vercel Web Analytics and Speed Insights. Custom conversion events are tracked through `src/lib/analytics.ts`.

Tracked events:

- `hero_cta_click`
- `secondary_hero_cta_click`
- `navbar_contact_cta_click`
- `project_card_cta_click`
- `pricing_package_cta_click`
- `contact_form_started`
- `contact_form_submitted_successfully`
- `contact_form_mailto_fallback_used`
- `thank_you_page_viewed`

After deployment, open the Vercel project dashboard and review Analytics and Speed Insights. Analytics helps show which pages and CTAs generate inquiries. Speed Insights helps catch performance issues that can reduce trust and conversion.

## SEO And Crawl Files

The project includes:

- Global metadata in `src/app/layout.tsx`
- Page metadata for `/projects`, `/contact`, and `/thank-you`
- `src/app/robots.ts`
- `src/app/sitemap.ts`

The thank-you page is intentionally excluded from indexing.

## Production Testing Checklist

Before sharing the site with real prospects:

1. Run `npm run lint`.
2. Run `npm run build`.
3. Test `/`, `/projects`, `/contact`, and `/thank-you`.
4. Test the contact form with Formspree enabled.
5. Test the mailto fallback with Formspree disabled.
6. Check mobile layout for all main pages.
7. Check `/robots.txt` and `/sitemap.xml`.
8. Confirm Vercel Analytics and Speed Insights are active after deployment.

Use [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md) for the full launch pass.
