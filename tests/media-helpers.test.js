import test from "node:test";
import assert from "node:assert/strict";
import { validateMediaFile, getYouTubeEmbedUrl } from "../media-helpers.js";

test("accepts an image at exactly 8 MB", () => {
  assert.equal(validateMediaFile({name:"ok.jpg",type:"image/jpeg",size:8*1024*1024},"image"), true);
});
test("rejects an image above 8 MB", () => {
  assert.throws(() => validateMediaFile({name:"large.jpg",type:"image/jpeg",size:8*1024*1024+1},"image"), /সর্বোচ্চ আকার ৮ MB/);
});
test("accepts an MP4 video at exactly 50 MB", () => {
  assert.equal(validateMediaFile({name:"ok.mp4",type:"video/mp4",size:50*1024*1024},"video"), true);
});
test("rejects a video above 50 MB", () => {
  assert.throws(() => validateMediaFile({name:"large.mp4",type:"video/mp4",size:50*1024*1024+1},"video"), /সর্বোচ্চ আকার ৫০ MB/);
});
test("rejects unsupported media MIME types", () => {
  assert.throws(() => validateMediaFile({name:"bad.svg",type:"image/svg+xml",size:100},"image"), /শুধু JPG/);
  assert.throws(() => validateMediaFile({name:"bad.mov",type:"video/quicktime",size:100},"video"), /শুধু MP4/);
});
test("rejects empty files", () => {
  assert.throws(() => validateMediaFile({name:"empty.mp4",type:"video/mp4",size:0},"video"), /খালি/);
});
test("normalizes standard YouTube watch URLs", () => {
  assert.equal(getYouTubeEmbedUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ"), "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ");
});
test("supports youtu.be, shorts and embed URLs", () => {
  assert.equal(getYouTubeEmbedUrl("https://youtu.be/dQw4w9WgXcQ?t=20"), "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ");
  assert.equal(getYouTubeEmbedUrl("https://youtube.com/shorts/dQw4w9WgXcQ"), "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ");
  assert.equal(getYouTubeEmbedUrl("https://youtube.com/embed/dQw4w9WgXcQ"), "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ");
});
test("rejects non-YouTube and malformed URLs", () => {
  assert.equal(getYouTubeEmbedUrl("javascript:alert(1)"), null);
  assert.equal(getYouTubeEmbedUrl("https://evil.example/watch?v=dQw4w9WgXcQ"), null);
  assert.equal(getYouTubeEmbedUrl("https://youtube.com/watch?v=short"), null);
});
