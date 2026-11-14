import { Play, Pause, Maximize2 } from "lucide-react";

interface VideoPlayerProps {
  thumbnailUrl: string;
  isPlaying: boolean;
  currentTime?: string;
  totalTime?: string;
  progress?: number; // 0–100
  onTogglePlay: () => void;
  onFullscreen?: () => void;
}

export function VideoPlayer({
  thumbnailUrl,
  isPlaying,
  currentTime = "0:05",
  totalTime = "03:26",
  progress = 5,
  onTogglePlay,
  onFullscreen,
}: VideoPlayerProps) {
  return (
    <div className="relative aspect-video bg-black rounded-xl overflow-hidden mb-8 group">
      <img
        src={thumbnailUrl}
        alt="Video thumbnail"
        className="h-full w-full object-cover"
        loading="eager"
      />

      {/* Center Play Overlay (shown when paused) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={onTogglePlay}
            aria-label="Play video"
            className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl hover:bg-white hover:scale-105 transition-all duration-200"
          >
            <Play className="h-7 w-7 text-[#49BBBD] ml-1" />
          </button>
        </div>
      )}

      {/* Bottom Controls Bar */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-200">
        <div className="flex items-center gap-3">
          {/* Play / Pause */}
          <button
            onClick={onTogglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="h-9 w-9 rounded-full bg-white flex items-center justify-center hover:bg-white/90 transition-colors shrink-0"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 text-black" />
            ) : (
              <Play className="h-4 w-4 text-black ml-0.5" />
            )}
          </button>

          {/* Time */}
          <span className="text-white text-xs font-mono shrink-0">
            {currentTime} / {totalTime}
          </span>

          {/* Progress Bar */}
          <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden cursor-pointer">
            <div
              className="h-full bg-[#49BBBD] rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Fullscreen */}
          <button
            onClick={onFullscreen}
            aria-label="Fullscreen"
            className="text-white hover:text-white/80 transition-colors shrink-0"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
