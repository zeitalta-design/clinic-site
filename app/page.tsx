/**
 * トップページ
 * 各セクションを仕様の順番で配置
 */

import HeroSlider from "@/components/home/HeroSlider";
import HoursAndMap from "@/components/home/HoursAndMap";
import ClinicIntro from "@/components/home/ClinicIntro";
import NewsSection from "@/components/home/NewsSection";
import ColumnSection from "@/components/home/ColumnSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ServicesSection from "@/components/home/ServicesSection";
import FirstVisitSection from "@/components/home/FirstVisitSection";
import AccessSection from "@/components/home/AccessSection";
import DoctorSchedule from "@/components/home/DoctorSchedule";
import FaqSection from "@/components/common/FaqSection";
import { TOP_FAQ } from "@/lib/faq-data";

export default function HomePage() {
  return (
    <>
      {/* 1. ヒーロー */}
      <HeroSlider />

      {/* 2. クリニック紹介（ヒーロー直下の導入） */}
      <ClinicIntro />

      {/* 3. 診療時間表 + 地図 */}
      <HoursAndMap />

      {/* 3.5. 担当医表 */}
      <DoctorSchedule />

      {/* 4. お知らせ */}
      <NewsSection />

      {/* 4.5. 健康コラム */}
      <ColumnSection />

      {/* 5. 当院の特徴 */}
      <FeaturesSection />

      {/* 6. 診療内容 */}
      <ServicesSection />

      {/* 8. 初診の方へ */}
      <FirstVisitSection />

      {/* 9. よくあるご質問（FAQPage JSON-LD付き） */}
      <FaqSection items={TOP_FAQ} withJsonLd />

      {/* 10. アクセス */}
      <AccessSection />
    </>
  );
}
