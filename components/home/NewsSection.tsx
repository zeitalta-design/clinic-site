/**
 * お知らせセクション
 * データソース: Supabase news テーブル（公開中のみ）
 * フォールバック: lib/news-data.ts のローカルデータ
 */

import { getPublishedNewsList } from "@/lib/admin-news";
import { getNews as getLocalNews, formatNewsDate } from "@/lib/news-data";
import SectionTitle from "@/components/common/SectionTitle";

export default async function NewsSection() {
  // Supabaseからお知らせ取得を試みる。失敗時はローカルデータにフォールバック
  let items: { id: string; title: string; date: string; content: string | null }[] = [];

  try {
    const supabaseNews = await getPublishedNewsList(3);
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
  if (items.length === 0) {
    const local = getLocalNews(3);
    items = local.map((n) => ({
      id: n.id,
      title: n.title,
      date: n.date,
      content: n.body || null,
    }));
  }

  return (
    <section className="py-14 md:py-16 bg-[#F8FCFE]" aria-label="お知らせ">
      <div className="max-w-5xl mx-auto px-4">
        <SectionTitle english="News" japanese="お知らせ" id="news" />

        <div>
          {items.length > 0 ? (
            <ul className="divide-y divide-[#E8EFF4]">
              {items.map((item) => (
                <li key={item.id} className="py-5 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <time
                      dateTime={item.date}
                      className="text-xs text-[#888888] tabular-nums tracking-wide"
                    >
                      {formatNewsDate(item.date)}
                    </time>
                    <span className="inline-block min-w-[4rem] text-center text-[11px] leading-none px-2.5 py-1 rounded font-bold bg-[#EDF7FC] text-[#2F9FD3] border border-[#d0e8f0]">
                      お知らせ
                    </span>
                  </div>
                  <p className="text-base text-[#4B5563] leading-relaxed mt-1 whitespace-pre-line">
                    {item.content || item.title}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-[#999999] py-10 text-sm">
              現在お知らせはありません
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
