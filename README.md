# MJIPL Company Profile CMS

A working, admin-managed employer branding/company profile website for **Madhu Jayanti International Pvt Ltd (MJIPL)**, inspired by the structure of the supplied AmbitionBox company page reference while using MJIPL branding and content.

## Included
- Next.js 15 + TypeScript + Tailwind CSS
- Responsive public company profile
- 19 CMS-controlled sections
- Supabase email/password admin authentication
- Supabase PostgreSQL content storage
- Supabase Storage image uploads
- Editable title, subtitle and section-specific fields for every section
- Repeatable items for leaders, benefits, awards, CSR, life stories, reviews, community projects, jobs, offices, social links and FAQs
- Show/hide controls per section
- Reorder controls for all sections
- Public preview
- Seed data for MJIPL
- Vercel-ready configuration
- Demo fallback content when Supabase is not configured

## 1. Create Supabase project
Create a new Supabase project.

Open **SQL Editor** and run:

`supabase/schema.sql`

This creates the `page_sections` table, row-level security policies, the public `cms-media` storage bucket and all 19 seeded MJIPL sections.

## 2. Create the first admin user
In Supabase:

**Authentication → Users → Add user**

Create an email/password user for the CMS administrator.

All authenticated users can edit CMS content in this first production-ready version. For a larger team, add role-based policies before inviting additional users.

## 3. Environment variables
Copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

The service-role key is not required by the current application and should not be exposed to the browser.

## 4. Run locally
```bash
npm install
npm run dev
```

Public site: `http://localhost:3000`

Admin login: `http://localhost:3000/login`

Admin CMS: `http://localhost:3000/admin`

## 5. Deploy to GitHub + Vercel
1. Create a GitHub repository.
2. Push this project.
3. Import the repository into Vercel.
4. Add the two Supabase environment variables in Vercel Project Settings → Environment Variables.
5. Deploy.

Every CMS save writes directly to Supabase. Normal content changes do **not** require a GitHub commit or Vercel redeploy.

## 6. Connecting to jaytea.com
The recommended rollout is to deploy this application first on a staging hostname such as:

`company.jaytea.com` or `careers.jaytea.com`

After approval, either:
- keep it as a dedicated company/employer-brand experience, or
- route a path from the main site to this Vercel project using your DNS/reverse-proxy setup.

Do not replace the existing jaytea.com production site until the staging build is reviewed and approved.

## CMS sections
1. Banner
2. Logo & Company Header
3. About MJIPL
4. Our Leaders
5. Perks & Benefits
6. Message from CHRO
7. Inclusion, Equity & Diversity
8. Sustainability
9. Corporate Social Responsibility
10. Awards & Recognitions
11. MJIPL Achievements
12. Life at MJIPL
13. MJIPL Reviews
14. Creche Facility
15. Transforming Communities across India
16. MJIPL Job Openings
17. MJIPL Office Locations
18. Connect with us
19. MJIPL FAQs

## Important content note
The starter uses public information from jaytea.com only for basic seed content such as founding year, tea varieties, factories, cups served, countries, sustainability metrics and contact details. Leadership, HR, awards, reviews, creche and detailed CSR content are intentionally left for MJIPL administrators to enter in the CMS rather than inventing private/internal information.
