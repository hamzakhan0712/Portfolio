import { Check } from "@/components/icons";
import { cn } from "@/lib/utils";

/**
 * My photo with a presence badge, as Teams and Outlook show people: a green
 * disc with a tick means available. Here it means open to new roles.
 */
export function PresenceAvatar({ size = 36, className }: { size?: number; className?: string }) {
  const badge = Math.max(10, Math.round(size * 0.34));
  return (
    <span className={cn("relative inline-flex shrink-0", className)} style={{ width: size, height: size }}>
      <img
        src="/photos/avatar.webp"
        alt=""
        width={size}
        height={size}
        className="h-full w-full rounded-full object-cover"
      />
      <span
        aria-hidden
        style={{ width: badge, height: badge }}
        className="absolute -bottom-0.5 -right-0.5 flex items-center justify-center rounded-full bg-[#6BB700] ring-2 ring-card"
      >
        <Check className="h-[70%] w-[70%] text-white" />
      </span>
    </span>
  );
}

export default PresenceAvatar;
