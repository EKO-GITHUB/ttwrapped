import { All_Stats, App_State } from "@/stores/types";
import { calculate_watch_stats } from "@/stores/calculate_watch_stats";

export function calculate_stats(section_state: Partial<App_State>): All_Stats {
  const one_year_ago = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);

  const comment_list = section_state.comment_is_valid ? section_state.comment!.Comments.CommentsList : [];
  const like_list = section_state.your_activity_is_valid
    ? section_state.your_activity!["Like List"].ItemFavoriteList
    : [];
  const favorite_list = section_state.your_activity_is_valid
    ? section_state.your_activity!["Favorite Videos"].FavoriteVideoList
    : [];
  const share_list = section_state.your_activity_is_valid
    ? section_state.your_activity!["Share History"].ShareHistoryList
    : [];
  const search_list = section_state.your_activity_is_valid ? section_state.your_activity!.Searches.SearchList : [];

  const follower_count = section_state.profile_is_valid
    ? section_state.profile!["Profile Info"].ProfileMap.followerCount
    : 0;
  const following_count = section_state.profile_is_valid
    ? section_state.profile!["Profile Info"].ProfileMap.followingCount
    : 0;

  return {
    watch: calculate_watch_stats(section_state),
    comment_count: filter_by_date(comment_list, one_year_ago).length,
    like_count: filter_by_date(like_list, one_year_ago).length,
    favorite_count: filter_by_date(favorite_list, one_year_ago).length,
    share_count: filter_by_date(share_list, one_year_ago).length,
    search_count: filter_by_date(search_list, one_year_ago).length,
    follower_count,
    following_count,
  };
}

function filter_by_date<T extends { date?: string; Date?: string }>(items: T[] | null, cutoff_date: Date): T[] {
  if (!items) return [];
  return items.filter((item) => {
    const date_str = item.date ?? item.Date;
    if (!date_str) return false;
    const date = new Date(date_str);
    return !isNaN(date.getTime()) && date >= cutoff_date;
  });
}
