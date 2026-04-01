/**
 * 初診の方へセクション（高齢者可読性対応版）
 */

import Link from "next/link";
import { SITE } from "@/lib/site";
import SectionTitle from "@/components/common/SectionTitle";

export default function FirstVisitSection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-[#F8FCFE] to-white" aria-label="初診の方へ">
      <div className="max-w-4xl mx-auto px-4">
        <SectionTitle english="First Visit" japanese="初診の方へ" />

        <div className="bg-white rounded-2xl border border-[#DCEAF2] shadow-sm p-6 md:p-10">
          {/* ステップ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {[
              {
                step: 1,
                title: "直接ご来院ください",
                desc: "予約は不要です。受付順でのご案内となります。",
              },
              {
                step: 2,
                title: "ご来院",
                desc: "保険証をお持ちのうえ、受付にお声がけください。",
              },
              {
                step: 3,
                title: "診察",
                desc: "気になることは何でもお気軽にお話しください。",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#F3E33A] text-[#333333] flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-sm">
                  {item.step}
                </div>
                <h3 className="font-bold text-[#2F9FD3] mb-2 text-lg">
                  {item.title}
                </h3>
                <p className="text-base text-[#4B5563] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* 持ち物 */}
          <div className="bg-[#EDF7FC] rounded-xl p-5 md:p-6 mb-8">
            <h3 className="font-bold text-[#2F9FD3] text-base md:text-lg mb-3">
              お持ちいただくもの
            </h3>
            <ul className="text-base text-[#333333] space-y-2">
              {[
                "健康保険証（またはマイナンバーカード）",
                "お薬手帳（お持ちの方）",
                "健康診断の結果（お持ちの方）",
                "紹介状（お持ちの方）",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-2 w-2.5 h-2.5 rounded-full bg-[#E5C71D] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#46B7E8] text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:opacity-95 transition-all text-base md:text-lg"
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
              お電話はこちら {SITE.phone}
            </a>
            <Link
              href="/first"
              className="text-[#2F9FD3] font-medium hover:underline text-base"
            >
              初診の方への詳しいご案内 →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
