import { ContactCTA } from '@/components/ContactCTA';
import { Section } from '@/components/Section';

export default function QuotePage() {
  return (
    <Section>
      <h1 className="text-4xl font-bold text-blue-400 mb-6 text-center">Request a Quote</h1>
      <p className="text-center text-gray-400 max-w-2xl mx-auto mb-10">
        Tell us what you need and we’ll get back to you with a detailed estimate.  
        This form will evolve into a smart quote engine soon.
      </p>
      <ContactCTA />
    </Section>
  );
}
