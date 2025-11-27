import { useData_store } from "@/stores/useData_store";

export function Slide_Welcome() {
  const profile = useData_store((state) => state.profile);

  const one_year_ago = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
  const formatted_date = one_year_ago.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });

  const profile_photo = profile!["Profile Info"].ProfileMap.profilePhoto;
  const username = profile!["Profile Info"].ProfileMap.userName;

  return (
    <>
      <p className="mb-4 text-4xl font-bold">Your TikTok Wrapped</p>
      {profile_photo && (
        <img
          src={profile_photo}
          alt={username || "Profile"}
          className="mb-2 h-28 w-28 rounded-full border-4 border-white/50 object-cover"
        />
      )}
      {username && <p className="mb-6 text-2xl font-semibold">@{username}</p>}
      <p className="text-4xl">From</p>
      <p className="text-4xl font-bold">{formatted_date}</p>
      <p className="text-4xl">to today!</p>
    </>
  );
}
