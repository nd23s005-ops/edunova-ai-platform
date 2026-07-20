import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { slugify } from "./career.server";

const SaveInput = z.object({
  slug: z.string().min(3).max(60).optional(),
  theme: z.string().max(40).optional(),
  is_public: z.boolean().optional(),
  sections: z.record(z.string(), z.unknown()).optional(),
});

export const getMyPortfolio = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data } = await supabase.from("portfolios").select("*").eq("user_id", userId).maybeSingle();
    return { portfolio: data };
  });

export const savePortfolio = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => SaveInput.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: existing } = await supabase.from("portfolios").select("id, slug").eq("user_id", userId).maybeSingle();

    let slug = data.slug ? slugify(data.slug) : existing?.slug;
    if (!slug) slug = slugify(`nova-${userId.slice(0, 8)}`);

    // Ensure slug unique when new/changed
    if (!existing || existing.slug !== slug) {
      const { data: conflict } = await supabase.from("portfolios").select("id").eq("slug", slug).maybeSingle();
      if (conflict && conflict.id !== existing?.id) {
        slug = `${slug}-${Math.random().toString(36).slice(2, 6)}`;
      }
    }

    const patch: Record<string, unknown> = { user_id: userId, slug };
    if (data.theme !== undefined) patch.theme = data.theme;
    if (data.is_public !== undefined) patch.is_public = data.is_public;
    if (data.sections !== undefined) patch.sections = data.sections;

    const { data: row, error } = await supabase
      .from("portfolios").upsert(patch as never, { onConflict: "user_id" }).select("*").single();
    if (error) throw new Error(error.message);
    return { portfolio: row };
  });

const PublicInput = z.object({ slug: z.string().min(1).max(80) });
export const getPublicPortfolio = createServerFn({ method: "POST" })
  .inputValidator((v: unknown) => PublicInput.parse(v))
  .handler(async ({ data }) => {
    // Uses server publishable client with narrow anon SELECT policy on is_public=true.
    const { createClient } = await import("@supabase/supabase-js");
    const url = process.env.SUPABASE_URL!;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
    const client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });
    const { data: row } = await client
      .from("portfolios")
      .select("slug, theme, sections, view_count")
      .eq("slug", data.slug)
      .eq("is_public", true)
      .maybeSingle();
    return { portfolio: row };
  });
