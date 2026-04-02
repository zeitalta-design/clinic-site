/**
 * 休院日管理画面
 * CRUD + 公開/非公開切り替え
 */
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type HolidayType = "休診" | "午前休" | "午後休" | "臨時休診";

interface HolidayItem {
  id: string;
  date: string;
  type: HolidayType;
  label?: string;
  note?: string;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const TYPE_OPTIONS: HolidayType[] = ["休診", "午前休", "午後休", "臨時休診"];

const TYPE_COLORS: Record<HolidayType, string> = {
  休診: "bg-red-50 text-red-600 border border-red-200",
  午前休: "bg-amber-50 text-amber-600 border border-amber-200",
  午後休: "bg-blue-50 text-blue-600 border border-blue-200",
  臨時休診: "bg-purple-50 text-purple-600 border border-purple-200",
};

export default function AdminHolidaysPage() {
  const [holidays, setHolidays] = useState<HolidayItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [type, setType] = useState<HolidayType>("休診");
  const [label, setLabel] = useState("");
  const [note, setNote] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [saving, setSaving] = useState(false);

  const router = useRouter();

  const fetchHolidays = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/holidays");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) throw new Error("取得失敗");
      setHolidays(await res.json());
    } catch {
      setError("休院日の取得に失敗しました");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchHolidays();
  }, [fetchHolidays]);

  useEffect(() => {
    if (!date) setDate(new Date().toISOString().split("T")[0]);
  }, [date]);

  const resetForm = () => {
    setEditingId(null);
    setDate(new Date().toISOString().split("T")[0]);
    setType("休診");
    setLabel("");
    setNote("");
    setIsPublished(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const method = editingId ? "PUT" : "POST";
      const res = await fetch("/api/admin/holidays", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId,
          date,
          type,
          label: label || undefined,
          note: note || undefined,
          isPublished,
        }),
      });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) throw new Error("保存失敗");
      resetForm();
      await fetchHolidays();
    } catch {
      setError("保存に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: HolidayItem) => {
    setEditingId(item.id);
    setDate(item.date);
    setType(item.type);
    setLabel(item.label || "");
    setNote(item.note || "");
    setIsPublished(item.isPublished);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTogglePublish = async (item: HolidayItem) => {
    try {
      const res = await fetch("/api/admin/holidays", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, isPublished: !item.isPublished }),
      });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) throw new Error("変更失敗");
      await fetchHolidays();
    } catch {
      setError("公開状態の変更に失敗しました");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("この休院日を削除しますか？")) return;
    try {
      const res = await fetch("/api/admin/holidays", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) throw new Error("削除失敗");
      await fetchHolidays();
    } catch {
      setError("削除に失敗しました");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const formatDateLabel = (d: string) => {
    try {
      const dt = new Date(d + "T00:00:00");
      const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
      return `${dt.getFullYear()}/${String(dt.getMonth() + 1).padStart(2, "0")}/${String(dt.getDate()).padStart(2, "0")}（${weekdays[dt.getDay()]}）`;
    } catch {
      return d;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#2F9FD3]">休院日管理</h1>
        <div className="flex items-center gap-4">
          <Link
            href="/admin/news"
            className="text-base text-[#2F9FD3] hover:underline"
          >
            お知らせ管理
          </Link>
          <button
            onClick={handleLogout}
            className="text-base text-[#4B5563] hover:text-red-600 transition-colors"
          >
            ログアウト
          </button>
        </div>
      </div>

      {error && (
        <p className="text-base text-red-600 bg-red-50 px-4 py-3 rounded mb-4">
          {error}
        </p>
      )}

      {/* 登録フォーム */}
      <div className="bg-[#EDF7FC] rounded-xl p-6 mb-8">
        <h2 className="font-bold text-[#2F9FD3] text-lg mb-4">
          {editingId ? "休院日を編集" : "新しい休院日"}
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
                種別
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as HolidayType)}
                className="w-full px-4 py-3 border border-[#DCEAF2] rounded-lg text-base text-[#333333]"
              >
                {TYPE_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-base font-medium text-[#333333] mb-1">
              表示ラベル（任意）
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              maxLength={50}
              className="w-full px-4 py-3 border border-[#DCEAF2] rounded-lg text-base text-[#333333]"
              placeholder="例: 年末年始休診"
            />
          </div>
          <div>
            <label className="block text-base font-medium text-[#333333] mb-1">
              補足メモ（任意）
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={200}
              rows={2}
              className="w-full px-4 py-3 border border-[#DCEAF2] rounded-lg text-base text-[#333333]"
              placeholder="補足事項があれば記入"
            />
          </div>

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
                （非公開：カレンダーに表示されません）
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
      <h2 className="font-bold text-[#2F9FD3] text-lg mb-4">
        登録済み休院日
      </h2>
      {loading ? (
        <p className="text-[#4B5563] text-base">読み込み中...</p>
      ) : holidays.length === 0 ? (
        <p className="text-[#4B5563] text-base py-4">
          休院日はまだ登録されていません
        </p>
      ) : (
        <ul className="space-y-3">
          {holidays.map((item) => (
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
                    <span className="text-base text-[#333333] font-bold">
                      {formatDateLabel(item.date)}
                    </span>
                    <span
                      className={`text-sm px-2.5 py-0.5 rounded-full font-medium ${TYPE_COLORS[item.type]}`}
                    >
                      {item.type}
                    </span>
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
                  {item.label && (
                    <p className="text-base font-medium text-[#333333]">
                      {item.label}
                    </p>
                  )}
                  {item.note && (
                    <p className="text-sm text-[#4B5563] mt-1">{item.note}</p>
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
