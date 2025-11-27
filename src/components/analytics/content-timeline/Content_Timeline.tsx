"use client";

import { FileVideo, Video } from "lucide-react";
import Data_Section_Card from "@/components/layout/Data_Section_Card";
import Activity_Map from "@/components/custom/Activity_Map";
import { useData_store } from "@/stores/useData_store";
import Analytics_Section from "./components/Analytics_Section";
import Posts_Table from "./components/Posts_Table";
import Deleted_Posts_Section from "./components/Deleted_Posts_Section";
import Empty_Content_Timeline from "./components/Empty_Content_Timeline";

export default function Content_Timeline() {
  const post_is_valid = useData_store((state) => state.post_is_valid);
  const post = useData_store((state) => state.post)!;

  if (!post_is_valid) {
    return <Empty_Content_Timeline />;
  }

  const posts = post.Posts.VideoList.sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime());

  const deleted_posts = post["Recently Deleted Posts"].PostList;

  if (posts.length === 0) return <No_Posts />;

  return (
    <Data_Section_Card
      value="content-timeline"
      title="Content Timeline"
      description="Your posted videos and engagement metrics"
      icon={<FileVideo className="h-6 w-6" />}
      badge={posts.length}
    >
      <div className="grid w-full min-w-0 grid-cols-1 gap-4">
        <Analytics_Section posts={posts} />

        <h3 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100">
          <Video className="h-4 w-4" /> Posting Activity
        </h3>

        <Activity_Map
          data={posts}
          date_field="Date"
          title="Posting Activity"
          singular_label="post"
          plural_label="posts"
          color="blue"
        />

        <Posts_Table posts={posts} />

        {deleted_posts && deleted_posts.length > 0 && <Deleted_Posts_Section deleted_posts={deleted_posts} />}
      </div>
    </Data_Section_Card>
  );
}

function No_Posts() {
  return (
    <Data_Section_Card
      value="content-timeline"
      title="Content Timeline"
      description="Your posted videos and engagement metrics"
      icon={<FileVideo className="h-6 w-6" />}
    >
      <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-8 text-center dark:border-gray-700 dark:bg-gray-800/50">
        <FileVideo className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">No posts found</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          You haven't posted any videos yet, or they were not included in your TikTok data export.
        </p>
      </div>
    </Data_Section_Card>
  );
}
