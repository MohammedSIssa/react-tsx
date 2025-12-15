import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  alt?: string;
  className?: string;
};

export function LazyImage({ src, alt = "", className = "" }: Props) {
  const ref = useRef<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = ref.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          img.src = src;
          observer.disconnect();
        }
      },
      { rootMargin: "100px" },
    );

    observer.observe(img);

    return () => observer.disconnect();
  }, [src]);

  return (
    <img
      ref={ref}
      alt={alt}
      onLoad={() => setLoaded(true)}
      className={`${className} max-h-full rounded-xl object-contain transition-opacity duration-300 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
