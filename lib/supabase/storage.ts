import { createClient, isSupabaseConfigured } from "./client";

export async function uploadPortfolioAsset(
  file: File,
  folder: string = "uploads"
): Promise<{ url: string | null; error: string | null }> {
  if (!isSupabaseConfigured()) {
    return {
      url: null,
      error: "Supabase credentials are not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local",
    };
  }

  try {
    const supabase = createClient();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fileExt = cleanFileName.split(".").pop();
    const uniqueName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("portfolio-assets")
      .upload(uniqueName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      return { url: null, error: error.message };
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("portfolio-assets").getPublicUrl(data.path);

    return { url: publicUrl, error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to upload asset";
    return { url: null, error: message };
  }
}
