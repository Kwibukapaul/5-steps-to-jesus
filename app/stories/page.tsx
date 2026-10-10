import { SectionHeading, StoryCard } from "@/components/site";
import { stories } from "@/lib/data";
export const metadata = { title: "Stories" };
export default function Stories() { return <main className="pt-28"><section className="bg-[#f7f9fc] px-5 py-20 lg:px-8"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Stories from our community" title="Hope is best understood through people." text="Read reflections, updates and stories from the people and communities we are privileged to walk alongside." /><div className="mt-12 grid gap-6 md:grid-cols-3">{stories.map(s => <StoryCard key={s.slug} story={s} />)}</div></div></section></main>; }
