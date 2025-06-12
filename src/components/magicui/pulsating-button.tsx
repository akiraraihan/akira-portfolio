import React from "react";
import { cn } from "@/lib/utils";

// Accept both button and anchor props
export type PulsatingButtonProps =
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & {
      pulseColor?: string;
      duration?: string;
      href?: undefined;
    })
  | (React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      pulseColor?: string;
      duration?: string;
      href: string;
    });

export const PulsatingButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  PulsatingButtonProps
>((props, ref) => {
  const {
    className,
    children,
    pulseColor = "#808080",
    duration = "1.5s",
    href,
    ...rest
  } = props as any;
  const sharedClass = cn(
    "relative flex cursor-pointer items-center justify-center rounded-lg bg-primary px-4 py-2 text-center text-primary-foreground",
    className,
  );
  const sharedStyle = {
    "--pulse-color": pulseColor,
    "--duration": duration,
  } as React.CSSProperties;
  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={sharedClass}
        style={sharedStyle}
        {...rest}
      >
        <div className="relative z-10">{children}</div>
        <div className="absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-lg bg-inherit" />
      </a>
    );
  }
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={sharedClass}
      style={sharedStyle}
      {...rest}
    >
      <div className="relative z-10">{children}</div>
      <div className="absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-lg bg-inherit" />
    </button>
  );
});

PulsatingButton.displayName = "PulsatingButton";
