import { Section } from '@/components/Section';

export default function AboutPage() {
  return (
    <Section>
      <h1 className="text-4xl font-bold text-blue-400 mb-6 text-center">About JD Plumbing</h1>
      <p className="text-gray-300 max-w-3xl mx-auto text-center">
        JD Plumbing is a licensed and insured plumbing service based in South Florida, founded on one principle: 
        do the job right, with no runaround. We handle everything from emergency calls to full system repipes. 
        No gimmicks. Just reliable work from people who know the trade.
      </p>
    </Section>
  );
}
