# Homesick Creative

A responsive portfolio and pricing website for Homesick Creative.

## Edit the website

- Main page content: `index.html`
- Colors, typography and layout: `assets/styles.css`
- Mobile menu and booking form: `assets/site.js`
- Hero photograph: `assets/homesick-hero.png`

Before publishing, replace the draft email address, WhatsApp URL, Instagram URL and package prices in `index.html`.

## Push to GitHub

1. Create a new empty repository on GitHub.
2. Open a terminal inside this folder.
3. Run:

```bash
git init
git add .
git commit -m "Initial Homesick Creative website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/homesick-creative.git
git push -u origin main
```

## Publish with Vercel

1. Sign in to Vercel and select **Add New → Project**.
2. Import the `homesick-creative` GitHub repository.
3. Leave the framework preset as **Other**.
4. Leave the build command and output directory empty.
5. Select **Deploy**.

Vercel will publish `index.html` directly. Future pushes to the `main` branch will automatically update the website.

## Local preview

Open `index.html` in a browser, or use the Live Server extension in VS Code.

