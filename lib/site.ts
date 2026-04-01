/**
 * サイト全体の定数定義
 * 病院情報・診療時間・ナビゲーションなど
 * 変更時はここだけ修正すれば全ページに反映される
 */

export const SITE = {
  name: "内科 高橋清仁クリニック",
  nameKana: "たかはしきよひとクリニック",
  description:
    "北海道函館市の内科,糖尿病・代謝内科,内分泌内科。内科 高橋清仁クリニックは地域の皆さまのかかりつけ医として、体調の不安やお悩みに寄り添います。",
  url: "https://takahashi-kiyohito-clinic.jp",
  phone: "0138-40-5100",
  phoneHref: "tel:0138405100",
  zip: "〒041-0806",
  address: "北海道函館市美原1丁目14番12号",
  access: "函館バス「亀田支所前」徒歩7分",
  parking: "駐車場29台完備",
  departments: ["内科", "糖尿病・代謝内科", "内分泌内科"],
  mapQuery: "内科+高橋清仁クリニック+函館市美原1丁目14番12号",
  /** 緯度経度（地図・JSON-LD共通） */
  latitude: 41.81241,
  longitude: 140.75440,
} as const;

/** ナビゲーションリンク */
export const NAV_LINKS = [
  { href: "/", label: "HOME" },
  { href: "/director", label: "院長・副院長紹介" },
  { href: "/clinic", label: "クリニック紹介" },
  { href: "/services", label: "診療内容" },
  { href: "/first", label: "初診の方へ" },
] as const;

/**
 * 診療時間データ
 * ○ = 診療あり, × = 休診, ー = 該当なし
 */
export const HOURS_TABLE = {
  header: ["", "月", "火", "水", "木", "金", "土", "日・祝"],
  rows: [
    {
      label: "午前 9:00〜12:00",
      cells: ["○", "○", "○", "○", "○", "○", "×"],
    },
    {
      label: "午後 14:00〜16:30",
      cells: ["○", "※", "○", "×", "○", "×", "×"],
    },
  ],
  notes: [
    "※ 火曜午後は 19:00 まで受付",
    "休診：木曜午後・土曜午後・日曜・祝日",
  ],
} as const;

/**
 * カラーパレット
 * 見本サイトに合わせた明るいブルー × イエローの配色
 */
export const COLORS = {
  primary: "#46B7E8",       // 明るいスカイブルー
  primaryHover: "#3AABDC",  // ホバー用ブルー
  primaryLight: "#EDF7FC",  // 薄いブルー背景
  accent: "#F3E33A",        // 菜の花イエロー
  accentLight: "#FFFEF5",   // 薄いイエロー背景
  bg: "#FFFFFF",            // ページ背景
  bgAlt: "#F8FCFE",         // セクション背景
  text: "#333333",          // 本文
  textLight: "#666666",     // 補助テキスト
  border: "#DCEAF2",        // 枠線
} as const;
