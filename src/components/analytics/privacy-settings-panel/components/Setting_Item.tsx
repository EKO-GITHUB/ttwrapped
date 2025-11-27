type Setting_Item_Props = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

export default function Setting_Item({ label, value, icon }: Setting_Item_Props) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-start gap-3">
        {icon && <div className="mt-0.5 text-gray-500 dark:text-gray-400">{icon}</div>}
        <div>
          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{label}</div>
        </div>
      </div>
      <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{value}</div>
    </div>
  );
}
