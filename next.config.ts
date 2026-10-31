import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // открыть сайт с телефона по Wi-Fi (http://192.168.x.x:3000) — иначе в разработке не работают скрипты
  allowedDevOrigins: ["192.168.*.*"],
};

export default nextConfig;
