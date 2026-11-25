const IMAGE_MAX_BYTES = 8 * 1024 * 1024;
const VIDEO_MAX_BYTES = 50 * 1024 * 1024;
const IMAGE_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const VIDEO_MIME_TYPES = new Set(["video/mp4", "video/webm"]);

export function validateMediaFile(file, kind) {
  const isVideo = kind === "video";
  if (kind !== "video" && kind !== "image") throw new Error("Unsupported media type.");
  const allowed = isVideo ? VIDEO_MIME_TYPES : IMAGE_MIME_TYPES;
  const maxBytes = isVideo ? VIDEO_MAX_BYTES : IMAGE_MAX_BYTES;
  if (!file || !allowed.has(String(file.type || "").toLowerCase())) {
    throw new Error(isVideo
      ? "শুধু MP4 বা WebM ভিডিও আপলোড করুন: " + (file?.name || "")
      : "শুধু JPG, PNG, WebP বা GIF ছবি আপলোড করুন: " + (file?.name || ""));
  }
  if (!Number.isFinite(Number(file.size)) || Number(file.size) <= 0) {
    throw new Error("খালি বা অবৈধ ফাইল আপলোড করা যাবে না: " + (file.name || ""));
  }
  if (Number(file.size) > maxBytes) {
    throw new Error((isVideo ? "প্রতি ভিডিওর সর্বোচ্চ আকার ৫০ MB: " : "প্রতি ছবির সর্বোচ্চ আকার ৮ MB: ") + (file.name || ""));
  }
  return true;
}

export function getYouTubeEmbedUrl(value) {
  try {
    const url = new URL(String(value || "").trim());
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    const host = url.hostname.toLowerCase().replace(/^www\\./, "");
    let id = "";
    if (host === "youtu.be") id = url.pathname.split("/").filter(Boolean)[0] || "";
    else if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
      if (url.pathname === "/watch") id = url.searchParams.get("v") || "";
      else if (/^\\/(embed|shorts)\\//.test(url.pathname)) id = url.pathname.split("/").filter(Boolean)[1] || "";
    } else return null;
    if (!/^[A-Za-z0-9_-]{11}$/.test(id)) return null;
    return "https://www.youtube-nocookie.com/embed/" + id;
  } catch {
    return null;
  }
}

export function appendYouTubeEmbed(host, value) {
  const src = getYouTubeEmbedUrl(value);
  if (!src || !host) return false;
  const frame = document.createElement("iframe");
  frame.src = src;
  frame.title = "YouTube ভিডিও";
  frame.loading = "lazy";
  frame.referrerPolicy = "strict-origin-when-cross-origin";
  frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  frame.allowFullscreen = true;
  frame.style.cssText = "display:block;width:100%;max-width:900px;aspect-ratio:16/9;border:0;border-radius:10px;margin:12px 0";
  host.append(frame);
  return true;
}
