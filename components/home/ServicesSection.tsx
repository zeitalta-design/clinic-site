/**
 * 診療内容セクション（高齢者可読性対応版）
 * カードタイトル・説明文を大きく、アイコンを視認しやすく
 */

import Link from "next/link";
import SectionTitle from "@/components/common/SectionTitle";
import { SERVICES } from "@/lib/services-data";

/** トップページに表示する8項目（診療内容ページと同じ） */
const TOP_SLUGS = [
  "diabetes",
  "endocrine",
  "obesity",
  "internal-medicine",
  "lifestyle-disease",
] as const;

export default function ServicesSection() {
  const topServices = TOP_SLUGS.map((slug) =>
    SERVICES.find((s) => s.slug === slug)
  ).filter((service): service is NonNullable<typeof service> => Boolean(service));

  return (
    <section className="py-16 md:py-20 bg-white" aria-label="診療内容">
      <div className="max-w-5xl mx-auto px-4">
        <SectionTitle english="Services" japanese="診療内容" />

        <p className="text-center text-base md:text-lg text-[#4B5563] mb-8 -mt-4">
          糖尿病や内分泌疾患の専門診療から、風邪・高血圧・生活習慣病など内科全般までご相談いただけます。
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 mb-10">
          {topServices.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
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
                    d={service.iconPath}
                  />
                </svg>
              </div>
              <h3 className="text-base md:text-lg font-bold text-[#2F9FD3] mb-1.5 leading-snug">
                {service.title.replace("について", "")}
              </h3>
              <p className="text-sm md:text-base text-[#4B5563] leading-relaxed">
                {service.cardDescription}
              </p>
              <span className="inline-block mt-3 text-base text-[#2F9FD3] font-medium group-hover:underline group-hover:translate-x-0.5 transition-transform">
                詳しく見る →
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 px-6 py-3 border-2 border-[#46B7E8] text-[#2F9FD3] font-bold rounded-lg hover:bg-[#46B7E8] hover:text-white transition-colors text-base"
          >
            診療内容の一覧を見る
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
