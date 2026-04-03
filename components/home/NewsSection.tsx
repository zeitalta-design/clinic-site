/**
 * お知らせセクション（カレンダー併設版）
 * 左: お知らせ一覧、右: 休診カレンダー
 * データソース: microCMS（未接続時はローカルJSONフォールバック）
 */

import { getNews, getHolidays, type CmsNewsItem, type CmsHolidayItem } from "@/lib/microcms";
import { formatDate } from "@/lib/utils";
import SectionTitle from "@/components/common/SectionTitle";
import ClinicCalendar from "@/components/home/ClinicCalendar";

export default async function NewsSection() {
  let news: CmsNewsItem[] = [];
  let holidays: CmsHolidayItem[] = [];
  try {
    [news, holidays] = await Promise.all([
      getNews(3),
      getHolidays(),
    ]);
  } catch {
    news = [];
    holidays = [];
  }

  return (
    <section className="py-14 md:py-16 bg-[#F8FCFE]" aria-label="お知らせ">
      <div className="max-w-5xl mx-auto px-4">
        <SectionTitle english="News" japanese="お知らせ" id="news" />

        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6 md:gap-8">
          {/* 左: お知らせ一覧 */}
          <div>
            {news.length > 0 ? (
              <ul className="divide-y divide-[#E8EFF4]">
                {news.map((item) => (
                  <li key={item.id} className="py-5 first:pt-0 last:pb-0">
                    {/* 日付 + カテゴリ */}
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <time
                        dateTime={item.date}
                        className="text-xs text-[#888888] tabular-nums tracking-wide"
                      >
                        {formatDate(item.date)}
                      </time>
                      {item.category && (
                        <span
                          className={`inline-block min-w-[4rem] text-center text-[11px] leading-none px-2.5 py-1 rounded font-bold ${
                            item.category === "重要"
                              ? "bg-red-50 text-red-600 border border-red-200"
                              : item.category === "休診"
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : "bg-[#EDF7FC] text-[#2F9FD3] border border-[#d0e8f0]"
                          }`}
                        >
                          {item.category}
                        </span>
                      )}
                    </div>

                    {/* タイトル */}
                    <p className="text-[#1a1a1a] text-[15px] md:text-base font-bold leading-normal">
                      {item.title}
                    </p>

                    {/* 本文 */}
                    {item.body && (
                      <p className="text-[#888888] text-sm mt-1 leading-relaxed line-clamp-2">
                        {item.body}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-[#999999] py-10 text-sm">
                現在お知らせはありません
              </p>
            )}
          </div>

          {/* 右: 休診カレンダー */}
          <div>
            <ClinicCalendar holidays={holidays.map(h => ({
              id: h.id,
              date: h.date,
              type: h.type,
              label: h.label,
            }))} />
          </div>
        </div>
      </div>
    </section>
  );
}
