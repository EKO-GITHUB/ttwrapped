export default function Info_Item({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-gray-500 dark:text-gray-400">{icon}</div>
      <div className="flex-1">
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</div>
        <div className="mt-0.5 text-sm font-medium text-gray-900 dark:text-gray-100">{value}</div>
      </div>
    </div>
  );
}
