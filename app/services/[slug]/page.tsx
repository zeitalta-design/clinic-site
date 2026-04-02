/**
 * 診療内容 詳細ページ（SEO強化版）
 *
 * CTA方針（B案採用）:
 * - ページ下部に1回だけ電話CTAを配置
 * - 「診察について」セクションはCTAなしの案内テキストのみ
 * - アクセス情報内の電話番号は情報表示として残す
 * - フッターCTAは共通で存在する
 *
 * SEO強化:
 * - 症状訴求ブロック（symptomAlert）
 * - 放置リスク説明（riskBlock）
 * - 受診の目安（consultGuide）
 * - 関連ページ内部リンク（additionalLinks）
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/common/PageHero";
import { SITE, HOURS_TABLE } from "@/lib/site";
import {
  getServiceBySlug,
  getAllServiceSlugs,
} from "@/lib/services-data";

/* ----- 静的パス生成 ----- */
export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

/* ----- メタデータ ----- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "ページが見つかりません" };
  return {
    title: { absolute: service.seoTitle },
    description: service.metaDescription,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: service.seoTitle,
      description: service.metaDescription,
    },
  };
}

/* ----- ページ本体 ----- */
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <PageHero
        title={service.h1}
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "診療内容", href: "/services" },
          { label: service.title },
        ]}
      />

      <article className="py-14 md:py-16">
        <div className="max-w-3xl mx-auto px-4 space-y-12">
          {/* --- 導入文 --- */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-[#EDF7FC] flex items-center justify-center shrink-0">
                <svg
                  className="w-6 h-6 text-[#2F9FD3]"
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
              <h2 className="text-2xl md:text-3xl font-bold text-[#2F9FD3]">
                {service.title}
              </h2>
            </div>
            <p className="text-base md:text-lg text-[#333333] leading-relaxed">
              {service.introduction}
            </p>
          </section>

          {/* --- 症状訴求ブロック（SEO強化） --- */}
          {service.symptomAlert && (
            <section className="bg-[#FFF8E1] rounded-xl p-6 md:p-8 border border-[#E8B818]/20">
              <h3 className="text-xl md:text-2xl font-bold text-[#333333] mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-[#E8B818]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                {service.symptomAlert.heading}
              </h3>
              <ul className="space-y-2.5 mb-4">
                {service.symptomAlert.symptoms.map((s, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-base md:text-lg text-[#333333]">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-[#E8B818] shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
              <p className="text-base text-[#4B5563] leading-relaxed">
                {service.symptomAlert.message}
              </p>
            </section>
          )}

          {/* --- こんなことで気になる方へ --- */}
          <section className="bg-[#FFF8E1] rounded-xl p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-[#2F9FD3] mb-5">
              こんなことが気になっていませんか？
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.concerns.map((c, i) => (
                <li key={i} className="flex items-start gap-2.5 text-base md:text-lg text-[#333333]">
                  <span className="mt-2 w-2.5 h-2.5 rounded-full bg-[#E5C71D] shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </section>

          {/* --- 放置リスク説明ブロック（SEO強化） --- */}
          {service.riskBlock && (
            <section>
              <h3 className="text-xl md:text-2xl font-bold text-[#2F9FD3] mb-4">
                {service.riskBlock.heading}
              </h3>
              <div className="bg-white border border-[#DCEAF2] rounded-xl p-6 md:p-8">
                {service.riskBlock.paragraphs.map((p, i) => (
                  <p key={i} className="text-base md:text-lg text-[#333333] leading-relaxed mb-3 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* --- クリニックでご相談いただけること --- */}
          <section>
            <h3 className="text-xl md:text-2xl font-bold text-[#2F9FD3] mb-5">
              当院でご相談いただけること
            </h3>
            <div className="bg-[#EDF7FC] rounded-xl p-6 md:p-8">
              <ul className="space-y-3.5">
                {service.consultations.map((c, i) => (
                  <li key={i} className="flex items-start gap-3 text-base md:text-lg text-[#333333]">
                    <svg
                      className="w-5 h-5 text-[#2F9FD3] mt-1 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4 text-base text-[#4B5563] leading-relaxed">
              {service.closingMessage}
            </p>
          </section>

          {/* --- 追加コンテンツセクション（SEO強化） --- */}
          {service.extraSections && service.extraSections.length > 0 && (
            <div className="space-y-8">
              {service.extraSections.map((sec, i) => (
                <section key={i}>
                  <h3 className="text-xl md:text-2xl font-bold text-[#2F9FD3] mb-3">
                    {sec.heading}
                  </h3>
                  <p className="text-base md:text-lg text-[#333333] leading-relaxed">
                    {sec.content}
                  </p>
                </section>
              ))}
            </div>
          )}

          {/* --- 受診の目安ブロック（SEO強化） --- */}
          {service.consultGuide && (
            <section className="bg-[#EDF7FC] rounded-xl p-6 md:p-8 border border-[#46B7E8]/20">
              <h3 className="text-xl md:text-2xl font-bold text-[#2F9FD3] mb-4">
                {service.consultGuide.heading}
              </h3>
              <p className="text-base text-[#333333] mb-4">
                以下のような場合は、一度ご相談ください。
              </p>
              <ul className="space-y-2.5 mb-4">
                {service.consultGuide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-base md:text-lg text-[#333333]">
                    <svg className="w-5 h-5 text-[#2F9FD3] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-base text-[#4B5563] leading-relaxed">
                {service.consultGuide.message}
              </p>
            </section>
          )}

          {/* --- 補足ブロック（例: 女性に多い症状） --- */}
          {service.supplementBlock && (
            <section className="bg-[#FFF8E1] rounded-xl p-6 md:p-8 border border-[#E8B818]/20">
              <h3 className="text-xl md:text-2xl font-bold text-[#333333] mb-4">
                {service.supplementBlock.heading}
              </h3>
              {service.supplementBlock.paragraphs.map((p, i) => (
                <p key={i} className="text-base md:text-lg text-[#333333] leading-relaxed mb-3 last:mb-0">
                  {p}
                </p>
              ))}
            </section>
          )}

          {/* --- 診察について（案内テキストのみ、CTAなし） --- */}
          <section className="bg-white border border-[#DCEAF2] rounded-xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-[#2F9FD3] mb-3">
              診察について
            </h3>
            <p className="text-base md:text-lg text-[#333333] leading-relaxed">
              当院は予約制ではなく、直接ご来院いただけます。
              受付順でのご案内となりますので、初めての方も安心してお越しください。
              混雑時にはお待ちいただく場合がありますので、あらかじめご了承ください。
            </p>
          </section>

          {/* --- 関連ページ内部リンク（SEO強化） --- */}
          {service.additionalLinks && service.additionalLinks.length > 0 && (
            <section>
              <h3 className="text-xl font-bold text-[#2F9FD3] mb-4">
                関連するご案内
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {service.additionalLinks.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="block bg-[#F8FCFE] border border-[#DCEAF2] rounded-xl p-4 hover:shadow-md hover:border-[#46B7E8]/30 transition-all duration-200"
                  >
                    <p className="text-[#2F9FD3] font-bold text-base mb-1">
                      {link.label}
                    </p>
                    <p className="text-sm text-[#4B5563] leading-relaxed">
                      {link.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* --- アクセス案内（情報表示、CTAではない） --- */}
          <section className="bg-[#F8FCFE] rounded-xl p-6 md:p-8 border border-[#DCEAF2]">
            <h3 className="text-xl font-bold text-[#2F9FD3] mb-3">
              アクセス
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base text-[#333333] mb-4">
              <div className="space-y-1.5">
                <p className="font-medium">{SITE.name}</p>
                <p>
                  {SITE.zip} {SITE.address}
                </p>
                <p className="text-[#2F9FD3] font-bold">
                  TEL {SITE.phone}
                </p>
              </div>
              <div className="space-y-1.5">
                <p>{SITE.access}</p>
                <p>{SITE.parking}</p>
                <p className="text-[#4B5563] text-base mt-1">
                  {HOURS_TABLE.notes[0]}
                </p>
              </div>
            </div>
            <Link
              href="/access"
              className="text-[#2F9FD3] text-base font-medium hover:underline"
            >
              アクセスの詳細を見る →
            </Link>
          </section>

          {/* --- 共通導線（全ページ共通） --- */}
          <section className="bg-[#EDF7FC] rounded-xl p-6 md:p-8">
            <h3 className="text-lg font-bold text-[#2F9FD3] mb-4 text-center">
              ご受診をお考えの方へ
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Link
                href="/first"
                className="block bg-white border border-[#DCEAF2] rounded-lg p-3 text-center hover:shadow-md transition-shadow"
              >
                <p className="text-sm font-bold text-[#2F9FD3]">初めての方へ</p>
                <p className="text-xs text-[#4B5563] mt-1">初診のご案内</p>
              </Link>
              <Link
                href="/access"
                className="block bg-white border border-[#DCEAF2] rounded-lg p-3 text-center hover:shadow-md transition-shadow"
              >
                <p className="text-sm font-bold text-[#2F9FD3]">アクセス</p>
                <p className="text-xs text-[#4B5563] mt-1">診察時間・地図</p>
              </Link>
              <Link
                href="/director"
                className="block bg-white border border-[#DCEAF2] rounded-lg p-3 text-center hover:shadow-md transition-shadow"
              >
                <p className="text-sm font-bold text-[#2F9FD3]">医師紹介</p>
                <p className="text-xs text-[#4B5563] mt-1">院長・副院長</p>
              </Link>
              <Link
                href="/services"
                className="block bg-white border border-[#DCEAF2] rounded-lg p-3 text-center hover:shadow-md transition-shadow"
              >
                <p className="text-sm font-bold text-[#2F9FD3]">診療内容一覧</p>
                <p className="text-xs text-[#4B5563] mt-1">全診療科目</p>
              </Link>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
