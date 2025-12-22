import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";

export default function Download_Button({
  is_downloading,
  on_download,
}: {
  is_downloading: boolean;
  on_download: () => void;
}) {
  return (
    <Button
      size="sm"
      variant="outline"
      onClick={on_download}
      disabled={is_downloading}
      className="gap-2"
    >
      {is_downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
      {is_downloading ? "Downloading..." : "Download Ready"}
    </Button>
  );
}
