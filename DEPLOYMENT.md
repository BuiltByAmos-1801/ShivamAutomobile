# Deployment Guide

## Vercel

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Framework preset: Next.js.
4. Build command: `npm run build`.
5. Output is handled by Next.js automatically.

## Environment Variables

Add these in Vercel:

```bash
MONGODB_URI=
JWT_SECRET=
ADMIN_USERNAME=admin
ADMIN_PASSWORD=
NEXT_PUBLIC_APP_URL=https://your-domain.com
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## MongoDB Atlas

Create a cluster, database user, and network access rule. Use the Atlas connection string as `MONGODB_URI`.

## Cloudinary

Create a Cloudinary account, copy cloud name, API key, and API secret. Gallery upload routes automatically optimize images when these variables are present.

## Launch Checklist

- Run `npm run seed` once against production if starter data is needed.
- Replace the admin password after first deployment.
- Confirm sitemap at `/sitemap.xml` and robots at `/robots.txt`.
- Check admin login, enquiry form, booking form, reviews, parts search, and CSV export.
