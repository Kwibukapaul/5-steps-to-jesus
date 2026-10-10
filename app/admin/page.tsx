import Link from "next/link";
import { FolderKanban, Image as ImageIcon, BookOpen, Settings } from "lucide-react";

export default function Admin() {
  const items = [["Projects", "Manage your areas of work.", FolderKanban, "/admin/projects"], ["Stories", "Create and publish stories.", BookOpen, "/admin/stories"], ["Media", "Manage photos and media.", ImageIcon, "/admin/media"], ["Settings", "Update site content.", Settings, "/admin/settings"]] as const;
  return <main className="mx-auto max-w-7xl px-5 py-10 lg:px-10"><p className="text-xs font-bold uppercase tracking-widest text-[#d4a72c]">Content management</p><h1 className="mt-3 text-4xl font-bold text-[#123b6d]">Welcome to your dashboard.</h1><p className="mt-3 text-[#596579]">Manage the content that helps your community see hope in action.</p><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{items.map(([title, text, Icon, href]) => <Link href={href} key={title} className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1"><Icon className="text-[#d4a72c]" /><h2 className="mt-8 font-bold text-[#123b6d]">{title}</h2><p className="mt-2 text-sm leading-6 text-[#596579]">{text}</p></Link>)}</div></main>;
}
