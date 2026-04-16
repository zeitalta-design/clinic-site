/**
 * アクセスページ
 * 住所・電話・バス案内・駐車場・地図
 */

import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import { SITE, HOURS_TABLE } from "@/lib/site";

export const metadata: Metadata = {
  title: "アクセス｜函館市美原の内科高橋清仁クリニック",
  description: "内科高橋清仁クリニックのアクセス情報です。北海道函館市美原1丁目14番12号。函館バス「亀田支所前」徒歩7分、駐車場18台完備。予約不要で通いやすいクリニックです。",
  keywords: [
    "内科高橋清仁クリニック アクセス",
    "函館市美原 内科 アクセス",
    "高橋清仁クリニック 駐車場",
    "函館 糖尿病 クリニック アクセス",
    "函館 甲状腺 クリニック 場所",
    "函館 内科 駐車場",
  ],
  alternates: { canonical: "/access" },
  openGraph: {
    title: "アクセス｜函館市美原の内科高橋清仁クリニック",
    description: "北海道函館市美原1丁目14番12号。駐車場18台完備、函館バス「亀田支所前」徒歩7分。予約不要の内科クリニック。",
    images: [{ url: "/images/clinic/exterior.jpg", alt: "内科高橋清仁クリニック外観" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "アクセス｜函館市美原の内科高橋清仁クリニック",
    description: "北海道函館市美原1丁目14番12号。駐車場18台完備。",
    images: ["/images/clinic/exterior.jpg"],
  },
};

export default function AccessPage() {
  return (
    <>
      <PageHero
        title="アクセス"
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "アクセス" },
        ]}
      />

      <section className="py-14 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* 基本情報 */}
            <div>
              <h2 className="text-lg font-bold text-[#2F9FD3] mb-4">
                クリニック情報
              </h2>
              <table className="w-full text-base">
                <tbody>
                  <tr className="border-b border-[#DCEAF2]">
                    <th className="text-left py-3 pr-4 text-[#2F9FD3] font-medium whitespace-nowrap align-top w-24">
                      医院名
                    </th>
                    <td className="py-3 text-[#333333] font-medium">
                      {SITE.name}
                    </td>
                  </tr>
                  <tr className="border-b border-[#DCEAF2]">
                    <th className="text-left py-3 pr-4 text-[#2F9FD3] font-medium whitespace-nowrap align-top">
                      住所
                    </th>
                    <td className="py-3 text-[#333333]">
                      {SITE.zip}
                      <br />
                      {SITE.address}
                    </td>
                  </tr>
                  <tr className="border-b border-[#DCEAF2]">
                    <th className="text-left py-3 pr-4 text-[#2F9FD3] font-medium whitespace-nowrap">
                      電話番号
                    </th>
                    <td className="py-3">
                      <a
                        href={SITE.phoneHref}
                        className="text-[#2F9FD3] font-bold hover:underline"
                      >
                        {SITE.phone}
                      </a>
                    </td>
                  </tr>
                  <tr className="border-b border-[#DCEAF2]">
                    <th className="text-left py-3 pr-4 text-[#2F9FD3] font-medium whitespace-nowrap">
                      診療科目
                    </th>
                    <td className="py-3 text-[#333333]">
                      {SITE.departments.join("、")}
                    </td>
                  </tr>
                  <tr className="border-b border-[#DCEAF2]">
                    <th className="text-left py-3 pr-4 text-[#2F9FD3] font-medium whitespace-nowrap align-top">
                      交通
                    </th>
                    <td className="py-3 text-[#333333]">{SITE.access}</td>
                  </tr>
                  <tr>
                    <th className="text-left py-3 pr-4 text-[#2F9FD3] font-medium whitespace-nowrap">
                      駐車場
                    </th>
                    <td className="py-3 text-[#333333]">{SITE.parking}</td>
                  </tr>
                </tbody>
              </table>
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
                        <th
                          key={i}
                          className="px-2 py-2 text-center font-medium text-sm"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {HOURS_TABLE.rows.map((row, i) => (
                      <tr key={i} className="border-b border-[#DCEAF2]">
                        <td className="px-2 py-3 font-medium whitespace-nowrap text-sm">
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
                                    : "text-[#E8B818]"
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
                  <p key={i} className="text-sm text-[#4B5563]">
                    {note.startsWith("●") ? (
                      <>
                        <span className="inline-block mr-1 text-xs leading-none font-bold text-[#2F9FD3] align-middle">
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

              <div className="mt-4 bg-[#EDF7FC] rounded-xl p-5 border border-[#DCEAF2]">
                <h3 className="text-base font-bold text-[#2F9FD3] mb-2">
                  受付時間について
                </h3>
                <ul className="space-y-1.5 text-base text-[#333333]">
                  <li>午前　9:00〜12:00</li>
                  <li>午後　14:00〜16:30</li>
                  <li className="text-[#4B5563] text-sm">（火曜午後は19:00まで受付）</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 地図 */}
          <div className="mb-10">
            <h2 className="text-lg font-bold text-[#2F9FD3] mb-4">地図</h2>
            <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden bg-[#EDF7FC]">
              <iframe
                src={`https://www.google.com/maps?q=${SITE.latitude},${SITE.longitude}&hl=ja&z=17&output=embed`}
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                title="クリニックの地図"
                allowFullScreen
              />
            </div>
            <p className="mt-2 text-base text-[#4B5563]">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.name)}&query_place_id=${SITE.placeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2F9FD3] hover:underline"
              >
                Google マップで大きく表示 →
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
