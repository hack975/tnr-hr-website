# TNR HR — Assessment deployment and security checklist

## Configured in Supabase (already applied)
- `public.hr_assessments` has Row Level Security and no public read policies.
- `public.hr_assessment_rate_limits` stores salted hashes of requester IP addresses and has no public read policies.
- The `hr-assessments` Edge Function is deployed. It validates responses and scores server-side; it checks valid admin session/roles for the list and resend operations.
- The endpoint allows up to 6 requests per IP in a rolling hour (plus duplicate email/business-name suppression for 5 minutes). Client honeypot remains in place.
- Admin dashboard displays email status and a `Retry email` button for unsent notices.

## Email setup required for delivery
The Edge Function uses Resend, which is also used by the existing website's email feature. Confirm these Supabase Edge Function secrets are set:
- `RESEND_API_KEY` (secret API key, do not expose in GitHub)
- `RESEND_FROM_DOMAIN` (verified sending domain; sender becomes noreply@DOMAIN)
- Optional `TNR_HR_ASSESSMENT_NOTIFY_EMAIL` (defaults to pearl@tnrconsulting.co.za — confirm it is the intended inbox)

The email includes business name, recommended package, score and a link to admin login (not a PDF attachment). Full contact details and responses remain behind admin authentication. `email_status` tracks `sent` (accepted by Resend), `failed`, or `not_configured`. Provider acceptance is not proof of inbox delivery. The administrator can retry when unsent.

## CAPTCHA hardening (recommended before launch)
1. Create a Cloudflare Turnstile widget restricted to tnrconsulting.co.za.
2. Put the public **site key only** into `js/hr-assessment-config.js`.
3. Add `TURNSTILE_SECRET_KEY` to Supabase Edge Function secrets (never commit it to GitHub).
4. Once both keys are present, the Contact page renders Turnstile before optional consultation submission. The backend verifies the token with Cloudflare.

If the server-side secret is added but the client site key is not, submissions fail securely. Until both are added, the endpoint still has honeypot, rate-limit and duplicate controls but no CAPTCHA challenge.

## Verification before deployment
- Upload entire site repository update, then open /contact.html#hr-assessment and complete all questions.
- Confirm all package outcomes including Q11=D -> Established, Q3=D Q11=B/C -> Growing, Q11=A Q12=A score<=12 -> Start-up.
- Use a real contact email with consent to submit and check the new record in Admin > HR Assessments.
- Download and open PDF report. Confirm all 12 questions and business details.
- Check email status in admin; confirm message is received by the business email; check Resend delivery logs.
- Test spam duplicate submission, empty honeypot, and Turnstile challenge when configured.
- Confirm privacy and consent terms, retention schedule and access permissions with TNR HR.

Note: no live client submission or email delivery confirmation was performed as part of preparing this ZIP. Deployment remains a separate step.
