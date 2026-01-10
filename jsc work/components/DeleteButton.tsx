import { MdDelete } from "react-icons/md";

export default function DeleteButton({
  url,
  deleteEffect,
  id,
}: {
  url: string;
  deleteEffect: (id: number) => void;
  id: number;
}) {
  async function clickHandler() {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      try {
        const res = await fetch(url, { method: "DELETE" });
        if (res.ok) {
          deleteEffect(id);
        }
      } catch {
        alert("Failed to delete.");
      }
    }
  }

  return (
    <button
      onClick={clickHandler}
      className="cursor-pointer rounded bg-red-700 p-2 px-3 text-white"
    >
      <MdDelete />
    </button>
  );
}
