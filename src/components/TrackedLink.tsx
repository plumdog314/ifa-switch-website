"use client";

// クリックを Vercel Web Analytics のカスタムイベントとして記録するリンク。
// 料金ページや決済リンクへの導線が、どこからどれだけ押されたかを見るために使う。
import Link from "next/link";
import { track } from "@vercel/analytics";
import type { ReactNode } from "react";

type Props = {
  href: string;
  event: string;
  data?: Record<string, string | number | boolean | null>;
  className?: string;
  children: ReactNode;
};

export default function TrackedLink({ href, event, data, className, children }: Props) {
  const onClick = () => track(event, data);
  const external = /^https?:\/\//.test(href);
  return external ? (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
