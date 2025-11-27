import { App_State } from "@/stores/types";

export type Watch_Stats = {
  // Core counts
  total_videos: number;
  session_count: number;

  // Watch time (calculated from timestamp gaps)
  total_watch_time_hours: number;
  total_watch_time_minutes: number;

  // Session metrics
  avg_session_videos: number;
  avg_session_minutes: number;

  // Longest session
  longest_session_videos: number;
  longest_session_minutes: number;
  longest_session_date: Date | null;

  // Download estimate
  estimated_download_gb: number;

  // Activity patterns
  videos_per_day_avg: number;
  first_watch_date: Date | null;
  last_watch_date: Date | null;
  days_span: number;
  days_with_activity: number;
};

const SESSION_GAP_MS = 30 * 60 * 1000; // 30 min gap = new session
const MAX_VIDEO_DURATION_MS = 3 * 60 * 1000; // Cap at 3 minutes per video
const FALLBACK_VIDEO_SECONDS = 21; // Fallback for last video in session
const MB_PER_VIDEO = 2;

export function calculate_watch_stats(section_state: Partial<App_State>): Watch_Stats {
  if (!section_state.your_activity_is_valid) return create_empty_stats();

  const video_list = section_state.your_activity!["Watch History"].VideoList;

  if (!video_list || video_list.length === 0) {
    return create_empty_stats();
  }

  const one_year_ago = Date.now() - 365 * 24 * 60 * 60 * 1000;

  const sorted = video_list
    .map((v) => ({ ...v, timestamp: new Date(v.Date).getTime() }))
    .filter((v) => !isNaN(v.timestamp) && v.timestamp >= one_year_ago)
    .sort((a, b) => a.timestamp - b.timestamp);

  if (sorted.length === 0) {
    return create_empty_stats();
  }

  const total_videos = sorted.length;

  const { total_watch_time_ms, sessions } = calculate_sessions_with_watch_time(sorted);

  const session_count = sessions.length;
  const total_watch_time_minutes = total_watch_time_ms / (1000 * 60);
  const total_watch_time_hours = total_watch_time_minutes / 60;

  const avg_session_videos = total_videos / session_count;
  const avg_session_minutes = total_watch_time_minutes / session_count;

  const longest_session = sessions.reduce(
    (max, s) => (s.watch_time_minutes > max.watch_time_minutes ? s : max),
    sessions[0],
  );

  const estimated_download_gb = (total_videos * MB_PER_VIDEO) / 1024;

  const first_watch_date = new Date(sorted[0].timestamp);
  const last_watch_date = new Date(sorted[sorted.length - 1].timestamp);

  const first_day_midnight = new Date(first_watch_date);
  first_day_midnight.setHours(0, 0, 0, 0);
  const last_day_midnight = new Date(last_watch_date);
  last_day_midnight.setHours(0, 0, 0, 0);

  const days_span = Math.max(
    1,
    Math.round((last_day_midnight.getTime() - first_day_midnight.getTime()) / (1000 * 60 * 60 * 24)) + 1,
  );

  const unique_days = new Set(
    sorted.map((v) => {
      const d = new Date(v.timestamp);
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    }),
  );
  const days_with_activity = unique_days.size;

  const videos_per_day_avg = total_videos / days_with_activity;

  return {
    total_videos,
    session_count,
    total_watch_time_hours,
    total_watch_time_minutes,
    avg_session_videos,
    avg_session_minutes,
    longest_session_videos: longest_session.video_count,
    longest_session_minutes: longest_session.watch_time_minutes,
    longest_session_date: new Date(longest_session.start_time),
    estimated_download_gb,
    videos_per_day_avg,
    first_watch_date,
    last_watch_date,
    days_span,
    days_with_activity,
  };
}

function calculate_sessions_with_watch_time(sorted: { timestamp: number }[]): {
  total_watch_time_ms: number;
  sessions: {
    start_time: number;
    end_time: number;
    video_count: number;
    watch_time_minutes: number;
  }[];
} {
  const sessions: {
    start_time: number;
    end_time: number;
    video_count: number;
    watch_time_minutes: number;
  }[] = [];
  let total_watch_time_ms = 0;

  let session_start = sorted[0].timestamp;
  let session_watch_time_ms = 0;
  let video_count = 1;

  for (let i = 0; i < sorted.length; i++) {
    const current = sorted[i];
    const next = sorted[i + 1];

    if (next) {
      const gap = next.timestamp - current.timestamp;

      if (gap < SESSION_GAP_MS) {
        const watch_time = Math.min(gap, MAX_VIDEO_DURATION_MS);
        session_watch_time_ms += watch_time;
        total_watch_time_ms += watch_time;
        video_count++;
      } else {
        session_watch_time_ms += FALLBACK_VIDEO_SECONDS * 1000;
        total_watch_time_ms += FALLBACK_VIDEO_SECONDS * 1000;

        sessions.push({
          start_time: session_start,
          end_time: current.timestamp + FALLBACK_VIDEO_SECONDS * 1000,
          video_count,
          watch_time_minutes: session_watch_time_ms / (1000 * 60),
        });

        session_start = next.timestamp;
        session_watch_time_ms = 0;
        video_count = 1;
      }
    } else {
      session_watch_time_ms += FALLBACK_VIDEO_SECONDS * 1000;
      total_watch_time_ms += FALLBACK_VIDEO_SECONDS * 1000;

      sessions.push({
        start_time: session_start,
        end_time: current.timestamp + FALLBACK_VIDEO_SECONDS * 1000,
        video_count,
        watch_time_minutes: session_watch_time_ms / (1000 * 60),
      });
    }
  }

  return { total_watch_time_ms, sessions };
}

function create_empty_stats(): Watch_Stats {
  return {
    total_videos: 0,
    session_count: 0,
    total_watch_time_hours: 0,
    total_watch_time_minutes: 0,
    avg_session_videos: 0,
    avg_session_minutes: 0,
    longest_session_videos: 0,
    longest_session_minutes: 0,
    longest_session_date: null,
    estimated_download_gb: 0,
    videos_per_day_avg: 0,
    first_watch_date: null,
    last_watch_date: null,
    days_span: 0,
    days_with_activity: 0,
  };
}
