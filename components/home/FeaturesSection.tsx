/**
 * 当院の特徴セクション（高齢者可読性対応版）
 * アイコンを大型化、テキストを大きく、コントラスト確保
 */

import SectionTitle from "@/components/common/SectionTitle";

const FEATURES = [
  {
    iconPath:
      "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    title: "地域のかかりつけ医",
    description:
      "函館市美原で、地域の皆さまの健康をサポートしています。ちょっとした体調の変化でも、気軽にご相談ください。",
  },
  {
    iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "火曜は夜間も診療",
    description:
      "火曜日は19:30まで診療しています。お仕事帰りや学校帰りでも受診しやすい体制です。",
  },
  {
    iconPath:
      "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
    title: "通いやすい立地",
    description:
      "函館バス「亀田支所前」から徒歩7分。無料駐車場15台完備で、お車でもお越しいただけます。",
  },
  {
    iconPath:
      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    title: "相談しやすい雰囲気",
    description:
      "不安なことや気になることを、遠慮なくお話しいただける雰囲気づくりを大切にしています。",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-20 bg-[#F8FCFE]" aria-label="当院の特徴">
      <div className="max-w-5xl mx-auto px-4">
        <SectionTitle english="Features" japanese="当院の特徴" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 md:p-7 text-center border border-[#DCEAF2] border-t-[3px] border-t-[#F3E33A] hover:shadow-md transition-shadow duration-200"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FFFBEB] flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-[#2F9FD3]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={feature.iconPath}
                  />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-[#2F9FD3] mb-3">
                {feature.title}
              </h3>
              <p className="text-base text-[#4B5563] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
