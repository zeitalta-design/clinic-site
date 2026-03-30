/**
 * サイト共通ヘッダー
 * - PC: 左にクリニック名、右上に電話番号、右にナビメニュー
 * - スマホ: ハンバーガーメニュー + 電話ボタン常時表示
 *
 * クライアントコンポーネント: ハンバーガーメニューの開閉に useState が必要
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE, NAV_LINKS } from "@/lib/site";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* 上部バー: 電話番号 + 診療科目（PC のみ） */}
      <div className="hidden md:block bg-[#46B7E8] text-white">
        <div className="max-w-6xl mx-auto px-4 py-2 flex justify-between items-center text-base">
          <p>{SITE.departments.join("・")}</p>
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-1.5 font-semibold hover:opacity-90"
            aria-label={`電話をかける ${SITE.phone}`}
          >
            <svg
              className="w-4 h-4"
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

      {/* メインヘッダー */}
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        {/* クリニック名 */}
        <Link href="/" className="flex flex-col">
          <span className="text-lg md:text-xl font-bold text-[#2F9FD3] leading-tight">
            {SITE.name}
          </span>
          <span className="text-[10px] md:text-xs text-[#666666]">
            {SITE.departments.join(" / ")}
          </span>
        </Link>

        {/* PC ナビゲーション */}
        <nav className="hidden md:flex items-center gap-6" aria-label="メインメニュー">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium text-[#333333] hover:text-[#2F9FD3] transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-0.5 after:bg-[#F3E33A] after:transition-all hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* スマホ: 電話 + ハンバーガー */}
        <div className="flex items-center gap-3 md:hidden">
          <a
            href={SITE.phoneHref}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#46B7E8] text-white"
            aria-label="電話をかける"
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
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-[#333333] transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#333333] transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#333333] transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      {menuOpen && (
        <nav
          className="md:hidden bg-white border-t border-[#DCEAF2]"
          aria-label="モバイルメニュー"
        >
          <ul className="divide-y divide-[#DCEAF2]">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-6 py-4 text-[#333333] hover:bg-[#EDF7FC] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* モバイルメニュー内の電話CTA */}
          <div className="p-4 bg-[#EDF7FC]">
            <a
              href={SITE.phoneHref}
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#46B7E8] text-white rounded-lg font-bold"
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
              お電話でのご予約・ご相談 {SITE.phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
