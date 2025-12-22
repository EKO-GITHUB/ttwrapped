import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";

export default function Pending_Button({
  is_cancelling,
  on_cancel,
}: {
  is_cancelling: boolean;
  on_cancel: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="outline"
        disabled
        className="gap-2"
      >
        <Loader2 className="h-4 w-4 animate-spin" />
        Preparing...
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={on_cancel}
        disabled={is_cancelling}
        className="h-8 w-8 p-0"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
