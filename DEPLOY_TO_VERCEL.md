# Deepamm Engineering Enterprises — Vercel deployment

## Deploy with Vercel

1. Upload this entire project folder to a GitHub repository, or import the ZIP into your workflow and push it to GitHub.
2. In Vercel, choose **Add New Project** and import the repository.
3. Vercel should detect **Vite** automatically.
4. Use:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Deploy.

No environment variables are required by the current site.

## Local test

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

The responsive hardening keeps the existing visual design while improving intermediate desktop/tablet navigation, mobile text wrapping, fixed-height service cards, product-image cropping, horizontal overflow, and reduced-motion behavior.
