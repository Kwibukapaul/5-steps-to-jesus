import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";
const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
export const metadata: Metadata = { metadataBase: new URL("https://5stepswithjesus.org"), title: { default: "5 Steps with Jesus | Hope in Rwanda", template: "%s | 5 Steps with Jesus" }, description: "A Christian humanitarian project supporting children, women and families in Rwanda through education, practical skills and the love of Jesus.", openGraph: { title: "5 Steps with Jesus", description: "Give hope. Empower people. Share Jesus.", type: "website" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" data-scroll-behavior="smooth" className={geist.variable}><body><SiteShell>{children}</SiteShell></body></html>; }
