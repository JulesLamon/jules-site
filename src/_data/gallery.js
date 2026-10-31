// Reads the public Immich share link at build time so the Gallery page lists whatever is in the
// "Jules – Portfolio" album. Add or remove items in Immich; the next site build (daily, or on push) picks them up.
import site from "./site.json" with { type: "json" };

const { base, albumId, shareKey } = site.immich;
const api = (path) => `${base}/api${path}${path.includes("?") ? "&" : "?"}key=${shareKey}`;

async function getJson(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

export default async function () {
  const shareUrl = `${base}/share/${shareKey}`;
  try {
    const buckets = await getJson(api(`/timeline/buckets?albumId=${albumId}`));
    const items = [];
    for (const { timeBucket } of buckets) {
      const b = await getJson(api(`/timeline/bucket?albumId=${albumId}&timeBucket=${timeBucket}`));
      b.id.forEach((id, i) => {
        if (b.isTrashed[i]) return;
        items.push({
          id,
          isImage: b.isImage[i],
          ratio: b.ratio[i] || 1,
          takenAt: b.fileCreatedAt[i],
          thumb: api(`/assets/${id}/thumbnail?size=preview`),
          video: b.isImage[i] ? null : api(`/assets/${id}/video/playback`),
        });
      });
    }
    items.sort((a, b) => String(b.takenAt).localeCompare(String(a.takenAt)));
    return { items, shareUrl, available: true };
  } catch (err) {
    console.warn(`[gallery] Immich album unavailable: ${err.message}`);
    return { items: [], shareUrl, available: false };
  }
}
