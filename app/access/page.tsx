/**
 * アクセスページ
 * 住所・電話・バス案内・駐車場・地図
 */

import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import { SITE, HOURS_TABLE } from "@/lib/site";

export const metadata: Metadata = {
  title: "アクセス",
  description: "内科 高橋清仁クリニックへのアクセス情報です。北海道函館市美原1丁目14番12号、函館バス「亀田支所前」徒歩7分、駐車場29台完備。",
  alternates: { canonical: "/access" },
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
                      {SITE.departments.join(" , ")}
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

            {/* 受付時間 */}
            <div>
              <h2 className="text-lg font-bold text-[#2F9FD3] mb-4">
                受付時間
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
                                  : "text-[#F3E33A]"
                            }`}
                          >
                            {cell}
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
                    {note}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* 地図 */}
          <div className="mb-10">
            <h2 className="text-lg font-bold text-[#2F9FD3] mb-4">地図</h2>
            <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden bg-[#EDF7FC]">
              <div className="absolute inset-0 flex items-center justify-center text-[#2F9FD3] text-base">
                <p>{SITE.address}</p>
              </div>
              <iframe
                src="https://www.google.com/maps?q=41.81241,140.75440&hl=ja&z=17&output=embed"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                title="クリニックの地図"
                allowFullScreen
              />
            </div>
            <p className="mt-2 text-base text-[#4B5563]">
              <a
                href="https://maps.app.goo.gl/UnnQKpGhc8KbF96a8"
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
