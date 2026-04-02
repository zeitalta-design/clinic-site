/**
 * 初診の方へページ
 * 持ち物・来院の流れ・予約について
 */

import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import CallButton from "@/components/common/CallButton";
import FaqSection from "@/components/common/FaqSection";
import { SITE, HOURS_TABLE } from "@/lib/site";
import { FIRST_VISIT_FAQ } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "初診の方へ",
  description: "初めて受診される方へのご案内です。予約制ではなく直接ご来院いただけます。気になる症状があればまずはお気軽にご相談ください。",
  alternates: { canonical: "/first" },
};

export default function FirstVisitPage() {
  return (
    <>
      <PageHero
        title="初診の方へ"
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "初診の方へ" },
        ]}
      />

      <section className="py-14 md:py-16">
        <div className="max-w-3xl mx-auto px-4 space-y-12">
          {/* 初めて受診される方へ */}
          <div className="bg-[#FFFEF5] border border-[#F3E33A]/30 rounded-xl p-6">
            <h2 className="text-lg font-bold text-[#2F9FD3] mb-3">
              初めて受診される方へ
            </h2>
            <p className="text-base md:text-lg text-[#333333] leading-relaxed mb-4">
              初診の方は、受付終了時間の1時間前までにご来院をお願いいたします。
              診察内容によりお時間を要する場合があるため、お時間に余裕をもってお越しください。
            </p>
            <CallButton variant="accent" />
          </div>

          {/* 甲状腺の検査について */}
          <div className="bg-[#EDF7FC] border border-[#DCEAF2] rounded-xl p-6">
            <h2 className="text-lg font-bold text-[#2F9FD3] mb-3">
              甲状腺の検査について
            </h2>
            <p className="text-base md:text-lg text-[#333333] leading-relaxed">
              甲状腺疾患の診察では、結果のご説明までに2時間前後お時間をいただく場合がございます。あらかじめご了承ください。
            </p>
          </div>

          {/* 来院の流れ */}
          <div>
            <h2 className="text-lg font-bold text-[#2F9FD3] mb-6">
              来院の流れ
            </h2>
            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: "受付",
                  desc: "保険証（またはマイナンバーカード）をお持ちのうえ、受付窓口にお越しください。初診の方は問診票のご記入をお願いします。",
                },
                {
                  step: 2,
                  title: "問診・診察",
                  desc: "症状やお悩みについて、医師が丁寧にお話を伺います。気になることは何でもお気軽にお伝えください。",
                },
                {
                  step: 3,
                  title: "お会計",
                  desc: "診察が終わりましたら、受付にてお会計をお済ませください。お薬がある場合は処方せんをお渡しします。",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F3E33A] text-[#333333] flex items-center justify-center text-lg font-bold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2F9FD3] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-base text-[#333333] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 持ち物 */}
          <div>
            <h2 className="text-lg font-bold text-[#2F9FD3] mb-4">
              お持ちいただくもの
            </h2>
            <div className="bg-[#EDF7FC] rounded-xl p-6">
              <ul className="space-y-4 text-base md:text-lg text-[#333333]">
                {[
                  {
                    item: "健康保険証（またはマイナンバーカード）",
                    note: "ご来院の際は必ずお持ちください",
                  },
                  {
                    item: "お薬手帳",
                    note: "現在お薬を服用中の方はお持ちください",
                  },
                  {
                    item: "健康診断の結果",
                    note: "健診で指摘を受けた方はお持ちください",
                  },
                  {
                    item: "紹介状",
                    note: "他院からの紹介がある方はお持ちください",
                  },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-2 w-2.5 h-2.5 rounded-full bg-[#46B7E8] shrink-0" />
                    <div>
                      <span className="font-medium">{item.item}</span>
                      <br />
                      <span className="text-[#4B5563] text-sm">
                        {item.note}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 診察時間 */}
          <div>
            <h2 className="text-lg font-bold text-[#2F9FD3] mb-4">
              診察時間
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-base border-collapse border border-[#DCEAF2]">
                <thead>
                  <tr className="bg-[#46B7E8] text-white">
                    {HOURS_TABLE.header.map((h, i) => (
                      <th key={i} className="px-3 py-2 text-center font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {HOURS_TABLE.rows.map((row, i) => (
                    <tr key={i} className="border-b border-[#DCEAF2]">
                      <td className="px-3 py-3 font-medium whitespace-nowrap">
                        {row.label}
                      </td>
                      {row.cells.map((cell, j) => (
                        <td
                          key={j}
                          className={`text-center py-3 font-medium ${
                            cell === "○"
                              ? "text-[#2F9FD3]"
                              : cell === "×"
                                ? "text-gray-400"
                                : cell === "●"
                                  ? "text-[#2F9FD3]"
                                  : "text-[#F3E33A]"
                          }`}
                        >
                          {cell === "●" ? (
                            <span
                              className="inline-block text-sm md:text-base leading-none text-[#2F9FD3]"
                              aria-label="火曜午後は19時まで受付"
                            >
                              ●
                            </span>
                          ) : (
                            cell
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-2 space-y-1">
              {HOURS_TABLE.notes.map((note, i) => (
                <p key={i} className="text-base text-[#4B5563]">
                  {note.startsWith("●") ? (
                    <>
                      <span className="inline-block mr-1 text-sm leading-none font-bold text-[#2F9FD3] align-middle">
                        ●
                      </span>
                      {note.slice(2)}
                    </>
                  ) : (
                    note
                  )}
                </p>
              ))}
            </div>

            {/* 受付時間について */}
            <div className="mt-4 bg-[#EDF7FC] rounded-xl p-5 border border-[#DCEAF2]">
              <h3 className="text-base font-bold text-[#2F9FD3] mb-2">
                受付時間について
              </h3>
              <ul className="space-y-1.5 text-base text-[#333333]">
                <li>午前のみ　9:00〜12:00</li>
                <li>午後のみ　14:00〜16:30</li>
                <li className="text-[#4B5563] text-sm">（火曜午後は19:00まで受付）</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* よくあるご質問 */}
      <FaqSection
        items={FIRST_VISIT_FAQ}
        japanese="初めての方からのよくあるご質問"
      />
    </>
  );
}
