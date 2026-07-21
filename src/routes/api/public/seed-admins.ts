// Idempotent one-time admin seeder. Guarded by SEED_ADMIN_TOKEN header.
// Creates the fixed demo + private admin accounts and their user_roles rows.
import { createFileRoute } from "@tanstack/react-router";

type Seed = { email: string; password: string; level: "demo" | "super" };

const SEEDS: Seed[] = [
  { email: "admin1@123", password: "admin1", level: "demo" },
  { email: "admin2@123", password: "admin2", level: "demo" },
  { email: "deva@1706", password: "devanath", level: "super" },
  { email: "devanath@1706", password: "deva@1706", level: "super" },
];

export const Route = createFileRoute("/api/public/seed-admins")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const token = request.headers.get("x-seed-token") ?? "";
        const expected = process.env.SEED_ADMIN_TOKEN ?? "";
        if (!expected || token !== expected) {
          return new Response("Unauthorized", { status: 401 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const results: Array<{ email: string; status: string; userId?: string; error?: string }> = [];

        for (const seed of SEEDS) {
          try {
            // Look up existing user by email (paginate defensively).
            let userId: string | null = null;
            let page = 1;
            // eslint-disable-next-line no-constant-condition
            while (true) {
              const { data, error } = await supabaseAdmin.auth.admin.listUsers({
                page,
                perPage: 200,
              });
              if (error) throw error;
              const match = data.users.find(
                (u) => (u.email ?? "").toLowerCase() === seed.email.toLowerCase(),
              );
              if (match) {
                userId = match.id;
                break;
              }
              if (data.users.length < 200) break;
              page += 1;
              if (page > 20) break;
            }

            let status = "existing";
            if (!userId) {
              const { data, error } = await supabaseAdmin.auth.admin.createUser({
                email: seed.email,
                password: seed.password,
                email_confirm: true,
                user_metadata: { full_name: seed.email.split("@")[0], role: "admin" },
              });
              if (error) throw error;
              userId = data.user?.id ?? null;
              status = "created";
            } else {
              // Reset password / confirm so we can always sign in.
              await supabaseAdmin.auth.admin.updateUserById(userId, {
                password: seed.password,
                email_confirm: true,
              });
              status = "updated";
            }

            if (!userId) throw new Error("No user id after upsert");

            // Ensure profile row exists.
            await supabaseAdmin.from("profiles").upsert(
              {
                id: userId,
                full_name: seed.email.split("@")[0],
                onboarding_completed: true,
              },
              { onConflict: "id" },
            );

            // Set admin role + admin_level. Delete any existing role rows first.
            await supabaseAdmin.from("user_roles").delete().eq("user_id", userId);
            const { error: roleErr } = await supabaseAdmin.from("user_roles").insert({
              user_id: userId,
              role: "admin",
              admin_level: seed.level,
            });
            if (roleErr) throw roleErr;

            results.push({ email: seed.email, status, userId });
          } catch (e) {
            results.push({
              email: seed.email,
              status: "error",
              error: (e as Error).message ?? String(e),
            });
          }
        }

        return new Response(JSON.stringify({ results }, null, 2), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      },
    },
  },
});
