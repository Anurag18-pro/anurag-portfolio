-- ==============================================================================
-- ANURAG MISHRA PORTFOLIO - DATABASE SCHEMA
-- Supabase PostgreSQL Schema with Row Level Security (RLS) & Storage
-- ==============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. PROFILE TABLE (Personal info, headline, bio, contact)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profile (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    headline TEXT NOT NULL,
    bio TEXT NOT NULL,
    avatar_url TEXT,
    location TEXT DEFAULT 'Greater Noida, India',
    email TEXT,
    available_for_work BOOLEAN DEFAULT true,
    resume_url TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 2. SOCIAL LINKS TABLE (LinkedIn, GitHub, X/Twitter, Email, etc.)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.socials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform TEXT NOT NULL,
    label TEXT NOT NULL,
    url TEXT NOT NULL,
    icon TEXT NOT NULL DEFAULT 'globe',
    display_order INTEGER DEFAULT 0 NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 3. PROJECTS TABLE (CAGNEX & full-stack/analytics projects)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
    live_url TEXT,
    github_url TEXT,
    image_url TEXT,
    featured BOOLEAN DEFAULT false NOT NULL,
    date TEXT NOT NULL,
    display_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 4. EDUCATION TABLE (MBA Lloyd Business School, etc.)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution TEXT NOT NULL,
    degree TEXT NOT NULL,
    duration TEXT NOT NULL,
    location TEXT,
    highlights TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
    display_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 5. CERTIFICATIONS TABLE (NPTEL, IIM Mumbai, IIM Ahmedabad, Pondicherry Univ)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date TEXT NOT NULL,
    credential_url TEXT,
    certificate_id TEXT,
    display_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 6. HIGHLIGHTS & COMPETITIONS TABLE (Competitions, Leadership, Events)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.highlights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    organization TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Competitions', -- 'Competitions' | 'Leadership' | 'Events'
    year TEXT NOT NULL,
    description TEXT,
    badge TEXT,
    url TEXT,
    display_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.socials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.highlights ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if rerun
DROP POLICY IF EXISTS "Allow public read access on profile" ON public.profile;
DROP POLICY IF EXISTS "Allow authenticated admin full access on profile" ON public.profile;

DROP POLICY IF EXISTS "Allow public read access on socials" ON public.socials;
DROP POLICY IF EXISTS "Allow authenticated admin insert on socials" ON public.socials;
DROP POLICY IF EXISTS "Allow authenticated admin update on socials" ON public.socials;
DROP POLICY IF EXISTS "Allow authenticated admin delete on socials" ON public.socials;

DROP POLICY IF EXISTS "Allow public read access on projects" ON public.projects;
DROP POLICY IF EXISTS "Allow authenticated admin insert on projects" ON public.projects;
DROP POLICY IF EXISTS "Allow authenticated admin update on projects" ON public.projects;
DROP POLICY IF EXISTS "Allow authenticated admin delete on projects" ON public.projects;

DROP POLICY IF EXISTS "Allow public read access on education" ON public.education;
DROP POLICY IF EXISTS "Allow authenticated admin insert on education" ON public.education;
DROP POLICY IF EXISTS "Allow authenticated admin update on education" ON public.education;
DROP POLICY IF EXISTS "Allow authenticated admin delete on education" ON public.education;

DROP POLICY IF EXISTS "Allow public read access on certifications" ON public.certifications;
DROP POLICY IF EXISTS "Allow authenticated admin insert on certifications" ON public.certifications;
DROP POLICY IF EXISTS "Allow authenticated admin update on certifications" ON public.certifications;
DROP POLICY IF EXISTS "Allow authenticated admin delete on certifications" ON public.certifications;

DROP POLICY IF EXISTS "Allow public read access on highlights" ON public.highlights;
DROP POLICY IF EXISTS "Allow authenticated admin insert on highlights" ON public.highlights;
DROP POLICY IF EXISTS "Allow authenticated admin update on highlights" ON public.highlights;
DROP POLICY IF EXISTS "Allow authenticated admin delete on highlights" ON public.highlights;

-- Public read policies (anon & authenticated)
CREATE POLICY "Allow public read access on profile" ON public.profile FOR SELECT USING (true);
CREATE POLICY "Allow public read access on socials" ON public.socials FOR SELECT USING (true);
CREATE POLICY "Allow public read access on projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access on education" ON public.education FOR SELECT USING (true);
CREATE POLICY "Allow public read access on certifications" ON public.certifications FOR SELECT USING (true);
CREATE POLICY "Allow public read access on highlights" ON public.highlights FOR SELECT USING (true);

-- Authenticated write policies (Only Admin can Insert, Update, Delete)
CREATE POLICY "Allow authenticated admin full access on profile" 
ON public.profile FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated admin insert on socials" 
ON public.socials FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated admin update on socials" 
ON public.socials FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated admin delete on socials" 
ON public.socials FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated admin insert on projects" 
ON public.projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated admin update on projects" 
ON public.projects FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated admin delete on projects" 
ON public.projects FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated admin insert on education" 
ON public.education FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated admin update on education" 
ON public.education FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated admin delete on education" 
ON public.education FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated admin insert on certifications" 
ON public.certifications FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated admin update on certifications" 
ON public.certifications FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated admin delete on certifications" 
ON public.certifications FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated admin insert on highlights" 
ON public.highlights FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated admin update on highlights" 
ON public.highlights FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated admin delete on highlights" 
ON public.highlights FOR DELETE TO authenticated USING (true);

-- ==============================================================================
-- STORAGE BUCKET CONFIGURATION (portfolio-assets)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public can view portfolio assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload portfolio assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update portfolio assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete portfolio assets" ON storage.objects;

CREATE POLICY "Public can view portfolio assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-assets');

CREATE POLICY "Authenticated users can upload portfolio assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'portfolio-assets');

CREATE POLICY "Authenticated users can update portfolio assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'portfolio-assets');

CREATE POLICY "Authenticated users can delete portfolio assets"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'portfolio-assets');
