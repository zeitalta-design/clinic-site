/**
 * 診療内容 一覧ページ
 * カードグリッド（8区分）→ 各 /services/[slug] 詳細ページへ
 */

import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/common/PageHero";

export const metadata: Metadata = {
  title: "診療内容",
  description:
    "内科 高橋清仁クリニックの診療内容です。糖尿病・内分泌疾患・肥満症・生活習慣病・内科全般まで幅広く診療しております。",
  alternates: { canonical: "/services" },
};

/** 診療項目カードデータ */
const SERVICE_CARDS = [
  {
    slug: "diabetes",
    title: "糖尿病",
    description: "血糖値が気になる方へ",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
  {
    slug: "endocrine",
    title: "内分泌疾患",
    description: "ホルモンの不調が気になる方へ",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  },
  {
    slug: "obesity",
    title: "肥満",
    description: "肥満症の診療・ご相談",
    icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
  },
  {
    slug: "internal-medicine",
    title: "内科全般",
    description: "体調がすぐれないときに",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    slug: "lifestyle-disease",
    title: "生活習慣病",
    description: "健診結果が気になる方へ",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
] as const;

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
          <p className="text-center text-base md:text-lg text-[#333333] leading-relaxed max-w-2xl mx-auto mb-10">
            糖尿病・内分泌疾患・肥満症をはじめ、内科全般まで幅広く診療しております。
            <br />
            気になる症状がございましたら、お気軽にご相談ください。
          </p>

          {/* カードグリッド */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {SERVICE_CARDS.map((card) => (
              <Link
                key={card.slug}
                href={`/services/${card.slug}`}
                className="group block bg-[#F8FCFE] rounded-xl border border-[#DCEAF2] border-t-[3px] border-t-[#F3E33A] p-5 md:p-6 text-center hover:shadow-lg hover:border-[#46B7E8]/30 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#FFFBEB] flex items-center justify-center group-hover:bg-[#46B7E8] transition-colors duration-200">
                  <svg
                    className="w-7 h-7 text-[#2F9FD3] group-hover:text-white transition-colors duration-200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={card.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-base md:text-lg font-bold text-[#2F9FD3] mb-1.5 leading-snug">
                  {card.title}
                </h3>
                <p className="text-sm md:text-base text-[#4B5563] leading-relaxed">
                  {card.description}
                </p>
                <span className="inline-block mt-3 text-base text-[#2F9FD3] font-medium group-hover:underline group-hover:translate-x-0.5 transition-transform">
                  詳しく見る →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
