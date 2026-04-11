/**
 * ルートレイアウト
 * SEO/MEO完全最適化版
 *
 * 実装済み:
 *  - meta description / viewport / charset（Next.js自動出力）
 *  - robots (index, follow)
 *  - canonical URL
 *  - OGP (Open Graph) フルセット + og:image
 *  - Twitter Card
 *  - ファビコン全サイズ + apple-touch-icon
 *  - JSON-LD: WebSite + MedicalClinic + MedicalBusiness
 *  - 医療広告ガイドライン準拠（誇大表現なし）
 */

import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { SITE } from "@/lib/site";

/* ═══════════════════════════════════════════
   Viewport（Next.js 16ではmetadataから分離）
   ═══════════════════════════════════════════ */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#46B7E8",
};

/* ═══════════════════════════════════════════
   Metadata（SEO / OGP / ファビコン）
   ═══════════════════════════════════════════ */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: "内科高橋清仁クリニック",
  title: {
    default: "函館市美原の内科｜糖尿病・甲状腺なら内科高橋清仁クリニック",
    template: "%s｜内科高橋清仁クリニック",
  },
  description:
    "函館市美原の内科クリニックです。糖尿病・甲状腺疾患を専門に、日本糖尿病学会専門医・日本内分泌学会専門医の医師が診療。地域のかかりつけ医として丁寧に対応します。予約不要・駐車場完備・火曜夜間診療あり。",
  keywords: [
    "内科高橋清仁クリニック",
    "函館 内科",
    "函館 糖尿病",
    "函館 甲状腺",
    "函館市美原 内科",
    "糖尿病専門医 函館",
    "甲状腺専門医 函館",
    "内分泌内科 函館",
    "代謝内科",
    "かかりつけ医 函館",
    "函館 内科 夜間",
  ],
  alternates: {
    canonical: "/",
  },
  // --- OGP（Open Graph）フルセット ---
  openGraph: {
    title: "函館市美原の内科｜糖尿病・甲状腺なら内科高橋清仁クリニック",
    description:
      "函館市美原の内科クリニックです。糖尿病・甲状腺疾患を専門に、日本糖尿病学会専門医・日本内分泌学会専門医の医師が診療。地域のかかりつけ医として丁寧に対応します。予約不要・駐車場完備・火曜夜間診療あり。",
    url: SITE.url,
    siteName: "内科高橋清仁クリニック",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/images/clinic/exterior.jpg",
        width: 1200,
        height: 630,
        alt: "内科高橋清仁クリニック外観 — 函館市美原の内科・糖尿病・甲状腺クリニック",
      },
    ],
  },
  // --- Twitter Card ---
  twitter: {
    card: "summary_large_image",
    title: "函館市美原の内科｜糖尿病・甲状腺なら内科高橋清仁クリニック",
    description:
      "函館市美原の内科クリニックです。糖尿病・甲状腺疾患を専門に、日本糖尿病学会専門医・日本内分泌学会専門医が診療。予約不要・駐車場完備。",
    images: ["/images/clinic/exterior.jpg"],
  },
  // --- robots ---
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // --- ファビコン ---
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
    shortcut: [
      { url: "/favicon.ico" },
    ],
  },
  // --- その他 ---
  formatDetection: {
    telephone: true,
    email: false,
  },
  verification: {
    google: "cba68b26ecf1f914",
  },
};

/* ═══════════════════════════════════════════
   JSON-LD 構造化データ
   ═══════════════════════════════════════════ */

/** WebSite — 検索結果のサイト名認識用 */
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: SITE.url,
  name: "内科高橋清仁クリニック",
  alternateName: ["高橋清仁クリニック", "たかはしきよひとクリニック"],
  description: "函館市美原の内科クリニック。糖尿病・甲状腺疾患を専門に診療。",
};

/** MedicalClinic — Googleビジネスプロフィール連携用 */
const clinicJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": `${SITE.url}/#clinic`,
  name: "内科高橋清仁クリニック",
  description:
    "函館市美原の内科クリニックです。糖尿病・甲状腺疾患（内分泌内科）を専門に、地域のかかりつけ医として診療を行っています。",
  url: SITE.url,
  telephone: SITE.phone,
  image: [
    `${SITE.url}/images/clinic/exterior.jpg`,
    `${SITE.url}/images/clinic/reception.jpg`,
  ],
  logo: `${SITE.url}/logo.png`,
  address: {
    "@type": "PostalAddress",
    postalCode: "041-0806",
    addressRegion: "北海道",
    addressLocality: "函館市",
    streetAddress: "美原1丁目14番12号",
    addressCountry: "JP",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE.latitude,
    longitude: SITE.longitude,
  },
  medicalSpecialty: [
    "内科",
    "糖尿病・代謝内科",
    "内分泌内科",
  ],
  openingHoursSpecification: [
    // 月曜
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "09:00", closes: "12:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "14:00", closes: "17:00" },
    // 火曜（午後19:30まで）
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "09:00", closes: "12:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "14:00", closes: "19:30" },
    // 水曜
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "09:00", closes: "12:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "14:00", closes: "17:00" },
    // 木曜（午前のみ）
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "09:00", closes: "12:30" },
    // 金曜
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "09:00", closes: "12:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "14:00", closes: "17:00" },
    // 土曜（午前のみ）
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "12:30" },
  ],
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "無料駐車場", value: true },
    { "@type": "LocationFeatureSpecification", name: "バリアフリー", value: true },
  ],
  // 医師情報（専門医資格を含む）
  employee: [
    {
      "@type": "Physician",
      name: "高橋 清仁",
      jobTitle: "院長",
      medicalSpecialty: ["内科", "糖尿病・代謝内科", "内分泌内科"],
      qualifications: [
        "医学博士",
        "日本内科学会 認定医",
        "日本糖尿病学会 専門医",
        "日本内分泌学会 専門医",
      ],
    },
    {
      "@type": "Physician",
      name: "高橋 清彦",
      jobTitle: "副院長",
      medicalSpecialty: ["内科", "糖尿病・代謝内科", "内分泌内科"],
      qualifications: [
        "医学博士",
        "日本内科学会 認定内科医・総合内科専門医",
        "日本糖尿病学会 専門医・指導医",
        "日本内分泌学会 専門医・指導医",
        "日本肥満学会 専門医",
      ],
    },
  ],
  publicAccess: true,
  isAcceptingNewPatients: true,
  currenciesAccepted: "JPY",
  paymentAccepted: "健康保険、現金",
  priceRange: "保険診療",
};

/** MedicalBusiness（BreadcrumbList対応用） */
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "診療内容", item: `${SITE.url}/services` },
    { "@type": "ListItem", position: 3, name: "クリニック紹介", item: `${SITE.url}/clinic` },
    { "@type": "ListItem", position: 4, name: "院長紹介", item: `${SITE.url}/director` },
    { "@type": "ListItem", position: 5, name: "初診の方へ", item: `${SITE.url}/first` },
    { "@type": "ListItem", position: 6, name: "アクセス", item: `${SITE.url}/access` },
  ],
};

/* ═══════════════════════════════════════════
   レイアウト
   ═══════════════════════════════════════════ */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <head>
        {/* JSON-LD 構造化データ（3種） */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
