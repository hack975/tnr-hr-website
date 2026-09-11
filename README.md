# TNR HR Business Solutions — Static HTML Website

## Files & Folder Structure

```
html-export/
├── index.html              ← Home page
├── about.html              ← About page
├── services.html           ← Services overview
├── contact.html            ← Contact page (with working form)
├── hr-consulting.html      ← HR Consulting service detail
├── payroll-services.html   ← Payroll service detail
├── chairing.html           ← Chairing of Hearings service detail
├── recruitment.html        ← Recruitment service detail
├── training.html           ← Training service detail
├── careers.html            ← Careers & vacancies (with filter)
├── newsletter.html         ← Newsletter & articles (with signup form)
├── register.html           ← Registration form (newsletter + job alerts)
├── login.html              ← Admin login page
├── thank-you.html          ← Thank you confirmation page
├── 404.html                ← 404 error page
├── css/
│   └── styles.css          ← All custom styles, design system, animations
└── js/
    └── main.js             ← Scroll reveal, count-up, forms, header, mobile menu
```

## How to Run Locally (No Build Required)

Open any `.html` file directly in Chrome/Edge/Firefox/Safari.
- No server needed
- No Node.js needed
- No VS Code extensions needed
- Works offline

## How to Deploy on Your Own Domain

### Option A — Shared Hosting / cPanel (e.g. Afrihost, Hetzner)
1. Upload the entire `html-export/` folder contents into `public_html/`
2. Make sure `index.html` is at the root
3. Your domain will point to the home page automatically

### Option B — Netlify (Free, Recommended)
1. Go to https://app.netlify.com → "Add new site" → "Deploy manually"
2. Drag and drop the `html-export/` folder
3. Set your custom domain in "Domain settings"

### Option C — GitHub Pages
1. Create a GitHub repo
2. Push the `html-export/` contents to the `gh-pages` or `docs/` branch
3. Enable GitHub Pages in repo Settings → Pages

### Option D — Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. `cd html-export && vercel --prod`

## Technical Notes

### Dependencies (all via CDN — no installation required)
- **TailwindCSS** via CDN (configured inline per page)
- **Remix Icon** v4.1.0 — all icons
- **Font Awesome** 6.5.1 — some icons
- **Google Fonts** — Cormorant Garamond + Inter

### Forms
- Contact form → `https://readdy.ai/api/form/d9gs8d0hpes2mi34rhq0`
- Newsletter signup → `https://readdy.ai/api/form/d9gs8d0hpes2mi34rhpg`
- Registration form → `https://readdy.ai/api/form/d9gsdncoq4dpg2lrmsb0`

All forms use application/x-www-form-urlencoded and include honeypot spam protection.

### Scroll Animations
Handled via `IntersectionObserver` in `js/main.js`. No GSAP required.
Elements with class `reveal` animate in when scrolled into view.

### Count-up Stats
Elements with `data-count-up data-target="X" data-suffix="+"` will animate from 0 to X on scroll.

### Mobile Menu
Toggle via the hamburger button (`id="mobile-menu-toggle"`). Works on all pages.

### Header
Transparent on hero sections, becomes frosted white on scroll.

## 2026 Live Admin Platform Upgrade
Added live vacancies with status/dates/archive, ATS applications and private CV storage, multi-admin roles, audit log, notifications, scheduled news publishing, article SEO pages, secure image upload, job/news email alerts, search/filtering, and server-side session revocation. New public files: apply.html and article.html.
