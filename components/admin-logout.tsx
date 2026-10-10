"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export function AdminLogout() {
  const router = useRouter();
  async function logout() {
    const client = createClient();
    if (client) await client.auth.signOut();
    router.replace("/admin/login");
  }
  return <button onClick={logout} className="text-sm text-white/70 hover:text-white">Sign out</button>;
}
