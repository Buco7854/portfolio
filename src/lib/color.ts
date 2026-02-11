/**
 * Converts a hex color to OKLCH accent CSS variable overrides.
 * Pure math, no dependencies.
 */

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

function linearize(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function rgbToOklab(r: number, g: number, b: number): [number, number, number] {
  const lr = linearize(r);
  const lg = linearize(g);
  const lb = linearize(b);

  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);

  return [
    0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s,
  ];
}

function oklabToOklch(L: number, a: number, b: number): [number, number, number] {
  const C = Math.sqrt(a * a + b * b);
  let h = (Math.atan2(b, a) * 180) / Math.PI;
  if (h < 0) h += 360;
  return [L, C, h];
}

function hexToOklch(hex: string): [number, number, number] {
  const [r, g, b] = hexToRgb(hex);
  const [L, a, ob] = rgbToOklab(r, g, b);
  return oklabToOklch(L, a, ob);
}

function oklch(l: number, c: number, h: number): string {
  return `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(1)})`;
}

/**
 * Given a hex color, returns CSS text for :root and .dark accent overrides.
 */
export function generateAccentStyles(hex: string): string {
  const [L, C, H] = hexToOklch(hex);

  // Clamp chroma for variants
  const c = Math.min(C, 0.2);

  // Light mode variants
  const lightAccent = oklch(Math.max(0.55, Math.min(0.65, L)), c, H);
  const lightHover = oklch(Math.max(0.48, Math.min(0.58, L - 0.07)), Math.min(c + 0.02, 0.22), H);
  const lightSubtle = oklch(0.93, Math.min(c * 0.25, 0.05), H);

  // Dark mode variants — lighter for readability on dark bg
  const darkAccent = oklch(Math.max(0.68, Math.min(0.76, L + 0.1)), Math.min(c, 0.18), H);
  const darkHover = oklch(Math.max(0.74, Math.min(0.82, L + 0.16)), Math.min(c * 0.85, 0.16), H);
  const darkSubtle = oklch(0.25, Math.min(c * 0.3, 0.06), H);

  return `:root {
  --color-accent: ${lightAccent};
  --color-accent-hover: ${lightHover};
  --color-accent-subtle: ${lightSubtle};
}
.dark {
  --color-accent: ${darkAccent};
  --color-accent-hover: ${darkHover};
  --color-accent-subtle: ${darkSubtle};
}`;
}
