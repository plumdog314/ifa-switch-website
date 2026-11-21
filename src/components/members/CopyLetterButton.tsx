"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

// レター本文（id="letter-body" の中の最初の <pre>）をクリップボードにコピーする
export default function CopyLetterButton() {
  const [done, setDone] = useState(false);

  const copy = async () => {
    const pre = document.querySelector("#letter-body pre");
    if (!pre?.textContent) return;
    try {
      await navigator.clipboard.writeText(pre.textContent.trim());
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    } catch {
      // クリップボードが使えない環境では何もしない（手で選択してコピーできる）
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 border border-ink px-4 py-2 text-sm font-bold hover:bg-ink hover:text-paper transition-colors"
    >
      {done ? <Check size={16} /> : <Copy size={16} />}
      <span className="whitespace-nowrap">{done ? "コピーしました" : "英文をコピーする"}</span>
    </button>
  );
}
