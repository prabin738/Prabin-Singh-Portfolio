import { cn } from "@/lib/utils";

type StatusDotProps = {
  status: "live" | "away";
  label: string;
  className?: string;
};

export function StatusDot({ status, label, className }: StatusDotProps) {
  const isLive = status === "live";

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="relative flex h-2.5 w-2.5">
        {isLive ? (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-75 [animation-duration:2.4s] motion-reduce:hidden" />
        ) : null}
        <span className={cn("relative inline-flex h-2.5 w-2.5 rounded-full", isLive ? "bg-live" : "bg-subtle")} />
      </span>
      <span className="text-sm text-muted">{label}</span>
    </span>
  );
}
