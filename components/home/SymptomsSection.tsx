/**
 * こんな症状の方はご相談ください（高齢者可読性対応版）
 * 文字を大きく、ドットを視認しやすく、コントラスト確保
 */

import SectionTitle from "@/components/common/SectionTitle";
import { SITE } from "@/lib/site";

const SYMPTOMS = [
  "風邪症候群",
  "インフルエンザ",
  "咽頭炎",
  "扁桃炎",
  "気管支炎",
  "肺炎",
  "胃腸炎（腹痛、下痢、吐き気）",
  "尿道・膀胱炎",
  "熱中症　など",
  "頭痛",
  "貧血",
  "便秘症　など",
  "アレルギー疾患（喘息、花粉症など）",
  "生活習慣病（糖尿病、高血圧、脂質異常症（高脂血症）、痛風（高尿酸血症）、メタボリックシンドローム等）",
];

export default function SymptomsSection() {
  return (
    <section className="py-10 md:py-14 bg-[#FFF8E1]" aria-label="こんな症状の方はご相談ください">
      <div className="max-w-4xl mx-auto px-4">
        <SectionTitle
          english="Symptoms"
          japanese="こんな症状の方はご相談ください"
        />

        <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-2.5 mb-8">
          {SYMPTOMS.map((s, i) => (
            <li
              key={i}
              className="flex items-start gap-2 bg-white rounded-lg px-3 py-2 border border-yellow-200 shadow-sm"
            >
              <span className="w-2 h-2 mt-[5px] rounded-full bg-[#E5C71D] shrink-0" />
              <span className="text-sm md:text-base text-[#333333] leading-snug">{s}</span>
            </li>
          ))}
        </ul>

        <div className="text-center">
          <p className="text-[#4B5563] text-sm md:text-base mb-4 max-w-md mx-auto leading-relaxed">
            「こんなことで受診していいのかな？」と迷ったら、
            まずはお気軽にお電話ください。
          </p>
          <a
            href={SITE.phoneHref}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#46B7E8] text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:opacity-95 transition-all text-base"
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
