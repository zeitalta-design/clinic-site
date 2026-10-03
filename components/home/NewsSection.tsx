/**
 * お知らせセクション
 * データソース: Supabase clinic_news テーブル（公開中のみ）
 * フォールバック: lib/news-data.ts のローカルデータ
 *
 * 静的書き出し（ロリポップ配信）のため、2段構えで表示する:
 *   1. ビルド時に Supabase から取得した内容を HTML に埋め込む（初期表示・検索エンジン向け）
 *   2. ブラウザで開いた時に Supabase から最新を読み直して差し替える（NewsList）
 *      → 管理画面で追加・編集したお知らせは、再ビルドなしで即座に反映される
 */

import { getPublishedNewsList } from "@/lib/admin-news";
import SectionTitle from "@/components/common/SectionTitle";
import NewsList, { localNewsItems, type NewsListItem } from "./NewsList";

export default async function NewsSection() {
  // Supabaseからお知らせ取得を試みる。失敗時はローカルデータにフォールバック
  let items: NewsListItem[] = [];

  try {
    const supabaseNews = await getPublishedNewsList(10);
    if (supabaseNews.length > 0) {
      items = supabaseNews.map((n) => ({
        id: n.id,
        title: n.title,
        date: n.date,
        content: n.content,
      }));
    }
  } catch {
    // Supabase未設定 or エラー時
  }

  // Supabaseが空 or エラーの場合はローカルデータを使用
  if (items.length === 0) items = localNewsItems();

  return (
    <section className="py-14 md:py-16 bg-[#F8FCFE]" aria-label="お知らせ">
      <div className="max-w-5xl mx-auto px-4">
        <SectionTitle english="News" japanese="お知らせ" id="news" />
        <NewsList initialItems={items} />
      </div>
    </section>
  );
}
