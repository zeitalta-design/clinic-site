/**
 * 管理画面用お知らせデータ管理
 *
 * 将来 Supabase 等に差し替える場合は
 * このファイルの実装だけ変更すればOK。
 * 管理画面側は getAdminNews() / addAdminNews() を呼ぶだけ。
 */

export interface AdminNewsItem {
  id: string;
  title: string;
  date: string;
  content: string;
  isPublished: boolean;
}

// インメモリストア（サーバーレス環境ではリクエストごとにリセットされる可能性あり）
// 将来的には Supabase / DB に差し替え
let newsStore: AdminNewsItem[] = [
  {
    id: "news-1",
    title: "4月29日の診療について（休日当番医）",
    date: "2026-04-04",
    content:
      "※4月29日は休日当番医です。\n緊急性の高い患者様の対応を優先しております。\n通常の診察をご希望の方は、別日の受診をお願いいたします。",
    isPublished: true,
  },
  {
    id: "news-2",
    title: "発熱・かぜ症状がある方の受診について",
    date: "2026-03-31",
    content:
      "発熱・咳・のどの痛みなどの症状がある方も、当院で診察を受けていただけます。インフルエンザの検査にも対応しています。症状がある場合は、受付にてお声がけください。",
    isPublished: true,
  },
  {
    id: "news-3",
    title: "春先の体調不良にご注意ください",
    date: "2026-03-15",
    content:
      "春先は気温の変動が大きく、かぜや花粉症、倦怠感など体調を崩しやすい季節です。気になる症状がある方は、お気軽にご相談ください。",
    isPublished: true,
  },
];

/** お知らせ一覧取得 */
export function getAdminNews(): AdminNewsItem[] {
  return [...newsStore].sort(
    (a, b) => b.date.localeCompare(a.date)
  );
}

/** お知らせ追加 */
export function addAdminNews(
  item: Omit<AdminNewsItem, "id">
): AdminNewsItem {
  const newItem: AdminNewsItem = {
    ...item,
    id: `news-${Date.now()}`,
  };
  newsStore.unshift(newItem);
  return newItem;
}

/** お知らせ削除 */
export function deleteAdminNews(id: string): boolean {
  const before = newsStore.length;
  newsStore = newsStore.filter((n) => n.id !== id);
  return newsStore.length < before;
}

/** お知らせ更新 */
export function updateAdminNews(
  id: string,
  data: Partial<Omit<AdminNewsItem, "id">>
): AdminNewsItem | null {
  const idx = newsStore.findIndex((n) => n.id === id);
  if (idx === -1) return null;
  newsStore[idx] = { ...newsStore[idx], ...data };
  return newsStore[idx];
}
