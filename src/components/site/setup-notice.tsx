import { AlertCircle } from "lucide-react";

export function SetupNotice() {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-950">
      <AlertCircle className="size-5" />
      <h2 className="mt-4 text-xl font-semibold">Supabase setup needed</h2>
      <p className="mt-2 text-sm leading-6">
        Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to
        `.env.local`, run the SQL schema in Supabase, and restart the dev server
        to use the portal.
      </p>
    </div>
  );
}
