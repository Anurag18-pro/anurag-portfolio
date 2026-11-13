# Anurag Mishra — Personal Portfolio & Dynamic CMS

A modern, minimalist, high-craft personal portfolio web application built for **Anurag Mishra** (MBA Candidate | Data Analytics, Strategy & Product Builder). Engineered with **Next.js 14+ (App Router)**, **TypeScript**, **Tailwind CSS**, and backed by **Supabase** (PostgreSQL + Auth + Storage), ready for zero-configuration deployment to **Vercel**.

---

## ✨ Features & Architecture

- **Minimalist Editorial Aesthetic:** Inspired by Linear, Vercel, and Stripe. Sleek dark mode (`#09090B`) with custom hairline borders (`#27272A`), monospace metadata tags, and an instant Light/Dark mode toggle.
- **Dynamic Content Management (CMS):** Add, edit, reorder, or delete projects, education entries, certifications, leadership milestones, and social profiles directly from the web interface without touching code.
- **Role-Based Security & Supabase Auth:**
  - **Public Visitors:** Experience an ultra-clean, fast, read-only portfolio.
  - **Admin Mode (Anurag):** Click the subtle lock icon or footer link, sign in with your email & password, and unlock live interactive `+ Add`, `Edit`, and `Delete` controls across all sections.
- **Supabase Storage Integration:** Upload project thumbnails, certificates, or resume PDFs directly from the UI to the `portfolio-assets` bucket, with automatic public URL generation (or paste direct external URLs).
- **PostgreSQL Row Level Security (RLS):** Public read access (`SELECT`) enabled for all tables; mutations (`INSERT`, `UPDATE`, `DELETE`) are strictly restricted to authenticated admin sessions.
- **Offline / Zero-Config Fallback:** If Supabase environment variables are not yet linked, the site automatically renders Anurag's complete initial seed dataset and allows previewing admin mode.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14+ (App Router) with TypeScript
- **Styling:** Tailwind CSS (Custom Color Tokens, Dark/Light Themes)
- **Icons:** Lucide React
- **Database & Auth:** Supabase (`@supabase/ssr` & `@supabase/supabase-js`)
- **Hosting & CDN:** Vercel

---

## 🗄️ Project Structure

```
├── app/
│   ├── globals.css              # Editorial styles, CSS variables, custom scrollbars
│   ├── layout.tsx               # Root layout, Inter & JetBrains Mono typography, providers
│   └── page.tsx                 # Single-page portfolio with Supabase hydration & live CRUD
├── components/
│   ├── Navbar.tsx               # Sticky header with smooth-scroll anchors & admin lock
│   ├── AdminBar.tsx             # Floating banner when Admin Mode is active
│   ├── HeroSection.tsx          # Name, headline, sharp bio, availability pill, social accounts
│   ├── ProjectsSection.tsx      # 2-column cards (CAGNEX, Python analytics), tech tags & links
│   ├── EducationSection.tsx     # Vertical timeline (MBA Lloyd Business School)
│   ├── CertificationsSection.tsx# NPTEL Python, IIM Mumbai, IIM Ahmedabad, Pondicherry Univ
│   ├── HighlightsSection.tsx    # Filterable categories: Competitions, Leadership, Events
│   ├── Footer.tsx               # Minimalist copyright, tech attribution, back-to-top
│   ├── ui/
│   │   ├── ThemeProvider.tsx    # Persistent Dark/Light theme context
│   │   ├── ThemeToggle.tsx      # Sun/Moon toggle button
│   │   └── ToastContext.tsx     # Sleek notification toasts
│   └── modals/
│       ├── AuthModal.tsx        # Supabase email/password admin sign-in & registration
│       ├── ProjectModal.tsx     # Add/edit projects with Supabase Storage asset upload
│       ├── EducationModal.tsx   # Add/edit education timeline items
│       ├── CertificationModal.tsx# Add/edit certifications and credential verification links
│       ├── HighlightModal.tsx   # Add/edit competitions, hackathons, and leadership roles
│       ├── SocialModal.tsx      # Add/edit social channels with custom platform icon selector
│       ├── ProfileModal.tsx     # Edit headline, bio, location, avatar & resume links
│       └── DeleteConfirmModal.tsx # Safe confirmation dialog for deletes
├── lib/
│   ├── initialData.ts           # Complete pre-populated seed data for Anurag Mishra
│   ├── utils.ts                 # Tailwind merge & utility functions
│   └── supabase/
│       ├── client.ts            # Browser Supabase client with fallback detection
│       ├── server.ts            # Server-side Supabase client for SSR/cookies
│       └── storage.ts           # Storage bucket upload helper (portfolio-assets)
├── supabase/
│   ├── schema.sql               # PostgreSQL tables, RLS policies & storage bucket setup
│   └── seed.sql                 # Anurag Mishra's initial verified database seed
├── types/
│   └── portfolio.ts             # TypeScript definitions
├── .env.example                 # Environment variables template
└── README.md
```

---

## 🚀 Step-by-Step Setup Guide

### 1. Local Development

1. Clone or open the repository:
   ```bash
   cd "anurag portfolio site"
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 2. Supabase Setup (Database, Auth & Storage)

1. Create a free account at [Supabase](https://supabase.com) and create a new project (e.g. `anurag-portfolio`).
2. Go to **Project Settings** -> **API** and copy:
   - **Project URL**
   - **anon / public key**
3. Create a `.env.local` file in your project root:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   ```
4. **Run the Database Schema:**
   - In your Supabase dashboard, click **SQL Editor** in the left sidebar.
   - Click **New Query**, copy the contents of `supabase/schema.sql`, and click **Run**.
   - This creates all 6 tables (`profile`, `socials`, `projects`, `education`, `certifications`, `highlights`), sets up Row Level Security (RLS), and initializes the `portfolio-assets` storage bucket.
5. **Seed the Initial Data:**
   - In the **SQL Editor**, open another query, paste the contents of `supabase/seed.sql`, and click **Run**.
   - Your database will be immediately populated with your verified profile, CAGNEX project, Lloyd Business School education, NPTEL/IIM certifications, and SRCC/Air India milestones.
6. **Create Your Admin Account:**
   - Go to **Authentication** -> **Users** in Supabase and click **Add user** -> **Create user**.
   - Enter your email (e.g. `anuragmishra.mgmt@gmail.com`) and choose a strong password.
   - Set **Auto Confirm User** to `ON` so you can log in immediately.
   - Alternatively, click the lock icon on the website navbar, switch to **Sign Up**, and create your account directly.

---

### 3. Deploying to Vercel

1. Push your repository to **GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Anurag Mishra portfolio with Supabase dynamic CMS"
   git branch -M main
   git remote add origin https://github.com/your-username/anurag-portfolio.git
   git push -u origin main
   ```
2. Go to [Vercel](https://vercel.com) and click **Add New...** -> **Project**.
3. Import your GitHub repository.
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
5. Click **Deploy**. Vercel will build and deploy the application in under 60 seconds with SSL and global edge distribution.

---

## 🔒 Security & Row Level Security (RLS)

- **Public Visitors (`anon`):** Granted read-only permissions (`SELECT`) across all portfolio data and uploaded public assets.
- **Admin (`authenticated`):** Only authenticated sessions signed in through Supabase Auth are permitted to execute `INSERT`, `UPDATE`, and `DELETE` operations.
- Direct mutations attempted without valid JWT credentials will be rejected at the PostgreSQL database level.

---

## 📝 License

Designed and engineered for **Anurag Mishra**. Released under the MIT License.
