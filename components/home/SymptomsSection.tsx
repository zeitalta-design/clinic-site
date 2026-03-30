/**
 * こんな症状の方はご相談ください（高齢者可読性対応版）
 * 文字を大きく、ドットを視認しやすく、コントラスト確保
 */

import SectionTitle from "@/components/common/SectionTitle";
import { SITE } from "@/lib/site";

const SYMPTOMS = [
  "発熱やかぜの症状がある",
  "体がだるい・疲れが取れない",
  "のどが渇く・水をよく飲む",
  "健診で血糖値が高いと言われた",
  "健診結果の見方がわからない",
  "咳や鼻水が続いている",
  "頭痛やめまいが気になる",
  "血圧が高めと言われた",
  "食事や生活習慣を見直したい",
  "何科に行けばいいかわからない",
];

export default function SymptomsSection() {
  return (
    <section className="py-16 md:py-20 bg-[#FFFEF5]" aria-label="こんな症状の方はご相談ください">
      <div className="max-w-4xl mx-auto px-4">
        <SectionTitle
          english="Symptoms"
          japanese="こんな症状の方はご相談ください"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {SYMPTOMS.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-white rounded-lg px-5 py-4 border border-[#DCEAF2]"
            >
              <span className="w-3 h-3 rounded-full bg-[#E5C71D] shrink-0" />
              <span className="text-base md:text-lg text-[#333333] leading-relaxed">{s}</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-[#4B5563] text-base md:text-lg mb-5 max-w-md mx-auto leading-relaxed">
            「こんなことで受診していいのかな？」と迷ったら、
            まずはお気軽にお電話ください。
          </p>
          <a
            href={SITE.phoneHref}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#46B7E8] text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:opacity-95 transition-all text-lg"
          >
            <svg
              className="w-6 h-6"
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
            お電話でご相談 {SITE.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
