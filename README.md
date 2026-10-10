# 5 Steps with Jesus

Production-ready Next.js App Router foundation for a Christian humanitarian project in Rwanda.

## Stack

Next.js, React, TypeScript, Tailwind CSS, Supabase PostgreSQL/Auth/Storage, Zod-ready validation, and Lucide icons.

## Run locally

```bash
npm install
copy .env.example .env.local
npm run dev
```

Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`. The public site intentionally renders with sample content when Supabase is not configured, making visual development easy.

## Supabase setup

1. Create a Supabase project.
2. Run [`supabase/schema.sql`](./supabase/schema.sql) in the SQL Editor.
3. Create an Auth user in Authentication, then insert that user's UUID into `admin_profiles` with role `admin`.
4. The SQL creates the `project-media` bucket and restrictive policies for published content and authenticated administrators.

Never expose a service-role key in the browser or commit `.env.local`.

## Content management

Use the **Admin sign in** link in the public footer or visit `/admin/login` directly. The dashboard is protected by the Next.js proxy and Supabase Auth, and the signed-in user must also have a row in `admin_profiles`. Projects, stories, photos, and site settings can be created, edited, published, and deleted from the dashboard. Photos can be uploaded to the `project-media` bucket. All writes use the RLS-protected tables and storage policies.

## Deployment

Deploy to Vercel, Netlify, or another Next.js host. Configure the two public Supabase environment variables in the host settings, run the schema once, and configure your Supabase Auth redirect URLs for the deployed domain.

## Accessibility and SEO

Routes include semantic headings, keyboard-accessible navigation, meaningful image alternatives, responsive layouts, and page metadata. Add the deployed domain to `metadataBase` in `app/layout.tsx` if it differs from the example domain.
