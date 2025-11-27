type Stat_Card_Props = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
};

export default function Stat_Card({ icon, label, value }: Stat_Card_Props) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
      <div className="mb-2 text-gray-600 dark:text-gray-400">{icon}</div>
      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</div>
      <div className="text-xs text-gray-600 dark:text-gray-400">{label}</div>
    </div>
  );
}
