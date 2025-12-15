import type { Post } from "../types/Post";
import PostBox from "./Post/Post";
import useAuth from "../hooks/useAuth";
import AddPostForm from "./Admin/AddPostForm";

export default function Posts({ posts }: { posts: Post[] }) {
  const { isAdmin } = useAuth();
  return (
    <div className="flex w-full flex-col items-center pt-20">
      <div className="mx-auto mb-2 flex gap-2 md:hidden">
        <p className="counter rounded border-2 border-white/20 bg-white/10 p-2 px-5 font-bold">
          {posts[0].storyid}
        </p>
        <p className="counter rounded border-2 border-white/20 bg-white/10 p-2 px-5 font-bold">
          {posts[0].type}
        </p>
      </div>
      <div className="flex w-full flex-col items-center gap-5">
        {posts.map((post, idx) => (
          <PostBox key={idx} post={post} />
        ))}
      </div>
      <div className="mt-5">
        {isAdmin() && (
          <AddPostForm type={posts[0].type} storyid={posts[0].storyid} />
        )}
      </div>
    </div>
  );
}
