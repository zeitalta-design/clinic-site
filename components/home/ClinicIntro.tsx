/**
 * ごあいさつセクション（高齢者可読性対応版）
 */

import { SITE } from "@/lib/site";

export default function ClinicIntro() {
  return (
    <section className="py-10 md:py-14 bg-gradient-to-b from-[#EDF7FC] to-[#f2f9fb]" aria-label="ごあいさつ">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <p className="text-base md:text-lg tracking-[0.1em] text-[#D4A017] font-semibold mb-3">
          {SITE.departments.join("・")}
        </p>
        <h2 className="text-xl md:text-3xl font-bold text-[#2F9FD3] mb-5 leading-snug">
          通いやすく、相談しやすいクリニックを目指しています
        </h2>
        <p className="text-base md:text-lg text-[#333333] leading-relaxed mb-6 max-w-xl mx-auto">
          {SITE.name}
          は、函館市美原にある内科・糖尿病・代謝内科・内分泌内科のクリニックです。
          気になる症状があれば、まずは気軽にご相談いただける場所でありたいと考えています。
        </p>
        <a
          href={SITE.phoneHref}
          className="inline-flex items-center gap-2 text-[#2F9FD3] font-bold hover:underline text-base md:text-lg"
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
          お電話でのご相談はこちら {SITE.phone}
        </a>
      </div>
    </section>
  );
}
