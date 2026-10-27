import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import {
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Speaker,
  SpeakerMute,
} from "@/components/icons";
import { cn } from "@/lib/utils";

/**
 * A video player in the manner of the Windows Media Player transport bar:
 * one large play button over the poster, then a slim acrylic bar with the
 * timeline, time, volume and full screen. The seek bar is a real range input,
 * so it works with a keyboard and a screen reader as is.
 *
 * Keys while the player has focus: Space or K plays and pauses, ← and → jump
 * five seconds, M mutes, F toggles full screen.
 */

const time = (seconds: number) => {
  if (!Number.isFinite(seconds)) return "0:00";
  const s = Math.floor(seconds % 60);
  return `${Math.floor(seconds / 60)}:${s.toString().padStart(2, "0")}`;
};

export function MediaPlayer({
  src,
  poster,
  label,
  className,
  style,
}: {
  src: string;
  poster?: string;
  /** What the video shows, for assistive technology. */
  label: string;
  className?: string;
  style?: CSSProperties;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === frame.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggle = () => {
    const el = video.current;
    if (!el) return;
    setStarted(true);
    if (el.paused) void el.play();
    else el.pause();
  };

  const seek = (to: number) => {
    const el = video.current;
    if (!el || !Number.isFinite(el.duration)) return;
    el.currentTime = Math.min(Math.max(to, 0), el.duration);
  };

  const toggleMute = () => {
    const el = video.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void frame.current?.requestFullscreen?.();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    // Let the seek bar handle its own arrow keys.
    if ((event.target as HTMLElement).tagName === "INPUT" && event.key.startsWith("Arrow")) return;
    const actions: Record<string, () => void> = {
      " ": toggle,
      k: toggle,
      ArrowLeft: () => seek(current - 5),
      ArrowRight: () => seek(current + 5),
      m: toggleMute,
      f: toggleFullscreen,
    };
    const action = actions[event.key];
    if (!action || (event.key === " " && (event.target as HTMLElement).tagName === "BUTTON")) return;
    event.preventDefault();
    action();
  };

  const progress = duration ? (current / duration) * 100 : 0;
  const controlButton =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded text-white transition-colors hover:bg-white/10 active:bg-white/5 focus-visible:outline-white";

  return (
    <div
      ref={frame}
      onKeyDown={onKeyDown}
      style={style}
      className={cn("group relative overflow-hidden bg-black", fullscreen && "flex items-center", className)}
    >
      <video
        ref={video}
        src={src}
        poster={poster}
        preload="none"
        playsInline
        aria-label={label}
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(event) => setCurrent(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onDurationChange={(event) => setDuration(event.currentTarget.duration)}
        className="block aspect-video w-full cursor-pointer"
      />

      {/* Before the first play: one clear action over the poster. */}
      {!started && (
        <button
          type="button"
          onClick={toggle}
          aria-label={`Play: ${label}`}
          className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-float transition-transform duration-200 ease-fluent group-hover:scale-105">
            <Play className="ml-1 h-7 w-7" />
          </span>
        </button>
      )}

      {/* The transport bar: always there once playing has started, and
          faded back while the video plays and the pointer is elsewhere. */}
      {started && (
        <div
          className={cn(
            "absolute inset-x-2 bottom-2 rounded-lg bg-black/60 px-2 pb-1.5 pt-2 text-white backdrop-blur-xl transition-opacity duration-200",
            playing && "opacity-0 focus-within:opacity-100 group-hover:opacity-100",
          )}
        >
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={current}
            onChange={(event) => seek(Number(event.target.value))}
            aria-label="Seek"
            aria-valuetext={`${time(current)} of ${time(duration)}`}
            className="media-seek block w-full"
            style={{ "--progress": `${progress}%` } as CSSProperties}
          />
          <div className="mt-1 flex items-center gap-1">
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Pause" : "Play"}
              className={controlButton}
            >
              {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            <span className="px-1 text-[12.5px] tabular text-white/85">
              {time(current)} / {time(duration)}
            </span>
            <span className="flex-1" />
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
              className={controlButton}
            >
              {muted ? <SpeakerMute className="h-5 w-5" /> : <Speaker className="h-5 w-5" />}
            </button>
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={fullscreen ? "Exit full screen" : "Full screen"}
              className={controlButton}
            >
              {fullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MediaPlayer;
