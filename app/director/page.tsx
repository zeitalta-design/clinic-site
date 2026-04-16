/**
 * 院長・副院長紹介ページ
 * 画像なし・医師2名構成・信頼感重視のシンプルレイアウト
 */

import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "院長・副院長紹介｜日本糖尿病学会専門医・日本内分泌学会専門医" },
  description: "内科高橋清仁クリニックの院長 高橋清仁医師と副院長 高橋清彦医師の紹介。日本糖尿病学会専門医・日本内分泌学会専門医が糖尿病・甲状腺疾患を専門に診療しています。",
  keywords: [
    "内科高橋清仁クリニック 院長",
    "高橋清仁 医師",
    "高橋清彦 医師",
    "糖尿病専門医 函館",
    "甲状腺専門医 函館",
    "函館 内科 医師紹介",
    "日本糖尿病学会専門医 函館",
  ],
  alternates: { canonical: "/director" },
  openGraph: {
    title: "院長・副院長紹介｜日本糖尿病学会専門医・日本内分泌学会専門医",
    description: "日本糖尿病学会専門医・日本内分泌学会専門医が在籍する函館市美原の内科クリニック。",
    images: [{ url: "/images/clinic/exterior.jpg", alt: "内科高橋清仁クリニック" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "院長・副院長紹介｜日本糖尿病学会専門医・日本内分泌学会専門医",
    description: "日本糖尿病学会専門医・日本内分泌学会専門医が在籍。",
    images: ["/images/clinic/exterior.jpg"],
  },
};

/** Physician JSON-LD */
const physicianJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: "高橋 清仁",
    jobTitle: "院長",
    medicalSpecialty: ["内科", "糖尿病・代謝内科", "内分泌内科"],
    qualifications: ["医学博士", "日本内科学会 認定医", "日本糖尿病学会 専門医", "日本内分泌学会 専門医"],
    worksFor: { "@type": "MedicalClinic", name: SITE.name, url: SITE.url },
  },
  {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: "高橋 清彦",
    jobTitle: "副院長",
    medicalSpecialty: ["内科", "糖尿病・代謝内科", "内分泌内科"],
    qualifications: ["医学博士", "日本内科学会 認定内科医・総合内科専門医", "日本糖尿病学会 専門医・指導医", "日本内分泌学会 専門医・指導医", "日本肥満学会 専門医"],
    worksFor: { "@type": "MedicalClinic", name: SITE.name, url: SITE.url },
  },
];

export default function DirectorPage() {
  return (
    <>
      {physicianJsonLd.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}
      <PageHero
        title="院長・副院長紹介"
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "院長・副院長紹介" },
        ]}
      />

      <section className="py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="space-y-16 md:space-y-20">
            {/* 院長 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#2F9FD3] border-b-2 border-[#46B7E8] pb-3 mb-4">
                院長　高橋 清仁
              </h2>
              <p className="text-base md:text-lg text-[#333333] leading-relaxed mb-8">
                1994年の開院以来、地域の皆さまの健康を支える「かかりつけ医」として診療を続けてまいりました。
                医療を取り巻く環境は時代とともに変化しておりますが、「安心して相談できる身近な医療」を大切にし、日々の診療に取り組んでおります。
                長年通院されている方はもちろん、初めて受診される方にも不安なくお越しいただけるよう、丁寧でわかりやすい説明と、落ち着いた医療環境づくりを心がけております。
                これからも地域に根ざした医療機関として、皆さまに信頼される存在であり続けられるよう努めてまいります。どうぞよろしくお願いいたします。
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-[#333333] mb-3">経歴</h3>
                  <ul className="list-disc list-inside space-y-1.5 text-[#333333] text-base md:text-lg leading-relaxed">
                    <li>弘前大学卒業</li>
                    <li>函館市医師会病院</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#333333] mb-3">資格</h3>
                  <ul className="list-disc list-inside space-y-2 text-[#333333] text-base md:text-lg leading-relaxed">
                    <li>医学博士</li>
                    <li>日本内科学会 認定医</li>
                    <li>日本糖尿病学会 専門医</li>
                    <li>日本内分泌学会 専門医</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 副院長 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#2F9FD3] border-b-2 border-[#46B7E8] pb-3 mb-4">
                副院長　高橋 清彦
              </h2>
              <p className="text-base md:text-lg text-[#333333] leading-relaxed mb-8">
                函館出身として、地域の皆さまの健康に貢献したいという思いから、この地で診療に携わっております。
                これまで内科・糖尿病・内分泌代謝領域を中心に幅広い診療経験を重ねてまいりました。
                糖尿病や甲状腺疾患、副腎・下垂体疾患などの内分泌疾患は、長期的な管理が必要となることが多く、患者さま一人ひとりの生活背景に寄り添った医療が重要であると考えております。
                専門性を活かしながらも、わかりやすく丁寧な説明を心がけ、安心して通っていただけるクリニックを目指しております。
                また、風邪や生活習慣病など内科全般の診療にも対応しておりますので、どんな些細なことでもお気軽にご相談ください。
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-[#333333] mb-3">経歴</h3>
                  <ul className="list-disc list-inside space-y-1.5 text-[#333333] text-base md:text-lg leading-relaxed">
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
                  <h3 className="text-lg font-bold text-[#333333] mb-3">資格</h3>
                  <ul className="list-disc list-inside space-y-2 text-[#333333] text-base md:text-lg leading-relaxed">
                    <li>医学博士</li>
                    <li>日本内科学会 認定内科医・総合内科専門医</li>
                    <li>日本糖尿病学会 専門医・指導医</li>
                    <li>日本内分泌学会 専門医・指導医</li>
                    <li>日本肥満学会 専門医</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <p className="text-base md:text-lg text-[#333333] leading-relaxed mt-16 md:mt-20 pt-10 border-t border-[#DCEAF2]">
            患者さま一人ひとりの状態に合わせ、分かりやすい説明と丁寧な診療を心がけています。
          </p>
        </div>
      </section>
    </>
  );
}
