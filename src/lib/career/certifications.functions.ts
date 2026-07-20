import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const CertInput = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1).max(200),
  issuer: z.string().max(200).optional(),
  url: z.string().max(500).optional(),
  credential_id: z.string().max(200).optional(),
  issued_at: z.string().optional(),
  expires_at: z.string().optional(),
});

export const upsertCertification = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => CertInput.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const payload = {
      user_id: userId,
      title: data.title,
      issuer: data.issuer ?? null,
      url: data.url ?? null,
      credential_id: data.credential_id ?? `NL-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
      issued_at: data.issued_at ?? null,
      expires_at: data.expires_at ?? null,
    };
    if (data.id) {
      const { data: row, error } = await supabase.from("career_certifications").update(payload).eq("id", data.id).eq("user_id", userId).select("*").single();
      if (error) throw new Error(error.message);
      return { certification: row };
    }
    const { data: row, error } = await supabase.from("career_certifications").insert(payload).select("*").single();
    if (error) throw new Error(error.message);
    return { certification: row };
  });

export const listCertifications = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data } = await supabase.from("career_certifications").select("*").eq("user_id", userId).order("issued_at", { ascending: false });
    return { certifications: data ?? [] };
  });

const DelInput = z.object({ id: z.string().uuid() });
export const deleteCertification = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: unknown) => DelInput.parse(v))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase.from("career_certifications").delete().eq("id", data.id).eq("user_id", userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
