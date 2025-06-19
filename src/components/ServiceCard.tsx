// src/components/ServiceCard.tsx

type ServiceCardProps = {
  title: string;
  description: string;
  icon?: React.ReactNode; // optional icon
};

export function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <div className="bg-neutral-800 border border-neutral-700 p-6 rounded-lg shadow hover:shadow-lg transition text-left">
      <div className="flex items-start gap-4 mb-4">
        {icon && <div className="text-blue-400 text-3xl">{icon}</div>}
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}
