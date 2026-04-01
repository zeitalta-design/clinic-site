/**
 * クリニック院内ギャラリーコンポーネント
 * 5枚の院内写真をカード型グリッドで統一表示
 * 画像読み込みエラー時はプレースホルダーUIにフォールバック
 */
"use client";

import { useState } from "react";
import Image from "next/image";

interface GalleryItem {
  src: string;
  alt: string;
  title: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    src: "/images/clinic/building.jpg",
    alt: "内科 高橋清仁クリニック 外観",
    title: "外観",
    description:
      "初めての方でも迷わずご来院いただけるよう、わかりやすい外観と立地となっております。どなたでも安心してお越しいただける環境づくりを大切にしております。",
  },
  {
    src: "/images/clinic/reception.jpg",
    alt: "受付の様子",
    title: "受付",
    description:
      "患者さまに安心してご来院いただけるよう、スタッフが丁寧にご案内いたします。初めての方にもわかりやすく対応し、スムーズな受付を心がけております。",
  },
  {
    src: "/images/clinic/waiting.jpg",
    alt: "待合室",
    title: "待合室",
    description:
      "患者さまに落ち着いてお待ちいただけるよう、明るく清潔感のある空間づくりを心がけております。混雑時にもできる限り快適にお過ごしいただけるよう配慮しております。",
  },
  {
    src: "/images/clinic/examination.jpg",
    alt: "診察室",
    title: "診察室",
    description:
      "患者さまに安心してご相談いただけるよう、落ち着いた雰囲気の診察室を整えております。どんな些細なことでも遠慮なくご相談いただけるよう、安心して受診していただける環境づくりを大切にしております。",
  },
  {
    src: "/images/clinic/equipment.jpg",
    alt: "医療機器",
    title: "医療機器",
    description:
      "心電図・レントゲン・超音波検査・ABI検査・神経伝導検査・血糖測定機器・持続血糖測定器（FreeStyle Libre／Dexcom G7）・SAP（MiniMed 780G など）を備え、糖尿病や動脈硬化、神経障害の早期発見・評価に対応しております。",
  },
];

/** 画像読み込み失敗時のプレースホルダー */
function Placeholder({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 bg-[#EDF7FC] flex items-center justify-center">
      <div className="text-center text-[#2F9FD3]">
        <svg
          className="w-12 h-12 mx-auto mb-2 opacity-40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="text-sm opacity-60">{title}</p>
      </div>
    </div>
  );
}

export default function ClinicGallery() {
  const [errors, setErrors] = useState<Set<number>>(new Set());

  const handleError = (index: number) => {
    setErrors((prev) => new Set(prev).add(index));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {GALLERY_ITEMS.map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-md overflow-hidden border border-[#DCEAF2] hover:shadow-lg transition-shadow"
        >
          {/* 画像エリア（16:9 アスペクト比固定） */}
          <div className="relative aspect-video bg-[#EDF7FC]">
            {errors.has(i) ? (
              <Placeholder title={item.title} />
            ) : (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                onError={() => handleError(i)}
              />
            )}
          </div>
          {/* テキストエリア */}
          <div className="p-4">
            <h3 className="font-bold text-[#2F9FD3] text-base mb-1">
              {item.title}
            </h3>
            <p className="text-sm text-[#666666] leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
