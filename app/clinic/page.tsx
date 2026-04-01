/**
 * クリニック紹介ページ
 * 院内の雰囲気・設備・特徴を紹介
 * 確認できていない設備情報は断定しない
 */

import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import ClinicGallery from "@/components/clinic/ClinicGallery";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "クリニック紹介",
  description: "内科 高橋清仁クリニックの院内やアクセス情報、通いやすさについてご案内します。函館市美原、駐車場29台完備。",
  alternates: { canonical: "/clinic" },
};

export default function ClinicPage() {
  return (
    <>
      <PageHero
        title="クリニック紹介"
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "クリニック紹介" },
        ]}
      />

      <section className="py-14 md:py-16">
        <div className="max-w-5xl mx-auto px-4">
          {/* 理念 */}
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-[#2F9FD3] mb-4">
              通いやすく、相談しやすいクリニックを目指して
            </h2>
            <p className="text-base md:text-lg text-[#333333] leading-relaxed max-w-2xl mx-auto">
              {SITE.name}
              は、地域の皆さまが安心して受診できる場所でありたいと考えています。
              体調の変化や健康への不安を感じたとき、まず相談できる「かかりつけ医」として、
              丁寧な診療を大切にしています。
            </p>
          </div>

          {/* 院内ギャラリー */}
          <div className="mb-14">
            <h2 className="text-lg font-bold text-[#2F9FD3] mb-6 text-center">
              院内のご紹介
            </h2>
            <ClinicGallery />
          </div>

          {/* 特徴カード */}
          <div className="space-y-6 mb-12 max-w-3xl mx-auto">
            <div className="bg-white border border-[#DCEAF2] rounded-xl p-6">
              <h3 className="font-bold text-[#2F9FD3] mb-2">
                火曜は夜間も診療
              </h3>
              <p className="text-base text-[#333333] leading-relaxed">
                火曜日は19:30まで診療しています。お仕事や学校の後でも受診しやすい体制です。
              </p>
            </div>
            <div className="bg-white border border-[#DCEAF2] rounded-xl p-6">
              <h3 className="font-bold text-[#2F9FD3] mb-2">
                駐車場29台完備
              </h3>
              <p className="text-base text-[#333333] leading-relaxed">
                29台分の駐車場を完備しています。お車でも安心してお越しいただけます。
              </p>
            </div>
            <div className="bg-white border border-[#DCEAF2] rounded-xl p-6">
              <h3 className="font-bold text-[#2F9FD3] mb-2">
                予約不要で受診可能
              </h3>
              <p className="text-base text-[#333333] leading-relaxed">
                当院は予約制ではなく、直接ご来院いただけます。受付順でのご案内です。
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
