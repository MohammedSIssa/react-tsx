import type { Story } from "../types/Story";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaTimes } from "react-icons/fa";
import StoryBox from "./Story";

import { useRef } from "react";

export default function Stories({ stories }: { stories: Story[] }) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollToTop = () => {
    containerRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full md:w-fit">
      <button
        className="fixed top-4 left-4 z-100 rounded-xl border-2 border-white/20 bg-white/10 p-3 backdrop-blur-3xl"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? (
          <FaTimes size={25} />
        ) : (
          <RxHamburgerMenu size={25} strokeWidth={1} />
        )}
      </button>
      <div
        ref={containerRef}
        className={`${isVisible ? "fixed flex" : "hidden"} stories top-20 z-50 h-screen max-h-[400px] w-full flex-col items-center gap-5 overflow-y-scroll border-2 border-white/20 bg-white/10 p-2 py-10 shadow-xl shadow-black/10 backdrop-blur-2xl md:py-0 md:pt-25 md:pb-5 lg:top-50 lg:left-5 lg:w-fit lg:overflow-y-auto lg:rounded-xl lg:py-5`}
      >
        {stories.map((story, idx) => (
          <StoryBox
            key={idx}
            onToggleEditPopup={scrollToTop}
            story={story}
            handleLinkClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        ))}
      </div>
    </div>
  );
}
