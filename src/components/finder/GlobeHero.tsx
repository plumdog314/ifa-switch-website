"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { PLACES, JAPAN, FINDER_SELECT, type FinderSelect, type Place } from "./places";

// トップの地球儀。日本から、記事で扱っている保険会社・銀行のある場所へ線を引く。
// - WebGL の描画（cobe）は、画面に入ってから読み込む（最初の表示を遅くしない）
// - 「視差効果を減らす」設定の人には回転させない
// - 地球儀の上の地名も、下の地名のボタンも押せる。押すと、その場所の会社が並び、会社を押すと下のナビで選ばれる

const NAVY: [number, number, number] = [0.07, 0.19, 0.35];
const GOLD: [number, number, number] = [0.78, 0.6, 0.18];

// 地球儀の上の地名。英国周辺の3か所は近すぎて重なるので、1つの札にまとめる
const LABELS: { anchor: string; name: string; places: string[] }[] = [
  { anchor: "iom", name: "マン島・ガーンジー・ダブリン", places: ["iom", "guernsey", "dublin"] },
  { anchor: "cayman", name: "ケイマン諸島", places: ["cayman"] },
  { anchor: "hk", name: "香港", places: ["hk"] },
  { anchor: "sg", name: "シンガポール", places: ["sg"] },
];

// 複数の場所をまとめて1つの「場所」として扱う（会社の重複は除く）
const mergePlaces = (ids: string[]): Place => {
  const ps = PLACES.filter((p) => ids.includes(p.id));
  const seen = new Set<string>();
  return {
    id: ids.join("+"),
    name: ps.map((p) => p.name).join("・"),
    location: ps[0].location,
    entries: ps.flatMap((p) => p.entries).filter((e) => {
      const k = `${e.domain}:${e.provider}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    }),
  };
};

const toRad = (d: number) => (d * Math.PI) / 180;
// 経度から、その場所を正面に向ける回転角（cobe の phi）
const phiFor = (lng: number) => -toRad(lng) - Math.PI / 2;

export default function GlobeHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetPhi = useRef<number | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [place, setPlace] = useState<Place | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    let destroyed = false;
    let raf = 0;
    let globe: { update: (s: Record<string, unknown>) => void; destroy: () => void } | null = null;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ドラッグで回す
    let phi = phiFor(60);
    let theta = 0.25;
    let dragging: { x: number; y: number; phi: number; theta: number } | null = null;
    const onDown = (e: PointerEvent) => {
      dragging = { x: e.clientX, y: e.clientY, phi, theta };
      targetPhi.current = null;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      phi = dragging.phi + (e.clientX - dragging.x) / 150;
      theta = Math.max(-0.6, Math.min(0.9, dragging.theta + (e.clientY - dragging.y) / 300));
    };
    const onUp = () => {
      dragging = null;
      canvas.style.cursor = "grab";
    };

    const start = async () => {
      try {
        const { default: createGlobe } = await import("cobe");
        if (destroyed) return;
        const size = () => canvas.offsetWidth;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        globe = createGlobe(canvas, {
          devicePixelRatio: dpr,
          width: size() * dpr,
          height: size() * dpr,
          phi,
          theta,
          dark: 0,
          diffuse: 1.15,
          mapSamples: 16000,
          mapBrightness: 5.5,
          mapBaseBrightness: 0.05,
          baseColor: [0.86, 0.9, 0.95],
          markerColor: NAVY,
          glowColor: [0.93, 0.95, 0.97],
          arcColor: GOLD,
          arcWidth: 0.6,
          arcHeight: 0.25,
          markerElevation: 0.01,
          markers: [
            { location: JAPAN, size: 0.06, color: GOLD, id: "japan" },
            ...PLACES.map((p) => ({ location: p.location, size: 0.05, id: p.id })),
          ],
          arcs: PLACES.map((p) => ({ from: JAPAN, to: p.location })),
        }) as unknown as typeof globe;
        canvas.addEventListener("pointerdown", onDown);
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
        const tick = () => {
          if (destroyed) return;
          if (targetPhi.current !== null) {
            // 選んだ場所を正面へ、少しずつ回す
            const d = Math.atan2(Math.sin(targetPhi.current - phi), Math.cos(targetPhi.current - phi));
            phi += d * 0.08;
            theta += (0.3 - theta) * 0.08;
            if (Math.abs(d) < 0.002) targetPhi.current = null;
          } else if (!dragging && !reduce) {
            phi += 0.0025;
          }
          globe?.update({ phi, theta, width: size() * dpr, height: size() * dpr });
          raf = requestAnimationFrame(tick);
        };
        tick();
        setReady(true);
      } catch {
        setFailed(true);
      }
    };

    // 画面に入ったら読み込む
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          io.disconnect();
          start();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(wrap);

    return () => {
      destroyed = true;
      io.disconnect();
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      globe?.destroy();
    };
  }, []);

  const pickPlace = (p: Place) => {
    setPlace(p);
    targetPhi.current = phiFor(p.location[1]);
  };
  const pickEntry = (sel: FinderSelect) => {
    window.dispatchEvent(new CustomEvent<FinderSelect>(FINDER_SELECT, { detail: sel }));
  };

  return (
    <div className="min-w-0">
      <div ref={wrapRef} className="relative mx-auto aspect-square w-full max-w-[190px] sm:max-w-[340px] lg:max-w-[440px]">
        {/* WebGL が使えない・読み込み前の表示 */}
        <div
          aria-hidden
          className={`absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff,#dbe4ef_55%,#c7d3e2)] transition-opacity duration-700 ${
            ready ? "opacity-0" : "opacity-100"
          }`}
        />
        <canvas
          ref={canvasRef}
          aria-hidden
          className={`globe-canvas absolute inset-0 h-full w-full touch-none cursor-grab transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* 地球儀の上の地名（対応するブラウザだけ。押せる） */}
        {ready &&
          LABELS.map((l) => (
            <button
              key={l.anchor}
              type="button"
              tabIndex={-1}
              aria-hidden
              onClick={() => pickPlace(l.places.length === 1 ? PLACES.find((p) => p.id === l.places[0])! : mergePlaces(l.places))}
              className="globe-label whitespace-nowrap rounded-full border border-[var(--nv-line-strong)] bg-white/90 px-2 py-0.5 text-[11px] font-bold text-[var(--nv-navy)] shadow-sm hover:bg-[var(--nv-navy)] hover:text-white"
              style={
                {
                  positionAnchor: `--cobe-${l.anchor}`,
                  opacity: `var(--cobe-visible-${l.anchor}, 0)`,
                  scale: `var(--cobe-visible-${l.anchor}, 0)`,
                } as React.CSSProperties
              }
            >
              {l.name}
            </button>
          ))}
      </div>
      {failed && <p className="mt-2 text-center text-xs text-[var(--nv-muted)]">地球儀を表示できませんでした。下の地名から選べます。</p>}

      {/* 場所のボタン（どのブラウザでも使える入り口） */}
      <div className="mt-3">
        <p className="text-center text-xs font-bold text-[var(--nv-muted)]">契約先・口座のある場所から探す</p>
        <ul className="mt-2 flex flex-wrap justify-center gap-1.5">
          {PLACES.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                aria-pressed={place?.id === p.id}
                onClick={() => pickPlace(p)}
                className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-bold ${
                  place?.id === p.id
                    ? "border-[var(--nv-navy)] bg-[var(--nv-navy)] text-white"
                    : "border-[var(--nv-line-strong)] bg-white text-[var(--nv-navy)] hover:border-[var(--nv-navy)]"
                }`}
              >
                <MapPin size={12} aria-hidden />
                {p.name}
              </button>
            </li>
          ))}
        </ul>
        {place && (
          <div aria-live="polite" className="mt-3 rounded-lg border border-[var(--nv-line)] bg-white p-3">
            <p className="text-xs font-bold text-[var(--nv-muted)]">{place.name}にある会社・銀行（押すと下の手続きナビで選ばれます）</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {place.entries.map((e) => (
                <li key={`${e.domain}-${e.provider}-${e.name}`}>
                  <button
                    type="button"
                    onClick={() => pickEntry({ domain: e.domain, provider: e.provider })}
                    className="whitespace-nowrap rounded-md border border-[var(--nv-line-strong)] bg-[var(--nv-bg)] px-2.5 py-1.5 text-xs font-bold text-[var(--nv-navy)] hover:border-[var(--nv-navy)] hover:bg-[var(--nv-soft)]"
                  >
                    {e.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
