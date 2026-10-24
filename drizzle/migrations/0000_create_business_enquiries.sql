CREATE TABLE public.business_enquiries (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 submission_id uuid NOT NULL UNIQUE,
 name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
 email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
 phone text NOT NULL DEFAULT '' CHECK (char_length(phone) <= 30),
 company text NOT NULL DEFAULT '' CHECK (char_length(company) <= 200),
 service text NOT NULL CHECK (service IN ('brand-identity','wedding-design','posters-banners','social-creatives','motion-design')),
 budget text NOT NULL DEFAULT '' CHECK (char_length(budget) <= 100),
 message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 3000),
 destination text NOT NULL DEFAULT 'zenmarkoffice@gmail.com',
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.business_enquiries TO anon;
GRANT ALL ON public.business_enquiries TO service_role;
ALTER TABLE public.business_enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public may submit enquiries only" ON public.business_enquiries FOR INSERT TO anon WITH CHECK (destination = 'zenmarkoffice@gmail.com');