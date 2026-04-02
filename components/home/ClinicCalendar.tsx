/**
 * 休院日カレンダー（トップページ用）
 *
 * 今月の月間カレンダーを表示し、
 * 休院日・午前休・午後休・臨時休診を色分けで視覚的に表示する。
 * サーバーコンポーネント（データを直接読み込み）
 */

import { getPublishedHolidays, type HolidayItem, type HolidayType } from "@/lib/holidays-store";

/** 種別ごとの表示色（背景 + テキスト） */
const TYPE_STYLES: Record<HolidayType, { bg: string; text: string; dot: string }> = {
  休診: { bg: "bg-red-100", text: "text-red-600", dot: "bg-red-500" },
  午前休: { bg: "bg-amber-50", text: "text-amber-600", dot: "bg-amber-400" },
  午後休: { bg: "bg-blue-50", text: "text-blue-600", dot: "bg-blue-400" },
  臨時休診: { bg: "bg-purple-50", text: "text-purple-600", dot: "bg-purple-400" },
};

/** 短縮ラベル */
const TYPE_SHORT: Record<HolidayType, string> = {
  休診: "休",
  午前休: "午前休",
  午後休: "午後休",
  臨時休診: "臨時",
};

export default function ClinicCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed

  // 今月の休院日を取得
  let holidays: HolidayItem[] = [];
  try {
    holidays = getPublishedHolidays().filter((h) => {
      const d = new Date(h.date + "T00:00:00");
      return d.getFullYear() === year && d.getMonth() === month;
    });
  } catch {
    holidays = [];
  }

  // 日付をキーにしたMap
  const holidayMap = new Map<number, HolidayItem>();
  for (const h of holidays) {
    const d = new Date(h.date + "T00:00:00");
    holidayMap.set(d.getDate(), h);
  }

  // カレンダーグリッド生成
  const firstDay = new Date(year, month, 1);
  const startDow = firstDay.getDay(); // 0=日
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayDate = today.getDate();

  // 週の配列を生成
  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = [];

  // 月初の空白
  for (let i = 0; i < startDow; i++) {
    currentWeek.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  // 月末の空白
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  const weekdayLabels = ["日", "月", "火", "水", "木", "金", "土"];

  // 凡例に表示する種別（実際に使われているもの）
  const usedTypes = new Set(holidays.map((h) => h.type));

  return (
    <div className="bg-white rounded-xl border border-[#DCEAF2] p-4 md:p-5">
      {/* ヘッダー */}
      <h3 className="text-base font-bold text-[#2F9FD3] mb-3 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-[#2F9FD3]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {year}年{month + 1}月の休診日
      </h3>

      {/* カレンダーテーブル */}
      <table className="w-full text-center text-sm border-collapse">
        <thead>
          <tr>
            {weekdayLabels.map((label, i) => (
              <th
                key={label}
                className={`py-1.5 text-xs font-medium ${
                  i === 0 ? "text-red-400" : i === 6 ? "text-blue-400" : "text-[#666666]"
                }`}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, wi) => (
            <tr key={wi}>
              {week.map((day, di) => {
                if (day === null) {
                  return <td key={di} className="py-1" />;
                }

                const holiday = holidayMap.get(day);
                const isToday = day === todayDate;
                const isSunday = di === 0;
                const isSaturday = di === 6;
                const style = holiday ? TYPE_STYLES[holiday.type] : null;

                return (
                  <td key={di} className="py-0.5">
                    <div
                      className={`relative mx-auto w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full text-sm leading-none transition-colors ${
                        style
                          ? `${style.bg} ${style.text} font-bold`
                          : isToday
                            ? "bg-[#46B7E8] text-white font-bold"
                            : isSunday
                              ? "text-red-400"
                              : isSaturday
                                ? "text-blue-400"
                                : "text-[#333333]"
                      }`}
                      title={
                        holiday
                          ? `${holiday.type}${holiday.label ? `: ${holiday.label}` : ""}`
                          : undefined
                      }
                    >
                      {day}
                      {holiday && (
                        <span
                          className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 text-[8px] leading-none font-bold whitespace-nowrap ${style!.text}`}
                        >
                          {TYPE_SHORT[holiday.type]}
                        </span>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 凡例 */}
      {usedTypes.size > 0 && (
        <div className="mt-3 pt-3 border-t border-[#DCEAF2] flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#46B7E8]" />
            <span className="text-xs text-[#666666]">今日</span>
          </div>
          {Array.from(usedTypes).map((t) => (
            <div key={t} className="flex items-center gap-1.5">
              <span className={`w-3 h-3 rounded-full ${TYPE_STYLES[t].dot}`} />
              <span className="text-xs text-[#666666]">{t}</span>
            </div>
          ))}
        </div>
      )}

      {/* 休診日がない場合 */}
      {holidays.length === 0 && (
        <p className="mt-2 text-xs text-[#666666] text-center">
          今月の臨時休診予定はありません
        </p>
      )}

      {/* 休診日ラベル一覧（詳細） */}
      {holidays.length > 0 && (
        <div className="mt-3 space-y-1">
          {holidays.map((h) => (
            <div key={h.id} className="flex items-center gap-2 text-xs">
              <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${TYPE_STYLES[h.type].bg} ${TYPE_STYLES[h.type].text}`}>
                {h.type}
              </span>
              <span className="text-[#333333]">
                {new Date(h.date + "T00:00:00").getMonth() + 1}/{new Date(h.date + "T00:00:00").getDate()}
                {h.label ? `　${h.label}` : ""}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
