import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="mb-4">
              <Image
                src="/images/logo.svg"
                alt="IFA Switch"
                width={140}
                height={38}
                className="brightness-0 invert"
              />
            </div>
            <p className="text-sm leading-relaxed">
              国や言葉の垣根を超え、
              <br />
              誰もが自立してオカネを運用できる時代を創る
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">メニュー</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/service" className="hover:text-primary transition-colors">
                  サービス
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-primary transition-colors">
                  料金
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors">
                  ブログ
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  会社概要
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">お問い合わせ</h3>
            <div className="flex items-center gap-2 text-sm mb-4">
              <Mail size={16} />
              <a
                href="mailto:ifa.switch@gmail.com"
                className="hover:text-primary transition-colors"
              >
                ifa.switch@gmail.com
              </a>
            </div>
            <Link
              href="/contact"
              className="inline-block bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-full text-sm font-medium transition-colors"
            >
              お問い合わせフォーム
            </Link>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-10 pt-6 text-center text-xs text-slate-400">
          <p>Copyright &copy; 2015 - {new Date().getFullYear()} IFA Switch All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
