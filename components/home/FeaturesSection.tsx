/**
 * 当院の特徴セクション（高齢者可読性対応版）
 * アイコンを大型化、テキストを大きく、コントラスト確保
 */

import SectionTitle from "@/components/common/SectionTitle";

const FEATURES = [
  {
    title: "地域のかかりつけ医",
    description:
      "函館市美原で、地域の皆さまの健康をサポートしています。ちょっとした体調の変化でも、気軽にご相談ください。",
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
        {/* ハート＋十字（かかりつけ医） */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v4m-2-2h4" />
      </svg>
    ),
  },
  {
    title: "火曜は夜間も診療",
    description:
      "火曜日は19:30まで受付しています。お仕事帰りや学校帰りでも受診しやすい体制です。",
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
        {/* 月＋時計（夜間診療） */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
      </svg>
    ),
  },
  {
    title: "通いやすい立地",
    description:
      "函館バス「亀田支所前」から徒歩7分。駐車場29台完備で、お車でもお越しいただけます。",
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
        {/* 地図ピン＋P（駐車場あり） */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 8.5h2a1.5 1.5 0 010 3h-2v-3zm0 0v6" />
      </svg>
    ),
  },
  {
    title: "相談しやすい雰囲気",
    description:
      "不安なことや気になることを、遠慮なくお話しいただける雰囲気づくりを大切にしています。",
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
        {/* 吹き出し（相談） */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
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
              className="bg-white rounded-xl p-6 md:p-7 text-center border border-[#DCEAF2] border-t-[3px] border-t-[#E8B818] hover:shadow-md transition-shadow duration-200"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FFF8E1] flex items-center justify-center text-[#2F9FD3]">
                {feature.icon}
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
