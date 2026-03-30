/**
 * 院長紹介ページ
 * 確認できていない医師情報は断定せず、安全な仮文言で構成
 */

import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import DirectorPhoto from "@/components/common/DirectorPhoto";

export const metadata: Metadata = {
  title: "院長紹介",
  description: "高橋清仁クリニックの院長紹介ページです。地域の皆さまが安心して相談できるクリニックを目指しています。",
  alternates: { canonical: "/director" },
};

export default function DirectorPage() {
  return (
    <>
      <PageHero
        title="院長紹介"
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "院長紹介" },
        ]}
      />

      <section className="py-14 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10 items-start mb-12">
            {/* 院長写真 */}
            <div className="md:col-span-2">
              <DirectorPhoto />
            </div>

            {/* ごあいさつ */}
            <div className="md:col-span-3">
              <h2 className="text-xl font-bold text-[#2F9FD3] mb-2">
                ごあいさつ
              </h2>
              <p className="text-base text-[#2F9FD3] font-medium mb-4">
                院長　高橋 清仁
              </p>
              <div className="text-base md:text-lg text-[#333333] leading-relaxed space-y-4">
                <p>
                  当院のホームページをご覧いただき、ありがとうございます。
                </p>
                <p>
                  高橋清仁クリニックは、函館市美原にある内科・糖尿病内科のクリニックです。
                  地域の皆さまの「かかりつけ医」として、体調のお悩みや不安に寄り添い、
                  丁寧な診療を心がけています。
                </p>
                <p>
                  「ちょっと体調が気になるけど、病院に行くほどかな？」
                  そんなときこそ、お気軽にご相談ください。
                  小さな不調も、早めの対応が大切です。
                </p>
                <p>
                  皆さまが安心して通えるクリニックを目指して、
                  スタッフ一同お待ちしております。
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
