# Vercel Deployment

This project is configured for a single Vercel deployment:
- `frontend` is built as a static Vite app.
- `Backend/index.js` is deployed as a serverless API.
- `/api/*` routes are forwarded to the backend function.

## 1. Import the repository in Vercel

1. In Vercel, create a new project from this repository.
2. Keep the project root as the repository root.
3. Vercel will use [`vercel.json`](/vercel.json) automatically.

## 2. Configure environment variables (Vercel Project Settings)

Set these for Production (and Preview if needed):

- `MONGO_URI`
- `JWT_SECRET`
- `JWT_EXPIRY` (example: `7d`)
- `SMTP_HOST` (example: `smtp.gmail.com`)
- `SMTP_PORT` (example: `587`)
- `SMTP_SECURE` (`true` or `false`)
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_FROM` (example: `"Mind Stock <you@domain.com>"`)
- `APP_URL` (example: `https://your-project.vercel.app`)

Optional frontend variable:
- `VITE_API_BASE_URL` should be left empty/unset when using the same Vercel domain for API.

## 3. Deploy

Push to your connected branch (or click Deploy in Vercel).  
The frontend will be served from `/`, and backend APIs from `/api/*`.
