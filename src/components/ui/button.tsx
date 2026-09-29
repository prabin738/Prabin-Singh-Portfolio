import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const button = cva(
  "inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-fg disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary-hover",
        secondary: "border border-line-strong text-fg hover:bg-raised",
        ghost: "text-fg hover:bg-raised",
        // Crimson-tinted at rest so it stands out on dark tiles without competing with
        // the solid primary CTA; fills to solid crimson and lifts slightly on hover.
        tinted:
          "border border-primary/45 bg-primary/12 text-primary-fg transition-[color,background-color,border-color,box-shadow,translate] duration-200 ease-out hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/30 active:translate-y-0 active:shadow-none motion-reduce:transition-colors motion-reduce:hover:translate-y-0 [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:scale-110 motion-reduce:hover:[&_svg]:scale-100",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

type CommonProps = VariantProps<typeof button> & {
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, "className"> & { href: string };

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className"> & { href?: undefined };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button({ className, variant, children, ...props }: ButtonProps) {
  const classes = cn(button({ variant }), className);

  if (props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    const isExternal = /^https?:\/\//.test(href);
    const isMailto = href.startsWith("mailto:");

    if (isExternal || isMailto) {
      return (
        <a
          href={href}
          className={classes}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
