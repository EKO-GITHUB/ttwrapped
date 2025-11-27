type Setting_Group_Props = {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

export default function Setting_Group({ title, icon, children }: Setting_Group_Props) {
  return (
    <div>
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
        {icon}
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
