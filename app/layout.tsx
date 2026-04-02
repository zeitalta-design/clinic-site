/**
 * ルートレイアウト
 * SEO/MEO最適化版：metadataBase・JSON-LD・OGP統合
 */

import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "函館市美原の内科｜糖尿病・甲状腺なら内科高橋清仁クリニック",
    template: "%s｜内科高橋清仁クリニック",
  },
  description:
    "函館市美原の内科高橋清仁クリニック。内科 , 糖尿病・代謝内科 , 内分泌内科に対応し、健診結果が気になる方や体調の変化が気になる方のご相談を受け付けています。函館バス「亀田支所前」徒歩7分、駐車場29台完備。",
  keywords: [
    "内科高橋清仁クリニック",
    "函館市",
    "美原",
    "内科",
    "糖尿病",
    "代謝内科",
    "内分泌内科",
    "かかりつけ医",
    "函館 内科",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "函館市美原の内科｜糖尿病・甲状腺なら内科高橋清仁クリニック",
    description:
      "函館市美原の内科高橋清仁クリニック。内科 , 糖尿病・代謝内科 , 内分泌内科に対応。函館バス「亀田支所前」徒歩7分、駐車場29台完備。",
    url: SITE.url,
    siteName: SITE.name,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "函館市美原の内科｜糖尿病・甲状腺なら内科高橋清仁クリニック",
    description:
      "函館市美原の内科高橋清仁クリニック。内科 , 糖尿病・代謝内科 , 内分泌内科に対応。函館バス「亀田支所前」徒歩7分、駐車場29台完備。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/** MedicalClinic 構造化データ（JSON-LD） */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "内科高橋清仁クリニック",
  description: SITE.description,
  url: SITE.url,
  telephone: SITE.phone,
  image: `${SITE.url}/images/clinic/exterior.jpg`,
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
    { "@type": "MedicalSpecialty", name: "内科" },
    { "@type": "MedicalSpecialty", name: "糖尿病・代謝内科" },
    { "@type": "MedicalSpecialty", name: "内分泌内科" },
  ],
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
  amenityFeature: {
    "@type": "LocationFeatureSpecification",
    name: "無料駐車場",
    value: true,
  },
  publicAccess: true,
  isAcceptingNewPatients: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
