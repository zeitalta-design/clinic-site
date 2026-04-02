/**
 * 下層ページ共通のページヒーロー（タイトル部分）
 * パンくずリスト + BreadcrumbList JSON-LD 付き
 */

import Link from "next/link";
import { SITE } from "@/lib/site";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  breadcrumbs: Breadcrumb[];
}

export default function PageHero({ title, breadcrumbs }: PageHeroProps) {
  /** BreadcrumbList JSON-LD */
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      ...(crumb.href ? { item: `${SITE.url}${crumb.href}` } : {}),
    })),
  };

  return (
    <section className="bg-[#EDF7FC] py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="max-w-5xl mx-auto px-4">
        {/* パンくず */}
        <nav aria-label="パンくずリスト" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1 text-base text-[#666666]">
            {breadcrumbs.map((crumb, i) => (
              <li key={i} className="flex items-center gap-1">
                {i > 0 && <span aria-hidden="true">/</span>}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-[#2F9FD3] transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#333333] font-medium">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="text-3xl md:text-4xl font-bold text-[#2F9FD3]">
          {title}
        </h1>
      </div>
    </section>
  );
}
