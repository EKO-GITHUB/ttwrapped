import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Filter_Select({
  id,
  label,
  value,
  on_change,
  options,
  all_label,
}: {
  id: string;
  label: string;
  value: string;
  on_change: (value: string) => void;
  options: string[];
  all_label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor={id}
        className="text-sm text-gray-600 dark:text-gray-400"
      >
        {label}
      </label>
      <Select
        value={value}
        onValueChange={on_change}
      >
        <SelectTrigger
          id={id}
          className="w-[180px]"
        >
          <SelectValue placeholder={all_label} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{all_label}</SelectItem>
          {options.map((option) => (
            <SelectItem
              key={option}
              value={option}
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
