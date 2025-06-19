import { Section } from '@/components/Section';
import Link from 'next/link';

export default function DocsPage() {
  return (
    <Section>
      <h1 className="text-4xl font-bold text-blue-400 mb-4 text-center">The Plumbing Knowledgebase</h1>
      <p className="text-gray-400 text-center max-w-3xl mx-auto mb-10">
        Practical. Regional. Unbiased. This is our evolving library of plumbing truth —
        written for homeowners, builders, DIYers, and pros alike. 
        Whether you want to understand pipe sizing, legal install rules, or 
        how long a job *should* take — this is the place.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/docs/codebook" className="bg-neutral-800 hover:bg-neutral-700 p-6 rounded-lg border border-gray-700 shadow">
          <h2 className="text-xl font-semibold text-white mb-2">📘 Layman's Plumbing Code</h2>
          <p className="text-gray-400 text-sm">
            A plain-English walkthrough of Florida plumbing rules, stripped of legalese.
          </p>
        </Link>

        <Link href="/docs/materials" className="bg-neutral-800 hover:bg-neutral-700 p-6 rounded-lg border border-gray-700 shadow">
          <h2 className="text-xl font-semibold text-white mb-2">🧪 Material Comparisons</h2>
          <p className="text-gray-400 text-sm">
            PVC vs CPVC vs PEX vs copper — durability, legality, cost, and mythbusting.
          </p>
        </Link>

        <Link href="/docs/permits" className="bg-neutral-800 hover:bg-neutral-700 p-6 rounded-lg border border-gray-700 shadow">
          <h2 className="text-xl font-semibold text-white mb-2">📑 Permits by City</h2>
          <p className="text-gray-400 text-sm">
            The real process — not just theory. Submission formats, inspection gotchas, and delay traps.
          </p>
        </Link>

        <Link href="/docs/logic" className="bg-neutral-800 hover:bg-neutral-700 p-6 rounded-lg border border-gray-700 shadow">
          <h2 className="text-xl font-semibold text-white mb-2">🤖 Plumbing Logic</h2>
          <p className="text-gray-400 text-sm">
            How Drippy thinks — from schema to quote to action. A human-readable intro to our capsule system.
          </p>
        </Link>

        <Link href="/docs/visuals" className="bg-neutral-800 hover:bg-neutral-700 p-6 rounded-lg border border-gray-700 shadow">
          <h2 className="text-xl font-semibold text-white mb-2">🖼️ Visual Guides</h2>
          <p className="text-gray-400 text-sm">
            Diagrams, tool behaviors, venting patterns, install mockups, and more.
          </p>
        </Link>

        <Link href="/docs/pricing" className="bg-neutral-800 hover:bg-neutral-700 p-6 rounded-lg border border-gray-700 shadow">
          <h2 className="text-xl font-semibold text-white mb-2">💰 Cost Transparency</h2>
          <p className="text-gray-400 text-sm">
            What affects price, how to tell if a quote is fair, and what’s usually left out.
          </p>
        </Link>
      </div>
    </Section>
  );
}
