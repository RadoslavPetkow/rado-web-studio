"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

type AuthFormProps = {
  mode: "login" | "register";
  isConfigured: boolean;
  redirectTo?: string;
};

export function AuthForm({
  mode,
  isConfigured,
  redirectTo = "/dashboard",
}: AuthFormProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!email || !password || (mode === "register" && !fullName)) {
      setError("Please complete all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();

      if (mode === "login") {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          throw signInError;
        }

        router.push(redirectTo);
        router.refresh();
        return;
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      setMessage(
        "Account created. Check your email if confirmation is enabled, then log in."
      );
      setFullName("");
      setEmail("");
      setPassword("");
    } catch (authError) {
      setError(
        authError instanceof Error
          ? authError.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  if (!isConfigured) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-950">
        <AlertCircle className="size-5" />
        <h2 className="mt-4 text-lg font-semibold">Supabase is not configured</h2>
        <p className="mt-2 text-sm leading-6">
          Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to
          `.env.local`, then restart the dev server.
        </p>
      </div>
    );
  }

  const isLogin = mode === "login";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xl shadow-zinc-950/5 sm:p-6"
    >
      <div className="grid gap-5">
        {!isLogin ? (
          <div className="grid gap-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="h-11 bg-white"
              autoComplete="name"
            />
          </div>
        ) : null}

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-11 bg-white"
            autoComplete="email"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-11 bg-white"
            autoComplete={isLogin ? "current-password" : "new-password"}
          />
        </div>
      </div>

      {error ? (
        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          {error}
        </div>
      ) : null}

      {message ? (
        <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
          {message}
        </div>
      ) : null}

      <Button
        type="submit"
        disabled={isLoading}
        className="mt-6 h-11 w-full rounded-lg bg-zinc-950"
      >
        {isLoading ? <Loader2 className="size-4 animate-spin" /> : null}
        {isLogin ? "Log in" : "Create account"}
      </Button>

      <p className="mt-5 text-center text-sm text-zinc-600">
        {isLogin ? "Need an account?" : "Already have an account?"}{" "}
        <Link
          href={isLogin ? "/register" : "/login"}
          className="font-semibold text-zinc-950"
        >
          {isLogin ? "Register" : "Log in"}
        </Link>
      </p>
    </form>
  );
}
