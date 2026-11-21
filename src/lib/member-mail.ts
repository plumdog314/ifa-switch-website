// 会員向けのメール送信（ログイン用リンク）。
// ifa.switch@gmail.com の「アプリ パスワード」を使って Gmail から送る。
// GMAIL_APP_PASSWORD が未設定なら送らない（ログイン画面は「ご連絡ください」の案内に戻る）。

import nodemailer from "nodemailer";
import { LOGIN_LINK_MINUTES } from "./member-auth";

const gmailUser = () => process.env.GMAIL_USER?.trim() || "ifa.switch@gmail.com";
const gmailPass = () => (process.env.GMAIL_APP_PASSWORD ?? "").replace(/\s+/g, "");

export const memberMailConfigured = () => gmailPass().length > 0;

export async function sendLoginLinkEmail(to: string, url: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser(), pass: gmailPass() },
  });
  const text = [
    "IFAスイッチの会員ページへのログイン用リンクをお送りします。",
    "",
    "下のリンクを開くと、その端末で会員ページにログインできます。",
    url,
    "",
    `このリンクの有効期限は${LOGIN_LINK_MINUTES}分です。期限が切れた場合は、もう一度ログイン画面からお申し込みください。`,
    "お心当たりがない場合は、このメールを破棄してください。ログインは行われません。",
    "",
    "IFA Switch Co., Ltd",
    "https://www.ifa-switch.com",
  ].join("\n");
  await transporter.sendMail({
    from: `"IFAスイッチ" <${gmailUser()}>`,
    to,
    subject: "【IFAスイッチ】会員ページのログイン用リンク",
    text,
  });
}
