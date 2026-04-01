/**
 * クリニック院内ギャラリーコンポーネント
 * 院内写真をカード型グリッドで表示
 * 医療機器セクションは拡大表示で詳細リスト付き
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
    src: "/images/clinic/waiting-room.jpg",
    alt: "待合室",
    title: "待合室",
    description:
      "患者さまに落ち着いてお待ちいただけるよう、明るく清潔感のある空間づくりを心がけております。混雑時にもできる限り快適にお過ごしいただけるよう配慮しております。",
  },
  {
    src: "/images/clinic/examination-room.jpg",
    alt: "診察室",
    title: "診察室",
    description:
      "患者さまに安心してご相談いただけるよう、落ち着いた雰囲気の診察室を整えております。どんな些細なことでも遠慮なくご相談いただけるよう、安心して受診していただける環境づくりを大切にしております。",
  },
];

/** 医療機器リスト */
const EQUIPMENT_LIST = [
  "心電図検査",
  "レントゲン検査（X線）",
  "超音波検査（エコー）",
  "ABI検査（血管の状態評価）",
  "神経伝導検査（DPNチェック）",
  "血糖測定機器",
  "持続血糖測定器（FreeStyle Libre／Dexcom G7）",
  "SAP（センサー連動型インスリンポンプ：MiniMed 780G など）",
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
  const [equipError, setEquipError] = useState(false);

  const handleError = (index: number) => {
    setErrors((prev) => new Set(prev).add(index));
  };

  return (
    <div className="space-y-6">
      {/* 院内写真グリッド（4枚） */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {GALLERY_ITEMS.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-[#DCEAF2] hover:shadow-lg transition-shadow"
          >
            <div className="relative aspect-video bg-[#EDF7FC]">
              {errors.has(i) ? (
                <Placeholder title={item.title} />
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                  onError={() => handleError(i)}
                />
              )}
            </div>
            <div className="p-5">
              <h3 className="font-bold text-[#2F9FD3] text-base mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[#666666] leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 医療機器セクション（拡大表示） */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#DCEAF2] hover:shadow-lg transition-shadow">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* 画像エリア */}
          <div className="relative aspect-video md:aspect-auto md:min-h-[320px] bg-[#EDF7FC]">
            {equipError ? (
              <Placeholder title="医療機器" />
            ) : (
              <Image
                src="/images/clinic/equipment.jpg"
                alt="医療機器"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                onError={() => setEquipError(true)}
              />
            )}
          </div>
          {/* テキストエリア */}
          <div className="p-6 md:p-8">
            <h3 className="font-bold text-[#2F9FD3] text-lg mb-3">
              医療機器
            </h3>
            <p className="text-sm text-[#666666] leading-relaxed mb-4">
              当院では、適切な診断と治療を行うため、各種医療機器を備えております。
            </p>
            <ul className="space-y-2 mb-4">
              {EQUIPMENT_LIST.map((eq, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#333333]">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#46B7E8] shrink-0" />
                  {eq}
                </li>
              ))}
            </ul>
            <p className="text-sm text-[#666666] leading-relaxed border-t border-[#DCEAF2] pt-4">
              糖尿病や動脈硬化、神経障害の早期発見・評価に対応し、先進的な医療機器を活用した診療を行っております。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
