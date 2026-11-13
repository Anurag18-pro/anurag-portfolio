-- ==============================================================================
-- ANURAG MISHRA PORTFOLIO - SEED DATA
-- Pre-populated with Anurag Mishra's verified background & achievements
-- ==============================================================================

-- Clear existing data (optional, useful for clean re-seeding)
TRUNCATE TABLE public.profile, public.socials, public.projects, public.education, public.certifications, public.highlights RESTART IDENTITY CASCADE;

-- ------------------------------------------------------------------------------
-- 1. PROFILE
-- ------------------------------------------------------------------------------
INSERT INTO public.profile (
    id,
    name,
    headline,
    bio,
    avatar_url,
    location,
    email,
    available_for_work,
    resume_url
) VALUES (
    '00000000-0000-0000-0000-000000000001',
    'Anurag Mishra',
    'MBA Candidate | Data Analytics, Strategy & Product Builder',
    'MBA candidate focused on business strategy, data analytics with Python, entrepreneurship, and building scalable full-stack digital products. Passionate about leveraging data-driven insights and modern web architecture to solve complex problems.',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    'Greater Noida, India',
    'anuragmishra.mgmt@gmail.com',
    true,
    '#'
);

-- ------------------------------------------------------------------------------
-- 2. SOCIAL ACCOUNTS
-- ------------------------------------------------------------------------------
INSERT INTO public.socials (platform, label, url, icon, display_order, is_active) VALUES
('LinkedIn', 'LinkedIn', 'https://linkedin.com/in/anuragmishra', 'linkedin', 1, true),
('GitHub', 'GitHub', 'https://github.com', 'github', 2, true),
('X (Twitter)', 'X', 'https://x.com', 'twitter', 3, true),
('Email', 'Email', 'mailto:anuragmishra.mgmt@gmail.com', 'mail', 4, true);

-- ------------------------------------------------------------------------------
-- 3. PROJECTS
-- ------------------------------------------------------------------------------
INSERT INTO public.projects (
    title,
    description,
    tags,
    live_url,
    github_url,
    image_url,
    featured,
    date,
    display_order
) VALUES
(
    'CAGNEX',
    'A high-performance, full-stack software application engineered and deployed on Vercel backed by Supabase. Built to automate and streamline data workflows, featuring real-time state synchronization, secure role-based access control, and an ultra-responsive minimalist user interface.',
    ARRAY['Next.js 14', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
    'https://cagnex.vercel.app',
    'https://github.com',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    true,
    '2025',
    1
),
(
    'Python Financial & Market Analytics Suite',
    'End-to-end quantitative analytics engine analyzing macroeconomic indicators, asset volatility, and portfolio risk distributions using Pandas, NumPy, and statistical modeling.',
    ARRAY['Python', 'Pandas', 'NumPy', 'Data Analytics', 'Matplotlib'],
    '#',
    'https://github.com',
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80',
    false,
    '2026',
    2
);

-- ------------------------------------------------------------------------------
-- 4. EDUCATION
-- ------------------------------------------------------------------------------
INSERT INTO public.education (
    institution,
    degree,
    duration,
    location,
    highlights,
    display_order
) VALUES
(
    'Lloyd Business School',
    'Master of Business Administration (MBA)',
    '2025 – 2027',
    'Greater Noida, India',
    ARRAY[
        'Specialization in Business Analytics, Strategic Management & Entrepreneurship',
        'Active participant in corporate case studies, financial modeling, and strategy simulations',
        'Core member organizing cross-campus analytical competitions & leadership summits'
    ],
    1
);

-- ------------------------------------------------------------------------------
-- 5. CERTIFICATIONS & PROGRAMS
-- ------------------------------------------------------------------------------
INSERT INTO public.certifications (
    title,
    issuer,
    issue_date,
    credential_url,
    certificate_id,
    display_order
) VALUES
(
    'Data Analytics with Python (NOC26-CS86)',
    'NPTEL & SWAYAM',
    '2026',
    'https://swayam.gov.in',
    'NOC26-CS86',
    1
),
(
    'Certificate Program in Entrepreneurship and Start Up Mastery',
    'IIM Mumbai & Masai',
    '2025',
    'https://iimmumbai.ac.in',
    'IIMM-MASAI-ESM',
    2
),
(
    'Online Course Certification',
    'IIM Ahmedabad',
    '2025',
    'https://www.iima.ac.in',
    'IIMA-EXEC-2025',
    3
),
(
    'Solar Entrepreneurship ESDP (9-Day Intensive Programme)',
    'Pondicherry University, Karaikal Campus',
    '2026',
    'https://pondiuni.edu.in',
    'PU-ESDP-SOLAR-26',
    4
);

-- ------------------------------------------------------------------------------
-- 6. COMPETITIONS, LEADERSHIP & MILESTONES
-- ------------------------------------------------------------------------------
INSERT INTO public.highlights (
    title,
    organization,
    category,
    year,
    description,
    badge,
    url,
    display_order
) VALUES
(
    'Shri Ram Policy Quest',
    'Team Politia, Shri Ram College of Commerce (SRCC)',
    'Competitions',
    '2026',
    'Analyzed public policy frameworks and formulated scalable socioeconomic strategies under national-level jury scrutiny.',
    'National Competitor',
    'https://srcc.edu',
    1
),
(
    'Risk Se Ishq MockStock',
    'Kirori Mal College (University of Delhi)',
    'Competitions',
    '2026',
    'Simulated dynamic high-stakes trading floor scenarios, market volatility hedges, and tactical capital allocation.',
    'Trader / Analyst',
    'https://kmc.du.ac.in',
    2
),
(
    'Case-O-Mania',
    'Unstop',
    'Competitions',
    '2025',
    'Led multidisciplinary team in crafting end-to-end go-to-market strategy, operational redesign, and financial feasibility study.',
    'Team Leader',
    'https://unstop.com',
    3
),
(
    'Innovate-a-thon Hackathon',
    'E-Cell, IIT (ISM) Dhanbad',
    'Competitions',
    '2025',
    'Engineered tech-driven entrepreneurial prototype tackling supply chain transparency with real-time tracking.',
    'Innovator',
    'https://iitism.ac.in',
    4
),
(
    'Campus Ambassador',
    'Air India Group (via Internshala)',
    'Leadership',
    '2025',
    'Selected to drive campus engagement, brand awareness, and aviation internship programs across university cohorts.',
    'Campus Ambassador',
    'https://internshala.com',
    5
),
(
    'UP Startup Ecosystem Event',
    'Lok Bhavan, Lucknow',
    'Events',
    '2026',
    'Engaged with state policymakers, prominent venture capitalists, and high-growth founders on fostering regional tech incubators.',
    'Delegate',
    '#',
    6
),
(
    'UP International Trade Show',
    'India Expo Centre, Greater Noida',
    'Events',
    '2025',
    'Represented academic delegation exploring cross-border supply chains, MSME industrial automation, and export logistics.',
    'Delegate',
    '#',
    7
);
