/**
 * 診療時間 + 地図セクション（改善版）
 * カードの角丸・余白・影を洗練。テーブルのフォントサイズ調整。
 */

import { SITE, HOURS_TABLE } from "@/lib/site";

export default function HoursAndMap() {
  return (
    <section className="bg-white py-12 md:py-16" aria-label="診察時間とアクセス">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* 診療時間表 */}
          <div className="bg-gradient-to-br from-[#EDF7FC] to-[#f0f7fa] rounded-2xl p-6 md:p-7 shadow-sm">
            <h2 className="text-lg font-bold text-[#2F9FD3] mb-5 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#FFF8E1] flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-[#E8B818]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              診察時間
            </h2>

            <div className="overflow-x-auto -mx-1">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#46B7E8] text-white">
                    {HOURS_TABLE.header.map((h, i) => (
                      <th
                        key={i}
                        className="px-2 py-2.5 text-center font-medium text-xs md:text-sm"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {HOURS_TABLE.rows.map((row, i) => (
                    <tr key={i} className="border-b border-[#DCEAF2]">
                      <td className="px-2 py-3.5 text-xs md:text-sm font-medium whitespace-nowrap text-[#333333]">
                        {row.label}
                      </td>
                      {row.cells.map((cell, j) => (
                        <td
                          key={j}
                          className={`text-center py-3.5 text-sm font-semibold ${
                            cell === "○"
                              ? "text-[#2F9FD3]"
                              : cell === "×"
                                ? "text-gray-300"
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

            <div className="mt-3 space-y-1">
              {HOURS_TABLE.notes.map((note, i) => (
                <p key={i} className="text-xs text-[#666666]">
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

            {/* 受付時間について */}
            <div className="mt-5 bg-white rounded-xl p-4 border border-[#DCEAF2]">
              <h3 className="text-sm font-bold text-[#2F9FD3] mb-2">
                受付時間について
              </h3>
              <ul className="space-y-1 text-xs text-[#333333]">
                <li>午前　9:00〜12:00</li>
                <li>午後　14:00〜16:30</li>
                <li className="text-[#666666]">（火曜午後は19:00まで受付）</li>
              </ul>
            </div>
          </div>

          {/* 地図 + アクセス情報 */}
          <div className="bg-gradient-to-br from-[#EDF7FC] to-[#f0f7fa] rounded-2xl p-6 md:p-7 shadow-sm">
            <h2 className="text-lg font-bold text-[#2F9FD3] mb-5 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#FFF8E1] flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-[#E8B818]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              アクセス
            </h2>

            <div className="relative w-full h-48 md:h-56 rounded-xl overflow-hidden bg-[#EDF7FC] mb-5">
              {/* 地図が読み込めない場合のフォールバック（背景に常時表示、iframeが上に重なる） */}
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

            <address className="not-italic text-sm text-[#333333] space-y-1.5">
              <p className="font-medium">
                {SITE.zip} {SITE.address}
              </p>
              <p>
                <a
                  href={SITE.phoneHref}
                  className="text-[#2F9FD3] font-bold hover:underline"
                >
                  TEL {SITE.phone}
                </a>
              </p>
              <p className="text-[#666666]">{SITE.access}</p>
              <p className="text-[#666666]">{SITE.parking}</p>
            </address>
          </div>
        </div>
      </div>
    </section>
  );
}
