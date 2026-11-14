import { Video, Mic, PhoneOff, Monitor, LogOut } from "lucide-react";
import { cn } from "../../../lib/utils";

interface Participant {
  id: string;
  name: string;
  avatar: string;
}

interface VideoConferenceProps {
  mainImageUrl: string;
  participants: Participant[];
  videoEnabled: boolean;
  micEnabled: boolean;
  onToggleVideo: () => void;
  onToggleMic: () => void;
  onHangUp?: () => void;
  onShareScreen?: () => void;
  onLeave?: () => void;
}

interface ControlBtnProps {
  onClick?: () => void;
  color: string;
  hoverColor: string;
  label: string;
  children: React.ReactNode;
}

function ControlBtn({
  onClick,
  color,
  hoverColor,
  label,
  children,
}: ControlBtnProps) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        "h-12 w-12 rounded-full flex items-center justify-center transition-all duration-150 active:scale-95",
        color,
        hoverColor,
      )}
    >
      {children}
    </button>
  );
}

export function VideoConference({
  mainImageUrl,
  participants,
  videoEnabled,
  micEnabled,
  onToggleVideo,
  onToggleMic,
  onHangUp,
  onShareScreen,
  onLeave,
}: VideoConferenceProps) {
  return (
    <div className="relative bg-card rounded-3xl overflow-hidden shadow-lg">
      {/* Main Video */}
      <div className="aspect-[4/3] lg:aspect-video">
        <img
          src={mainImageUrl}
          alt="Main participant"
          className="h-full w-full object-cover"
          loading="eager"
        />
      </div>

      {/* Participant Thumbnails */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        {participants.map((p) => (
          <div
            key={p.id}
            className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 rounded-xl overflow-hidden border-2 border-white shadow-lg"
          >
            <img
              src={p.avatar}
              alt={p.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Controls Bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-3 bg-white rounded-full px-5 py-3 shadow-xl">
          <ControlBtn
            onClick={onToggleVideo}
            color={
              videoEnabled
                ? "bg-[#49BBBD] text-white"
                : "bg-gray-200 text-gray-500"
            }
            hoverColor={
              videoEnabled ? "hover:bg-[#3da9ab]" : "hover:bg-gray-300"
            }
            label={videoEnabled ? "Turn off camera" : "Turn on camera"}
          >
            <Video className="h-5 w-5" />
          </ControlBtn>

          <ControlBtn
            onClick={onToggleMic}
            color={
              micEnabled
                ? "bg-[#F5B963] text-white"
                : "bg-gray-200 text-gray-500"
            }
            hoverColor={micEnabled ? "hover:bg-[#e5a953]" : "hover:bg-gray-300"}
            label={micEnabled ? "Mute" : "Unmute"}
          >
            <Mic className="h-5 w-5" />
          </ControlBtn>

          <ControlBtn
            onClick={onHangUp}
            color="bg-[#EF5B5B] text-white"
            hoverColor="hover:bg-[#df4b4b]"
            label="End call"
          >
            <PhoneOff className="h-5 w-5" />
          </ControlBtn>

          <ControlBtn
            onClick={onShareScreen}
            color="bg-[#49BBBD] text-white"
            hoverColor="hover:bg-[#3da9ab]"
            label="Share screen"
          >
            <Monitor className="h-5 w-5" />
          </ControlBtn>

          <ControlBtn
            onClick={onLeave}
            color="bg-[#49BBBD] text-white"
            hoverColor="hover:bg-[#3da9ab]"
            label="Leave meeting"
          >
            <LogOut className="h-5 w-5" />
          </ControlBtn>
        </div>
      </div>
    </div>
  );
}
