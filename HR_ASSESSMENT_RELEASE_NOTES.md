# TNR HR – 10 November 2026 changes

## Completed in the source ZIP
- The 12-question wizard is embedded directly on `contact.html#hr-assessment`; previous `hr-assessment.html` is a redirect for old links.
- Homepage CTA leads to Contact page assessment.
- One mandatory answer per question, previous/next, progress, results, briefing-specific package decisions. Q1–2 used for profiling; only Q3–12 contribute to score.
- Results are visible without any contact details. Optional consultation form includes business details, separate required consultation acknowledgement and optional unchecked marketing consent.
- Submission sends 12 answer IDs and details to the backend, which independently recalculates scores and recommendations.
- Admin dashboard gains an HR Assessments tab for super_admin and hr_manager roles, including answer details and `Download PDF` (PDF generated in browser for authorised staff).
- Submission triggers an in-dashboard admin notification; submission does **not** send an email without separate mail configuration.
- Info Hub label kept from previous changes; old content remains hidden until replacements are provided.
- Public Careers vacancies remain hidden until TNR approves listings; legacy records remain in database, rather than being deleted.
- Removed the obsolete WhatsApp floating-link number throughout site; office number placeholder remains until an authorised replacement is provided.

## Database and backend
- Additive `public.hr_assessments` table installed in connected project `eugqokfxwucusniamxvm`, RLS enabled, no public read policies.
- New deployed Edge Function `hr-assessments` accepts `submit` and `list` requests.
- `list` validates existing admin session token and checks role (super_admin or hr_manager).
- Basic honeypot and 2-minute duplicate-email/business check. For high traffic, add bot protection and IP-based rate limits.
- Data currently stored as structured rows; PDF is **created on demand in admin**, not pre-stored as a PDF file in Storage.

## Before publishing
1. Upload ZIP contents to website hosting / update GitHub Pages. This archive does not automatically change the live pages.
2. Replace office number placeholder with the new TNR HR office number; not yet supplied.
3. Have TNR approve public package descriptions and the assessment's qualification rules before production release.
4. Test genuine Contact form submission, admin review and PDF download in a browser once new pages are hosted.
5. Agree privacy retention period, notification recipients, and data processing terms with TNR.
6. The PDF download loads jsPDF from a CDN; an internet connection is required for it.

**Important:** Do not use the existing public `contact.html` message form as a substitute for assessment submission; they are separate flows.
