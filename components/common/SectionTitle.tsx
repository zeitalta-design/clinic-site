/**
 * セクション見出しコンポーネント（高齢者可読性対応版）
 * 英語サブタイトル + 日本語大見出し + イエローアクセントライン
 */

interface SectionTitleProps {
  english: string;
  japanese: string;
  id?: string;
}

export default function SectionTitle({
  english,
  japanese,
  id,
}: SectionTitleProps) {
  return (
    <div className="text-center mb-10 md:mb-12" id={id}>
      <p className="text-sm md:text-base tracking-[0.15em] text-[#D4A017] font-semibold uppercase mb-2">
        {english}
      </p>
      <h2 className="text-2xl md:text-4xl font-bold text-[#2F9FD3] leading-snug">
        {japanese}
      </h2>
      <div className="mt-4 mx-auto w-12 h-[3px] bg-gradient-to-r from-[#F3E33A] to-[#f7e86a] rounded-full" />
    </div>
  );
}
