import type { CSSProperties } from "react";

// 手続きナビ型の配色。トップページ・記事一覧・テーマ別一覧で共通に使う。globals.css のトークンは変えない。
export const NAVI_VARS = {
  "--nv-bg": "#eef2f7",
  "--nv-soft": "#e3eaf3",
  "--nv-line": "#d3dce7",
  "--nv-line-strong": "#9fb0c4",
  "--nv-navy": "#12305a",
  "--nv-navy-2": "#1d4479",
  "--nv-muted": "#4a5b70",
} as CSSProperties;
