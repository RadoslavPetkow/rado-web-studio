# Zoro WebStudio Launch Checklist

Use this before sharing the site with real prospects or sending a production link to clients.

## Local Checks

- [ ] Run `npm install` from a clean checkout.
- [ ] Run `npm run dev` and open the local URL.
- [ ] Check the homepage, `/projects`, `/contact`, and `/thank-you`.
- [ ] Click all navbar and footer links.
- [ ] Confirm all internal links resolve without a 404.

## Build Checks

- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Confirm the build output includes `/`, `/projects`, `/contact`, and `/thank-you`.
- [ ] Check the browser console for errors on each main page.

## Environment Variable Checks

- [ ] Confirm `.env.local` exists only locally and is not committed.
- [ ] Add `NEXT_PUBLIC_FORMSPREE_ENDPOINT` if using Formspree.
- [ ] Add `NEXT_PUBLIC_SUPABASE_URL`.
- [ ] Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- [ ] Add `NEXT_PUBLIC_SITE_URL` with the final Zoro WebStudio public domain.
- [ ] Add the same environment variable in Vercel for Preview and Production.
- [ ] Redeploy after changing Vercel environment variables.

## Supabase Portal Checks

- [ ] Create a Supabase project.
- [ ] Run `supabase/schema.sql` in SQL Editor.
- [ ] Register a test user at `/register`.
- [ ] Confirm a profile row is created.
- [ ] Log in at `/login`.
- [ ] Confirm `/dashboard` loads for the user.
- [ ] Set your profile role to `admin`.
- [ ] Confirm `/admin` loads for admin.
- [ ] Confirm a non-admin user is redirected away from `/admin`.

## Formspree Test

- [ ] Submit the contact form with safe test data.
- [ ] Confirm Formspree receives the submission.
- [ ] Confirm the site redirects to `/thank-you` after a successful submission.
- [ ] Remove or disable the endpoint locally and confirm the mailto fallback opens an email draft.

## Mobile Test

- [ ] Test the homepage on a narrow mobile viewport.
- [ ] Test `/projects` cards on mobile.
- [ ] Test the `/contact` form fields and dropdowns on mobile.
- [ ] Confirm CTA buttons fit and do not overlap text.

## SEO Test

- [ ] Visit `/robots.txt` and confirm it allows the site and points to the sitemap.
- [ ] Visit `/sitemap.xml` and confirm homepage, projects, and contact are listed.
- [ ] Check page titles and descriptions in browser dev tools or a metadata preview tool.
- [ ] Confirm `/thank-you` is not intended for indexing.

## Analytics Test

- [ ] Deploy to Vercel.
- [ ] Open the production site and click the main CTAs.
- [ ] Submit a safe test request through Formspree.
- [ ] Confirm Vercel Analytics shows page views and custom events after data appears.
- [ ] Confirm Speed Insights starts reporting after production traffic.

## Final Client-Readiness Test

- [ ] Read the homepage copy out loud and remove any unclear wording.
- [ ] Confirm the contact email is correct: `radigoig@gmail.com`.
- [ ] Confirm pricing ranges are acceptable for real prospects.
- [ ] Confirm no fake testimonials or unsupported claims are present.
- [ ] Share the production URL with one trusted person for a final review.
