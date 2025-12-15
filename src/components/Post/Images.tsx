import { LazyImage } from "../LazyImage";
import YouTubePlayer from "./VideoPlayer";

export default function PostImages({ images }: { images: string[] }) {
  const isVideo = images[0].startsWith("video:");
  const videoId = isVideo ? images[0].split(":")[2] : null;
  const videoType = isVideo ? images[0].split(":")[1] : null;

  return (
    <div className="flex max-h-full min-h-[200px] w-full max-w-full items-start justify-start gap-2 overflow-x-auto overflow-y-hidden rounded-2xl border-2 border-white/10 bg-white/10 p-4">
      {!isVideo && images.map((img, idx) => <LazyImage src={img} key={idx} />)}
      {isVideo && <YouTubePlayer type={videoType} videoId={videoId} />}
    </div>
  );
}
