"use client";

import { FormEvent, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

export default function SettingsAdmin() {
  const [value, setValue] = useState("{}");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const client = createClient();
  useEffect(() => {
    async function load() {
      if (!client) return;
      const { data, error: queryError } = await client.from("site_settings").select("value").eq("key", "site").maybeSingle();
      if (queryError) setError(queryError.message);
      else if (data) setValue(JSON.stringify(data.value, null, 2));
    }
    void load();
  }, []);
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!client) { setError("Configure Supabase environment variables to manage settings."); return; }
    try {
      const parsed: unknown = JSON.parse(value);
      const result = await client.from("site_settings").upsert({ key: "site", value: parsed });
      if (result.error) setError(result.error.message); else setMessage("Settings saved.");
    } catch { setError("Settings must be valid JSON."); }
  }
  return <main className="mx-auto max-w-4xl px-5 py-10 lg:px-10"><p className="text-xs font-bold uppercase tracking-widest text-[#d4a72c]">Content management</p><h1 className="mt-2 text-4xl font-bold text-[#123b6d]">Settings</h1><p className="mt-2 text-[#596579]">Store site-wide content as JSON for future public-site configuration.</p>{error && <p className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}{message && <p className="mt-6 rounded-xl bg-green-50 p-4 text-sm text-green-700">{message}</p>}<form onSubmit={save} className="mt-8 rounded-2xl bg-white p-6 shadow-sm"><label className="text-sm font-semibold">Site settings JSON<textarea value={value} onChange={event => setValue(event.target.value)} rows={18} className="mt-2 w-full rounded-xl border border-[#dce4ef] px-4 py-3 font-mono text-sm" /></label><button className="mt-5 rounded-full bg-[#123b6d] px-5 py-3 text-sm font-bold text-white">Save settings</button></form></main>;
}
