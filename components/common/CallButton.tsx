/**
 * 電話CTAボタン
 * 明るいブルー配色版
 * primary = 明るいブルー背景, accent = 同じくブルーだが少し大きめの印象
 */

import { SITE } from "@/lib/site";

interface CallButtonProps {
  variant?: "primary" | "accent" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function CallButton({
  variant = "primary",
  size = "md",
  className = "",
}: CallButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-bold rounded-lg transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantStyles = {
    primary: "bg-[#46B7E8] text-white focus:ring-[#46B7E8] shadow-md hover:shadow-lg",
    accent: "bg-[#46B7E8] text-white focus:ring-[#46B7E8] shadow-md hover:shadow-lg",
    outline:
      "border-2 border-[#46B7E8] text-[#2F9FD3] bg-white focus:ring-[#46B7E8] hover:bg-[#EDF7FC]",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-2.5",
  };

  return (
    <a
      href={SITE.phoneHref}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      aria-label={`電話をかける ${SITE.phone}`}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
      <span>{SITE.phone}</span>
    </a>
  );
}
