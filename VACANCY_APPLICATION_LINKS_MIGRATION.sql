-- TNR HR vacancy application link support
-- Already applied to the live Supabase project on 2026-09-11.

alter table public.vacancies
  add column if not exists application_method text not null default 'internal',
  add column if not exists application_url text;

alter table public.vacancies
  drop constraint if exists vacancies_application_method_check;

alter table public.vacancies
  add constraint vacancies_application_method_check
  check (application_method in ('internal','external','both'));

alter table public.vacancies
  drop constraint if exists vacancies_application_url_check;

alter table public.vacancies
  add constraint vacancies_application_url_check
  check (application_url is null or application_url ~* '^https?://');
