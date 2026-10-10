import Link from "next/link";
import { LayoutDashboard, FolderKanban, BookOpen, Image, Settings } from "lucide-react";
import { AdminLogout } from "@/components/admin-logout";

const links = [
  ["/admin", "Overview", LayoutDashboard],
  ["/admin/projects", "Projects", FolderKanban],
  ["/admin/stories", "Stories", BookOpen],
  ["/admin/media", "Media", Image],
  ["/admin/settings", "Settings", Settings],
] as const;

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="min-h-screen bg-[#f7f9fc] text-[#172033]">
    <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-[#e7edf5] bg-[#123b6d] p-6 text-white lg:block">
      <Link href="/admin" className="text-lg font-bold">5 Steps <span className="text-[#f3e3a3]">Admin</span></Link>
      <nav className="mt-12 grid gap-2" aria-label="Admin navigation">
        {links.map(([href, label, Icon]) => <Link key={href} href={href} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"><Icon size={18} />{label}</Link>)}
      </nav>
      <div className="absolute bottom-6 left-6 right-6"><AdminLogout /></div>
    </aside>
    <div className="lg:pl-64">
      <header className="flex items-center justify-between border-b border-[#e7edf5] bg-white px-5 py-4 lg:hidden"><Link href="/admin" className="font-bold text-[#123b6d]">5 Steps <span className="text-[#d4a72c]">Admin</span></Link><AdminLogout /></header>
      {children}
    </div>
  </div>;
}
