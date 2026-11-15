"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { AdminBar } from "@/components/AdminBar";
import { HeroSection } from "@/components/HeroSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { EducationSection } from "@/components/EducationSection";
import { CertificationsSection } from "@/components/CertificationsSection";
import { HighlightsSection } from "@/components/HighlightsSection";
import { ConnectSection } from "@/components/ConnectSection";
import { Footer } from "@/components/Footer";

// Modals
import { AuthModal } from "@/components/modals/AuthModal";
import { ProjectModal } from "@/components/modals/ProjectModal";
import { EducationModal } from "@/components/modals/EducationModal";
import { CertificationModal } from "@/components/modals/CertificationModal";
import { HighlightModal } from "@/components/modals/HighlightModal";
import { SocialModal } from "@/components/modals/SocialModal";
import { ProfileModal } from "@/components/modals/ProfileModal";
import { ResumeModal } from "@/components/modals/ResumeModal";
import { DeleteConfirmModal } from "@/components/modals/DeleteConfirmModal";

// Data & Supabase
import { initialPortfolioData } from "@/lib/initialData";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/ToastContext";
import {
  Profile,
  SocialLink,
  Project,
  Education,
  Certification,
  Highlight,
  Experience,
} from "@/types/portfolio";

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [profile, setProfile] = useState<Profile>(initialPortfolioData.profile);
  const [socials, setSocials] = useState<SocialLink[]>(initialPortfolioData.socials);
  const [experiences, setExperiences] = useState<Experience[]>(
    initialPortfolioData.experiences || []
  );
  const [projects, setProjects] = useState<Project[]>(initialPortfolioData.projects);
  const [education, setEducation] = useState<Education[]>(initialPortfolioData.education);
  const [certifications, setCertifications] = useState<Certification[]>(
    initialPortfolioData.certifications
  );
  const [highlights, setHighlights] = useState<Highlight[]>(
    initialPortfolioData.highlights
  );

  // Modals visibility states
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [educationModalOpen, setEducationModalOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);

  const [certModalOpen, setCertModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);

  const [highlightModalOpen, setHighlightModalOpen] = useState(false);
  const [editingHighlight, setEditingHighlight] = useState<Highlight | null>(null);

  const [socialModalOpen, setSocialModalOpen] = useState(false);
  const [editingSocial, setEditingSocial] = useState<SocialLink | null>(null);

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  // Delete modal state
  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    title: string;
    itemName: string;
    onConfirm: () => Promise<void> | void;
  }>({
    isOpen: false,
    title: "",
    itemName: "",
    onConfirm: () => {},
  });

  const { success, error: toastError, info } = useToast();

  // Helper to persist offline data to localStorage when Supabase is not yet configured
  const saveLocal = (key: string, value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore localStorage errors
    }
  };

  // 1. Fetch Supabase Data (or load from localStorage when in demo mode)
  const fetchAllData = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      try {
        const localProfile = localStorage.getItem("portfolio_profile");
        if (localProfile) setProfile(JSON.parse(localProfile));

        const localSocials = localStorage.getItem("portfolio_socials");
        if (localSocials) setSocials(JSON.parse(localSocials));

        const localExp = localStorage.getItem("portfolio_experiences");
        if (localExp) setExperiences(JSON.parse(localExp));

        const localProjects = localStorage.getItem("portfolio_projects");
        if (localProjects) setProjects(JSON.parse(localProjects));

        const localEdu = localStorage.getItem("portfolio_education");
        if (localEdu) setEducation(JSON.parse(localEdu));

        const localCerts = localStorage.getItem("portfolio_certifications");
        if (localCerts) setCertifications(JSON.parse(localCerts));

        const localHl = localStorage.getItem("portfolio_highlights");
        if (localHl) setHighlights(JSON.parse(localHl));

        const demoAdmin = localStorage.getItem("portfolio_demo_admin");
        if (demoAdmin === "true") setIsAdmin(true);
      } catch {
        // Ignore
      }
      return;
    }

    try {
      const supabase = createClient();

      // Check session
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setIsAdmin(true);
      }

      // Fetch profile
      const { data: profileData } = await supabase
        .from("profile")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (profileData) {
        setProfile(profileData);
      }

      // Fetch socials
      const { data: socialsData } = await supabase
        .from("socials")
        .select("*")
        .order("display_order", { ascending: true });
      if (socialsData && socialsData.length > 0) {
        setSocials(socialsData);
      }

      // Fetch experiences
      const { data: experiencesData } = await supabase
        .from("experiences")
        .select("*")
        .order("display_order", { ascending: true });
      if (experiencesData && experiencesData.length > 0) {
        setExperiences(experiencesData);
      }

      // Fetch projects
      const { data: projectsData } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true });
      if (projectsData && projectsData.length > 0) {
        setProjects(projectsData);
      }

      // Fetch education
      const { data: educationData } = await supabase
        .from("education")
        .select("*")
        .order("display_order", { ascending: true });
      if (educationData && educationData.length > 0) {
        setEducation(educationData);
      }

      // Fetch certifications
      const { data: certsData } = await supabase
        .from("certifications")
        .select("*")
        .order("display_order", { ascending: true });
      if (certsData && certsData.length > 0) {
        setCertifications(certsData);
      }

      // Fetch highlights
      const { data: highlightsData } = await supabase
        .from("highlights")
        .select("*")
        .order("display_order", { ascending: true });
      if (highlightsData && highlightsData.length > 0) {
        setHighlights(highlightsData);
      }
    } catch (err) {
      console.error("Supabase fetch error:", err);
    }
  }, []);

  useEffect(() => {
    fetchAllData();

    if (isSupabaseConfigured()) {
      const supabase = createClient();
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setIsAdmin(Boolean(session));
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [fetchAllData]);

  const handleLogout = async () => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem("portfolio_demo_admin");
    }
    setIsAdmin(false);
    info("Signed Out", "Admin mode deactivated.");
  };

  // ----------------------------------------------------------------------------
  // PROJECT MUTATIONS
  // ----------------------------------------------------------------------------
  const handleSaveProject = async (data: Partial<Project>) => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      if (data.id) {
        const { error } = await supabase
          .from("projects")
          .update(data)
          .eq("id", data.id);
        if (error) throw error;
      } else {
        const { data: inserted, error } = await supabase
          .from("projects")
          .insert([data])
          .select()
          .single();
        if (error) throw error;
        if (inserted) data.id = inserted.id;
      }
    }

    if (data.id && projects.some((p) => p.id === data.id)) {
      setProjects((prev) => {
        const updated = prev.map((p) =>
          p.id === data.id ? ({ ...p, ...data } as Project) : p
        );
        saveLocal("portfolio_projects", updated);
        return updated;
      });
      success("Project Updated", `Saved changes to "${data.title}".`);
    } else {
      const newProj = {
        id: data.id || `proj-${Date.now()}`,
        title: data.title || "Untitled Project",
        description: data.description || "",
        tags: data.tags || [],
        live_url: data.live_url,
        github_url: data.github_url,
        image_url: data.image_url,
        featured: data.featured || false,
        date: data.date || new Date().getFullYear().toString(),
        display_order: data.display_order || projects.length + 1,
      } as Project;

      setProjects((prev) => {
        const updated = [...prev, newProj];
        saveLocal("portfolio_projects", updated);
        return updated;
      });
      success("Project Added", `Published "${newProj.title}" successfully.`);
    }
  };

  const handleDeleteProject = (project: Project) => {
    setDeleteModalState({
      isOpen: true,
      title: "Delete Project",
      itemName: project.title,
      onConfirm: async () => {
        if (isSupabaseConfigured()) {
          const supabase = createClient();
          const { error } = await supabase
            .from("projects")
            .delete()
            .eq("id", project.id);
          if (error) {
            toastError("Delete Error", error.message);
            return;
          }
        }
        setProjects((prev) => {
          const updated = prev.filter((p) => p.id !== project.id);
          saveLocal("portfolio_projects", updated);
          return updated;
        });
        success("Project Removed", `Deleted "${project.title}".`);
      },
    });
  };

  // ----------------------------------------------------------------------------
  // EDUCATION MUTATIONS
  // ----------------------------------------------------------------------------
  const handleSaveEducation = async (data: Partial<Education>) => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      if (data.id) {
        const { error } = await supabase
          .from("education")
          .update(data)
          .eq("id", data.id);
        if (error) throw error;
      } else {
        const { data: inserted, error } = await supabase
          .from("education")
          .insert([data])
          .select()
          .single();
        if (error) throw error;
        if (inserted) data.id = inserted.id;
      }
    }

    if (data.id && education.some((e) => e.id === data.id)) {
      setEducation((prev) => {
        const updated = prev.map((e) =>
          e.id === data.id ? ({ ...e, ...data } as Education) : e
        );
        saveLocal("portfolio_education", updated);
        return updated;
      });
      success("Education Updated", `Updated ${data.degree}.`);
    } else {
      const newEdu = {
        id: data.id || `edu-${Date.now()}`,
        institution: data.institution || "",
        degree: data.degree || "",
        duration: data.duration || "",
        location: data.location || "",
        highlights: data.highlights || [],
        display_order: data.display_order || education.length + 1,
      } as Education;

      setEducation((prev) => {
        const updated = [...prev, newEdu];
        saveLocal("portfolio_education", updated);
        return updated;
      });
      success("Education Added", `Added ${newEdu.institution}.`);
    }
  };

  const handleDeleteEducation = (item: Education) => {
    setDeleteModalState({
      isOpen: true,
      title: "Delete Education Entry",
      itemName: `${item.degree} — ${item.institution}`,
      onConfirm: async () => {
        if (isSupabaseConfigured()) {
          const supabase = createClient();
          const { error } = await supabase
            .from("education")
            .delete()
            .eq("id", item.id);
          if (error) {
            toastError("Delete Error", error.message);
            return;
          }
        }
        setEducation((prev) => {
          const updated = prev.filter((e) => e.id !== item.id);
          saveLocal("portfolio_education", updated);
          return updated;
        });
        success("Entry Deleted", "Removed education record.");
      },
    });
  };

  // ----------------------------------------------------------------------------
  // CERTIFICATION MUTATIONS
  // ----------------------------------------------------------------------------
  const handleSaveCertification = async (data: Partial<Certification>) => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      if (data.id) {
        const { error } = await supabase
          .from("certifications")
          .update(data)
          .eq("id", data.id);
        if (error) throw error;
      } else {
        const { data: inserted, error } = await supabase
          .from("certifications")
          .insert([data])
          .select()
          .single();
        if (error) throw error;
        if (inserted) data.id = inserted.id;
      }
    }

    if (data.id && certifications.some((c) => c.id === data.id)) {
      setCertifications((prev) => {
        const updated = prev.map((c) =>
          c.id === data.id ? ({ ...c, ...data } as Certification) : c
        );
        saveLocal("portfolio_certifications", updated);
        return updated;
      });
      success("Certification Updated", `Saved changes to "${data.title}".`);
    } else {
      const newCert = {
        id: data.id || `cert-${Date.now()}`,
        title: data.title || "",
        issuer: data.issuer || "",
        issue_date: data.issue_date || "",
        credential_url: data.credential_url,
        certificate_id: data.certificate_id,
        display_order: data.display_order || certifications.length + 1,
      } as Certification;

      setCertifications((prev) => {
        const updated = [...prev, newCert];
        saveLocal("portfolio_certifications", updated);
        return updated;
      });
      success("Certification Added", `Added "${newCert.title}".`);
    }
  };

  const handleDeleteCertification = (item: Certification) => {
    setDeleteModalState({
      isOpen: true,
      title: "Delete Certification",
      itemName: item.title,
      onConfirm: async () => {
        if (isSupabaseConfigured()) {
          const supabase = createClient();
          const { error } = await supabase
            .from("certifications")
            .delete()
            .eq("id", item.id);
          if (error) {
            toastError("Delete Error", error.message);
            return;
          }
        }
        setCertifications((prev) => {
          const updated = prev.filter((c) => c.id !== item.id);
          saveLocal("portfolio_certifications", updated);
          return updated;
        });
        success("Certificate Removed", `Deleted "${item.title}".`);
      },
    });
  };

  // ----------------------------------------------------------------------------
  // HIGHLIGHT MUTATIONS
  // ----------------------------------------------------------------------------
  const handleSaveHighlight = async (data: Partial<Highlight>) => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      if (data.id) {
        const { error } = await supabase
          .from("highlights")
          .update(data)
          .eq("id", data.id);
        if (error) throw error;
      } else {
        const { data: inserted, error } = await supabase
          .from("highlights")
          .insert([data])
          .select()
          .single();
        if (error) throw error;
        if (inserted) data.id = inserted.id;
      }
    }

    if (data.id && highlights.some((h) => h.id === data.id)) {
      setHighlights((prev) => {
        const updated = prev.map((h) =>
          h.id === data.id ? ({ ...h, ...data } as Highlight) : h
        );
        saveLocal("portfolio_highlights", updated);
        return updated;
      });
      success("Milestone Updated", `Updated "${data.title}".`);
    } else {
      const newHl = {
        id: data.id || `hl-${Date.now()}`,
        title: data.title || "",
        organization: data.organization || "",
        category: data.category || "Competitions",
        year: data.year || "",
        description: data.description,
        badge: data.badge,
        url: data.url,
        display_order: data.display_order || highlights.length + 1,
      } as Highlight;

      setHighlights((prev) => {
        const updated = [...prev, newHl];
        saveLocal("portfolio_highlights", updated);
        return updated;
      });
      success("Milestone Added", `Added "${newHl.title}".`);
    }
  };

  const handleDeleteHighlight = (item: Highlight) => {
    setDeleteModalState({
      isOpen: true,
      title: "Delete Milestone",
      itemName: item.title,
      onConfirm: async () => {
        if (isSupabaseConfigured()) {
          const supabase = createClient();
          const { error } = await supabase
            .from("highlights")
            .delete()
            .eq("id", item.id);
          if (error) {
            toastError("Delete Error", error.message);
            return;
          }
        }
        setHighlights((prev) => {
          const updated = prev.filter((h) => h.id !== item.id);
          saveLocal("portfolio_highlights", updated);
          return updated;
        });
        success("Milestone Removed", `Deleted "${item.title}".`);
      },
    });
  };

  // ----------------------------------------------------------------------------
  // SOCIAL MUTATIONS
  // ----------------------------------------------------------------------------
  const handleSaveSocial = async (data: Partial<SocialLink>) => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      if (data.id) {
        const { error } = await supabase
          .from("socials")
          .update(data)
          .eq("id", data.id);
        if (error) throw error;
      } else {
        const { data: inserted, error } = await supabase
          .from("socials")
          .insert([data])
          .select()
          .single();
        if (error) throw error;
        if (inserted) data.id = inserted.id;
      }
    }

    if (data.id && socials.some((s) => s.id === data.id)) {
      setSocials((prev) => {
        const updated = prev.map((s) =>
          s.id === data.id ? ({ ...s, ...data } as SocialLink) : s
        );
        saveLocal("portfolio_socials", updated);
        return updated;
      });
      success("Social Link Updated", `Saved ${data.platform}.`);
    } else {
      const newSocial = {
        id: data.id || `social-${Date.now()}`,
        platform: data.platform || "",
        label: data.label || data.platform || "",
        url: data.url || "",
        icon: data.icon || "globe",
        display_order: data.display_order || socials.length + 1,
        is_active: true,
      } as SocialLink;

      setSocials((prev) => {
        const updated = [...prev, newSocial];
        saveLocal("portfolio_socials", updated);
        return updated;
      });
      success("Social Link Added", `Added ${newSocial.platform}.`);
    }
  };

  const handleDeleteSocial = (item: SocialLink) => {
    setDeleteModalState({
      isOpen: true,
      title: "Delete Social Link",
      itemName: item.label || item.platform,
      onConfirm: async () => {
        if (isSupabaseConfigured()) {
          const supabase = createClient();
          const { error } = await supabase
            .from("socials")
            .delete()
            .eq("id", item.id);
          if (error) {
            toastError("Delete Error", error.message);
            return;
          }
        }
        setSocials((prev) => {
          const updated = prev.filter((s) => s.id !== item.id);
          saveLocal("portfolio_socials", updated);
          return updated;
        });
        success("Link Removed", `Deleted social connection.`);
      },
    });
  };

  // ----------------------------------------------------------------------------
  // PROFILE & RESUME MUTATION
  // ----------------------------------------------------------------------------
  const handleSaveProfile = async (data: Partial<Profile>) => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      if (profile.id) {
        const { error } = await supabase
          .from("profile")
          .update(data)
          .eq("id", profile.id);
        if (error) throw error;
      } else {
        const { data: inserted, error } = await supabase
          .from("profile")
          .insert([data])
          .select()
          .single();
        if (error) throw error;
        if (inserted) data.id = inserted.id;
      }
    }

    setProfile((prev) => {
      const updated = { ...prev, ...data } as Profile;
      saveLocal("portfolio_profile", updated);
      return updated;
    });
    success("Profile Updated", "Hero bio and contact details saved.");
  };

  const handleSaveResume = async (url: string) => {
    await handleSaveProfile({ resume_url: url });
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      {/* Sticky Minimal Navbar */}
      <Navbar
        isAdmin={isAdmin}
        resumeUrl={profile.resume_url}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenProfile={() => setProfileModalOpen(true)}
        onOpenResumeModal={() => setResumeModalOpen(true)}
      />

      {/* Floating Admin Banner */}
      <AdminBar
        isAdmin={isAdmin}
        onOpenProfile={() => setProfileModalOpen(true)}
        onOpenResumeModal={() => setResumeModalOpen(true)}
        onAddProject={() => {
          setEditingProject(null);
          setProjectModalOpen(true);
        }}
        onAddEducation={() => {
          setEditingEducation(null);
          setEducationModalOpen(true);
        }}
        onAddCertification={() => {
          setEditingCert(null);
          setCertModalOpen(true);
        }}
        onAddHighlight={() => {
          setEditingHighlight(null);
          setHighlightModalOpen(true);
        }}
        onAddSocial={() => {
          setEditingSocial(null);
          setSocialModalOpen(true);
        }}
        onLogout={handleLogout}
      />

      {/* Main Single-Page Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-2 pb-16">
        {/* 1. Hero Section */}
        <HeroSection
          profile={profile}
          socials={socials}
          isAdmin={isAdmin}
          onEditProfile={() => setProfileModalOpen(true)}
          onAddSocial={() => {
            setEditingSocial(null);
            setSocialModalOpen(true);
          }}
          onEditSocial={(item) => {
            setEditingSocial(item);
            setSocialModalOpen(true);
          }}
          onDeleteSocial={handleDeleteSocial}
          onOpenResumeModal={() => setResumeModalOpen(true)}
        />

        {/* 2. Professional Experience */}
        <ExperienceSection
          experiences={experiences}
          isAdmin={isAdmin}
        />

        {/* 3. Projects Section */}
        <ProjectsSection
          projects={projects}
          isAdmin={isAdmin}
          onAddProject={() => {
            setEditingProject(null);
            setProjectModalOpen(true);
          }}
          onEditProject={(item) => {
            setEditingProject(item);
            setProjectModalOpen(true);
          }}
          onDeleteProject={handleDeleteProject}
        />

        {/* 4. Skills & Competencies */}
        <SkillsSection />

        {/* 5. Education Section */}
        <EducationSection
          education={education}
          isAdmin={isAdmin}
          onAddEducation={() => {
            setEditingEducation(null);
            setEducationModalOpen(true);
          }}
          onEditEducation={(item) => {
            setEditingEducation(item);
            setEducationModalOpen(true);
          }}
          onDeleteEducation={handleDeleteEducation}
        />

        {/* 4. Certifications & Programs Section */}
        <CertificationsSection
          certifications={certifications}
          isAdmin={isAdmin}
          onAddCertification={() => {
            setEditingCert(null);
            setCertModalOpen(true);
          }}
          onEditCertification={(item) => {
            setEditingCert(item);
            setCertModalOpen(true);
          }}
          onDeleteCertification={handleDeleteCertification}
        />

        {/* 5. Competitions, Leadership & Milestones */}
        <HighlightsSection
          highlights={highlights}
          isAdmin={isAdmin}
          onAddHighlight={() => {
            setEditingHighlight(null);
            setHighlightModalOpen(true);
          }}
          onEditHighlight={(item) => {
            setEditingHighlight(item);
            setHighlightModalOpen(true);
          }}
          onDeleteHighlight={handleDeleteHighlight}
        />

        {/* 6. Connect Section */}
        <ConnectSection
          profile={profile}
          socials={socials}
          onOpenResumeModal={() => setResumeModalOpen(true)}
          isAdmin={isAdmin}
        />
      </main>

      {/* Footer */}
      <Footer isAdmin={isAdmin} onOpenAuth={() => setAuthModalOpen(true)} />

      {/* ========================================================================= */}
      {/* MODALS */}
      {/* ========================================================================= */}

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => {
          setIsAdmin(true);
          try {
            localStorage.setItem("portfolio_demo_admin", "true");
          } catch {
            // Ignore
          }
        }}
      />

      {/* Project Modal */}
      <ProjectModal
        isOpen={projectModalOpen}
        project={editingProject}
        onClose={() => {
          setProjectModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSaveProject}
      />

      {/* Education Modal */}
      <EducationModal
        isOpen={educationModalOpen}
        education={editingEducation}
        onClose={() => {
          setEducationModalOpen(false);
          setEditingEducation(null);
        }}
        onSave={handleSaveEducation}
      />

      {/* Certification Modal */}
      <CertificationModal
        isOpen={certModalOpen}
        certification={editingCert}
        onClose={() => {
          setCertModalOpen(false);
          setEditingCert(null);
        }}
        onSave={handleSaveCertification}
      />

      {/* Highlight Modal */}
      <HighlightModal
        isOpen={highlightModalOpen}
        highlight={editingHighlight}
        onClose={() => {
          setHighlightModalOpen(false);
          setEditingHighlight(null);
        }}
        onSave={handleSaveHighlight}
      />

      {/* Social Modal */}
      <SocialModal
        isOpen={socialModalOpen}
        social={editingSocial}
        onClose={() => {
          setSocialModalOpen(false);
          setEditingSocial(null);
        }}
        onSave={handleSaveSocial}
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={profileModalOpen}
        profile={profile}
        onClose={() => setProfileModalOpen(false)}
        onSave={handleSaveProfile}
      />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        currentResumeUrl={profile.resume_url}
        onClose={() => setResumeModalOpen(false)}
        onSave={handleSaveResume}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalState.isOpen}
        title={deleteModalState.title}
        itemName={deleteModalState.itemName}
        onClose={() =>
          setDeleteModalState((prev) => ({ ...prev, isOpen: false }))
        }
        onConfirm={deleteModalState.onConfirm}
      />
    </div>
  );
}
