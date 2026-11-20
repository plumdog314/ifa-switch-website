import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ISR時にもブログのMarkdownを読めるよう同梱する
  outputFileTracingIncludes: {
    "/**": ["./content/**/*"],
  },
};

export default nextConfig;
