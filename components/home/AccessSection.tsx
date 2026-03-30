/**
 * アクセスセクション（トップページ用）
 * Server Component化：JSなしでも情報が読める
 * 画像はCSS背景色フォールバック（onError不要）
 */

import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";
import SectionTitle from "@/components/common/SectionTitle";

export default function AccessSection() {
  return (
    <section className="py-14 md:py-16 bg-white" aria-label="アクセス">
      <div className="max-w-4xl mx-auto px-4">
        <SectionTitle english="Access" japanese="アクセス" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 外観写真（bg-colorがフォールバック：画像なくてもレイアウト維持） */}
          <div className="relative rounded-xl overflow-hidden h-56 md:h-auto min-h-[14rem] bg-[#EDF7FC]">
            <Image
              src="/images/clinic/exterior.jpg"
              alt="クリニック外観"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* アクセス情報 */}
          <div className="space-y-4">
            <table className="w-full text-base">
              <tbody>
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
                    バス
                  </th>
                  <td className="py-3 text-[#333333]">{SITE.access}</td>
                </tr>
                <tr className="border-b border-[#DCEAF2]">
                  <th className="text-left py-3 pr-4 text-[#2F9FD3] font-medium whitespace-nowrap">
                    駐車場
                  </th>
                  <td className="py-3 text-[#333333]">{SITE.parking}</td>
                </tr>
                <tr>
                  <th className="text-left py-3 pr-4 text-[#2F9FD3] font-medium whitespace-nowrap">
                    診療科目
                  </th>
                  <td className="py-3 text-[#333333]">
                    {SITE.departments.join("・")}
                  </td>
                </tr>
              </tbody>
            </table>

            <Link
              href="/access"
              className="inline-flex items-center gap-1 text-[#2F9FD3] font-medium hover:underline text-base"
            >
              アクセスの詳細を見る
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
