import { Button } from "@/components/ui/button";
import { Tooltip, Tooltip_Content, Tooltip_Trigger } from "@/components/ui/tooltip";
import { AlertCircle, Loader2 } from "lucide-react";

export default function Error_Button({
  error,
  is_retrying,
  on_retry,
}: {
  error: string;
  is_retrying: boolean;
  on_retry: () => void;
}) {
  return (
    <Tooltip>
      <Tooltip_Trigger asChild>
        <Button
          size="sm"
          variant="destructive"
          onClick={on_retry}
          disabled={is_retrying}
          className="gap-2"
        >
          {is_retrying ? <Loader2 className="h-4 w-4 animate-spin" /> : <AlertCircle className="h-4 w-4" />}
          Retry
        </Button>
      </Tooltip_Trigger>
      <Tooltip_Content>
        <p>{error}</p>
      </Tooltip_Content>
    </Tooltip>
  );
}
