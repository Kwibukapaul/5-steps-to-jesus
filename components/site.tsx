"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, BookOpen, Heart, Menu, Scissors, X } from "lucide-react";
import { site, steps, type Project, type Story } from "@/lib/data";

const icons = { book: BookOpen, scissors: Scissors, heart: Heart };

export function Logo({ compact = false }: { compact?: boolean }) {
  return <Link href="/" className="flex items-center gap-3" aria-label="5 Steps with Jesus home">
    <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#123b6d] text-xl font-bold text-[#f3e3a3] shadow-sm">5</span>
    {!compact && <span className="text-sm font-bold leading-tight tracking-tight text-[#123b6d]">5 Steps<br /><span className="font-medium text-[#d4a72c]">with Jesus</span></span>}
  </Link>;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [["About", "/about"], ["Our Work", "/work"], ["Stories", "/stories"], ["Gallery", "/gallery"], ["Media", "/media"], ["Contact", "/contact"]];
  return <header className="absolute inset-x-0 top-0 z-20 border-b border-white/15 bg-[#123b6d]/90 text-white backdrop-blur-md">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
      <Logo />
      <button className="rounded-lg p-2 md:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</button>
      <nav className={`${open ? "absolute left-0 right-0 top-full flex" : "hidden"} flex-col gap-1 bg-[#123b6d] p-5 md:static md:flex md:flex-row md:items-center md:gap-7 md:bg-transparent md:p-0`} aria-label="Main navigation">
        {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="py-2 text-sm text-white/85 transition hover:text-[#f3e3a3]">{label}</Link>)}
        <Link href="/support" className="mt-2 inline-flex items-center justify-center rounded-full bg-[#d4a72c] px-5 py-2.5 text-sm font-bold text-[#172033] transition hover:bg-[#f3e3a3] md:mt-0">Support Us</Link>
      </nav>
    </div>
  </header>;
}

export function Footer() {
  return <footer className="bg-[#0d2c52] px-5 py-14 text-white lg:px-8">
    <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
      <div><Logo /><p className="mt-5 max-w-sm text-sm leading-7 text-white/65">{site.description}</p><p className="mt-5 text-sm font-semibold text-[#f3e3a3]">{site.tagline}</p></div>
      <div><h3 className="font-semibold">Explore</h3><div className="mt-4 grid gap-3 text-sm text-white/65">{["About", "Our Work", "Stories", "Gallery", "Contact"].map(x => <Link key={x} href={`/${x.toLowerCase().replace(" ", "-")}`}>{x}</Link>)}</div></div>
      <div><h3 className="font-semibold">Be part of the mission</h3><p className="mt-4 text-sm leading-6 text-white/65">Your support helps create opportunities and share hope in Rwanda.</p><Link href="/support" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#f3e3a3]">Support the mission <ArrowRight size={16} /></Link><Link href="/admin/login" className="mt-4 block text-xs text-white/45 hover:text-white">Admin sign in</Link></div>
    </div><div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-xs text-white/45">© 2026 5 Steps with Jesus. Built with hope in Rwanda.</div>
  </footer>;
}

export function SectionHeading({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return <div className={`max-w-2xl ${light ? "text-white" : "text-[#172033]"}`}><p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#d4a72c]">{eyebrow}</p><h2 className="font-serif text-3xl font-bold leading-tight md:text-5xl">{title}</h2>{text && <p className={`mt-5 leading-7 ${light ? "text-white/70" : "text-[#596579]"}`}>{text}</p>}</div>;
}

export function ProjectCard({ project }: { project: Project }) {
  const Icon = icons[project.icon as keyof typeof icons];
  return <article className="rounded-2xl border border-[#e7edf5] bg-white p-7 shadow-[0_12px_35px_rgba(18,59,109,0.06)] transition hover:-translate-y-1"><div className={`mb-6 grid h-14 w-14 place-items-center rounded-xl ${project.accent} text-[#123b6d]`}><Icon size={26} /></div><h3 className="text-xl font-bold text-[#123b6d]">{project.title}</h3><p className="mt-3 leading-7 text-[#596579]">{project.description}</p><Link href="/work" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#123b6d]">Learn more <ArrowRight size={16} /></Link></article>;
}

export function StoryCard({ story }: { story: Story }) {
  return <article className="overflow-hidden rounded-2xl border border-[#e7edf5] bg-white shadow-sm"><Image src={story.image} alt="" width={1200} height={500} className="h-52 w-full object-cover" /><div className="p-6"><p className="text-xs font-bold uppercase tracking-wider text-[#d4a72c]">{story.category} · {story.date}</p><h3 className="mt-3 text-xl font-bold text-[#123b6d]">{story.title}</h3><p className="mt-3 text-sm leading-6 text-[#596579]">{story.excerpt}</p><Link href={`/stories/${story.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#123b6d]">Read story <ArrowRight size={16} /></Link></div></article>;
}

export function FiveSteps() {
  return <div className="mt-12 grid gap-3 md:grid-cols-5">{steps.map(([number, title, text]) => <div key={number} className="rounded-2xl border border-[#e7edf5] bg-white p-5"><span className="text-sm font-bold text-[#d4a72c]">{number}</span><h3 className="mt-8 text-lg font-bold text-[#123b6d]">{title}</h3><p className="mt-3 text-sm leading-6 text-[#596579]">{text}</p></div>)}</div>;
}
