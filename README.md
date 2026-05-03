# Rado Web Studio

Premium marketing website and early client portal foundation for Rado Web Studio, built with Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, Lucide React, Framer Motion, Supabase, Vercel Analytics, and Speed Insights.

This version includes the public marketing site, Supabase Auth foundation, protected client/admin dashboards, converted project management, simple project messages, privacy/terms pages, and database/RLS schema. Payments, file uploads, realtime, and notifications are intentionally not included yet.

## Survey-Driven Public Website Improvements

Early feedback showed that visitors understood the offer, but wanted clearer
demo examples, more pricing context, and an easier way to start a conversation.
The public site now includes:

- More visual demo project cards with mini website-style mockups for the barber, fitness coach, and restaurant examples.
- Clearer problem, solution, feature, and result-promise presentation on the homepage and `/projects`.
- A pricing clarity section explaining what affects the final price, including pages, design complexity, integrations, portal/dashboard features, AI automations, support, and timeline urgency.
- Free consultation language in the hero, contact page, pricing section, projects page, and footer.
- Clearer client portal copy explaining that the portal is used after a project is approved to track progress, status updates, and communication.

## Public Internationalization

The public marketing site supports English, Bulgarian, and Italian for small
business visitors in Bulgaria and Europe.

Localized public routes:

- `/en`, `/bg`, `/it`
- `/en/projects`, `/bg/projects`, `/it/projects`
- `/en/contact`, `/bg/contact`, `/it/contact`
- `/en/start`, `/bg/start`, `/it/start`
- `/en/privacy`, `/bg/privacy`, `/it/privacy`
- `/en/terms`, `/bg/terms`, `/it/terms`

The existing non-localized public routes still work in English. Auth, client
dashboard, admin dashboard, and portal routes remain English for now.

Translation files live in:

- `src/i18n/locales.ts`
- `src/i18n/dictionaries/en.ts`
- `src/i18n/dictionaries/bg.ts`
- `src/i18n/dictionaries/it.ts`
- `src/i18n/get-dictionary.ts`

The language switcher is shown on public pages and preserves the current page
when switching language, for example `/en/projects` → `/bg/projects`. The
contact form labels, options, validation messages, CTA, trust note, pricing,
FAQ, demo project cards, navigation, footer, privacy, terms, and start checklist
copy are localized.

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

## Admin Request Review Workflow

Admins can review project requests at `/admin`.

Available request actions:

- Mark as reviewed: updates `project_requests.status` to `reviewed`.
- Reject request: updates `project_requests.status` to `rejected`.
- Convert to project: creates a row in `projects` and updates the request status to `converted`.

Conversion requires a registered client profile with the same email address used in the original request. If no matching profile exists, no project is created. Ask the client to create an account first, then convert the request again.

When a request is converted:

- The project is assigned to the matching profile id.
- The project title is based on the requested service and business name.
- The service type and budget range come from the request.
- The description includes the original message, business type, timeline, and contact email.
- The new project starts with status `new`.

## Admin Project Management

Admins can manage converted projects from `/admin`.

Project cards show:

- Project title
- Linked client name or email
- Service type
- Status
- Budget range
- Updated timestamp
- Last project message preview when available
- Last project message timestamp when available
- Total message count
- Short description preview

Click `Manage project` to open `/admin/projects/[id]`. Admins can update:

- Title
- Service type
- Budget range
- Status
- Description

Allowed project statuses:

- `new`
- `in_progress`
- `waiting_for_client`
- `completed`

Project updates are handled by a server action that verifies the current user is authenticated and has `profiles.role = admin` before making changes. Clients cannot access the admin edit route and cannot update project status.

Clients see status updates in `/dashboard` and `/dashboard/projects/[id]`. Client project cards show the project title, status, service type, budget range, created and updated timestamps, last message preview, last message timestamp, total message count, and a link to view project details. The project detail page explains the current stage in plain language, for example whether work is waiting to start, in progress, waiting for client feedback, or completed.

## Project Activity Overview

The client and admin dashboards summarize recent activity from the existing `messages` table. The dashboard does not subscribe to realtime events. It reads message rows during the server render, counts messages per project, and displays the newest message as a short preview.

Activity fields:

- Last message preview: whitespace is normalized and long messages are shortened.
- Last message timestamp: shown with medium date and short time formatting.
- Message count: total readable messages for that project.

Supabase Row Level Security still controls what each user can read. Clients only see activity for projects assigned to their account. Admins can see all project activity.

## Project Messages

Each converted project has a simple message thread on the project detail page.

Clients can:

- View messages for projects assigned to their own account.
- Send messages only on their own projects.
- See admin replies labeled as `Rado Web Studio`.

Admins can:

- View messages on any project from `/admin/projects/[id]`.
- Reply to any project thread.
- See client messages labeled with the client name or email when available.

Message sending is handled by a server action that verifies the current user, checks whether the user is an admin or owns the project, rejects empty messages, and limits messages to 2000 characters. Supabase Row Level Security also protects message reads and inserts.

Limitations in this MVP:

- No realtime updates yet.
- No file uploads yet.
- No email notifications yet.
- New messages appear after the page refreshes/revalidates.

To test last message previews:

1. Log in as an admin and open `/admin/projects/[id]`.
2. Send a message on the project thread.
3. Return to `/admin` and confirm the project card shows the preview, timestamp, and count.
4. Log in as the linked client and open `/dashboard`.
5. Confirm the same project card shows the preview, timestamp, and count.
6. Send a client reply from `/dashboard/projects/[id]`.
7. Refresh `/dashboard` and `/admin` to confirm the newest reply becomes the preview.

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
- `process_cta_click`
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

## Privacy, Terms, And Paid Work

The site includes simple launch-ready trust pages:

- `/privacy`: explains contact form data, portal account data, project/message data, how data is used, and that data is not sold.
- `/terms`: explains services offered, project scope, communication, client responsibilities, payment handling, and simple limitations.
- `/start`: provides a public project start checklist for business information, brand assets, website content, access details, feedback, revisions, and launch preparation.

The homepage process section and public contact page explain the request-to-portal flow: a visitor submits a request, the project fit and scope are clarified, approved clients create a portal account, and the project workspace is then used for communication and progress tracking.

Payments are not handled inside the app yet. Paid project terms, deposits, invoices, bank transfer details, and formal agreements can be handled separately before work begins.

These pages are written in simple English for an early-stage business website and are not legal advice.

## Survey-Driven Visual Polish

The public marketing site was visually redesigned after early feedback that the first version felt too plain. The updated public UI uses stronger light/dark section contrast, a darker premium navigation/footer, richer hero visuals, more polished demo project mockups, deeper pricing cards, and stronger CTA areas while keeping the copy, multilingual routes, contact flow, and portal functionality intact.

The redesign focuses on making Rado Web Studio feel like a serious modern digital studio: clean and readable, but with more depth, hierarchy, and agency-style presentation.

## Production Testing Checklist

Before sharing the site with real prospects:

1. Run `npm run lint`.
2. Run `npm run build`.
3. Test `/`, `/projects`, `/contact`, and `/thank-you`.
4. Test the contact form with Formspree enabled.
5. Test the mailto fallback with Formspree disabled.
6. Check mobile layout for all main pages.
7. Check `/robots.txt` and `/sitemap.xml`.
8. Check `/privacy`, `/terms`, and `/start`.
9. Confirm footer links to Contact, Privacy Policy, Terms of Service, and Project Start Checklist work.
10. Confirm Vercel Analytics and Speed Insights are active after deployment.
11. Register a test portal user.
12. Promote your own profile to `admin` in Supabase.
13. Confirm `/dashboard` works for a client user.
14. Confirm `/admin` redirects non-admin users and works for admin users.

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
11. As admin, mark a request as reviewed.
12. As admin, reject a test request.
13. Convert a request into a project.
14. Send messages as both admin and client.
15. Confirm `/dashboard` and `/admin` show last message previews, timestamps, and total message counts after refresh.
13. Register a client with the same email as a request and convert that request into a project.
14. Log in as the client and confirm the project appears in `/dashboard`.
15. As admin, open `Manage project`, update the status, and save.
16. Log in as the client and confirm the updated status appears in `/dashboard/projects/[id]`.
17. As the client, send a message from `/dashboard/projects/[id]`.
18. As admin, open the same project in `/admin/projects/[id]` and reply.
19. Confirm a different client cannot open or message that project.
