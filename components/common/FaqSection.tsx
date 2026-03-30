/**
 * よくあるご質問セクション
 * FAQPage JSON-LD を含む
 * トップページ・初診ページで使い回し可能
 */

import SectionTitle from "@/components/common/SectionTitle";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  /** FAQ 一覧 */
  items: FaqItem[];
  /** セクション見出しの英字 */
  english?: string;
  /** セクション見出しの日本語 */
  japanese?: string;
  /** JSON-LD を出力するか（1ページに1回だけ） */
  withJsonLd?: boolean;
}

export default function FaqSection({
  items,
  english = "FAQ",
  japanese = "よくあるご質問",
  withJsonLd = false,
}: FaqSectionProps) {
  /* FAQPage 構造化データ */
  const jsonLd = withJsonLd
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <section className="py-16 md:py-20 bg-white" aria-label="よくあるご質問">
      {withJsonLd && jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <div className="max-w-3xl mx-auto px-4">
        <SectionTitle english={english} japanese={japanese} />

        <dl className="space-y-4">
          {items.map((faq, i) => (
            <div
              key={i}
              className="bg-[#F8FCFE] border border-[#DCEAF2] rounded-xl p-5 md:p-6"
            >
              <dt className="flex items-start gap-3 text-base md:text-lg font-bold text-[#2F9FD3] mb-2">
                <span className="shrink-0 w-8 h-8 rounded-full bg-[#46B7E8] text-white flex items-center justify-center text-sm font-bold">
                  Q
                </span>
                {faq.question}
              </dt>
              <dd className="flex items-start gap-3 text-base md:text-lg text-[#333333] leading-relaxed pl-11">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
