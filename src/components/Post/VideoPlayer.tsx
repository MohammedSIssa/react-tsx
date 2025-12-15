export default function YouTubePlayer({
  type,
  videoId,
}: {
  type: string | null;
  videoId: string | null;
}) {
  const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&loop=1&playlist=${videoId}&mute=1`;
  return (
    <iframe
      className={type + " rounded-2xl"}
      src={src}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
}
