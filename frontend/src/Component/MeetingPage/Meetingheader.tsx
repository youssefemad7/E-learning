import { Link } from "react-router-dom";
import { ArrowLeft, Settings } from "lucide-react";
import { Button } from "../ui/button";

interface MeetingHeaderProps {
  title: string;
  subtitle: string;
  backTo: string;
  onSettings?: () => void;
}

export function MeetingHeader({
  title,
  subtitle,
  backTo,
  onSettings,
}: MeetingHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 min-w-0">
        <Link
          to={backTo}
          aria-label="Go back"
          className="h-10 w-10 rounded-lg bg-[#49BBBD] text-white flex items-center justify-center hover:bg-[#3da9ab] transition-colors shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="min-w-0">
          <h1 className="text-lg lg:text-xl font-bold text-[#2D3E50] truncate">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onSettings}
        aria-label="Settings"
        className="shrink-0"
      >
        <Settings className="h-5 w-5 text-muted-foreground" />
      </Button>
    </div>
  );
}
