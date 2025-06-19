// src/components/ContactCTA.tsx

export function ContactCTA() {
  return (
    <section className="bg-blue-800 text-white text-center py-12 px-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Need a plumber you can trust?</h2>
      <p className="mb-6 text-gray-100">We’re licensed, insured, and ready to help — fast.</p>
      <a
        href="/quote"
        className="inline-block bg-white text-blue-900 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition"
      >
        Get a Quote
      </a>
    </section>
  );
}
