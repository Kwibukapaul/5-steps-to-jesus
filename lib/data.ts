export type Project = {
  title: string;
  description: string;
  icon: string;
  accent: string;
};

export type Story = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
};

export const site = {
  name: "5 Steps with Jesus",
  tagline: "Give hope. Empower people. Share Jesus.",
  support: "Education • Skills • Faith",
  description:
    "A Christian humanitarian project supporting children, women and families in Rwanda through education, practical skills and the love of Jesus.",
};

export const projects: Project[] = [
  { title: "Education Support", description: "Helping children stay in school and build brighter opportunities beyond the circumstances they were born into.", icon: "book", accent: "bg-[#eaf2fb]" },
  { title: "Women’s Tailoring Training", description: "Equipping women with practical sewing skills so they can generate income and support their families with dignity.", icon: "scissors", accent: "bg-[#fff8e3]" },
  { title: "Faith & Ministry", description: "Walking with communities through prayer, Bible teaching, encouragement and the hope of Jesus.", icon: "heart", accent: "bg-[#eef4fb]" },
];

export const stories: Story[] = [
  { slug: "women-tailoring-training-2026", title: "29 women, six months, a new beginning", excerpt: "The first tailoring cohort completed their training with new skills, new confidence and a vision for the future.", category: "Women’s Training", date: "June 18, 2026", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=85" },
  { slug: "why-education-changes-everything", title: "Why education changes everything", excerpt: "When a child can remain in school, an entire family begins to see new possibilities.", category: "Education", date: "May 02, 2026", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85" },
  { slug: "five-steps-one-mission", title: "Five steps. One mission.", excerpt: "Meet people, show compassion, meet their needs, build trust and invite them to Jesus.", category: "Ministry", date: "April 11, 2026", image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=85" },
];

export const steps = [
  ["01", "Meet People", "We build relationships and listen carefully to understand the needs and dreams of each person."],
  ["02", "Show Compassion", "We respond with genuine care, kindness, dignity and love — seeing the person before the problem."],
  ["03", "Meet Their Needs", "We provide practical support that responds to real needs and creates a foundation for flourishing."],
  ["04", "Build Trust", "We walk alongside people over time, building meaningful relationships rooted in consistency and respect."],
  ["05", "Invite Them to Jesus", "We share the hope, love and message of Jesus with humility, trust and an open invitation."],
];
