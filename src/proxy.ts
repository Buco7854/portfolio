// src/proxy.ts
import { NextResponse, type NextRequest } from "next/server";

const STATIC_PREFIXES = ["/_next", "/api", "/favicon"];
const STATIC_EXTENSIONS = /\.(ico|png|jpg|jpeg|svg|gif|webp|css|js|woff2?)$/;

interface LanguageCache {
  codes: string[];
  defaultCode: string;
}

let cachedLanguages: LanguageCache | null = null;
let cacheTime = 0;
const CACHE_TTL = 60_000; // 1 minute

async function fetchLanguages(): Promise<LanguageCache> {
  const now = Date.now();
  if (cachedLanguages && now - cacheTime < CACHE_TTL) return cachedLanguages;

  const pbUrl =
      process.env.POCKETBASE_INTERNAL_URL ||
      process.env.NEXT_PUBLIC_POCKETBASE_URL;

  if (!pbUrl) return cachedLanguages ?? { codes: [], defaultCode: "en" };

  try {
    const res = await fetch(
        `${pbUrl}/api/collections/languages/records?perPage=50`,
        { cache: "no-store" }
    );
    if (!res.ok) return cachedLanguages ?? { codes: [], defaultCode: "en" };
    const data = await res.json();
    const items: { code: string; is_default: boolean }[] = data.items ?? [];
    const codes = items.map((l) => l.code);
    const defaultCode = items.find((l) => l.is_default)?.code ?? codes[0] ?? "en";
    cachedLanguages = { codes, defaultCode };
    cacheTime = now;
    return cachedLanguages;
  } catch {
    return cachedLanguages ?? { codes: [], defaultCode: "en" };
  }
}

function detectLocale(request: NextRequest, available: string[], fallback: string): string {
  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
      .split(",")
      .map((part) => {
        const [locale, q] = part.trim().split(";q=");
        return { code: locale.split("-")[0].toLowerCase(), q: parseFloat(q ?? "1") };
      })
      .sort((a, b) => b.q - a.q);

  for (const p of preferred) {
    if (available.includes(p.code)) return p.code;
  }
  return fallback;
}

// RENAME: The function must now be named 'proxy' instead of 'middleware'
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files
  if (
      STATIC_PREFIXES.some((p) => pathname.startsWith(p)) ||
      STATIC_EXTENSIONS.test(pathname)
  ) {
    return NextResponse.next();
  }

  const { codes, defaultCode } = await fetchLanguages();

  // No languages → let the app handle the error
  if (codes.length === 0) return NextResponse.next();

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  // Already has a valid lang prefix
  if (firstSegment && codes.includes(firstSegment)) {
    return NextResponse.next();
  }

  // Redirect to detected locale
  const locale = detectLocale(request, codes, defaultCode);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon).*)"],
};