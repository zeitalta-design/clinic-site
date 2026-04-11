/**
 * ルートレイアウト
 * SEO/MEO完全最適化版 — generateMetadata + JSON-LD確実出力
 */

import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { SITE } from "@/lib/site";

/* ═══════════════════════════════════════════
   Viewport
   ═══════════════════════════════════════════ */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#46B7E8",
};

/* ═══════════════════════════════════════════
   Metadata — generateMetadata関数で動的生成
   ═══════════════════════════════════════════ */
const META_DESCRIPTION =
  "函館市美原の内科クリニックです。糖尿病・甲状腺疾患を専門に、日本糖尿病学会専門医・日本内分泌学会専門医の医師が診療。地域のかかりつけ医として丁寧に対応します。予約不要・駐車場18台完備・火曜夜間診療あり。";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(SITE.url),
    applicationName: "内科高橋清仁クリニック",
    title: {
      default: "函館市美原の内科｜糖尿病・甲状腺なら内科高橋清仁クリニック",
      template: "%s｜内科高橋清仁クリニック",
    },
    description: META_DESCRIPTION,
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
    alternates: { canonical: "/" },
    openGraph: {
      title: "函館市美原の内科｜糖尿病・甲状腺なら内科高橋清仁クリニック",
      description: META_DESCRIPTION,
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
    twitter: {
      card: "summary_large_image",
      title: "函館市美原の内科｜糖尿病・甲状腺なら内科高橋清仁クリニック",
      description: META_DESCRIPTION,
      images: ["/images/clinic/exterior.jpg"],
    },
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
    icons: {
      icon: [
        { url: "/favicon.ico", type: "image/x-icon" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
      shortcut: [{ url: "/favicon.ico" }],
    },
    formatDetection: { telephone: true, email: false },
    verification: { google: "cba68b26ecf1f914" },
  };
}

/* ═══════════════════════════════════════════
   JSON-LD — 文字列リテラルで確実に出力
   ═══════════════════════════════════════════ */
const JSONLD_WEBSITE = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: "https://takahashi-diabetes.com",
  name: "内科高橋清仁クリニック",
  alternateName: ["高橋清仁クリニック", "たかはしきよひとクリニック"],
  description: "函館市美原の内科クリニック。糖尿病・甲状腺疾患を専門に診療。",
});

const JSONLD_CLINIC = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": "https://takahashi-diabetes.com/#clinic",
  name: "内科高橋清仁クリニック",
  description: META_DESCRIPTION,
  url: "https://takahashi-diabetes.com",
  telephone: "0138-40-5100",
  image: [
    "https://takahashi-diabetes.com/images/clinic/exterior.jpg",
    "https://takahashi-diabetes.com/images/clinic/reception.jpg",
  ],
  logo: "https://takahashi-diabetes.com/logo.png",
  address: {
    "@type": "PostalAddress",
    postalCode: "041-0806",
    addressRegion: "北海道",
    addressLocality: "函館市",
    streetAddress: "美原1丁目14番12号",
    addressCountry: "JP",
  },
  geo: { "@type": "GeoCoordinates", latitude: 41.81241, longitude: 140.7544 },
  medicalSpecialty: ["内科", "糖尿病・代謝内科", "内分泌内科"],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "09:00", closes: "12:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "14:00", closes: "17:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "09:00", closes: "12:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "14:00", closes: "19:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "09:00", closes: "12:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "14:00", closes: "17:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "09:00", closes: "12:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "09:00", closes: "12:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "14:00", closes: "17:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "12:30" },
  ],
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "無料駐車場", value: true },
    { "@type": "LocationFeatureSpecification", name: "バリアフリー", value: true },
  ],
  employee: [
    {
      "@type": "Physician",
      name: "高橋 清仁",
      jobTitle: "院長",
      medicalSpecialty: ["内科", "糖尿病・代謝内科", "内分泌内科"],
      qualifications: ["医学博士", "日本内科学会 認定医", "日本糖尿病学会 専門医", "日本内分泌学会 専門医"],
    },
    {
      "@type": "Physician",
      name: "高橋 清彦",
      jobTitle: "副院長",
      medicalSpecialty: ["内科", "糖尿病・代謝内科", "内分泌内科"],
      qualifications: ["医学博士", "日本内科学会 認定内科医・総合内科専門医", "日本糖尿病学会 専門医・指導医", "日本内分泌学会 専門医・指導医", "日本肥満学会 専門医"],
    },
  ],
  publicAccess: true,
  isAcceptingNewPatients: true,
  currenciesAccepted: "JPY",
  paymentAccepted: "健康保険、現金",
  priceRange: "保険診療",
});

const JSONLD_BREADCRUMB = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://takahashi-diabetes.com" },
    { "@type": "ListItem", position: 2, name: "診療内容", item: "https://takahashi-diabetes.com/services" },
    { "@type": "ListItem", position: 3, name: "クリニック紹介", item: "https://takahashi-diabetes.com/clinic" },
    { "@type": "ListItem", position: 4, name: "院長紹介", item: "https://takahashi-diabetes.com/director" },
    { "@type": "ListItem", position: 5, name: "初診の方へ", item: "https://takahashi-diabetes.com/first" },
    { "@type": "ListItem", position: 6, name: "アクセス", item: "https://takahashi-diabetes.com/access" },
  ],
});

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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSONLD_WEBSITE }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSONLD_CLINIC }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSONLD_BREADCRUMB }} />
      </head>
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
