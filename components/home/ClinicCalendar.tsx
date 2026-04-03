/**
 * 診療カレンダー（トップページ用）
 *
 * 月送り対応のインタラクティブカレンダー。
 * 休診・午前休診・午後休診を背景色で視覚的に表示する。
 * クライアントコンポーネント（月送りのため）
 */

"use client";

import { useState } from "react";

type HolidayType = "休診" | "午前休" | "午後休" | "臨時休診";

interface HolidayItem {
  id: string;
  date: string;
  type: HolidayType | string;
  label?: string;
}

interface ClinicCalendarProps {
  holidays?: HolidayItem[];
}

/** 種別ごとの背景色（日付セル用） */
const TYPE_CELL_STYLES: Record<HolidayType, { bg: string; text: string; dot: string }> = {
  休診:     { bg: "bg-[#FEE2E2]", text: "text-[#B91C1C]", dot: "bg-[#EF4444]" },
  午前休:   { bg: "bg-[#DCFCE7]", text: "text-[#166534]", dot: "bg-[#22C55E]" },
  午後休:   { bg: "bg-[#FEF9C3]", text: "text-[#854D0E]", dot: "bg-[#EAB308]" },
  臨時休診: { bg: "bg-[#FEE2E2]", text: "text-[#B91C1C]", dot: "bg-[#EF4444]" },
};

/** 凡例 */
const LEGEND_ITEMS: { type: HolidayType; label: string }[] = [
  { type: "休診", label: "休診" },
  { type: "午後休", label: "午後休" },
  { type: "午前休", label: "午前休" },
];

const WEEKDAY_LABELS = ["日", "月", "火", "水", "木", "金", "土"];

export default function ClinicCalendar({ holidays = [] }: ClinicCalendarProps) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth()); // 0-indexed

  // 表示月の休診日をフィルタ
  const monthHolidays = holidays.filter((h) => {
    const d = new Date(h.date + "T00:00:00");
    return d.getFullYear() === year && d.getMonth() === month;
  });

  // 日付をキーにしたMap
  const holidayMap = new Map<number, HolidayItem>();
  for (const h of monthHolidays) {
    const d = new Date(h.date + "T00:00:00");
    holidayMap.set(d.getDate(), h);
  }

  // カレンダーグリッド生成
  const firstDay = new Date(year, month, 1);
  const startDow = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth();

  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = [];

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
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  // 今月と翌月のみ表示可能
  const currentY = now.getFullYear();
  const currentM = now.getMonth();
  const nextM = currentM === 11 ? 0 : currentM + 1;
  const nextY = currentM === 11 ? currentY + 1 : currentY;

  const canGoPrev = !(year === currentY && month === currentM);
  const canGoNext = !(year === nextY && month === nextM);

  const goPrev = () => {
    if (!canGoPrev) return;
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };

  const goNext = () => {
    if (!canGoNext) return;
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#DCEAF2] shadow-sm">
      {/* ヘッダー: 月送りナビ */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 md:px-5 md:pt-5">
        <button
          onClick={goPrev}
          disabled={!canGoPrev}
          className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
            canGoPrev ? "hover:bg-[#EDF7FC] text-[#2F9FD3]" : "text-[#D0D0D0] cursor-default"
          }`}
          aria-label="前月"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h3 className="text-sm font-bold text-[#2F9FD3] flex items-baseline gap-1">
          <span className="text-xs text-[#999999] font-normal">{!isCurrentMonth ? `${year}年` : ""}</span>
          <span className="text-lg tabular-nums">{month + 1}</span>
          <span className="text-xs font-normal text-[#666666]">月</span>
        </h3>

        <button
          onClick={goNext}
          disabled={!canGoNext}
          className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
            canGoNext ? "hover:bg-[#EDF7FC] text-[#2F9FD3]" : "text-[#D0D0D0] cursor-default"
          }`}
          aria-label="次月"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* カレンダーテーブル */}
      <div className="px-3 md:px-4 pb-1">
        <table className="w-full text-center text-sm border-collapse">
          <thead>
            <tr>
              {WEEKDAY_LABELS.map((label, i) => (
                <th
                  key={label}
                  className={`py-1 text-[11px] font-bold ${
                    i === 0 ? "text-red-400" : i === 6 ? "text-blue-400" : "text-[#AAAAAA]"
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
                    return <td key={di} className="py-0.5" />;
                  }

                  const holiday = holidayMap.get(day);
                  const isSunday = di === 0;
                  const isSaturday = di === 6;
                  const cellStyle = holiday && holiday.type in TYPE_CELL_STYLES ? TYPE_CELL_STYLES[holiday.type as HolidayType] : null;

                  return (
                    <td key={di} className="py-[3px]">
                      <div
                        className={`mx-auto w-8 h-8 flex items-center justify-center rounded-md text-[13px] leading-none font-medium ${
                          cellStyle
                            ? `${cellStyle.bg} ${cellStyle.text} font-bold`
                            : isSunday
                              ? "text-red-400"
                              : isSaturday
                                ? "text-blue-400"
                                : "text-[#444444]"
                        }`}
                        title={
                          holiday
                            ? `${holiday.type}${holiday.label ? `: ${holiday.label}` : ""}`
                            : undefined
                        }
                      >
                        {day}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 凡例 + 休診日リスト */}
      <div className="px-4 pb-4 md:px-5 md:pb-5">
        <div className="border-t border-[#E8EFF4] pt-3">
          {/* 凡例 */}
          <div className="flex items-center gap-3 mb-2">
            {LEGEND_ITEMS.map((item) => {
              const s = TYPE_CELL_STYLES[item.type];
              return (
                <div key={item.type} className="flex items-center gap-1">
                  <span className={`w-3 h-3 rounded-sm ${s.bg} border ${
                    item.type === "休診" || item.type === "臨時休診" ? "border-red-200" :
                    item.type === "午前休" ? "border-green-200" : "border-yellow-300"
                  }`} />
                  <span className="text-[11px] text-[#777777]">{item.label}</span>
                </div>
              );
            })}
          </div>

          {/* 休診日詳細リスト */}
          {monthHolidays.length > 0 ? (
            <div className="space-y-1.5">
              {monthHolidays.map((h) => {
                const style = h.type in TYPE_CELL_STYLES ? TYPE_CELL_STYLES[h.type as HolidayType] : TYPE_CELL_STYLES["休診"];
                const d = new Date(h.date + "T00:00:00");
                return (
                  <div key={h.id} className="flex items-center gap-2">
                    <span className={`inline-block min-w-[3.5rem] text-center text-[11px] font-bold px-1.5 py-0.5 rounded ${style.bg} ${style.text}`}>
                      {h.type}
                    </span>
                    <span className="text-xs text-[#555555]">
                      {d.getMonth() + 1}/{d.getDate()}
                      {h.label ? <span className="text-[#888888] ml-1">({h.label})</span> : ""}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-[11px] text-[#AAAAAA] text-center py-1">
              {month + 1}月の臨時休診予定はありません
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
