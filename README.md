# Harsh Potekar — Personal Portfolio Website

A modern, responsive single-page portfolio website for **Harsh Potekar**, an IT Engineering student and aspiring web developer.

**Live demo:** `https://harshpotekar.netlify.app` *(update once deployed)*

---

## 🗂️ Project Structure

```
harsh-portfolio/
├── index.html          ← Main HTML (all sections)
├── style.css           ← All styles (CSS variables, animations, responsive)
├── script.js           ← All JavaScript (interactions, animations)
├── img/
│   ├── profile.png     ← ⚠️ REPLACE with your actual photo
│   └── project-placeholder.jpg  ← Placeholder project images
├── resume.pdf          ← ⚠️ ADD your resume here
└── README.md           ← This file
```

---

## 🚀 Running Locally

No build step required — it's plain HTML/CSS/JS.

1. **Clone or download** the project folder.
2. Open `index.html` in any browser — double-click or drag it into Chrome/Firefox/Edge.
3. For the best experience (and to test the Netlify form locally), use [VS Code Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer):
   - Install the **Live Server** extension in VS Code.
   - Right-click `index.html` → **Open with Live Server**.
   - The page auto-reloads on save.

> ⚠️ The contact form won't submit locally (it requires Netlify). Locally it will show an error message — this is expected. It will work perfectly on Netlify.

---

## 🖼️ Files to Replace

| File | What to do |
|------|-----------|
| `img/profile.png` | Replace with your actual photo. Keep the filename, or update every `src="img/profile.png"` in `index.html`. Best size: **500×620 px** or similar portrait. |
| `resume.pdf` | Drop your CV/resume here. The "Download Resume" button links to `/resume.pdf`. |
| `img/project-placeholder.jpg` | Replace per project (see [Adding Real Projects](#-adding-real-projects) below). |

---

## 🔗 Updating Social Links

Open `index.html` and search for `REPLACE`. Two anchor tags need your real URLs:

```html
<!-- LinkedIn -->
<a href="https://www.linkedin.com/in/YOUR-PROFILE" ...>

<!-- GitHub -->
<a href="https://github.com/YOUR-USERNAME" ...>
```

---

## 🛠️ Adding Real Projects

All project data lives in clearly commented cards inside the `#projects` section of `index.html`.

To activate a project:

1. Find the `<article class="project-card" ...>` for that project.
2. Set `data-demo="https://your-live-site.com"` and/or `data-github="https://github.com/you/repo"` on the article.
3. Replace `img/project-placeholder.jpg` with a real screenshot (save as e.g. `img/project-portfolio.jpg`) and update the `<img src="...">` inside the card.
4. Update the title, description and tech tags as needed.

The JavaScript in `script.js` (`initProjectCards()`) automatically enables the buttons when a URL is present and hides the **Coming Soon** badge.

---

## 📝 Netlify Forms Setup

The contact form uses [Netlify Forms](https://docs.netlify.com/forms/setup/) — no backend required.

### Steps:
1. **Deploy to Netlify** (see below).
2. Netlify detects the `netlify` attribute on the `<form>` automatically.
3. Go to **Netlify Dashboard → Your Site → Forms**.
4. You'll see submissions appear there after the first one.
5. Optionally add email notifications: **Site Settings → Forms → Form notifications**.

> The form name is `contact` (set via `name="contact"` on the form element). This is what Netlify uses to identify it.

---

## 🌐 Deploying on Netlify

### Method 1: Drag & Drop (Easiest)
1. Go to [app.netlify.com](https://app.netlify.com) and log in.
2. Open the **Sites** tab.
3. Drag your entire `harsh-portfolio/` folder onto the **"Drag and drop your site folder here"** area.
4. Done! Netlify gives you a free `*.netlify.app` URL.

### Method 2: GitHub + Netlify (Recommended for continuous updates)
1. Push the project to a GitHub repository.
2. On Netlify: **Add new site → Import an existing project → GitHub**.
3. Select the repo. Build settings:
   - **Build command:** *(leave blank)*
   - **Publish directory:** `.` (or `/` — the root)
4. Click **Deploy site**.
5. Every `git push` to `main` will auto-redeploy.

---

## 🌐 Deploying on GitHub Pages

1. Push the project to a GitHub repo.
2. Go to **Settings → Pages**.
3. Source: **Deploy from a branch** → Branch: `main`, Folder: `/ (root)`.
4. Save. Your site will be live at `https://YOUR-USERNAME.github.io/REPO-NAME`.

> ⚠️ GitHub Pages does **not** support Netlify Forms. For the contact form to work, use Netlify.

---

## 🎨 Customising the Design

All colours and sizes are CSS variables at the top of `style.css`:

```css
:root {
  --bg-primary:  #0a192f;   /* Deep navy background */
  --accent:      #00d4ff;   /* Teal / electric-blue accent */
  --font-body:   'Poppins', sans-serif;
  ...
}
```

To change the accent colour, update `--accent` and `--accent-hover`. The glow colours (`--accent-glow`, `--accent-subtle`) will need matching updates too.

---

## ♿ Accessibility & SEO

- All images have meaningful `alt` text.
- Keyboard-navigable navbar with `aria-expanded` on hamburger.
- All icon-only links have `aria-label`.
- Colour contrast meets WCAG AA in both dark and light themes.
- Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- `<h1>` only appears once per page.
- Open Graph meta tags included for social sharing.

---

## 📦 Dependencies

**None.** Zero npm packages, zero build step. Everything runs in the browser natively.

- Google Fonts (Poppins) — loaded via CDN link in `<head>`.
- All icons are inline SVG — no icon library needed.

---

*Built with ❤️ using plain HTML, CSS and JavaScript — Harsh Potekar © 2026*
