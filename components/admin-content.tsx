"use client";

import { FormEvent, useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import { createClient } from "@/lib/supabase";

type Resource = "projects" | "stories" | "photos";
type Row = { id: string; title?: string; slug?: string; description?: string; excerpt?: string; content?: string; category?: string; alt_text?: string; storage_path?: string; public_url?: string; image_url?: string; cover_image_url?: string; published?: boolean };

const fields: Record<Resource, { key: keyof Row; label: string; type?: string; required?: boolean }[]> = {
  projects: [
    { key: "title", label: "Title", required: true }, { key: "slug", label: "Slug", required: true },
    { key: "description", label: "Description", type: "textarea", required: true }, { key: "image_url", label: "Image URL" },
  ],
  stories: [
    { key: "title", label: "Title", required: true }, { key: "slug", label: "Slug", required: true },
    { key: "category", label: "Category", required: true }, { key: "excerpt", label: "Excerpt", type: "textarea", required: true },
    { key: "content", label: "Content", type: "textarea", required: true }, { key: "cover_image_url", label: "Cover image URL" },
  ],
  photos: [
    { key: "title", label: "Title" }, { key: "alt_text", label: "Alt text", required: true },
    { key: "storage_path", label: "Storage path", required: true }, { key: "public_url", label: "Public URL", required: true },
  ],
};

export function AdminContent({ resource }: { resource: Resource }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [editing, setEditing] = useState<Row | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const client = createClient();

  async function load() {
    if (!client) { setError("Configure Supabase environment variables to manage content."); setLoading(false); return; }
    setLoading(true);
    const { data, error: queryError } = await client.from(resource).select("*").order("created_at", { ascending: false });
    if (queryError) setError(queryError.message); else setRows((data ?? []) as Row[]);
    setLoading(false);
  }
  useEffect(() => { void load(); }, [resource]);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!client || !editing) return;
    setError(""); setNotice("");
    const form = new FormData(event.currentTarget);
    const values = Object.fromEntries(fields[resource].map(({ key }) => [key, String(form.get(String(key)) ?? "").trim()]));
    if (resource === "photos") {
      const file = form.get("file");
      if (file instanceof File && file.size > 0) {
        const path = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
        const upload = await client.storage.from("project-media").upload(path, file, { upsert: false });
        if (upload.error) { setError(upload.error.message); return; }
        values.storage_path = path;
        values.public_url = client.storage.from("project-media").getPublicUrl(path).data.publicUrl;
      }
    }
    const published = form.get("published") === "on";
    const result = editing.id ? await client.from(resource).update({ ...values, published }).eq("id", editing.id) : await client.from(resource).insert({ ...values, published });
    if (result.error) setError(result.error.message); else { setNotice("Saved successfully."); setEditing(null); await load(); }
  }
  async function remove(id: string) {
    if (!client || !window.confirm("Delete this item? This cannot be undone.")) return;
    const result = await client.from(resource).delete().eq("id", id);
    if (result.error) setError(result.error.message); else { setNotice("Deleted."); await load(); }
  }
  const title = resource === "photos" ? "Media" : resource[0].toUpperCase() + resource.slice(1);
  return <section className="mx-auto max-w-7xl px-5 py-10 lg:px-10">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-[#d4a72c]">Content management</p><h1 className="mt-2 text-4xl font-bold text-[#123b6d]">{title}</h1><p className="mt-2 text-[#596579]">Create, update, publish and remove {title.toLowerCase()}.</p></div><button onClick={() => setEditing({ id: "" })} className="inline-flex items-center gap-2 rounded-full bg-[#123b6d] px-5 py-3 text-sm font-bold text-white"><Plus size={17} />Add {resource === "photos" ? "media" : resource.slice(0, -1)}</button></div>
    {error && <p className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}{notice && <p className="mt-6 rounded-xl bg-green-50 p-4 text-sm text-green-700">{notice}</p>}
    {editing && <form onSubmit={save} className="mt-8 rounded-2xl border border-[#dce4ef] bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><h2 className="text-xl font-bold text-[#123b6d]">{editing.id ? "Edit item" : "New item"}</h2><button type="button" onClick={() => setEditing(null)} aria-label="Close"><X /></button></div><div className="mt-6 grid gap-5 md:grid-cols-2">{fields[resource].map(({ key, label, type, required }) => <label key={key} className={type === "textarea" ? "md:col-span-2" : ""}><span className="text-sm font-semibold">{label}</span>{type === "textarea" ? <textarea name={String(key)} required={required} defaultValue={String(editing[key] ?? "")} rows={5} className="mt-2 w-full rounded-xl border border-[#dce4ef] px-4 py-3" /> : <input name={String(key)} required={required && !(resource === "photos" && (key === "storage_path" || key === "public_url"))} defaultValue={String(editing[key] ?? "")} className="mt-2 w-full rounded-xl border border-[#dce4ef] px-4 py-3" />}</label>)}{resource === "photos" && <label><span className="text-sm font-semibold">Upload image</span><input name="file" type="file" accept="image/jpeg,image/png,image/webp" className="mt-2 block w-full rounded-xl border border-[#dce4ef] px-4 py-3 text-sm" /><span className="mt-1 block text-xs text-[#596579]">Uploading replaces the storage path and public URL fields.</span></label>}</div><label className="mt-5 flex items-center gap-3 text-sm font-semibold"><input name="published" type="checkbox" defaultChecked={editing.published} className="h-4 w-4" />Published on the public site</label><button className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#d4a72c] px-5 py-3 text-sm font-bold text-[#172033]"><Save size={17} />Save changes</button></form>}
    <div className="mt-8 overflow-x-auto rounded-2xl border border-[#e7edf5] bg-white shadow-sm">{loading ? <p className="p-6 text-sm text-[#596579]">Loading content...</p> : rows.length === 0 ? <p className="p-6 text-sm text-[#596579]">No content yet. Add your first item above.</p> : <table className="w-full text-left text-sm"><thead className="border-b border-[#e7edf5] text-xs uppercase tracking-wider text-[#596579]"><tr><th className="px-6 py-4">Title</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th></tr></thead><tbody>{rows.map(row => <tr key={row.id} className="border-b border-[#f0f3f7] last:border-0"><td className="px-6 py-4 font-semibold text-[#123b6d]">{row.title ?? row.alt_text ?? "Untitled"}</td><td className="px-6 py-4"><span className={`rounded-full px-3 py-1 text-xs font-bold ${row.published ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"}`}>{row.published ? "Published" : "Draft"}</span></td><td className="px-6 py-4 text-right"><button onClick={() => setEditing(row)} className="mr-4 text-[#123b6d]" aria-label="Edit"><Pencil size={17} /></button><button onClick={() => void remove(row.id)} className="text-red-600" aria-label="Delete"><Trash2 size={17} /></button></td></tr>)}</tbody></table>}</div>
  </section>;
}
