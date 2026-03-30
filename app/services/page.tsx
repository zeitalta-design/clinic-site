/**
 * 診療内容 一覧ページ（可読性統一版）
 */

import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/common/PageHero";
import { SERVICES } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "診療内容",
  description: "高橋清仁クリニックの診療内容一覧です。内科・糖尿病内科を中心に、気になる症状や健診結果についてご相談いただけます。",
  alternates: { canonical: "/services" },
};

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

      <section className="py-14 md:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-base md:text-lg text-[#333333] leading-relaxed max-w-2xl mx-auto mb-10">
            当院では内科・糖尿病内科を中心に、以下の診療を行っています。
            <br />
            気になる症状がございましたら、お気軽にご相談ください。
          </p>

          {/* カードグリッド */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 mb-12">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group block bg-white rounded-xl border border-[#DCEAF2] border-t-[3px] border-t-[#F3E33A] p-5 md:p-6 text-center hover:shadow-lg hover:border-[#46B7E8]/30 transition-all duration-200"
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
                <h3 className="text-base md:text-xl font-bold text-[#2F9FD3] mb-1.5">
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

        </div>
      </section>
    </>
  );
}
