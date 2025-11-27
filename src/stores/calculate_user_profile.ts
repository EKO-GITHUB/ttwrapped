export type Profile_Level = "low" | "medium" | "high";

export type User_Profile_Metrics = {
  consumption: Profile_Level;
  engagement: Profile_Level;
  sharing: Profile_Level;
  creation: Profile_Level;
  combination_key: string;
  raw_metrics: {
    videos_watched: number;
    watch_hours: number;
    likes: number;
    comments: number;
    favorites: number;
    shares: number;
    posts: number;
  };
};

export type Profile_Definition = {
  combination_key: string;
  profile_name: string;
  profile_description: string;
  profile_image: string;
};

const CONSUMPTION_THRESHOLDS = { low: 5000, high: 100000 };

const ENGAGEMENT_RATIO_THRESHOLDS = { low: 0.01, high: 0.05 };
const ENGAGEMENT_ABSOLUTE_THRESHOLDS = { low: 1000, high: 15000 };

const SHARING_RATIO_THRESHOLDS = { low: 0.001, high: 0.01 };
const SHARING_ABSOLUTE_THRESHOLDS = { low: 50, high: 1000 };

const CREATION_RATIO_THRESHOLDS = { low: 0.5, high: 5 };
const CREATION_ABSOLUTE_THRESHOLDS = { low: 3, high: 100 };

export function calculate_user_profile(
  watch_hours: number,
  videos_watched: number,
  likes: number,
  comments: number,
  favorites: number,
  shares: number,
  posts: number,
): User_Profile_Metrics {

  const consumption_score = videos_watched + watch_hours * 100;

  const engagement_absolute = likes + comments * 10 + favorites * 2;
  const engagement_ratio = videos_watched > 0 ? engagement_absolute / videos_watched : 0;

  const sharing_absolute = shares;
  const sharing_ratio = videos_watched > 0 ? shares / videos_watched : 0;

  const creation_absolute = posts;
  const creation_ratio = videos_watched > 0 ? posts / (videos_watched / 10000) : 0;

  const consumption = categorize_level(consumption_score, CONSUMPTION_THRESHOLDS);
  const engagement = categorize_hybrid(
    engagement_ratio,
    engagement_absolute,
    ENGAGEMENT_RATIO_THRESHOLDS,
    ENGAGEMENT_ABSOLUTE_THRESHOLDS,
  );
  const sharing = categorize_hybrid(
    sharing_ratio,
    sharing_absolute,
    SHARING_RATIO_THRESHOLDS,
    SHARING_ABSOLUTE_THRESHOLDS,
  );
  const creation = categorize_hybrid(
    creation_ratio,
    creation_absolute,
    CREATION_RATIO_THRESHOLDS,
    CREATION_ABSOLUTE_THRESHOLDS,
  );

  const combination_key = `${consumption}_${engagement}_${sharing}_${creation}`;

  return {
    consumption,
    engagement,
    sharing,
    creation,
    combination_key,
    raw_metrics: {
      videos_watched,
      watch_hours,
      likes,
      comments,
      favorites,
      shares,
      posts,
    },
  };
}

function categorize_level(score: number, thresholds: { low: number; high: number }): Profile_Level {
  if (score < thresholds.low) return "low";
  if (score >= thresholds.high) return "high";
  return "medium";
}

function categorize_hybrid(
  ratio: number,
  absolute: number,
  ratio_thresholds: { low: number; high: number },
  absolute_thresholds: { low: number; high: number },
): Profile_Level {
  const ratio_level = categorize_level(ratio, ratio_thresholds);
  const absolute_level = categorize_level(absolute, absolute_thresholds);

  const level_order: Record<Profile_Level, number> = { low: 0, medium: 1, high: 2 };
  return level_order[ratio_level] >= level_order[absolute_level] ? ratio_level : absolute_level;
}
