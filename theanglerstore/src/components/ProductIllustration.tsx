import type { Glyph } from "@/lib/products";

/**
 * Hand-drawn product illustrations.
 *
 * These are original artwork, drawn to resemble the actual product in each
 * slot — a two-piece surf combo, a filler spool of braid, bucktail jigs, and so
 * on. They are deliberately illustrations rather than fake photographs: showing
 * a customer a rendered "photo" of a PENN reel that isn't the real reel invites
 * returns and chargebacks.
 *
 * They are also the only images here we unambiguously own. Supplier photography
 * belongs to the supplier; see IMAGES.md for how to obtain rights to real
 * photos, and for the drop-in path that replaces these automatically.
 *
 * viewBox is 160×120 for every illustration so they scale identically.
 */

const INK = "#eef5fd";
const DIM = "rgba(238,245,253,0.55)";
const ACCENT = "#7dd3fc";
const WARM = "#fcd34d";

const S = {
  fill: "none",
  stroke: INK,
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
const THIN = { ...S, strokeWidth: 1.4, stroke: DIM };
const ACC = { ...S, stroke: ACCENT, strokeWidth: 2 };

function SurfRod() {
  // Long two-piece surf combo: butt low-left, tip high-right, big 8000 reel.
  return (
    <g>
      <path {...S} d="M20 100 C 58 84, 104 54, 148 18" />
      {/* ferrule join on a two-piece blank */}
      <path {...THIN} d="M85 62 l3 5" />
      {/* EVA fore and rear grips */}
      <path {...S} strokeWidth={8} strokeOpacity={0.3} d="M20 100 L 38 92" />
      <path {...S} strokeWidth={8} strokeOpacity={0.3} d="M54 85 L 66 79" />
      {/* 8000 spinning reel, hanging below the seat */}
      <g transform="translate(46,88)">
        <ellipse {...S} cx="0" cy="0" rx="10" ry="8" />
        <ellipse {...THIN} cx="0" cy="0" rx="5" ry="4" />
        <path {...ACC} d="M-10 -2 C -12 -13, 10 -14, 11 -3" />
        <path {...S} d="M0 8 v5" />
        <path {...S} d="M-2 13 h11 l5 6" />
      </g>
      {/* six guides, shrinking to the tip */}
      <g {...THIN} stroke={INK} strokeOpacity={0.85}>
        <ellipse cx="76" cy="70" rx="5" ry="3.6" transform="rotate(-32 76 70)" />
        <ellipse cx="99" cy="55" rx="4" ry="3" transform="rotate(-35 99 55)" />
        <ellipse cx="119" cy="41" rx="3.1" ry="2.3" transform="rotate(-37 119 41)" />
        <ellipse cx="135" cy="28" rx="2.4" ry="1.8" transform="rotate(-39 135 28)" />
      </g>
      <path {...ACC} strokeWidth={1.3} opacity={0.75} d="M148 18 c 7 5, 6 14, -2 18" />
    </g>
  );
}

function InshoreCombo() {
  // Shorter, near-horizontal one-piece feel, cork handle, compact 4000 reel.
  return (
    <g>
      <path {...S} d="M16 78 C 58 68, 104 52, 146 40" />
      {/* cork rear grip — the visual signature of an inshore rod */}
      <g>
        <path {...S} strokeWidth={9} strokeOpacity={0.32} d="M17 78 L 40 72" />
        <g {...THIN} stroke={INK} strokeOpacity={0.45}>
          <circle cx="24" cy="76" r="1" />
          <circle cx="31" cy="74.5" r="1" />
          <circle cx="37" cy="73" r="1" />
        </g>
        <path {...S} strokeWidth={9} strokeOpacity={0.32} d="M56 69 L 66 67" />
      </g>
      {/* compact 4000 reel */}
      <g transform="translate(49,74)">
        <ellipse {...S} cx="0" cy="0" rx="8" ry="6.5" />
        <ellipse {...THIN} cx="0" cy="0" rx="4" ry="3.2" />
        <path {...ACC} d="M-8 -2 C -9.5 -10.5, 8 -11.5, 9 -2.5" />
        <path {...S} d="M0 6.5 v4.5" />
        <path {...S} d="M-2 11 h9 l4 5" />
      </g>
      {/* fewer, tighter guides */}
      <g {...THIN} stroke={INK} strokeOpacity={0.85}>
        <ellipse cx="78" cy="63" rx="4.2" ry="3.1" transform="rotate(-14 78 63)" />
        <ellipse cx="102" cy="55" rx="3.3" ry="2.5" transform="rotate(-14 102 55)" />
        <ellipse cx="124" cy="47" rx="2.6" ry="2" transform="rotate(-14 124 47)" />
      </g>
      <path {...ACC} strokeWidth={1.3} opacity={0.75} d="M146 40 c 6 4, 6 12, -1 16" />
    </g>
  );
}

function Spool({ small = false }: { small?: boolean }) {
  // Filler spool of line, three-quarter view.
  const w = small ? 26 : 34;
  const h = small ? 30 : 40;
  const cx = 74;
  const top = 60 - h / 2;
  return (
    <g transform={`translate(${small ? 6 : 0},0)`}>
      {/* flanges */}
      <ellipse {...S} cx={cx} cy={top} rx={w} ry={w * 0.32} />
      <path {...S} d={`M${cx - w} ${top} v${h}`} />
      <path {...S} d={`M${cx + w} ${top} v${h}`} />
      <ellipse {...S} cx={cx} cy={top + h} rx={w} ry={w * 0.32} />
      {/* wound line */}
      <g {...THIN}>
        {Array.from({ length: small ? 4 : 6 }).map((_, i) => (
          <path
            key={i}
            d={`M${cx - w + 3} ${top + 7 + i * ((h - 12) / (small ? 3 : 5))} h${w * 2 - 6}`}
          />
        ))}
      </g>
      {/* label band */}
      <path
        {...ACC}
        strokeWidth={5}
        strokeOpacity={0.5}
        d={`M${cx - w + 2} ${top + h / 2} h${w * 2 - 4}`}
      />
      {/* tag end of line */}
      <path {...ACC} strokeWidth={1.4} d={`M${cx + w} ${top + h - 6} c 12 2, 16 10, 10 16`} />
    </g>
  );
}

function CircleHooks() {
  // Three circle hooks, fanned. The circular bend is the identifying feature.
  const hook = (k: number, x: number, y: number, s: number, rot: number) => (
    <g key={k} transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
      {/* ringed eye */}
      <circle {...S} cx="0" cy="0" r="3.4" />
      {/* shank */}
      <path {...S} d="M0 3.4 v20" />
      {/* circular bend sweeping back on itself */}
      <path {...S} d="M0 23.4 c 0 11, -15 12, -15 2 c 0 -6.5, 7 -8.5, 11 -4.5" />
      {/* point */}
      <path {...S} d="M-4 20.9 l-4.5 -4.6" />
    </g>
  );
  return (
    <g>
      {hook(0, 52, 30, 1.05, -14)}
      {hook(1, 82, 26, 1.25, 0)}
      {hook(2, 114, 30, 1.05, 14)}
    </g>
  );
}

function CarolinaRig() {
  // A finished rig, read left to right: egg sinker, bead, swivel, leader, hook.
  return (
    <g>
      {/* main line */}
      <path {...ACC} strokeWidth={1.5} d="M12 40 h26" />
      {/* egg sinker */}
      <ellipse {...S} cx="50" cy="40" rx="12" ry="8" />
      <path {...THIN} d="M38 40 h24" />
      {/* bead */}
      <circle {...S} cx="70" cy="40" r="4" />
      {/* barrel swivel */}
      <g transform="translate(86,40)">
        <circle {...S} cx="-4" cy="0" r="3.4" />
        <path {...S} d="M-0.6 0 h5.2" />
        <circle {...S} cx="8" cy="0" r="3.4" />
      </g>
      {/* leader, with a little slack */}
      <path {...ACC} strokeWidth={1.5} d="M94 40 c 12 0, 18 8, 26 14" />
      {/* circle hook */}
      <g transform="translate(120,54)">
        <circle {...S} cx="0" cy="0" r="3" />
        <path {...S} d="M0 3 v14" />
        <path {...S} d="M0 17 c 0 9, -12 10, -12 1.6 c 0 -5.5, 6 -7, 9 -3.6" />
        <path {...S} d="M-3 15 l-4 -4" />
      </g>
    </g>
  );
}

function Swimbaits() {
  // Paddle-tail soft plastics, three sizes.
  const bait = (k: number, x: number, y: number, s: number, rot: number) => (
    <g key={k} transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
      {/* body */}
      <path
        {...S}
        d="M0 0 c 10 -8, 30 -8, 42 -1 c 4 2.4, 4 4.6, 0 7 c -12 7, -32 7, -42 -1 z"
      />
      {/* paddle tail */}
      <path {...S} d="M42 -1 c 8 -6, 14 -4, 14 4.5 c 0 8, -6 10, -14 3.5" />
      {/* eye + lateral line */}
      <circle {...S} strokeWidth={1.6} cx="8" cy="1" r="1.7" />
      <path {...THIN} d="M14 3 h24" />
    </g>
  );
  return (
    <g>
      {bait(0, 16, 30, 0.78, -9)}
      {bait(1, 12, 56, 1.0, 2)}
      {bait(2, 22, 86, 0.86, 8)}
    </g>
  );
}

function BucktailJigs() {
  const jig = (k: number, x: number, y: number, s: number) => (
    <g key={k} transform={`translate(${x},${y}) scale(${s})`}>
      {/* line tie */}
      <path {...S} d="M-1 -15 l3 -7" />
      {/* lead head */}
      <circle {...S} cx="0" cy="-6" r="9.5" />
      <circle {...S} strokeWidth={1.5} cx="-3.5" cy="-9" r="2.2" />
      {/* collar */}
      <path {...S} strokeWidth={3.2} d="M-6 2 h12" />
      {/* bucktail skirt — a filled silhouette reads better than loose lines */}
      <path
        fill={INK}
        fillOpacity={0.16}
        stroke={INK}
        strokeOpacity={0.5}
        strokeWidth={1.2}
        d="M-7 3 c -4 12, -5 22, -2 31 c 6 4, 12 4, 18 0 c 3 -9, 2 -19, -2 -31 z"
      />
      <g {...THIN} stroke={INK} strokeOpacity={0.55}>
        <path d="M-4 4 c -2 12, -2 21, -1 28" />
        <path d="M1 4 c 0 12, 1 21, 1 28" />
        <path d="M5 4 c 2 12, 2 20, 1 27" />
      </g>
      {/* hook emerging from the hair */}
      <path {...S} d="M3 14 v10 c 0 8.5, -11 9.5, -11 1.8 c 0 -5.2, 5.6 -6.6, 8 -3.2" />
      <path {...S} d="M0 22.5 l-4.6 -4.2" />
    </g>
  );
  return (
    <g>
      {jig(0, 38, 30, 0.78)}
      {jig(1, 80, 24, 1.02)}
      {jig(2, 124, 32, 0.68)}
    </g>
  );
}

function LandingNet() {
  return (
    <g>
      {/* hoop */}
      <ellipse {...S} cx="86" cy="40" rx="42" ry="16" />
      {/* net bag */}
      <path {...S} d="M44 40 c 4 30, 22 46, 42 46 s 38 -16, 42 -46" />
      {/* rubber mesh */}
      <g {...THIN}>
        <path d="M52 52 c 12 5, 56 5, 68 0" />
        <path d="M58 64 c 12 5, 44 5, 56 0" />
        <path d="M66 76 c 10 4, 30 4, 40 0" />
        <path d="M64 44 c 3 22, 8 34, 14 40" />
        <path d="M86 46 v40" />
        <path d="M108 44 c -3 22, -8 34, -14 40" />
      </g>
      {/* telescoping handle */}
      <path {...S} strokeWidth={4} d="M128 40 l22 -18" />
      <path {...ACC} strokeWidth={4} d="M150 22 l8 -6" />
    </g>
  );
}

function SandSpikes() {
  return (
    <g>
      {/* sand line */}
      <path {...THIN} d="M8 88 c 28 -6, 62 -6, 90 0 s 44 5, 54 1" />
      {/* spike 1, with a rod butt seated in it */}
      <g transform="translate(56,20) rotate(9)">
        <path {...S} d="M0 0 h15 v58 l-7.5 12 l-7.5 -12 z" />
        <path {...THIN} d="M0 14 h15" />
        <path {...ACC} strokeWidth={4} d="M1 24 h13" />
        {/* rod butt */}
        <path {...S} strokeWidth={5} strokeOpacity={0.5} d="M7.5 0 v-18" />
      </g>
      {/* spike 2 */}
      <g transform="translate(94,30) rotate(-7)">
        <path {...S} d="M0 0 h13 v50 l-6.5 10 l-6.5 -10 z" />
        <path {...THIN} d="M0 12 h13" />
        <path {...ACC} strokeWidth={3.6} d="M1 21 h11" />
      </g>
    </g>
  );
}

function Pliers() {
  return (
    <g transform="translate(80,60) rotate(-24) translate(-80,-60)">
      {/* jaws, slightly open */}
      <path {...S} d="M62 18 L 78 52" />
      <path {...S} d="M96 18 L 82 52" />
      {/* split-ring tip detail */}
      <path {...THIN} d="M64 22 l4 8 M94 22 l-3.5 8" />
      {/* pivot */}
      <circle {...S} cx="80" cy="56" r="3.6" />
      {/* handles */}
      <path {...S} strokeWidth={5} strokeOpacity={0.85} d="M77 60 L 66 100" />
      <path {...S} strokeWidth={5} strokeOpacity={0.85} d="M83 60 L 94 100" />
      {/* carbide cutter callout */}
      <path {...ACC} strokeWidth={3} d="M74 48 l6 3" />
      {/* lanyard ring */}
      <circle {...THIN} cx="94" cy="104" r="4" />
    </g>
  );
}

function TackleBag() {
  return (
    <g>
      {/* shoulder straps, drawn behind the body */}
      <path {...S} strokeWidth={5} strokeOpacity={0.4} d="M58 40 C 44 22, 62 10, 80 12" />
      <path {...S} strokeWidth={5} strokeOpacity={0.4} d="M102 40 C 116 22, 98 10, 80 12" />
      {/* haul handle */}
      <path {...S} d="M70 28 c 4 -9, 16 -9, 20 0" />
      {/* main body */}
      <path {...S} d="M44 30 h72 a7 7 0 0 1 7 7 v50 h-86 v-50 a7 7 0 0 1 7 -7 z" />
      {/* lid seam + zipper teeth */}
      <path {...S} d="M37 50 h86" />
      <g {...THIN}>
        {Array.from({ length: 11 }).map((_, i) => (
          <path key={i} d={`M${42 + i * 7.6} 47 v6`} />
        ))}
      </g>
      {/* front tray pocket */}
      <path {...S} d="M58 58 h44 v20 h-44 z" />
      <path {...THIN} d="M58 68 h44" />
      <path {...THIN} d="M76 58 v20" />
      {/* molded waterproof base — the feature that matters for surf */}
      <path {...ACC} strokeWidth={6} d="M37 87 h86" />
      <path {...THIN} d="M46 93 v5 M114 93 v5" />
    </g>
  );
}

function SoftCooler() {
  return (
    <g>
      {/* shoulder strap arcing over */}
      <path {...S} strokeWidth={4.5} strokeOpacity={0.5} d="M44 50 C 28 22, 116 16, 120 46" />
      <path {...THIN} d="M74 22 h16 M82 19 v6" />
      {/* welded body, softly tapered */}
      <path {...S} d="M42 46 h76 l-6 44 a7 7 0 0 1 -7 6 h-50 a7 7 0 0 1 -7 -6 z" />
      {/* welded top rim + leakproof zip */}
      <path {...S} d="M38 46 c 12 -9, 70 -9, 84 0" />
      <g {...THIN}>
        {Array.from({ length: 10 }).map((_, i) => (
          <path key={i} d={`M${46 + i * 8} 41 v7`} />
        ))}
      </g>
      {/* chunky zipper pull */}
      <path {...ACC} strokeWidth={3.4} d="M122 45 l9 6" />
      <circle {...ACC} strokeWidth={2} cx="132" cy="52" r="2.6" />
      {/* front panel seam + grab handle */}
      <path {...THIN} d="M50 66 h58" />
      <path {...S} d="M66 78 h28" />
    </g>
  );
}

function Headlamp() {
  return (
    <g>
      {/* strap */}
      <path {...S} d="M56 44 c -22 4, -26 34, -4 42" />
      <path {...S} d="M56 62 c -18 4, -20 20, -4 24" />
      {/* housing */}
      <path {...S} d="M56 40 h30 a10 10 0 0 1 10 10 v14 a10 10 0 0 1 -10 10 h-30 z" />
      {/* lens */}
      <circle {...S} cx="82" cy="57" r="8" />
      <circle {...ACC} strokeWidth={2.4} cx="82" cy="57" r="3.4" />
      {/* red aux LED */}
      <circle {...S} strokeWidth={1.8} stroke="#fca5a5" cx="64" cy="48" r="2.6" />
      {/* beam */}
      <g stroke={WARM} fill="none" strokeLinecap="round" opacity={0.75}>
        <path strokeWidth={2.2} d="M100 50 l16 -7" />
        <path strokeWidth={2.2} d="M102 57 h18" />
        <path strokeWidth={2.2} d="M100 64 l16 7" />
      </g>
      {/* USB-C port */}
      <path {...THIN} d="M60 68 h8" />
    </g>
  );
}

export function ProductIllustration({ glyph }: { glyph: Glyph }) {
  switch (glyph) {
    case "rod":
      return <SurfRod />;
    case "rod-short":
      return <InshoreCombo />;
    case "spool":
      return <Spool />;
    case "spool-small":
      return <Spool small />;
    case "hook":
      return <CircleHooks />;
    case "rig":
      return <CarolinaRig />;
    case "lure":
      return <Swimbaits />;
    case "jig":
      return <BucktailJigs />;
    case "net":
      return <LandingNet />;
    case "spike":
      return <SandSpikes />;
    case "pliers":
      return <Pliers />;
    case "bag":
      return <TackleBag />;
    case "cooler":
      return <SoftCooler />;
    case "lamp":
      return <Headlamp />;
  }
}
