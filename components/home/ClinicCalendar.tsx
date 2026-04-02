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

/** 種別ごとの背景色（日付セル用） - 落ち着いた色味 */
const TYPE_CELL_STYLES: Record<HolidayType, { bg: string; text: string }> = {
  休診:   { bg: "bg-[#F8D7DA]", text: "text-[#9B2C2C]" },
  午前休: { bg: "bg-[#D4EDDA]", text: "text-[#276749]" },
  午後休: { bg: "bg-[#FFF3CD]", text: "text-[#856404]" },
  臨時休診: { bg: "bg-[#F8D7DA]", text: "text-[#9B2C2C]" },
};

/** 凡例用の色 */
const LEGEND_ITEMS: { type: string; bg: string; text: string; label: string }[] = [
  { type: "休診", bg: "bg-[#F8D7DA]", text: "text-[#9B2C2C]", label: "休診" },
  { type: "午後休", bg: "bg-[#FFF3CD]", text: "text-[#856404]", label: "午後休診" },
  { type: "午前休", bg: "bg-[#D4EDDA]", text: "text-[#276749]", label: "午前休診" },
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
    <div className="bg-white rounded-xl border border-[#DCEAF2] p-4 md:p-5">
      {/* ヘッダー: 月送りナビ */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={goPrev}
          disabled={!canGoPrev}
          className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
            canGoPrev ? "hover:bg-[#EDF7FC] text-[#2F9FD3]" : "text-[#D0D0D0] cursor-default"
          }`}
          aria-label="前月"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
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
          <h3 className="text-base font-bold text-[#2F9FD3]">
            診療カレンダー{" "}
            <span className="text-lg">{month + 1}</span>
            <span className="text-sm font-normal text-[#666666] ml-1">月</span>
          </h3>
        </div>

        <button
          onClick={goNext}
          disabled={!canGoNext}
          className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
            canGoNext ? "hover:bg-[#EDF7FC] text-[#2F9FD3]" : "text-[#D0D0D0] cursor-default"
          }`}
          aria-label="次月"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 年表示（翌月表示時のみ控えめに表示） */}
      {!isCurrentMonth && (
        <div className="flex items-center justify-center mb-2">
          <span className="text-xs text-[#999999]">{year}年</span>
        </div>
      )}

      {/* カレンダーテーブル */}
      <table className="w-full text-center text-sm border-collapse">
        <thead>
          <tr>
            {WEEKDAY_LABELS.map((label, i) => (
              <th
                key={label}
                className={`py-1.5 text-xs font-bold ${
                  i === 0 ? "text-red-500" : i === 6 ? "text-blue-500" : "text-[#555555]"
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
                  <td key={di} className="py-0.5">
                    <div
                      className={`mx-auto w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-md text-sm leading-none font-medium transition-colors ${
                        cellStyle
                          ? `${cellStyle.bg} ${cellStyle.text} font-bold`
                          : isSunday
                            ? "text-red-500"
                            : isSaturday
                              ? "text-blue-500"
                              : "text-[#333333]"
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

      {/* 凡例 */}
      <div className="mt-3 pt-3 border-t border-[#DCEAF2]">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          {LEGEND_ITEMS.map((item) => (
            <div key={item.type} className="flex items-center gap-1.5">
              <span className={`w-5 h-5 rounded-md ${item.bg} inline-block`} />
              <span className="text-xs text-[#555555] font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 休診日詳細リスト */}
      {monthHolidays.length > 0 && (
        <div className="mt-3 space-y-1">
          {monthHolidays.map((h) => {
            const style = h.type in TYPE_CELL_STYLES ? TYPE_CELL_STYLES[h.type as HolidayType] : TYPE_CELL_STYLES["休診"];
            return (
              <div key={h.id} className="flex items-center gap-2 text-xs">
                <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${style.bg} ${style.text}`}>
                  {h.type}
                </span>
                <span className="text-[#333333]">
                  {new Date(h.date + "T00:00:00").getMonth() + 1}/{new Date(h.date + "T00:00:00").getDate()}
                  {h.label ? `　${h.label}` : ""}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* 休診日がない場合 */}
      {monthHolidays.length === 0 && (
        <p className="mt-2 text-xs text-[#666666] text-center">
          {month + 1}月の臨時休診予定はありません
        </p>
      )}
    </div>
  );
}
