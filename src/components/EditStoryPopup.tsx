import EditStory from "../pages/Admin/EditStory";
import type { Story } from "../types/Story";

export default function EditStoryPopup({
  story,
  onClose,
}: {
  story: Story;
  onClose: () => void;
}) {
  return (
    <div className="absolute top-0 left-0 z-1000 flex w-full flex-col items-center rounded-xl bg-black pt-30 lg:border-0 lg:pt-0">
      <EditStory story={story} />
      <button
        className="my-5 w-fit rounded-lg bg-red-500 p-3"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
}
