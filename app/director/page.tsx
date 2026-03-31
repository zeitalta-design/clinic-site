/**
 * 院長・副院長紹介ページ
 * 画像なし・医師2名構成・信頼感重視のシンプルレイアウト
 */

import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";

export const metadata: Metadata = {
  title: "院長・副院長紹介",
  description:
    "高橋清仁クリニックの院長・副院長紹介ページです。地域の皆さまが安心して相談できるクリニックを目指しています。",
  alternates: { canonical: "/director" },
};

export default function DirectorPage() {
  return (
    <>
      <PageHero
        title="院長・副院長紹介"
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "院長・副院長紹介" },
        ]}
      />

      <section className="py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4">
          {/* 説明文 */}
          <p className="text-base md:text-lg text-[#333333] leading-relaxed mb-14 md:mb-16">
            当院では、専門性と経験を活かし、地域の皆さまに安心してご相談いただける診療を大切にしています。
          </p>

          <div className="space-y-16 md:space-y-20">
            {/* 院長 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#2F9FD3] border-b-2 border-[#46B7E8] pb-3 mb-4">
                院長　高橋 清仁
              </h2>
              <p className="text-sm md:text-base text-[#666666] mb-8">
                地域に根ざした丁寧な診療を大切にしています。
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-[#333333] mb-3">
                    経歴
                  </h3>
                  <ul className="list-disc list-inside space-y-1.5 text-[#333333] text-base leading-relaxed">
                    <li>弘前大学卒業</li>
                    <li>函館市医師会病院</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#333333] mb-3">
                    資格
                  </h3>
                  <ul className="list-disc list-inside space-y-1.5 text-[#333333] text-base leading-relaxed">
                    <li>日本内科学会認定医</li>
                    <li>日本糖尿病学会専門医</li>
                    <li>日本内分泌学会専門医</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 副院長 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#2F9FD3] border-b-2 border-[#46B7E8] pb-3 mb-4">
                副院長　高橋 清彦
              </h2>
              <p className="text-sm md:text-base text-[#666666] mb-8">
                内科・糖尿病・内分泌代謝分野を中心に幅広い診療経験を有しています。
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-[#333333] mb-3">
                    経歴
                  </h3>
                  <ul className="list-disc list-inside space-y-1.5 text-[#333333] text-base leading-relaxed">
                    <li>金沢医科大学卒業</li>
                    <li>市立札幌病院</li>
                    <li>釧路赤十字病院</li>
                    <li>滝川市立病院</li>
                    <li>北海道大学病院 内科II</li>
                    <li>帯広厚生病院</li>
                    <li>函館中央病院</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#333333] mb-3">
                    資格
                  </h3>
                  <ul className="list-disc list-inside space-y-1.5 text-[#333333] text-base leading-relaxed">
                    <li>医学博士</li>
                    <li>日本内科学会認定医</li>
                    <li>日本内科学会総合内科専門医</li>
                    <li>日本糖尿病学会専門医</li>
                    <li>日本内分泌学会専門医</li>
                    <li>日本肥満学会専門医</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 締めの一文 */}
          <p className="text-base md:text-lg text-[#333333] leading-relaxed mt-16 md:mt-20 pt-10 border-t border-[#DCEAF2]">
            患者さま一人ひとりの状態に合わせ、分かりやすい説明と丁寧な診療を心がけています。
          </p>
        </div>
      </section>
    </>
  );
}
