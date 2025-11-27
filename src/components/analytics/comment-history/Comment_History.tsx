"use client";

import { MessageSquare } from "lucide-react";
import Data_Section_Card from "@/components/layout/Data_Section_Card";
import Activity_Map from "@/components/custom/Activity_Map";
import { useData_store } from "@/stores/useData_store";
import Analytics_Section from "./components/Analytics_Section";
import Comments_Table from "./components/Comments_Table";
import Empty_Comment_History from "./components/Empty_Comment_History";

export default function Comment_History() {
  const comment_is_valid = useData_store((state) => state.comment_is_valid);
  const comment = useData_store((state) => state.comment)!;

  if (!comment_is_valid) {
    return <Empty_Comment_History />;
  }

  const comments = comment.Comments.CommentsList.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (comments.length === 0) return <No_Comments />;

  return (
    <Data_Section_Card
      value="comment-history"
      title="Comment History"
      description="Your comments on TikTok videos and engagement patterns"
      icon={<MessageSquare className="h-6 w-6" />}
      badge={comments.length}
    >
      <div className="grid w-full min-w-0 grid-cols-1 gap-4">
        <Analytics_Section comments={comments} />

        <h3 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100">
          <MessageSquare className="h-4 w-4" /> Commenting Activity
        </h3>

        <Activity_Map
          data={comments}
          date_field="date"
          title="Commenting Activity"
          singular_label="comment"
          plural_label="comments"
          color="purple"
        />

        <Comments_Table comments={comments} />
      </div>
    </Data_Section_Card>
  );
}

function No_Comments() {
  return (
    <Data_Section_Card
      value="comment-history"
      title="Comment History"
      description="Your comments on TikTok videos and engagement patterns"
      icon={<MessageSquare className="h-6 w-6" />}
    >
      <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-8 text-center dark:border-gray-700 dark:bg-gray-800/50">
        <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">No comments found</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          You haven't posted any comments yet, or they were not included in your TikTok data export.
        </p>
      </div>
    </Data_Section_Card>
  );
}
