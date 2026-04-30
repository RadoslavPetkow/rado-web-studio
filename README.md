# Rado Web Studio

Premium marketing website and early client portal foundation for Rado Web Studio, built with Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, Lucide React, Framer Motion, Supabase, Vercel Analytics, and Speed Insights.

This version includes the public marketing site, Supabase Auth foundation, protected client/admin dashboard shells, and database/RLS schema. Payments, file uploads, and full chat workflows are intentionally not included yet.

## Local Setup

Install dependencies:

```bash
npm install
```

Create a local environment file:

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

Use these variables locally and in Vercel:

```bash
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

If `NEXT_PUBLIC_FORMSPREE_ENDPOINT` is missing, the contact form falls back to a prefilled email draft to `radigoig@gmail.com`.

If Supabase variables are missing, the public marketing site still works, while portal routes show a setup notice or redirect only after Supabase is configured.

## Supabase Setup

1. Create a new Supabase project.
2. Open Project Settings → API.
3. Copy the Project URL into `NEXT_PUBLIC_SUPABASE_URL`.
4. Copy the anon public key into `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. Open SQL Editor.
6. Paste and run [supabase/schema.sql](./supabase/schema.sql).
7. In Authentication → Providers, confirm Email is enabled.
8. In Authentication → URL Configuration, set the Site URL to your production Vercel URL when deployed.

The schema creates:

- `profiles`
- `project_requests`
- `projects`
- `messages`
- `future_payments`

It also enables Row Level Security and adds policies for client and admin access.

## Making The First Admin

1. Register your first user at `/register`.
2. In Supabase, open Table Editor → `profiles`.
3. Find your user profile.
4. Set `role` to `admin`.

You can also run this in SQL Editor:

```sql
update public.profiles
set role = 'admin'
where email = 'your-email@example.com';
```

After that, log out and log back in. The navbar will show the Admin link.

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
4. Add Supabase environment variables.
5. Add `NEXT_PUBLIC_FORMSPREE_ENDPOINT` if using Formspree.
6. Deploy a Preview build.
7. Test the Preview URL using `LAUNCH_CHECKLIST.md`.
8. Promote or deploy to Production after checks pass.

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
9. Register a test portal user.
10. Promote your own profile to `admin` in Supabase.
11. Confirm `/dashboard` works for a client user.
12. Confirm `/admin` redirects non-admin users and works for admin users.

Use [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md) for the full launch pass.

## Local Portal Testing Checklist

1. Add Supabase environment variables to `.env.local`.
2. Run `supabase/schema.sql` in Supabase SQL Editor.
3. Start the app with `npm run dev`.
4. Register a test user at `/register`.
5. Log in at `/login`.
6. Confirm `/dashboard` loads.
7. Submit the contact form and confirm a row appears in `project_requests`.
8. Change your profile role to `admin` in Supabase.
9. Confirm `/admin` loads.
10. Log out and confirm `/dashboard` redirects to `/login`.
