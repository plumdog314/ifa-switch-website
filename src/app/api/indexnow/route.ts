import { getAllPosts } from "@/lib/blog";
import { SITE, absUrl } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// IndexNow：新しい記事・更新した記事を Bing（ChatGPT検索・Copilot が使う）などにすぐ知らせる。
// Vercel Cron（vercel.json）が毎朝、市況記事の自動公開のあとに呼ぶ。
// キーのファイルは public/5cbce05093cee77d09f2a9e868bd736c.txt。キーを変えるときは両方を変える。
const KEY = "5cbce05093cee77d09f2a9e868bd736c";
const DAYS = 3;

export async function GET(req: Request) {
  // CRON_SECRET を設定していれば、Vercel Cron からの呼び出しだけを受け付ける
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("unauthorized", { status: 401 });
  }

  const since = new Date(Date.now() - DAYS * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const posts = getAllPosts().filter((p) => (p.updated ?? p.date) >= since);
  if (posts.length === 0) return Response.json({ submitted: 0 });

  const urlList = [absUrl("/"), absUrl("/blog"), ...posts.map((p) => absUrl(`/blog/${p.slug}`))];
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE.url).host,
      key: KEY,
      keyLocation: absUrl(`/${KEY}.txt`),
      urlList,
    }),
  });
  console.log("indexnow", res.status, urlList.length);
  return Response.json({ submitted: urlList.length, status: res.status }, { status: res.ok ? 200 : 502 });
}
