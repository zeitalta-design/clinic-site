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

  // 表示月の休診日をフィルタ（不正な日付は除外）
  const cmsHolidays = holidays.filter((h) => {
    if (!h.date) return false;
    const d = new Date(h.date + "T00:00:00");
    if (isNaN(d.getTime())) return false;
    return d.getFullYear() === year && d.getMonth() === month;
  });

  // 定休日を自動生成：日曜=休診、木曜午後休、土曜午後休
  const daysInMonthCount = new Date(year, month + 1, 0).getDate();
  const regularHolidays: HolidayItem[] = [];
  for (let day = 1; day <= daysInMonthCount; day++) {
    const dow = new Date(year, month, day).getDay();
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    // CMS側で個別指定があればスキップ
    if (cmsHolidays.some((h) => h.date === dateStr)) continue;
    if (dow === 0) {
      regularHolidays.push({ id: `regular-sun-${day}`, date: dateStr, type: "休診" });
    } else if (dow === 4) {
      regularHolidays.push({ id: `regular-thu-${day}`, date: dateStr, type: "午後休" });
    } else if (dow === 6) {
      regularHolidays.push({ id: `regular-sat-${day}`, date: dateStr, type: "午後休" });
    }
  }

  // 祝日判定（日本の主要祝日）
  const jpHolidays = getJapaneseHolidays(year);
  for (const hd of jpHolidays) {
    if (hd.getMonth() !== month) continue;
    const day = hd.getDate();
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    // すでにCMSや定休で登録済みならスキップ
    if (cmsHolidays.some((h) => h.date === dateStr)) continue;
    if (regularHolidays.some((h) => h.date === dateStr)) continue;
    regularHolidays.push({ id: `holiday-${day}`, date: dateStr, type: "休診" });
  }

  const monthHolidays = [...cmsHolidays, ...regularHolidays].sort(
    (a, b) => a.date.localeCompare(b.date)
  );

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

      {/* 重要なお知らせ */}
      <div className="mx-3 md:mx-4 mb-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
        <p className="text-sm text-red-700 font-bold leading-relaxed">
          ※4月29日は休日当番医のため、救急患者のみ対応しております。
          <br />
          通常診療は行っておりませんのでご了承ください。
        </p>
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

          {/* 臨時休診リスト（CMS登録分のみ表示。定休日・祝日は表示しない） */}
          {cmsHolidays.length > 0 ? (
            <div className="space-y-1.5">
              {cmsHolidays.map((h) => {
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

/** 日本の祝日を取得（簡易版：固定日＋春分・秋分＋振替休日） */
function getJapaneseHolidays(year: number): Date[] {
  const holidays: Date[] = [];
  const add = (m: number, d: number) => holidays.push(new Date(year, m - 1, d));

  // 固定祝日
  add(1, 1);   // 元日
  add(2, 11);  // 建国記念の日
  add(2, 23);  // 天皇誕生日
  add(4, 29);  // 昭和の日
  add(5, 3);   // 憲法記念日
  add(5, 4);   // みどりの日
  add(5, 5);   // こどもの日
  add(8, 11);  // 山の日
  add(11, 3);  // 文化の日
  add(11, 23); // 勤労感謝の日

  // ハッピーマンデー
  add(1, getNthMondayDate(year, 1, 2));   // 成人の日（1月第2月曜）
  add(7, getNthMondayDate(year, 7, 3));   // 海の日（7月第3月曜）
  add(9, getNthMondayDate(year, 9, 3));   // 敬老の日（9月第3月曜）
  add(10, getNthMondayDate(year, 10, 2)); // スポーツの日（10月第2月曜）

  // 春分・秋分（近似計算）
  const springEquinox = Math.floor(20.8431 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4));
  const autumnEquinox = Math.floor(23.2488 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4));
  add(3, springEquinox);
  add(9, autumnEquinox);

  // 振替休日：祝日が日曜なら翌月曜
  const baseHolidays = [...holidays];
  for (const h of baseHolidays) {
    if (h.getDay() === 0) {
      const substitute = new Date(h);
      substitute.setDate(substitute.getDate() + 1);
      // 振替先も祝日なら更に翌日（GW対応）
      while (baseHolidays.some((bh) => bh.getTime() === substitute.getTime())) {
        substitute.setDate(substitute.getDate() + 1);
      }
      holidays.push(substitute);
    }
  }

  return holidays;
}

/** 第N月曜日の日付を取得 */
function getNthMondayDate(year: number, month: number, nth: number): number {
  let count = 0;
  for (let day = 1; day <= 31; day++) {
    const d = new Date(year, month - 1, day);
    if (d.getMonth() !== month - 1) break;
    if (d.getDay() === 1) {
      count++;
      if (count === nth) return day;
    }
  }
  return 1;
}
