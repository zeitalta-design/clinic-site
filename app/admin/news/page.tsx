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

  const fetchNews = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/news");
      if (res.ok) setNews(await res.json());
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchNews(); }, [fetchNews]);

  function showMsg(text: string, type: "success" | "error") {
    setMessage({ text, type });
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

  async function handleDelete(item: NewsItem) {
    if (!confirm(`「${item.title}」を削除しますか？\nこの操作は元に戻せません。`)) return;
    try {
      const res = await fetch(`/api/admin/news/${item.id}`, { method: "DELETE" });
      if (res.ok) { showMsg("削除しました", "success"); fetchNews(); }
      else showMsg("削除に失敗しました", "error");
    } catch { showMsg("通信エラー", "error"); }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const inputClass = "w-full px-3 py-2.5 border border-[#DCEAF2] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#46B7E8]";

  return (
    <div className="min-h-screen bg-[#F8FCFE]">
      <header className="bg-[#2F9FD3] text-white">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between h-14">
          <h1 className="font-bold text-lg">お知らせ管理</h1>
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" className="text-xs text-white/70 hover:text-white transition">公開サイト →</a>
            <button onClick={handleLogout} className="text-xs text-white/70 hover:text-red-200 transition">ログアウト</button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {message.text && (
          <div className={`mb-4 px-4 py-2.5 rounded-lg text-sm ${
            message.type === "success" ? "bg-green-50 border border-green-200 text-green-700" : "bg-red-50 border border-red-200 text-red-700"
          }`}>{message.text}</div>
        )}

        {/* フォーム */}
        <section className="bg-white rounded-xl border border-[#DCEAF2] p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#333333]">{editId ? "お知らせを編集" : "お知らせを追加"}</h2>
            {editId && <button onClick={cancelEdit} className="text-xs text-[#999999] hover:text-[#2F9FD3]">キャンセル</button>}
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">タイトル <span className="text-red-500">*</span></label>
                <input name="title" value={form.title} onChange={handleChange} required className={inputClass} placeholder="例: GW期間中の診療について" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">日付 <span className="text-red-500">*</span></label>
                <input name="date" type="date" value={form.date} onChange={handleChange} required className={inputClass} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-1">本文</label>
              <textarea name="content" value={form.content} onChange={handleChange} rows={4} className={inputClass} placeholder="お知らせの内容を入力してください" />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-[#333333]">
                <input type="checkbox" name="is_published" checked={form.is_published} onChange={handleChange} className="rounded" />
                公開する
              </label>
              <button type="submit" disabled={saving} className="px-6 py-2.5 bg-[#46B7E8] text-white font-medium rounded-lg hover:bg-[#3AABDC] transition disabled:opacity-50">
                {saving ? "保存中..." : editId ? "更新する" : "追加する"}
              </button>
            </div>
          </form>
        </section>

        {/* 一覧 */}
        <section>
          <h2 className="text-lg font-bold text-[#333333] mb-4">お知らせ一覧</h2>
          {loading ? (
            <p className="text-[#999999] text-center py-10">読み込み中...</p>
          ) : news.length === 0 ? (
            <p className="text-[#999999] text-center py-10">お知らせはまだありません</p>
          ) : (
            <div className="bg-white rounded-xl border border-[#DCEAF2] overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#EDF7FC] border-b border-[#DCEAF2] text-left">
                    <th className="py-3 px-4 font-semibold text-[#2F9FD3]">日付</th>
                    <th className="py-3 px-4 font-semibold text-[#2F9FD3]">タイトル</th>
                    <th className="py-3 px-4 font-semibold text-[#2F9FD3]">状態</th>
                    <th className="py-3 px-4 font-semibold text-[#2F9FD3]">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {news.map((item) => (
                    <tr key={item.id} className={`border-b border-[#EDF7FC] hover:bg-[#F8FCFE] ${editId === item.id ? "bg-[#EDF7FC]" : ""}`}>
                      <td className="py-3 px-4 text-[#666666] whitespace-nowrap">{item.date}</td>
                      <td className="py-3 px-4">
                        <p className="text-[#333333] font-medium">{item.title}</p>
                        {item.content && <p className="text-[#999999] text-xs mt-0.5 truncate max-w-[300px]">{item.content}</p>}
                      </td>
                      <td className="py-3 px-4">
                        {item.is_published ? (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-green-100 text-green-700 border border-green-200">公開中</span>
                        ) : (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">非公開</span>
                        )}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <button onClick={() => startEdit(item)} className="text-xs text-[#2F9FD3] hover:underline mr-3">編集</button>
                        <button onClick={() => handleDelete(item)} className="text-xs text-red-400 hover:underline">削除</button>
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
