import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AuthForm } from "@/components/auth/auth-form";
import { FadeIn } from "@/components/site/fade-in";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { Badge } from "@/components/ui/badge";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to the Zoro WebStudio client portal.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect: redirectTo } = await searchParams;
  const isConfigured = isSupabaseConfigured();

  if (isConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      redirect("/dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <Navbar />
      <main className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.9fr_0.7fr] lg:items-center">
          <FadeIn>
            <Badge
              variant="outline"
              className="mb-5 border-emerald-900/15 bg-emerald-50 text-emerald-900"
            >
              Client portal
            </Badge>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl">
              Log in to your project space.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
              Access your project summary, current status, and future messages
              in a private client portal.
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <AuthForm
              mode="login"
              isConfigured={isConfigured}
              redirectTo={redirectTo || "/dashboard"}
            />
          </FadeIn>
        </div>
      </main>
      <Footer />
    </div>
  );
}
