import { useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function AddPostForm({
  type,
  storyid,
}: {
  type: string;
  storyid: number;
}) {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [images, setImages] = useState<string>("");
  const [sentImages, setSentImages] = useState<string[]>([]);
  const [special, setSpecial] = useState<boolean>(false);
  const [secret, setSecret] = useState<boolean>(false);

  const [feedback, setFeedback] = useState<string>("");

  const { user } = useAuth();

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await fetch(
        import.meta.env.VITE_DEV_API + "/posts/" + type + "/" + storyid,
        {
          method: "POST",
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
        setFeedback("Post added successfully!");
        setTitle("");
        setBody("");
        setSecret(false);
        setSpecial(false);
        setImages("");
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
      <h1 className="font-bold" dir="ltr">
        Add a post for {type} {storyid}
      </h1>
      <label htmlFor="title" dir="ltr">
        Title:{" "}
      </label>
      <input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

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
