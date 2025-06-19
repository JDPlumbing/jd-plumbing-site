import { Section } from '@/components/Section';

export default function ContactPage() {
  return (
    <Section>
      <h1 className="text-4xl font-bold text-blue-400 mb-6 text-center">Contact Us</h1>
      <p className="text-center text-gray-400 mb-6">
        Have a question or need help fast? Reach out anytime.
      </p>

      <div className="text-center text-gray-300 space-y-2">
        <p>📞 <a href="tel:7544447057" className="hover:underline">754.444.7057</a></p>
        <p>📧 <a href="mailto:admin@jdplumbingsoflo.com" className="hover:underline">admin@jdplumbingsoflo.com</a></p>
        <p>🏷️ License #: CFC1428158</p>
        <p>🛡️ Fully insured</p>
      </div>
    </Section>
  );
}
