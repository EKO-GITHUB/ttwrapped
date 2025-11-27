import { Trash2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Deleted_Posts_Section({ deleted_posts }: { deleted_posts: unknown[] }) {
  if (!deleted_posts || deleted_posts.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
      <Accordion
        type="single"
        collapsible
      >
        <AccordionItem
          value="deleted-posts"
          className="border-none"
        >
          <AccordionTrigger className="py-2 hover:no-underline">
            <div className="flex items-center gap-2">
              <Trash2 className="h-4 w-4 text-red-500 dark:text-red-400" />
              <span className="font-semibold text-gray-900 dark:text-gray-100">Recently Deleted Posts</span>
              <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300">
                {deleted_posts.length}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                These posts were recently deleted from your TikTok account. The data structure may vary.
              </p>

              <div className="space-y-2">
                {deleted_posts.map((post, index) => {
                  const post_obj = post as Record<string, unknown>;
                  const has_date = post_obj && typeof post_obj === "object" && "Date" in post_obj;
                  const has_title = post_obj && typeof post_obj === "object" && "Title" in post_obj;

                  return (
                    <div
                      key={index}
                      className="rounded border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                              Post #{index + 1}
                            </span>
                            {has_date && (
                              <span className="text-xs text-gray-400 dark:text-gray-500">
                                {new Date(String(post_obj.Date)).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                            )}
                          </div>
                          {has_title && String(post_obj.Title).trim() !== "" && (
                            <p className="text-sm text-gray-700 dark:text-gray-300">{String(post_obj.Title)}</p>
                          )}
                          {!has_title && (
                            <p className="text-sm italic text-gray-400">No title available</p>
                          )}
                        </div>
                      </div>

                      <details className="mt-2">
                        <summary className="cursor-pointer text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                          View raw data
                        </summary>
                        <pre className="mt-2 overflow-auto rounded bg-gray-100 p-2 text-xs dark:bg-gray-800">
                          {JSON.stringify(post, null, 2)}
                        </pre>
                      </details>
                    </div>
                  );
                })}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
