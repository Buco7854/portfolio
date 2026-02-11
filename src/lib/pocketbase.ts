import PocketBase from "pocketbase";

/**
 * PocketBase URL used for server-side API calls (data fetching).
 * Priority: POCKETBASE_INTERNAL_URL (Docker) > NEXT_PUBLIC_POCKETBASE_URL > crash.
 */
function getApiBaseUrl(): string {
  if (typeof window !== "undefined") {
    // Client-side: use public URL or same-origin
    return process.env.NEXT_PUBLIC_POCKETBASE_URL || "";
  }

  const internal = process.env.POCKETBASE_INTERNAL_URL;
  if (internal) return internal;

  const pub = process.env.NEXT_PUBLIC_POCKETBASE_URL;
  if (pub) return pub;

  throw new Error(
    "Missing PocketBase URL. Set POCKETBASE_INTERNAL_URL or NEXT_PUBLIC_POCKETBASE_URL.",
  );
}

export function getPb(): PocketBase {
  const pb = new PocketBase(getApiBaseUrl());
  pb.autoCancellation(false);

  // Next.js patches global fetch adding caching/revalidation options that
  // PocketBase may reject with 400. Bypass it by passing cache: "no-store"
  // on every request via beforeSend.
  pb.beforeSend = function (url, options) {
    options.cache = "no-store";
    delete (options as Record<string, unknown>).next;
    return { url, options };
  };

  return pb;
}

type PBFileRecord = { id: string; collectionId: string; collectionName: string };

/**
 * File URL for use in HTML (images, links, downloads).
 * Uses NEXT_PUBLIC_POCKETBASE_URL if set, otherwise returns a relative path
 * so the browser resolves it against the current domain.
 */
export function getFileUrl(record: PBFileRecord, filename: string): string {
  const base = process.env.NEXT_PUBLIC_POCKETBASE_URL || "";
  return `${base}/api/files/${record.collectionName}/${record.id}/${filename}`;
}
