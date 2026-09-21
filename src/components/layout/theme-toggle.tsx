"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};

// useSyncExternalStore's server snapshot is always false, so the icon renders
// only after hydration, without the extra setState-in-effect render this would
// otherwise take.
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      aria-label={mounted ? `Switch to ${nextTheme} theme` : "Toggle theme"}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-fg transition-colors hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-fg",
        className,
      )}
    >
      {mounted ? isDark ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden /> : null}
    </button>
  );
}
