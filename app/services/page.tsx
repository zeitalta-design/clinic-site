/**
 * 診療内容 一覧ページ（ハブページ）
 * 全診療科目を網羅し、各詳細ページへの導線を提供
 */

import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/common/PageHero";
import { SERVICES } from "@/lib/services-data";

export const metadata: Metadata = {
  title: { absolute: "函館市美原の診療内容一覧｜内科高橋清仁クリニック" },
  description:
    "函館市美原の内科高橋清仁クリニックの診療内容です。糖尿病・甲状腺・内分泌疾患・高血圧・脂質異常症・肥満症・生活習慣病・内科全般まで幅広く診療しております。",
  alternates: { canonical: "/services" },
};

/** 診療カテゴリ分類 */
const CATEGORIES = [
  {
    label: "専門診療",
    description: "糖尿病専門医・内分泌専門医・肥満専門医が在籍しています。",
    slugs: ["diabetes", "thyroid", "endocrine", "obesity"],
  },
  {
    label: "生活習慣病",
    description: "健診で指摘された方、数値が気になる方はご相談ください。",
    slugs: ["hypertension", "dyslipidemia", "lifestyle-disease"],
  },
  {
    label: "一般内科",
    description: "かぜ、発熱、体調不良など、日常的な症状に幅広く対応しています。",
    slugs: ["internal-medicine"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="診療内容"
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "診療内容" },
        ]}
      />

      <section className="py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          {/* 導入文 */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-base md:text-lg text-[#333333] leading-relaxed">
              内科高橋清仁クリニックでは、糖尿病・甲状腺・内分泌疾患をはじめ、
              高血圧・脂質異常症・肥満症などの生活習慣病、
              内科全般まで幅広く診療しております。
            </p>
            <p className="text-base text-[#4B5563] mt-3">
              「何科に行けばよいかわからない」という場合も、まずはお気軽にご相談ください。
            </p>
          </div>

          {/* カテゴリ別表示 */}
          <div className="space-y-12">
            {CATEGORIES.map((cat) => (
              <div key={cat.label}>
                <div className="mb-5">
                  <h2 className="text-xl md:text-2xl font-bold text-[#2F9FD3] mb-1">
                    {cat.label}
                  </h2>
                  <p className="text-sm md:text-base text-[#4B5563]">
                    {cat.description}
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {cat.slugs.map((slug) => {
                    const service = SERVICES.find((s) => s.slug === slug);
                    if (!service) return null;
                    return (
                      <Link
                        key={slug}
                        href={`/services/${slug}`}
                        className="group block bg-[#F8FCFE] rounded-xl border border-[#DCEAF2] border-t-[3px] border-t-[#E8B818] p-5 text-center hover:shadow-lg hover:border-[#46B7E8]/30 hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#FFF8E1] flex items-center justify-center group-hover:bg-[#46B7E8] transition-colors duration-200">
                          <svg
                            className="w-6 h-6 text-[#2F9FD3] group-hover:text-white transition-colors duration-200"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.8}
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d={service.iconPath}
                            />
                          </svg>
                        </div>
                        <h3 className="text-base font-bold text-[#2F9FD3] mb-1 leading-snug">
                          {service.title.replace("について", "")}
                        </h3>
                        <p className="text-sm text-[#4B5563] leading-relaxed mb-2">
                          {service.cardDescription}
                        </p>
                        <span className="inline-block text-sm text-[#2F9FD3] font-medium group-hover:underline">
                          詳しく見る →
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* 受診案内導線 */}
          <div className="mt-14 bg-[#EDF7FC] rounded-xl p-6 md:p-8 text-center">
            <h2 className="text-lg md:text-xl font-bold text-[#2F9FD3] mb-3">
              初めて受診される方へ
            </h2>
            <p className="text-base text-[#333333] mb-4">
              当院は予約不要です。初診の方もお気軽にお越しください。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/first"
                className="inline-block px-6 py-3 bg-[#46B7E8] text-white font-bold rounded-lg hover:opacity-90 transition-opacity text-base"
              >
                初診のご案内 →
              </Link>
              <Link
                href="/access"
                className="inline-block px-6 py-3 bg-white text-[#2F9FD3] font-bold rounded-lg border border-[#DCEAF2] hover:bg-[#F8FCFE] transition-colors text-base"
              >
                アクセス・診察時間 →
              </Link>
              <Link
                href="/director"
                className="inline-block px-6 py-3 bg-white text-[#2F9FD3] font-bold rounded-lg border border-[#DCEAF2] hover:bg-[#F8FCFE] transition-colors text-base"
              >
                医師紹介 →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
