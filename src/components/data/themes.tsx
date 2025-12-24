export type Mode = "CCA" | "OTA";


export const BASE_STYLES: Record<Mode, string> = {
  CCA:
    "border border-blue-400/50 bg-blue-500/5 " +
    "shadow-[0_12px_40px_0_rgba(59,130,246,0.5)] " +
    "focus:ring-blue-400",
  OTA:
    "border border-red-400/50 bg-red-500/5 " +
    "shadow-[0_12px_40px_0_rgba(209,52,52,0.55)] " +
    "focus:ring-red-400",
};

export const SHADOW_STYLES: Record<Mode, string> = {
  CCA:
  "hover:border-blue-400/50 " +
  "hover:shadow-[0_12px_40px_0_rgba(59,130,246,0.5)] " +
  "focus:ring-blue-400",
  OTA:
    "hover:border-red-400/50 " +
    "hover:shadow-[0_12px_40px_0_rgba(209,52,52,0.55)] " +
    "focus:ring-red-400",
};

export const cx = (...classes: Array<string | undefined | false | null>) =>
  classes.filter(Boolean).join(" ");