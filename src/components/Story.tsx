import type { Story } from "../types/Story";
import { NavLink } from "react-router";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import EditStoryPopup from "./EditStoryPopup";
import { FaEdit } from "react-icons/fa";

// Todo:
// Make the edit story show input fields
// making it the same size of the story

export default function StoryBox({
  story,
  handleLinkClick,
  onToggleEditPopup,
}: {
  story: Story;
  handleLinkClick: () => void;
  onToggleEditPopup: () => void;
}) {
  const special = story.special;
  const [showPopup, setShowPopup] = useState(false);
  const { isAdmin } = useAuth();

  return (
    <>
      <NavLink
        className={`${special ? "border-yellow-400/20 bg-yellow-400/40 text-yellow-100 shadow-xl shadow-yellow-400/10" : "border-white/20 bg-white/10 shadow-xl shadow-black/10"} relative w-full rounded-lg p-3 pb-8 md:max-w-70 lg:border-2`}
        to={`/${story.type}/${story.count}`}
        onClick={handleLinkClick}
      >
        <h1 className="text-xl font-bold">{story.title}</h1>
        <p
          className={`text-[14px] ${special ? "text-yellow-100/70" : "text-white/80"}`}
        >
          {story?.summary === "" ? "🔴" : story?.summary}
        </p>
        <div
          className="year absolute bottom-0 left-1 flex gap-2 font-bold"
          dir="ltr"
        >
          <span>{story.year}</span>
          <span>#{story.count}</span>
          {isAdmin() && (
            <button
              onClick={() => {
                setShowPopup(true);
                onToggleEditPopup();
              }}
              className="rounded bg-blue-500 p-1 px-2"
            >
              <FaEdit />
            </button>
          )}
        </div>
      </NavLink>

      {isAdmin() && showPopup && (
        <EditStoryPopup story={story} onClose={() => setShowPopup(false)} />
      )}
    </>
  );
}
