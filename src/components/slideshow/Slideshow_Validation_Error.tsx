import { AlertCircle } from "lucide-react";
import { useData_store } from "@/stores/useData_store";

export function Slideshow_Validation_Error({
  invalid_sections,
}: {
  invalid_sections: {
    name: string;
    display_name: string;
  }[];
}) {
  const go_to_dashboard = useData_store((state) => state.go_to_dashboard);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-purple-900 via-pink-900 to-red-900 px-4 py-8 text-white">
      <div className="w-full max-w-lg space-y-6 text-center">
        <div className="flex justify-center">
          <AlertCircle className="h-24 w-24 text-white/90" />
        </div>
        <h1 className="text-4xl font-bold sm:text-5xl">Unable to Generate Slideshow</h1>

        <p className="text-lg opacity-90">Your TikTok data export has validation issues with the following sections:</p>

        <div className="mx-auto max-w-md space-y-3">
          {invalid_sections.map((section) => (
            <div
              key={section.name}
              className="rounded-lg border-2 border-white/30 bg-white/10 p-4 backdrop-blur-sm"
            >
              <p className="font-semibold">{section.display_name}</p>
              <p className="text-sm opacity-80">Section does not match the expected schema</p>
            </div>
          ))}
        </div>

        <p className="text-base opacity-80">
          This may happen if your TikTok data export format has changed or if the file was modified.
        </p>

        <div className="pt-4">
          <button
            onClick={go_to_dashboard}
            className="rounded-full bg-white px-8 py-4 text-lg font-semibold text-blue-800 transition-all hover:scale-105 hover:cursor-pointer hover:bg-gray-100 active:scale-95"
          >
            View Full Analytics Dashboard
          </button>
        </div>

        <p className="text-sm opacity-70">The dashboard may still show available data from valid sections.</p>
      </div>
    </div>
  );
}
