"use client";

/**
 * お知らせ一覧（表示部分）
 * ビルド時の内容（initialItems）でまず表示し、ブラウザで Supabase から最新を読み直して差し替える。
 * 読み直しに失敗した場合はビルド時の内容のまま表示する（画面が空になることはない）。
 */

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { mapRow, type NewsRow } from "@/lib/admin-news";
import { formatNewsDate, getNews as getLocalNews } from "@/lib/news-data";

export type NewsListItem = { id: string; title: string; date: string; content: string | null };

/** 公開中のお知らせが0件の時に出すローカルデータ（従来どおりのフォールバック） */
export function localNewsItems(): NewsListItem[] {
  return getLocalNews(10).map((n) => ({ id: n.id, title: n.title, date: n.date, content: n.body || null }));
}

export default function NewsList({ initialItems }: { initialItems: NewsListItem[] }) {
  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;
    supabase
      .from("clinic_news")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(10)
      .then(({ data, error }) => {
        if (cancelled || error || !data) return;
        const latest = (data as NewsRow[]).map(mapRow).map((n) => ({
          id: n.id,
          title: n.title,
          date: n.date,
          content: n.content,
        }));
        // 従来どおり、公開中のお知らせが0件ならローカルデータを表示する
        setItems(latest.length > 0 ? latest : localNewsItems());
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
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
              <p className="text-base font-semibold text-[#333333] mt-1">
                {item.title}
              </p>
              {item.content && (
                <p className="text-sm text-[#4B5563] leading-relaxed mt-1 whitespace-pre-line">
                  {item.content}
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-[#999999] py-10 text-sm">
          現在お知らせはありません
        </p>
      )}
    </div>
  );
}
