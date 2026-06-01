/**
 * 患者様へのご案内ページ
 * 院内掲示物（施設基準・診療報酬の掲示事項）の Web 版。
 *
 * 後から項目を追加・編集できるよう、SECTIONS 配列で見出し単位に
 * 構造化している。新しい加算・基準を載せる場合は配列に追記するだけ。
 */

import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";

export const metadata: Metadata = {
  title: "患者様へのご案内",
  description:
    "内科高橋清仁クリニックの施設基準、診療報酬に関する掲示事項についてご案内しております。",
  alternates: { canonical: "/patient-information" },
};

/* ═══════════════════════════════════════════
   掲載項目データ
   - heading: H2 見出し
   - body:    冒頭の段落（複数段落対応・任意）
   - list:    番号付き箇条書き（任意）
   - footer:  リスト後の補足段落（任意）
   新しい項目を追加するときはこの配列に追記するだけ。
   ═══════════════════════════════════════════ */
type Section = {
  heading: string;
  body?: string[];
  list?: string[];
  footer?: string[];
};

const SECTIONS: Section[] = [
  {
    heading: "生活習慣病管理料",
    body: [
      "お薬の処方は、28日以上の長期投薬又はリフィル処方箋の交付を行っており、ご希望の方には、医師が患者様の状態に応じて適切に対応いたします。",
      "（向精神薬剤は従来通り30日までの処方となります。）",
    ],
  },
  {
    heading: "電子的診療情報連携体制整備加算",
    body: ["当院では、質の高い診療を実施するための体制を整備しております。"],
    list: [
      "オンライン請求を行っております。",
      "領収証の発行の際に診療報酬の算定項目の分かる詳細な明細書を患者様に無償で交付しております。",
      "オンライン資格確認を行う体制を有しております。",
      "オンライン資格確認システムにより取得した診療情報を診察室などで閲覧、活用できる体制を有しております。",
      "マイナポータルの医療情報に基づき、患者様からの健康管理に係る相談に応じる体制を有しております。",
    ],
  },
  {
    heading: "特定疾患療養管理料",
    body: [
      "当院では患者様の状態に応じ、28日以上の長期投薬処方又はリフィル処方箋の交付を行っております。",
      "ご希望の方には、医師が患者様の病状に応じて判断いたします。",
    ],
  },
];

export default function PatientInformationPage() {
  return (
    <>
      <PageHero
        title="患者様へのご案内"
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "患者様へのご案内" },
        ]}
      />

      <section className="py-14 md:py-16">
        <div className="max-w-3xl mx-auto px-4">
          {/* リード文 */}
          <p className="text-base md:text-lg text-[#333333] leading-relaxed mb-10">
            当院の施設基準および診療報酬に関する主な掲示事項をご案内いたします。
            ご不明な点がございましたら、受付までお気軽にお尋ねください。
          </p>

          {/* 項目一覧 */}
          <div className="space-y-10">
            {SECTIONS.map((section) => (
              <article
                key={section.heading}
                className="bg-[#EDF7FC] border border-[#DCEAF2] rounded-xl p-6 md:p-8"
              >
                <h2 className="text-xl md:text-2xl font-bold text-[#2F9FD3] mb-4 pb-3 border-b border-[#DCEAF2]">
                  {section.heading}
                </h2>

                {section.body && (
                  <div className="space-y-3">
                    {section.body.map((p, i) => (
                      <p
                        key={i}
                        className="text-base md:text-lg text-[#333333] leading-relaxed"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                )}

                {section.list && (
                  <ol className="mt-4 space-y-3 list-decimal list-outside pl-6 text-base md:text-lg text-[#333333] leading-relaxed marker:text-[#2F9FD3] marker:font-bold">
                    {section.list.map((item, i) => (
                      <li key={i} className="pl-1">
                        {item}
                      </li>
                    ))}
                  </ol>
                )}

                {section.footer && (
                  <div className="mt-4 space-y-3">
                    {section.footer.map((p, i) => (
                      <p
                        key={i}
                        className="text-base md:text-lg text-[#333333] leading-relaxed"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* 更新時期の補足（必要に応じて更新） */}
          <p className="mt-10 text-sm text-[#666666] text-right">
            掲載内容は院内掲示に基づき随時更新いたします。
          </p>
        </div>
      </section>
    </>
  );
}
