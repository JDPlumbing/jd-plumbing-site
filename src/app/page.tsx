// src/app/page.tsx

export default function HomePage() {
  return (
    <section className="py-20 px-6 text-center text-gray-200">
      <h1 className="text-5xl font-bold mb-4 text-blue-400">Welcome to JD Plumbing</h1>
      <p className="text-lg text-gray-400 max-w-xl mx-auto">
        Licensed, insured, and fully committed to getting the job done right the first time.
        Proudly serving South Florida with no-nonsense, high-integrity plumbing solutions.
      </p>

      <div className="mt-8">
        <a
          href="/quote"
          className="inline-block bg-blue-700 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow transition"
        >
          Get a Quote
        </a>
      </div>
    </section>
  );
}
