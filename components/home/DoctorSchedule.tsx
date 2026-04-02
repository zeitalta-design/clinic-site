/**
 * 担当医表セクション
 * テキストベースの table で医師勤務カレンダーを表示
 */

import SectionTitle from "@/components/common/SectionTitle";

const DAYS = ["月", "火", "水", "木", "金", "土"] as const;

const AM_SCHEDULE = [
  "院長\n副院長", // 月
  "院長\n副院長", // 火
  "院長\n副院長", // 水
  "副院長",       // 木
  "院長\n副院長", // 金
  "副院長",       // 土
];

const PM_SCHEDULE = [
  "院長\n副院長", // 月
  "院長\n副院長", // 火
  "院長\n副院長", // 水
  "",             // 木（休診）
  "院長\n副院長", // 金
  "",             // 土（休診）
];

export default function DoctorSchedule() {
  return (
    <section className="py-14 md:py-16 bg-white" aria-label="担当医表">
      <div className="max-w-4xl mx-auto px-4">
        <SectionTitle english="Doctor Schedule" japanese="担当医表" />

        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full min-w-[600px] border-collapse text-center text-sm md:text-base">
            <thead>
              <tr className="bg-[#46B7E8] text-white">
                <th className="py-3 px-2 font-bold border border-[#3AABDC]">
                  区分
                </th>
                <th className="py-3 px-2 font-bold border border-[#3AABDC]">
                  診察時間
                </th>
                {DAYS.map((day) => (
                  <th
                    key={day}
                    className="py-3 px-2 font-bold border border-[#3AABDC]"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* 午前 */}
              <tr>
                <td className="py-3 px-2 font-bold text-[#2F9FD3] bg-[#EDF7FC] border border-[#DCEAF2]">
                  午前
                </td>
                <td className="py-3 px-2 text-[#333333] bg-[#EDF7FC] border border-[#DCEAF2] whitespace-nowrap">
                  9:00〜12:30
                </td>
                {AM_SCHEDULE.map((doc, i) => (
                  <td
                    key={i}
                    className="py-3 px-2 text-[#333333] border border-[#DCEAF2] whitespace-pre-line leading-snug"
                  >
                    {doc}
                  </td>
                ))}
              </tr>
              {/* 午後 */}
              <tr>
                <td className="py-3 px-2 font-bold text-[#2F9FD3] bg-[#EDF7FC] border border-[#DCEAF2]">
                  午後
                </td>
                <td className="py-3 px-2 text-[#333333] bg-[#EDF7FC] border border-[#DCEAF2] whitespace-nowrap">
                  <span>14:00〜17:00</span>
                  <br />
                  <span className="text-xs text-[#666666]">
                    ※火曜は19:30まで
                  </span>
                </td>
                {PM_SCHEDULE.map((doc, i) => (
                  <td
                    key={i}
                    className={`py-3 px-2 border border-[#DCEAF2] whitespace-pre-line leading-snug ${
                      doc ? "text-[#333333]" : "text-[#999999] bg-[#F8F8F8]"
                    }`}
                  >
                    {doc || "ー"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm text-[#666666] text-center">
          担当医は変更となる場合があります。詳しくはお問い合わせください。
        </p>
      </div>
    </section>
  );
}
