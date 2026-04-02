/**
 * ヒーローセクション（自動スライドショー）
 *
 * 明るく軽やかなヒーロー。
 * CTAは「はじめての方へ」のみ。電話導線はヘッダーに任せる。
 */
"use client";

import { useState, useEffect, useCallback } from "react";

const SLIDES = [
  {
    bg: "bg-gradient-to-br from-[#46B7E8] via-[#6cc8f0] to-[#3AABDC]",
    imagePath: "/images/hero/hero-1.jpg",
  },
  {
    bg: "bg-gradient-to-br from-[#6cc8f0] to-[#46B7E8]",
    imagePath: "/images/hero/hero-2.jpg?v=2",
  },
  {
    bg: "bg-gradient-to-br from-[#3AABDC] to-[#46B7E8]",
    imagePath: "/images/hero/hero-3.jpg",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  };

  return (
    <section className="relative w-full overflow-hidden" aria-label="メインビジュアル">
      <div className="relative h-[52vh] min-h-[380px] max-h-[580px] md:h-[62vh] md:max-h-[660px]">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === current ? "opacity-100" : "opacity-0"
            } ${slide.bg}`}
            aria-hidden={i !== current}
          >
            {!imageErrors.has(i) && (
              <img
                src={slide.imagePath}
                alt=""
                width={1920}
                height={1080}
                className="absolute inset-0 w-full h-full object-cover brightness-105"
                onError={() => handleImageError(i)}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "low"}
                decoding={i === 0 ? "sync" : "async"}
              />
            )}
            {/* 軽いオーバーレイ：下部のみ */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        ))}

        {/* コンテンツ */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <div className="bg-white/15 backdrop-blur-[2px] rounded-2xl px-8 py-8 md:px-14 md:py-10">
            {/* メインコピー */}
            <h1
              className="text-white text-2xl md:text-4xl lg:text-[2.7rem] font-bold leading-relaxed md:leading-snug mb-6"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.25), 0 1px 3px rgba(0,0,0,0.15)" }}
            >
              笑顔で過ごせるように
              <br />
              寄り添った診療を大切にしています
            </h1>

            {/* CTA：はじめての方へ のみ */}
            <a
              href="/first"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#2F9FD3] font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all text-sm md:text-base"
            >
              はじめての方へ
              <svg
                className="w-4 h-4 ml-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* インジケーター */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-[#E8B818] scale-110"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`スライド ${i + 1} に切り替え`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
