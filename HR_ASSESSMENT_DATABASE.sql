-- TNR HR Needs Assessment (already applied on the connected Supabase project)
-- Migration backup for another Supabase environment. Do not rerun on a separate unrelated project.
CREATE TABLE IF NOT EXISTS public.hr_assessments (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 business_name text NOT NULL,
 contact_name text NOT NULL,
 email text NOT NULL,
 phone text NOT NULL,
 industry text,
 province text,
 employee_headcount text,
 answers jsonb NOT NULL,
 score integer NOT NULL CHECK (score BETWEEN 0 AND 29),
 recommendation text NOT NULL CHECK (recommendation IN ('Start-up','Growing Business','Established Business')),
 requires_review boolean NOT NULL DEFAULT false,
 consultation_consent boolean NOT NULL DEFAULT false,
 marketing_opt_in boolean NOT NULL DEFAULT false,
 attribution jsonb NOT NULL DEFAULT '{}'::jsonb,
 created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.hr_assessments ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.hr_assessments FROM PUBLIC, anon, authenticated;
CREATE INDEX IF NOT EXISTS hr_assessments_created_at_idx ON public.hr_assessments(created_at DESC);
