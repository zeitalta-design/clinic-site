import type { NextConfig } from "next";

/**
 * ロリポップ（レンタルサーバー）で配信するための静的書き出し設定。
 *   - `next build` で out/ に静的ファイルを書き出し、GitHub Actions が FTPS でアップロードする
 *   - サーバー機能（middleware / Route Handlers / ISR / headers）は使えない。
 *     お知らせの表示はブラウザから Supabase を直接読み、管理画面の API は public/api/admin/*.php が担う
 *   - キャッシュ制御はロリポップ側（public/.htaccess）で行う
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
