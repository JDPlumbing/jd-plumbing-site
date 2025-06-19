// src/components/Section.tsx

type SectionProps = {
  children: React.ReactNode;
  className?: string;
};

export function Section({ children, className = '' }: SectionProps) {
  return (
    <section className={`py-16 px-6 max-w-7xl mx-auto ${className}`}>
      {children}
    </section>
  );
}
