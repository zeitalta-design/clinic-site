"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string | null;
  is_published: boolean;
}

const EMPTY_FORM = {
  title: "",
  date: new Date().toISOString().slice(0, 10),
  content: "",
  is_published: true,
};

export default function AdminNewsPage() {
  const router = useRouter();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [msgVisible, setMsgVisible] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<NewsItem | null>(null);

  const fetchNews = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/news");
      if (res.ok) setNews(await res.json());
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchNews(); }, [fetchNews]);

  // ESCキーで削除モーダルを閉じる
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setDeleteTarget(null);
    }
    if (deleteTarget) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [deleteTarget]);

  function showMsg(text: string, type: "success" | "error") {
    setMessage({ text, type });
    setMsgVisible(true);
    setTimeout(() => setMsgVisible(false), 2500);
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((f) => ({ ...f, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  function startEdit(item: NewsItem) {
    setEditId(item.id);
    setForm({ title: item.title, date: item.date, content: item.content || "", is_published: item.is_published });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditId(null);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) { showMsg("タイトルを入力してください", "error"); return; }
    setSaving(true);
    try {
      const url = editId ? `/api/admin/news/${editId}` : "/api/admin/news";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        showMsg(editId ? "更新しました" : "追加しました", "success");
        cancelEdit();
        fetchNews();
      } else {
        const data = await res.json();
        showMsg(data.error || "保存に失敗しました", "error");
      }
    } catch { showMsg("通信エラーが発生しました", "error"); }
    finally { setSaving(false); }
  }

  async function executeDelete() {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/admin/news/${deleteTarget.id}`, { method: "DELETE" });
      if (res.ok) { showMsg("削除しました", "success"); fetchNews(); }
      else showMsg("削除に失敗しました", "error");
    } catch { showMsg("通信エラー", "error"); }
    finally { setDeleteTarget(null); }
  }

  async function handleLogout() {
    if (!confirm("ログアウトしますか？")) return;
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const inputClass = "w-full px-4 py-3 border border-[#DCEAF2] rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#46B7E8]";

  return (
    <div className="min-h-screen bg-[#F8FCFE] text-[18px]">
      {/* ヘッダー */}
      <header className="bg-[#2F9FD3] text-white">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between h-16">
          <h1 className="font-bold text-xl">お知らせ管理</h1>
          <div className="flex items-center gap-5">
            <a href="/" target="_blank" className="text-sm text-white/70 hover:text-white transition">公開サイト →</a>
            <button onClick={handleLogout} className="px-3 py-1.5 text-sm text-white/80 border border-white/30 rounded-md hover:bg-white/10 hover:text-white transition">ログアウト</button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* メッセージ */}
        {message.text && (
          <div className={`mb-5 px-5 py-3 rounded-lg text-base font-medium transition-opacity duration-500 ${
            msgVisible ? "opacity-100" : "opacity-0"
          } ${
            message.type === "success" ? "bg-green-50 border border-green-200 text-green-700" : "bg-red-50 border border-red-200 text-red-700"
          }`}>{message.text}</div>
        )}

        {/* ========== フォーム ========== */}
        <section className="bg-white rounded-xl border border-[#DCEAF2] p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-[#333333]">{editId ? "お知らせを編集" : "お知らせを追加"}</h2>
            {editId && (
              <button onClick={cancelEdit} className="px-4 py-2 text-sm text-[#666666] bg-gray-100 rounded-md hover:bg-gray-200 transition">
                キャンセル
              </button>
            )}
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-base font-medium text-[#333333] mb-2">
                  タイトル <span className="text-red-500">*</span>
                </label>
                <input name="title" value={form.title} onChange={handleChange} required className={inputClass}
                  placeholder="例: GW期間中の診療について" />
              </div>
              <div>
                <label className="block text-base font-medium text-[#333333] mb-2">
                  日付 <span className="text-red-500">*</span>
                </label>
                <input name="date" type="date" value={form.date} onChange={handleChange} required className={inputClass} />
              </div>
            </div>
            <div>
              <label className="block text-base font-medium text-[#333333] mb-2">本文</label>
              <textarea name="content" value={form.content} onChange={handleChange} rows={5} className={inputClass}
                placeholder="お知らせの内容を入力してください" />
            </div>
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-3 text-base text-[#333333] cursor-pointer">
                <input type="checkbox" name="is_published" checked={form.is_published} onChange={handleChange}
                  className="w-5 h-5 rounded" />
                公開する
              </label>
              <button type="submit" disabled={saving}
                className="px-8 py-3 bg-[#46B7E8] text-white text-base font-bold rounded-lg hover:bg-[#3AABDC] transition disabled:opacity-50">
                {saving ? "保存中..." : editId ? "更新する" : "追加する"}
              </button>
            </div>
          </form>
        </section>

        {/* ========== 一覧 ========== */}
        <section>
          <h2 className="text-xl font-bold text-[#333333] mb-5">お知らせ一覧</h2>
          {loading ? (
            <p className="text-[#999999] text-center py-12 text-base">読み込み中...</p>
          ) : news.length === 0 ? (
            <p className="text-[#999999] text-center py-12 text-base">お知らせはまだありません</p>
          ) : (
            <div className="bg-white rounded-xl border border-[#DCEAF2] overflow-hidden">
              <table className="w-full text-base">
                <thead>
                  <tr className="bg-[#EDF7FC] border-b border-[#DCEAF2] text-left">
                    <th className="py-4 px-5 font-semibold text-[#2F9FD3] text-base">日付</th>
                    <th className="py-4 px-5 font-semibold text-[#2F9FD3] text-base">タイトル</th>
                    <th className="py-4 px-5 font-semibold text-[#2F9FD3] text-base">状態</th>
                    <th className="py-4 px-5 font-semibold text-[#2F9FD3] text-base">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {news.map((item) => (
                    <tr key={item.id} className={`border-b border-[#EDF7FC] hover:bg-[#F8FCFE] ${editId === item.id ? "bg-[#EDF7FC]" : ""}`}>
                      <td className="py-4 px-5 text-[#666666] whitespace-nowrap">{item.date}</td>
                      <td className="py-4 px-5">
                        <p className="text-[#333333] font-medium">{item.title}</p>
                        {item.content && (
                          <p className="text-[#999999] text-sm mt-1 truncate max-w-[350px]">{item.content}</p>
                        )}
                      </td>
                      <td className="py-4 px-5">
                        {item.is_published ? (
                          <span className="text-sm font-bold px-3 py-1 rounded bg-green-100 text-green-700 border border-green-200">
                            公開中
                          </span>
                        ) : (
                          <span className="text-sm font-bold px-3 py-1 rounded bg-gray-100 text-gray-500 border border-gray-200">
                            非公開
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button onClick={() => startEdit(item)}
                            className="px-4 py-2 text-sm font-medium text-white bg-[#46B7E8] rounded-md hover:bg-[#3AABDC] transition">
                            編集
                          </button>
                          <button onClick={() => setDeleteTarget(item)}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition">
                            削除
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {/* ========== 削除確認モーダル ========== */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setDeleteTarget(null)}>
          {/* 背景オーバーレイ */}
          <div className="absolute inset-0 bg-black/40" />
          {/* モーダル本体 */}
          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-8"
            onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-[#333333] mb-3">削除の確認</h3>
            <p className="text-base text-[#666666] mb-2">以下のお知らせを削除しますか？</p>
            <p className="text-base font-medium text-[#333333] bg-[#F8FCFE] rounded-lg px-4 py-3 mb-5">
              「{deleteTarget.title}」
            </p>
            <p className="text-sm text-red-500 mb-6">※ この操作は元に戻せません</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteTarget(null)}
                className="px-6 py-3 text-base font-medium text-[#666666] bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                キャンセル
              </button>
              <button onClick={executeDelete}
                className="px-6 py-3 text-base font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition">
                削除する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
