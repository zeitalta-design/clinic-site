/**
 * サイト共通フッター
 * 黄色帯CTA + フッター基本情報
 * 全ページ共通：黄色帯に電話導線を集約
 */

import Link from "next/link";
import { SITE, NAV_LINKS, HOURS_TABLE } from "@/lib/site";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer>
      {/* 黄色帯CTA：全ページ共通の電話導線 */}
      <div className="bg-[#E8B818] py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center text-center gap-3">
          <p className="text-base md:text-lg text-[#333333] leading-relaxed">
            ご不明な点がございましたら、お気軽にお問い合わせください。
          </p>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-[#2F9FD3] font-bold rounded-lg hover:bg-gray-50 transition-colors text-base shadow-sm"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {SITE.phone}
            </a>
        </div>
      </div>

      {/* フッター本体 */}
      <div className="bg-[#EDF7FC]">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* クリニック情報（電話番号は施設情報として控えめに表示） */}
            <div>
              <h3 className="text-lg font-bold text-[#2F9FD3] mb-4">
                {SITE.name}
              </h3>
              <address className="not-italic text-base leading-relaxed text-[#333333]">
                <p>{SITE.zip}</p>
                <p>{SITE.address}</p>
                <p className="mt-2 text-[#333333]">
                  TEL {SITE.phone}
                </p>
                <p className="mt-1 text-[#4B5563]">{SITE.access}</p>
                <p className="text-[#4B5563]">{SITE.parking}</p>
              </address>
            </div>

            {/* 診察時間 */}
            <div>
              <h3 className="text-lg font-bold text-[#2F9FD3] mb-4">
                診察時間
              </h3>
              <table className="text-base w-full">
                <thead>
                  <tr>
                    {HOURS_TABLE.header.map((h, i) => (
                      <th
                        key={i}
                        className="px-1 py-1 text-center font-medium text-[#4B5563] text-xs"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {HOURS_TABLE.rows.map((row, i) => (
                    <tr key={i}>
                      <td className="pr-2 py-1.5 text-sm whitespace-nowrap text-[#333333]">
                        {row.label}
                      </td>
                      {row.cells.map((cell, j) => (
                        <td
                          key={j}
                          className={`text-center py-1.5 text-sm font-medium ${
                            cell === "×"
                              ? "text-gray-400"
                              : cell === "●"
                                ? "text-[#2F9FD3]"
                                : "text-[#333333]"
                          }`}
                        >
                          {cell === "●" ? (
                            <span
                              className="inline-block text-xs leading-none text-[#2F9FD3]"
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
              <div className="mt-2 text-sm text-[#4B5563] space-y-0.5">
                {HOURS_TABLE.notes.map((note, i) => (
                  <p key={i}>
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
            </div>

            {/* リンク */}
            <div>
              <h3 className="text-lg font-bold text-[#2F9FD3] mb-4">
                メニュー
              </h3>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-base text-[#333333] hover:text-[#2F9FD3] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/access"
                    className="text-base text-[#333333] hover:text-[#2F9FD3] transition-colors"
                  >
                    アクセス
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 著作権表記 */}
        <div className="border-t border-[#DCEAF2] py-4">
          <p className="text-center text-sm text-[#4B5563]">
            &copy; {year} {SITE.name} All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
