/**
 * 診療内容 詳細ページ（CTA整理・可読性統一版）
 *
 * CTA方針（B案採用）:
 * - ページ下部に1回だけ電話CTAを配置
 * - 「初めての方へ」セクションはCTAなしの案内テキストのみ
 * - アクセス情報内の電話番号は情報表示として残す
 * - フッターCTAは共通で存在する
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/common/PageHero";
import { SITE, HOURS_TABLE } from "@/lib/site";
import {
  getServiceBySlug,
  getAllServiceSlugs,
  SERVICES,
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
    title: service.seoTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${service.seoTitle}｜高橋清仁クリニック`,
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

          {/* --- こんなことで気になる方へ --- */}
          <section className="bg-[#FFFEF5] rounded-xl p-6 md:p-8">
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

          {/* --- 初めての方へ（案内テキストのみ、CTAなし） --- */}
          <section className="bg-white border border-[#DCEAF2] rounded-xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-[#2F9FD3] mb-3">
              初めての方へ
            </h3>
            <p className="text-base md:text-lg text-[#333333] leading-relaxed">
              当院は予約なしでも受診いただけます。事前にお電話いただくと、
              待ち時間が少なくなる場合がございます。
              保険証（またはマイナンバーカード）をお持ちのうえ、お気軽にお越しください。
            </p>
          </section>

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

          {/* --- ナビゲーション + 関連リンク --- */}
          <section className="space-y-6">
            <div className="flex flex-wrap justify-center gap-4 text-base">
              <Link
                href="/services"
                className="text-[#2F9FD3] font-medium hover:underline"
              >
                ← 診療内容一覧に戻る
              </Link>
            </div>

            {/* 関連する診療内容（SEO内部リンク強化） */}
            <div>
              <h3 className="text-lg font-bold text-[#2F9FD3] mb-2 text-center">
                関連するご相談
              </h3>
              <p className="text-base text-[#4B5563] text-center mb-4">
                {service.relatedText}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {service.relatedSlugs
                  .map((rs) => SERVICES.find((s) => s.slug === rs))
                  .filter(Boolean)
                  .map((s) => (
                    <Link
                      key={s!.slug}
                      href={`/services/${s!.slug}`}
                      className="block bg-[#EDF7FC] rounded-lg px-4 py-4 hover:bg-[#d4ecf3] transition-colors"
                    >
                      <p className="text-base font-bold text-[#2F9FD3] mb-1">
                        {s!.title.replace("について", "")}
                      </p>
                      <p className="text-sm text-[#4B5563]">
                        {s!.cardDescription}
                      </p>
                    </Link>
                  ))}
              </div>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
