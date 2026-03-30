/**
 * 院長写真コンポーネント
 * クライアントコンポーネント：画像読み込みエラー時のフォールバック用
 */
"use client";

import { useState } from "react";
import Image from "next/image";

export default function DirectorPhoto() {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="bg-[#EDF7FC] rounded-xl aspect-[3/4] flex items-center justify-center shadow-md">
        <div className="text-center text-[#2F9FD3]">
          <svg
            className="w-16 h-16 mx-auto mb-2 opacity-40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <p className="text-sm opacity-60">院長写真</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md bg-[#EDF7FC]">
      <Image
        src="/images/doctor/director.jpg"
        alt="院長の写真"
        fill
        sizes="(max-width: 768px) 100vw, 40vw"
        className="object-cover"
        onError={() => setError(true)}
        priority
      />
    </div>
  );
}
