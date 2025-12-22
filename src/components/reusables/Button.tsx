import * as React from "react";
import { SHADOW_STYLES as MODE_STYLES } from "../data/themes";
import type { Mode } from "../data/themes";
import { cx } from "../data/themes";
type GlassButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  mode?: Mode;
};





export default function GlassButton({
  className,
  type = "button",
  disabled,
  mode = "CCA",
  children,
  ...props
}: GlassButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cx(
        "block px-8 py-4 bg-white/10 hover:bg-white/15 rounded-2xl m-auto " +
          "backdrop-blur-xl border border-white/20 " +
          "shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] " +
          "transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 " +
          "active:translate-y-0 active:scale-95 " +
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent " +
          "text-white font-semibold tracking-wide cursor-pointer select-none",
        MODE_STYLES[mode],
        disabled &&
          "opacity-50 cursor-not-allowed hover:translate-y-0 hover:scale-100 active:scale-100",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
