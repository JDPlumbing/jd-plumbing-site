import { ServiceCard } from '@/components/ServiceCard';
import { Section } from '@/components/Section';

const services = [
  {
    title: 'Drain Cleaning',
    description: 'Fast and thorough drain clearing with modern equipment and no mess left behind.',
  },
  {
    title: 'Leak Detection',
    description: 'Pinpoint hidden leaks behind walls, floors, or ceilings using non-invasive tools.',
  },
  {
    title: 'Water Heater Repair',
    description: 'Service and replacement of tank and tankless water heaters — gas or electric.',
  },
  {
    title: 'Whole-Home Repiping',
    description: 'Modernize your plumbing system with clean PEX or copper from the main to every fixture.',
  },
  {
    title: 'Sewer Line Inspection',
    description: 'Camera-based inspection to diagnose sewer clogs, offsets, roots, and breaks.',
  },
  {
    title: 'Emergency Plumbing',
    description: '24/7 response for burst pipes, backup floods, and no-water situations.',
  },
];

export default function ServicesPage() {
  return (
    <Section>
      <h1 className="text-4xl font-bold text-blue-400 mb-12 text-center">Our Services</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard
            key={service.title}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </Section>
  );
}
