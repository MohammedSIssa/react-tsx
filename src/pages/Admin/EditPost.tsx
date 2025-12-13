import type { Post } from "../../types/Post";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function EditPost({ post }: { post: Post }) {
  const [title, setTitle] = useState<string>(post.title ?? "");
  const [body, setBody] = useState<string>(post.body ?? "");
  const [images, setImages] = useState<string>(post?.images?.join(", ") ?? "");
  const [sentImages, setSentImages] = useState<string[]>(post.images ?? []);
  const [special, setSpecial] = useState<boolean>(post.special ?? false);
  const [secret, setSecret] = useState<boolean>(post.secret ?? false);
  const [type, setType] = useState<string>(post.type ?? "");
  const [storyid, setStoryid] = useState<number>(post.storyid ?? 0);

  const [feedback, setFeedback] = useState<string>("");

  const { user } = useAuth();

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await fetch(
        import.meta.env.VITE_DEV_API +
          "/posts/" +
          type +
          "/" +
          storyid +
          "/" +
          post.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer: ${user?.apikey}`,
          },
          body: JSON.stringify({
            title,
            body,
            images: sentImages,
            special,
            secret,
            type,
            storyid,
          }),
        },
      );

      if (res.ok) {
        setFeedback("Updated!");
      }
      if (res.status === 500) {
        setFeedback("Server Error!");
      }
      if (res.status >= 400 && res.status < 500) {
        setFeedback("Unauthorized!");
      }
    } catch (e) {
      console.error(e);
      setFeedback("Client Error!");
    }
  }

  return (
    <form
      onSubmit={handleSave}
      className="flex flex-col gap-1 rounded-xl border-2 border-white/20 bg-white/10 p-3 py-5 shadow-xl shadow-black/10 backdrop-blur-2xl [&_input]:mb-4 [&_input]:rounded [&_input]:border-2 [&_input]:border-white/10 [&_input]:bg-white/10 [&_input]:p-1 [&_input]:px-2 [&_input]:focus:outline-0 [&_select]:rounded [&_select]:border-2 [&_select]:border-white/10 [&_select]:bg-white/10 [&_select]:p-1 [&_select]:px-2 [&_select]:focus:outline-0 [&_textarea]:mb-4 [&_textarea]:rounded [&_textarea]:border-2 [&_textarea]:border-white/10 [&_textarea]:bg-white/10 [&_textarea]:p-1 [&_textarea]:px-2 [&_textarea]:focus:outline-0"
      dir="ltr"
    >
      <label htmlFor="title" dir="ltr">
        Title:{" "}
      </label>
      <input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="storyid" dir="ltr">
        Story Count:{" "}
      </label>
      <input
        id="storyid"
        type="number"
        value={storyid}
        onChange={(e) => setStoryid(+e.target.value)}
      />

      <label htmlFor="type" dir="ltr">
        Type:{" "}
      </label>
      <select
        className="[&_option]:bg-black"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value={"week"}>Weeks</option>
        <option value={"goal"}>Goals</option>
        <option value={"blog"}>Blogs</option>
        <option value={"special"}>Special</option>
      </select>

      <label htmlFor="body" dir="ltr">
        Body:{" "}
      </label>
      <textarea
        id="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <label htmlFor="images" dir="ltr">
        Images:{" "}
      </label>
      <textarea
        id="images"
        dir="ltr"
        value={images}
        onChange={(e) => {
          const value = e.target.value;
          setImages(value);
          const imagess = value
            .split(", ")
            .map((i) => i.trim())
            .filter(Boolean);
          setSentImages(imagess);
        }}
      />

      <div className="mb-2 flex items-center justify-center gap-2 [&_div]:rounded-xl [&_div]:border-2 [&_div]:border-white/10 [&_div]:p-2">
        <div
          className={`flex items-center justify-center gap-2 ${special === true ? "bg-green-500/30" : "bg-red-500/30"}`}
        >
          <label htmlFor="special" dir="ltr">
            Special?
          </label>
          <input
            id="special"
            type="checkbox"
            className="opacity-30"
            checked={special}
            onChange={(e) => setSpecial(e.target.checked)}
          />
        </div>

        <div
          className={`flex items-center justify-center gap-2 ${secret === true ? "bg-green-500/30" : "bg-red-500/30"}`}
        >
          <label htmlFor="secret" dir="ltr">
            Secret?
          </label>
          <input
            id="secret"
            type="checkbox"
            className="opacity-30"
            checked={secret}
            onChange={(e) => setSecret(e.target.checked)}
          />
        </div>
      </div>
      <p dir="ltr">{feedback}</p>
      <button
        type="submit"
        className="w-full cursor-pointer rounded-lg border-0 bg-linear-to-b from-[#5a36e9] via-[#805afe] to-[#5a36e9] p-1 px-2 font-bold hover:brightness-105 focus:outline-0"
      >
        حفظ التعديلات
      </button>
    </form>
  );
}
