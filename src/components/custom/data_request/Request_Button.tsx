import { Button } from "@/components/ui/button";
import { Tooltip, Tooltip_Content, Tooltip_Trigger } from "@/components/ui/tooltip";
import { Download, Loader2 } from "lucide-react";

export default function Request_Button({
  status,
  is_loading,
  on_request,
}: {
  status: string;
  is_loading: boolean;
  on_request: () => void;
}) {
  return (
    <Tooltip>
      <Tooltip_Trigger asChild>
        <Button
          size="sm"
          variant="outline"
          onClick={on_request}
          disabled={is_loading}
          className="gap-2"
        >
          {is_loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          Request Data
        </Button>
      </Tooltip_Trigger>
      {status === "expired" && (
        <Tooltip_Content>
          <p>Previous request expired. Request new data.</p>
        </Tooltip_Content>
      )}
    </Tooltip>
  );
}
