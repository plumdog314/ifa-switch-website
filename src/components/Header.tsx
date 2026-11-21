"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/blog", label: "記事" },
  { href: "/blog/category/market", label: "毎日の市況" },
  { href: "/chat", label: "AIチャット" },
  { href: "/service", label: "サービス" },
  { href: "/pricing", label: "料金" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "会社概要" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || (href !== "/blog" && pathname.startsWith(href + "/"));

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-6">
          <Link href="/" className="flex items-center shrink-0" aria-label="IFAスイッチ ホーム">
            <Image src="/images/logo.svg" alt="IFA Switch" width={132} height={36} priority />
          </Link>

          <nav aria-label="メインメニュー" className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm whitespace-nowrap transition-colors ${
                  isActive(link.href) ? "text-ink font-bold" : "text-text-light hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="whitespace-nowrap border border-ink text-ink hover:bg-ink hover:text-paper px-4 py-1.5 text-sm transition-colors"
            >
              無料で相談する
            </Link>
          </nav>

          <button
            className="lg:hidden p-2 -mr-2 text-ink"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t border-border bg-paper">
          <nav aria-label="メインメニュー" className="flex flex-col px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 border-b border-border text-ink"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-4 mb-2 bg-ink text-paper px-5 py-3 text-sm text-center"
              onClick={() => setIsOpen(false)}
            >
              無料で相談する
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
