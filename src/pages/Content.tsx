import { useState, useEffect } from "react";
import Stories from "../components/Stories";
import Posts from "../components/Posts";
import { useParams } from "react-router";
import type { Story } from "../types/Story";
import type { Post } from "../types/Post";
import LoadingPosts from "../components/Loaders/LoadingPosts";
import Land from "./Land";

export default function Content() {
  const [stories, setStories] = useState<Story[] | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);

  const [loadingStories, setLoadingStories] = useState<boolean>(true);
  const [storiesError, setStoriesError] = useState(false);

  const [loadingPosts, setLoadingPosts] = useState<boolean>(true);
  const [postsError, setPostsError] = useState(false);

  const { type, storyid } = useParams();

  console.log({ type, storyid });

  useEffect(() => {
    async function getStories() {
      try {
        const res = await fetch(
          import.meta.env.VITE_DEV_API + "/stories/" + type,
        );
        if (res.ok) {
          const data = await res.json();
          setStories(data);
          setStoriesError(false);
        } else {
          setStoriesError(true);
        }
      } catch {
        setStoriesError(true);
      } finally {
        setLoadingStories(false);
      }
    }
    getStories();
  }, [type]);

  useEffect(() => {
    async function getPosts() {
      try {
        setLoadingPosts(true);
        const res = await fetch(
          import.meta.env.VITE_DEV_API + "/posts/" + type + "/" + storyid,
        );
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
          setPostsError(false);
        }
      } catch {
        setPostsError(true);
      } finally {
        setLoadingPosts(false);
      }
    }
    if (storyid !== undefined) getPosts();
  }, [type, storyid]);

  return (
    <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
      {loadingStories && <h1></h1>}
      {storiesError && <h1></h1>}
      {!loadingStories && <Stories stories={stories ?? []} />}
      {loadingPosts && storyid !== undefined && <LoadingPosts />}
      {storyid === undefined && (
        <Land type={stories !== null ? stories[0].type : undefined} />
      )}
      {postsError && <h1></h1>}
      {!loadingPosts && storyid !== undefined && <Posts posts={posts ?? []} />}
    </div>
  );
}
