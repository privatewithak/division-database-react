import * as React from "react";

type GlassButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

const cx = (...classes: Array<string | undefined | false | null>) =>
  classes.filter(Boolean).join(" ");

export default function GlassButton({
  className,
  type = "button",
  disabled,
  children,
  ...props
}: GlassButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cx(
        "block px-8 py-4 bg-white/10 hover:bg-white/15 rounded-2xl m-auto " +
          "backdrop-blur-xl border border-white/20 hover:border-indigo-400/50 " +
          "shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] hover:shadow-[0_12px_40px_0_rgba(99,102,241,0.5)] " +
          "transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 " +
          "active:translate-y-0 active:scale-95 " +
          "focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-transparent " +
          "text-white font-semibold tracking-wide cursor-pointer select-none",
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