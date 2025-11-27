import { Filter, X } from "lucide-react";
import Filter_Select from "./Filter_Select";

export default function Filter_Bar({
  selected_device,
  selected_network,
  available_devices,
  available_networks,
  on_device_change,
  on_network_change,
  on_clear_filters,
  has_active_filters,
}: {
  selected_device: string;
  selected_network: string;
  available_devices: string[];
  available_networks: string[];
  on_device_change: (value: string) => void;
  on_network_change: (value: string) => void;
  on_clear_filters: () => void;
  has_active_filters: boolean;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">Filters:</span>
        </div>

        <div className="flex flex-1 items-center gap-3">
          <Filter_Select
            id="device-filter"
            label="Device"
            value={selected_device}
            on_change={on_device_change}
            options={available_devices}
            all_label="All Devices"
          />

          <Filter_Select
            id="network-filter"
            label="Network"
            value={selected_network}
            on_change={on_network_change}
            options={available_networks}
            all_label="All Networks"
          />
        </div>

        {has_active_filters && (
          <button
            onClick={on_clear_filters}
            className="flex items-center gap-1.5 rounded-md bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            <X className="h-3.5 w-3.5" />
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
