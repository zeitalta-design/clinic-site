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

        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
          {/* 左: お知らせ一覧 */}
          <div>
            {news.length > 0 ? (
              <ul className="divide-y divide-[#DCEAF2] border-t border-b border-[#DCEAF2]">
                {news.map((item) => (
                  <li
                    key={item.id}
                    className="py-4 md:py-5 flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4"
                  >
                    <div className="flex items-center gap-2 shrink-0">
                      <time
                        dateTime={item.date}
                        className="text-sm text-[#666666] tabular-nums font-medium"
                      >
                        {formatDate(item.date)}
                      </time>
                      {item.category && (
                        <span
                          className={`inline-block min-w-[4.5rem] text-center text-xs px-2.5 py-0.5 rounded-full font-medium ${
                            item.category === "重要"
                              ? "bg-red-50 text-red-600 border border-red-200"
                              : item.category === "休診"
                                ? "bg-amber-50 text-amber-600 border border-amber-200"
                                : "bg-[#EDF7FC] text-[#2F9FD3] border border-[#d0e8f0]"
                          }`}
                        >
                          {item.category}
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 sm:mt-0">
                      <p className="text-[#222222] text-base md:text-lg font-semibold leading-snug">
                        {item.title}
                      </p>
                      {item.body && (
                        <p className="text-[#777777] text-sm md:text-base mt-1.5 leading-relaxed">
                          {item.body}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-[#666666] py-10 text-base">
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
