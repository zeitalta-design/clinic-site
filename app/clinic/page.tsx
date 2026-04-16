/**
 * クリニック紹介ページ
 * 院内の雰囲気・設備・特徴を紹介
 * 確認できていない設備情報は断定しない
 */

import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/common/PageHero";
import ClinicGallery from "@/components/clinic/ClinicGallery";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "クリニック紹介｜函館市美原の内科高橋清仁クリニック",
  description: "函館市美原にある内科高橋清仁クリニックの紹介。日本糖尿病学会専門医・日本内分泌学会専門医が在籍する糖尿病・甲状腺専門の内科です。駐車場18台完備、予約不要で通いやすい地域のかかりつけ医として診療しています。",
  keywords: [
    "内科高橋清仁クリニック",
    "函館市美原 内科",
    "函館 糖尿病 クリニック",
    "函館 甲状腺 クリニック",
    "糖尿病専門医 函館",
    "甲状腺専門医 函館",
    "函館 内科 専門医",
    "かかりつけ医 函館",
  ],
  alternates: { canonical: "/clinic" },
  openGraph: {
    title: "クリニック紹介｜函館市美原の内科高橋清仁クリニック",
    description: "日本糖尿病学会専門医・日本内分泌学会専門医が在籍。駐車場18台完備の通いやすい内科クリニック。",
    images: [{
      url: "/images/clinic/exterior.jpg",
      alt: "内科高橋清仁クリニック外観"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "クリニック紹介｜函館市美原の内科高橋清仁クリニック",
    description: "糖尿病・甲状腺を専門とする函館市美原の内科クリニック。",
    images: ["/images/clinic/exterior.jpg"],
  },
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
          {/* 理念・診療方針 */}
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-[#2F9FD3] mb-4">
              通いやすく、相談しやすいクリニックを目指して
            </h2>
            <p className="text-base md:text-lg text-[#333333] leading-relaxed max-w-2xl mx-auto mb-4">
              {SITE.name}
              は、函館市美原にある内科・糖尿病・代謝内科・内分泌内科のクリニックです。
              体調の変化や健康への不安を感じたとき、まず相談できる「かかりつけ医」として、
              丁寧な診療を大切にしています。
            </p>
            <p className="text-base md:text-lg text-[#333333] leading-relaxed max-w-2xl mx-auto">
              糖尿病や甲状腺疾患などの専門領域から、風邪・生活習慣病といった日常の内科診療まで、
              患者さまお一人おひとりの生活背景に寄り添った医療をご提供します。
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
            <h2 className="text-lg font-bold text-[#2F9FD3] text-center mb-6">
              当院の特徴
            </h2>
            <div className="bg-white border border-[#DCEAF2] rounded-xl p-6">
              <h3 className="font-bold text-[#2F9FD3] mb-2">
                火曜は夜間も診療
              </h3>
              <p className="text-base text-[#333333] leading-relaxed">
                火曜日は19:30まで診察しています。お仕事や学校の後でも受診しやすい体制です。
              </p>
            </div>
            <div className="bg-white border border-[#DCEAF2] rounded-xl p-6">
              <h3 className="font-bold text-[#2F9FD3] mb-2">
                駐車場完備（18台）
              </h3>
              <p className="text-base text-[#333333] leading-relaxed">
                敷地内に18台分の駐車場のほか、提携駐車場もご利用いただけます。お車でも安心してお越しください。
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
            <div className="bg-white border border-[#DCEAF2] rounded-xl p-6">
              <h3 className="font-bold text-[#2F9FD3] mb-2">
                専門医が在籍
              </h3>
              <p className="text-base text-[#333333] leading-relaxed">
                日本糖尿病学会専門医・日本内分泌学会専門医が在籍し、糖尿病や甲状腺疾患を中心に専門性の高い診療を行っています。
              </p>
            </div>
          </div>

          {/* 院長挨拶への導線 */}
          <div className="max-w-3xl mx-auto bg-[#EDF7FC] border border-[#DCEAF2] rounded-xl p-6 md:p-8 text-center">
            <h2 className="text-lg md:text-xl font-bold text-[#2F9FD3] mb-3">
              医師のご紹介
            </h2>
            <p className="text-base md:text-lg text-[#333333] leading-relaxed mb-5">
              院長・副院長それぞれの診療への思いや経歴・資格をご紹介しています。
            </p>
            <Link
              href="/director"
              className="inline-flex items-center gap-1 text-[#2F9FD3] font-bold hover:underline"
            >
              院長・副院長紹介を見る →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
