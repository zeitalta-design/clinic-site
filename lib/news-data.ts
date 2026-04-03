/**
 * お知らせデータ管理
 *
 * お知らせの追加・修正はこのファイルの NEWS 配列を編集するだけでOK。
 * ビルド時に静的HTMLに組み込まれるため、変更後は必ず
 *   npm run build → デプロイ（out/ をアップロード）
 * を行うこと。
 */

/* ---------- 型定義 ---------- */

export interface NewsItem {
  id: string;
  title: string;
  category?: string;
  body?: string;
  /** 表示用の日付（YYYY-MM-DD） */
  date: string;
}

export type HolidayType = "休診" | "午前休" | "午後休" | "臨時休診";

export interface HolidayItem {
  id: string;
  date: string;
  type: HolidayType;
  label?: string;
}

/* ---------- お知らせデータ ---------- */

/**
 * お知らせ一覧（新しい順に並べること）
 *
 * 追加方法: 配列の先頭に新しいお知らせを追加する
 * 削除方法: 該当オブジェクトを削除する
 */
export const NEWS: NewsItem[] = [
  {
    id: "news-holiday-duty-0429",
    title: "4月29日の診療について（休日当番医）",
    date: "2026-04-04",
    category: "お知らせ",
    body: "※4月29日は休日当番医です。\n緊急性の高い患者様の対応を優先しております。\n通常の診察をご希望の方は、別日の受診をお願いいたします。",
  },
  {
    id: "news-flu-1",
    title: "発熱・かぜ症状がある方の受診について",
    date: "2026-03-31",
    category: "お知らせ",
    body: "発熱・咳・のどの痛みなどの症状がある方も、当院で診察を受けていただけます。インフルエンザの検査にも対応しています。症状がある場合は、受付にてお声がけください。",
  },
  {
    id: "news-seasonal-1",
    title: "春先の体調不良にご注意ください",
    date: "2026-03-15",
    category: "お知らせ",
    body: "春先は気温の変動が大きく、かぜや花粉症、倦怠感など体調を崩しやすい季節です。気になる症状がある方は、お気軽にご相談ください。",
  },
  {
    id: "news-checkup-1",
    title: "健康診断で「要再検査」と言われた方へ",
    date: "2026-03-01",
    category: "お知らせ",
    body: "健康診断で血糖値・血圧・コレステロール・甲状腺などの異常を指摘された方は、早めの受診をおすすめします。当院では健診結果をもとにした精密検査やご相談を受け付けています。",
  },
  {
    id: "news-diabetes-1",
    title: "糖尿病でよくあるご相談について",
    date: "2026-02-01",
    category: "お知らせ",
    body: "「血糖値が高いと言われたがどうすればいいか分からない」「食事で気をつけることは？」など、糖尿病に関するご相談を多くいただいています。当院は糖尿病専門医が在籍しており、検査・治療・生活指導まで一貫して対応しています。",
  },
  {
    id: "news-thyroid-1",
    title: "甲状腺の症状が気になる方へ",
    date: "2026-01-15",
    category: "お知らせ",
    body: "疲れやすさ、動悸、体重の変化、首の腫れなどが続く場合、甲状腺の異常が関係していることがあります。当院では血液検査による甲状腺機能の確認を行っています。内分泌専門医が在籍しておりますので、お気軽にご相談ください。",
  },
];

/* ---------- 取得関数 ---------- */

/** お知らせを新しい順に取得（件数制限あり） */
export function getNews(limit = 3): NewsItem[] {
  return NEWS.slice(0, limit);
}

/** 休診日データ（現在は定休日をカレンダー側で自動生成しているため空配列） */
export function getHolidays(): HolidayItem[] {
  return [];
}

/* ---------- 日付フォーマット ---------- */

/** YYYY-MM-DD → YYYY.MM.DD */
export function formatNewsDate(dateStr: string): string {
  return dateStr.replace(/-/g, ".");
}
