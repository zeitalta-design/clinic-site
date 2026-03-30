/**
 * 管理画面ログインページ
 * ユーザー名 + パスワードで認証
 */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin/news");
      } else {
        const data = await res.json();
        setError(data.error || "ログインに失敗しました");
      }
    } catch {
      setError("通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-xl font-bold text-[#2F9FD3] text-center mb-6">
          管理画面ログイン
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-base font-medium text-[#333333] mb-1"
            >
              ユーザー名
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 border border-[#DCEAF2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#46B7E8] text-[#333333] text-base"
              placeholder="ユーザー名を入力"
              autoComplete="username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-base font-medium text-[#333333] mb-1"
            >
              パスワード
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-[#DCEAF2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#46B7E8] text-[#333333] text-base"
              placeholder="パスワードを入力"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="text-base text-red-600 bg-red-50 px-3 py-2 rounded">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#46B7E8] text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 text-lg"
          >
            {loading ? "ログイン中..." : "ログイン"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-[#4B5563]">
          この画面はサイト管理者専用です
        </p>
      </div>
    </div>
  );
}
