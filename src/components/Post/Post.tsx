import PostBody from "./Body";
import PostTime from "./Time";
import PostTitle from "./Title";
import PostImages from "./Images";
import type { Post } from "../../types/Post";
import useAuth from "../../hooks/useAuth";
import Goals from "../Goals";

import { FaEdit } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

import { MdDelete } from "react-icons/md";

import EditPost from "../../pages/Admin/EditPost";

import { useState } from "react";

export default function PostBox({
  post,
  isPerview = false,
}: {
  post: Post;
  isPerview?: boolean;
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { isAdmin, isMonmon, user } = useAuth();
  const isVisible = post.secret && (isAdmin() || isMonmon());

  async function deletePost() {
    try {
      const confirm = window.confirm(
        `Are you sure you want to fetch(${"/posts/" + post.type + "/" + post.storyid + "/" + post.id})`,
      );
      if (confirm) {
        const res = await fetch(
          import.meta.env.VITE_DEV_API +
            "/posts/" +
            post.type +
            "/" +
            post.storyid +
            "/" +
            post.id,
          {
            method: "DELETE",
            headers: {
              authorization: `Bearer: ${user?.apikey}`,
            },
          },
        );

        if (res.ok) {
          alert("Deleted post!");
        }
      }
    } catch {
      alert("Could not delete post!");
    }
  }

  return (
    <div
      className={`${isVisible ? "flex" : !post.secret ? "flex" : "hidden"} post w-full max-w-full flex-col gap-2 border-t-2 border-b-2 border-white/20 bg-white/10 p-3 py-5 shadow-xl shadow-black/10 backdrop-blur-2xl md:w-fit md:max-w-[700px] md:min-w-[300px] md:rounded-xl md:border-2 lg:max-w-[900px]`}
    >
      {!isEditing && (
        <>
          <PostTitle title={post?.title ?? ""} />
          {(post?.id ?? 500) > 436 && !isPerview && (
            <PostTime time={post.iat ?? ""} />
          )}
          {post.type !== "goal" && (
            <PostBody
              body={post?.body ?? ""}
              showAllText={post?.images?.length === 0}
            />
          )}
          {post.type === "goal" && <Goals goals={post.body.split("\n")} />}
          {post?.images && post?.images.length > 0 && (
            <PostImages images={post?.images ?? []} />
          )}
        </>
      )}
      {isEditing && <EditPost post={post} />}
      {isAdmin() && !isPerview && (
        <div className="flex w-full gap-2">
          <button
            className="rounded bg-blue-600 p-2 px-3 text-white"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? <FaTimes /> : <FaEdit />}
          </button>
          <button
            className="rounded bg-red-500 p-2 px-3 text-white"
            onClick={deletePost}
          >
            <MdDelete />
          </button>
        </div>
      )}
    </div>
  );
}
