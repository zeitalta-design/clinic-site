/**
 * お知らせ管理画面
 * CRUD + 公開/非公開切り替え
 */
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  category?: string;
  body?: string;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("お知らせ");
  const [body, setBody] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [saving, setSaving] = useState(false);

  const router = useRouter();

  const fetchNews = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/news");
      if (res.status === 401) { router.push("/admin/login"); return; }
      if (!res.ok) throw new Error("取得失敗");
      setNews(await res.json());
    } catch {
      setError("お知らせの取得に失敗しました");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => { fetchNews(); }, [fetchNews]);

  useEffect(() => {
    if (!date) setDate(new Date().toISOString().split("T")[0]);
  }, [date]);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setDate(new Date().toISOString().split("T")[0]);
    setCategory("お知らせ");
    setBody("");
    setIsPublished(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const method = editingId ? "PUT" : "POST";
      const res = await fetch("/api/admin/news", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, title, date, category, body, isPublished }),
      });
      if (res.status === 401) { router.push("/admin/login"); return; }
      if (!res.ok) throw new Error("保存失敗");
      resetForm();
      await fetchNews();
    } catch {
      setError("保存に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setDate(item.date);
    setCategory(item.category || "お知らせ");
    setBody(item.body || "");
    setIsPublished(item.isPublished);
  };

  const handleTogglePublish = async (item: NewsItem) => {
    try {
      const res = await fetch("/api/admin/news", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, isPublished: !item.isPublished }),
      });
      if (res.status === 401) { router.push("/admin/login"); return; }
      if (!res.ok) throw new Error("変更失敗");
      await fetchNews();
    } catch {
      setError("公開状態の変更に失敗しました");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("このお知らせを削除しますか？")) return;
    try {
      const res = await fetch("/api/admin/news", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.status === 401) { router.push("/admin/login"); return; }
      if (!res.ok) throw new Error("削除失敗");
      await fetchNews();
    } catch {
      setError("削除に失敗しました");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#2F9FD3]">お知らせ管理</h1>
        <button
          onClick={handleLogout}
          className="text-base text-[#4B5563] hover:text-red-600 transition-colors"
        >
          ログアウト
        </button>
      </div>

      {error && (
        <p className="text-base text-red-600 bg-red-50 px-4 py-3 rounded mb-4">
          {error}
        </p>
      )}

      {/* 投稿フォーム */}
      <div className="bg-[#EDF7FC] rounded-xl p-6 mb-8">
        <h2 className="font-bold text-[#2F9FD3] text-lg mb-4">
          {editingId ? "お知らせを編集" : "新しいお知らせ"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-base font-medium text-[#333333] mb-1">
                日付
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-4 py-3 border border-[#DCEAF2] rounded-lg text-base text-[#333333]"
              />
            </div>
            <div>
              <label className="block text-base font-medium text-[#333333] mb-1">
                カテゴリ
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-[#DCEAF2] rounded-lg text-base text-[#333333]"
              >
                <option value="お知らせ">お知らせ</option>
                <option value="休診">休診</option>
                <option value="重要">重要</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-base font-medium text-[#333333] mb-1">
              タイトル
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={100}
              className="w-full px-4 py-3 border border-[#DCEAF2] rounded-lg text-base text-[#333333]"
              placeholder="お知らせのタイトル"
            />
          </div>
          <div>
            <label className="block text-base font-medium text-[#333333] mb-1">
              本文（任意・短文）
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={500}
              rows={3}
              className="w-full px-4 py-3 border border-[#DCEAF2] rounded-lg text-base text-[#333333]"
              placeholder="補足事項があれば記入"
            />
          </div>

          {/* 公開/非公開 */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-5 h-5 rounded border-[#DCEAF2] text-[#46B7E8] focus:ring-[#46B7E8]"
              />
              <span className="text-base text-[#333333] font-medium">
                公開する
              </span>
            </label>
            {!isPublished && (
              <span className="text-base text-[#4B5563]">
                （非公開：トップページに表示されません）
              </span>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-[#46B7E8] text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 text-base"
            >
              {saving ? "保存中..." : editingId ? "更新する" : "追加する"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-3 bg-gray-200 text-[#333333] rounded-lg hover:bg-gray-300 transition-colors text-base"
              >
                キャンセル
              </button>
            )}
          </div>
        </form>
      </div>

      {/* 一覧 */}
      <h2 className="font-bold text-[#2F9FD3] text-lg mb-4">登録済みお知らせ</h2>
      {loading ? (
        <p className="text-[#4B5563] text-base">読み込み中...</p>
      ) : news.length === 0 ? (
        <p className="text-[#4B5563] text-base py-4">
          お知らせはまだ登録されていません
        </p>
      ) : (
        <ul className="space-y-3">
          {news.map((item) => (
            <li
              key={item.id}
              className={`bg-white border rounded-lg p-4 ${
                item.isPublished
                  ? "border-[#DCEAF2]"
                  : "border-gray-300 bg-gray-50"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-base text-[#4B5563] font-medium">
                      {item.date}
                    </span>
                    {item.category && (
                      <span className="text-sm px-2 py-0.5 bg-[#EDF7FC] text-[#2F9FD3] rounded">
                        {item.category}
                      </span>
                    )}
                    <span
                      className={`text-sm px-2 py-0.5 rounded font-medium ${
                        item.isPublished
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {item.isPublished ? "公開中" : "非公開"}
                    </span>
                  </div>
                  <p className="text-base font-medium text-[#333333]">
                    {item.title}
                  </p>
                  {item.body && (
                    <p className="text-base text-[#4B5563] mt-1 line-clamp-2">
                      {item.body}
                    </p>
                  )}
                  {item.updatedAt && (
                    <p className="text-sm text-[#4B5563] mt-1">
                      更新: {new Date(item.updatedAt).toLocaleString("ja-JP")}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={() => handleTogglePublish(item)}
                    className={`text-sm px-3 py-1.5 rounded font-medium ${
                      item.isPublished
                        ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        : "bg-green-100 text-green-700 hover:bg-green-200"
                    }`}
                  >
                    {item.isPublished ? "非公開にする" : "公開する"}
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-sm text-[#2F9FD3] hover:underline"
                  >
                    編集
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    削除
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
