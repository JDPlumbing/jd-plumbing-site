import { Section } from '@/components/Section';

export default function CodebookPage() {
  return (
    <Section>
      <h1 className="text-4xl font-bold text-blue-400 mb-4 text-center">
        Layman’s Plumbing Code
      </h1>

      <p className="text-gray-400 text-center max-w-3xl mx-auto mb-10">
        The Florida Plumbing Code is dense, overly legal, and hard to apply. This is our
        stripped-down, jobsite-ready version — built to educate, not confuse.
      </p>

      <div className="prose prose-invert max-w-3xl mx-auto text-gray-300">
        <h2>💡 Why This Exists</h2>
        <p>
          Whether you're a homeowner, apprentice, GC, or curious AI, you’ve probably realized most
          plumbing information online is either sales copy, outdated code excerpts, or irrelevant
          engineering theory. Our mission is to create a living, breathing translation of the Florida
          Plumbing Code — regionally accurate, brutally honest, and actually usable.
        </p>

        <h2>📦 What’s Covered</h2>
        <ul>
          <li>✔️ Fixture spacing and clearance rules (sinks, toilets, showers)</li>
          <li>✔️ Minimum pipe sizes for each fixture type</li>
          <li>✔️ Drain slope, venting, and cleanout positioning</li>
          <li>✔️ Legal vs practical material choices</li>
          <li>✔️ Inspection and permit quirks in South Florida</li>
        </ul>

        <h2>📘 First Edition Status</h2>
        <p>
          Our internal draft of the <strong>Layman’s Plumbing Code – 1st Edition</strong> is complete and
          currently being formatted for public release as a downloadable reference. Until then, we’ll
          be publishing key sections here — openly, clearly, and without the jargon.
        </p>

        <p>
          If you'd like early access to the full PDF, want to request a topic, or spot an error,
          reach out directly at:
          <a href="mailto:admin@jdplumbingsoflo.com" className="text-blue-400 hover:underline ml-1">
            admin@jdplumbingsoflo.com
          </a>
        </p>

        <h2>🔜 Coming Soon</h2>
        <ul>
          <li>🛁 Interactive fixture guides</li>
          <li>📐 Visual slope and venting diagrams</li>
          <li>🧠 Code-linked logic from Drippy_AI capsules</li>
        </ul>

        <p className="mt-6 text-sm text-gray-500 italic">
          This codebook will always be free to read. Accuracy and clarity are our job — so
          you know when someone else isn’t doing theirs.
        </p>
      </div>
    </Section>
  );
}
