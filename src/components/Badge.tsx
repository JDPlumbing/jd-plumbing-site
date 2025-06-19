// src/components/Badge.tsx

type BadgeProps = {
  label: string;
};

export function Badge({ label }: BadgeProps) {
  return (
    <span className="inline-block bg-blue-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
      {label}
    </span>
  );
}
