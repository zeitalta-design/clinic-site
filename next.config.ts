import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel上でAPI routes / middleware を使うため output: "export" は外す
  // 静的ホスティング（ロリポップ等）向けには別途 out/ を生成する運用
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
// force rebuild 1775943635
