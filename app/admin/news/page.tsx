"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string;
  isPublished: boolean;
}

export default function AdminNewsPage() {
  const router = useRouter();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  // フォーム
  const [form, setForm] = useState({
    title: "",
    date: new Date().toISOString().slice(0, 10),
    content: "",
    isPublished: true,
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const fetchNews = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/news");
      if (res.ok) {
        const data = await res.json();
        setNews(data);
      }
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((f) => ({
        ...f,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) {
      setMessage("タイトルを入力してください");
      return;
    }
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMessage("保存しました");
        setForm({
          title: "",
          date: new Date().toISOString().slice(0, 10),
          content: "",
          isPublished: true,
        });
        fetchNews();
        setTimeout(() => setMessage(""), 3000);
      } else {
        const data = await res.json();
        setMessage(data.error || "保存に失敗しました");
      }
    } catch {
      setMessage("通信エラーが発生しました");
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#F8FCFE]">
      {/* ヘッダー */}
      <header className="bg-[#2F9FD3] text-white">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between h-14">
          <h1 className="font-bold text-lg">お知らせ管理</h1>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              className="text-xs text-white/70 hover:text-white transition"
            >
              公開サイト →
            </a>
            <button
              onClick={handleLogout}
              className="text-xs text-white/70 hover:text-red-200 transition"
            >
              ログアウト
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 新規追加フォーム */}
        <section className="bg-white rounded-xl border border-[#DCEAF2] p-6 mb-8">
          <h2 className="text-lg font-bold text-[#333333] mb-4">
            お知らせを追加
          </h2>

          {message && (
            <div
              className={`mb-4 px-4 py-2.5 rounded-lg text-sm ${
                message === "保存しました"
                  ? "bg-green-50 border border-green-200 text-green-700"
                  : "bg-red-50 border border-red-200 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">
                  タイトル <span className="text-red-500">*</span>
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 border border-[#DCEAF2] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#46B7E8]"
                  placeholder="例: GW期間中の診療について"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">
                  日付 <span className="text-red-500">*</span>
                </label>
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 border border-[#DCEAF2] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#46B7E8]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#333333] mb-1">
                本文
              </label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2.5 border border-[#DCEAF2] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#46B7E8]"
                placeholder="お知らせの内容を入力してください"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-[#333333]">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={form.isPublished}
                  onChange={handleChange}
                  className="rounded"
                />
                公開する
              </label>

              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-[#46B7E8] text-white font-medium rounded-lg hover:bg-[#3AABDC] transition disabled:opacity-50"
              >
                {saving ? "保存中..." : "保存する"}
              </button>
            </div>
          </form>
        </section>

        {/* お知らせ一覧 */}
        <section>
          <h2 className="text-lg font-bold text-[#333333] mb-4">
            お知らせ一覧
          </h2>

          {loading ? (
            <p className="text-[#999999] text-center py-10">読み込み中...</p>
          ) : news.length === 0 ? (
            <p className="text-[#999999] text-center py-10">
              お知らせはまだありません
            </p>
          ) : (
            <div className="bg-white rounded-xl border border-[#DCEAF2] overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#EDF7FC] border-b border-[#DCEAF2] text-left">
                    <th className="py-3 px-4 font-semibold text-[#2F9FD3]">
                      日付
                    </th>
                    <th className="py-3 px-4 font-semibold text-[#2F9FD3]">
                      タイトル
                    </th>
                    <th className="py-3 px-4 font-semibold text-[#2F9FD3]">
                      状態
                    </th>
                    <th className="py-3 px-4 font-semibold text-[#2F9FD3]">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {news.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-[#EDF7FC] hover:bg-[#F8FCFE]"
                    >
                      <td className="py-3 px-4 text-[#666666] whitespace-nowrap">
                        {item.date}
                      </td>
                      <td className="py-3 px-4 text-[#333333] font-medium">
                        {item.title}
                      </td>
                      <td className="py-3 px-4">
                        {item.isPublished ? (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-green-100 text-green-700 border border-green-200">
                            公開中
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">
                            非公開
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-xs text-[#2F9FD3] hover:underline mr-3">
                          編集
                        </button>
                        <button className="text-xs text-red-400 hover:underline">
                          削除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
