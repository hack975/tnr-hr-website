# Live Admin Content Setup

This website now reads **vacancies** and **news/newsletter articles** from the existing Supabase project.

## What now works
- Admin > News Manager: add, edit and delete articles in `news_articles`.
- Admin > Vacancies: add, edit and delete job positions in `vacancies`.
- `newsletter.html` loads `news_articles` from Supabase.
- `careers.html` loads `vacancies` from Supabase.
- Both public pages subscribe to Supabase Realtime, so an already-open page can update automatically when Realtime is enabled.
- If the careers database query fails, the original hard-coded vacancies remain as a fallback.

## Database access required
The public website must have SELECT permission on:
- `public.news_articles`
- `public.vacancies`

The current admin page performs INSERT/UPDATE/DELETE using the Supabase publishable key. Your existing Supabase policies must therefore currently allow those operations for this front-end to work.

## Important security improvement
The login token is separate from Supabase Auth. Do **not** rely on the admin page being hidden as database security.

For production, the safer design is:
1. Keep public SELECT policies for `news_articles` and `vacancies`.
2. Block anonymous INSERT/UPDATE/DELETE on those tables.
3. Create a protected Supabase Edge Function for admin content changes.
4. Have that function validate `tnr_admin_token` before using a server-side service-role key.
5. Change `admin.html` so create/edit/delete requests go through that protected function.

Never place a Supabase service-role key inside HTML or JavaScript delivered to browsers.
