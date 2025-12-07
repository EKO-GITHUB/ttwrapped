"use client";

import { useData_store } from "@/stores/useData_store";
import { motion } from "framer-motion";
import { useExport } from "@/contexts/ExportContext";

const one_year_ago = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
const formatted_date = one_year_ago.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });

export function Slide_Welcome() {
  const profile = useData_store((state) => state.profile);
  const { is_exporting } = useExport();

  const profile_photo = profile!["Profile Info"].ProfileMap.profilePhoto;
  const username = profile!["Profile Info"].ProfileMap.userName;

  return (
    <>
      <motion.p
        className="mb-4 text-4xl font-bold"
        {...(!is_exporting && {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
        })}
      >
        Your <br />
        TikTok Wrapped
      </motion.p>
      {profile_photo && (
        <motion.img
          src={profile_photo}
          alt={username || "Profile"}
          className="mb-2 h-28 w-28 rounded-full border-4 border-white/50 object-cover"
          {...(!is_exporting && {
            initial: { opacity: 0, scale: 0.5 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.5, delay: 0.5, type: "spring", bounce: 0.4 },
            whileHover: { scale: 1.05 },
          })}
        />
      )}
      {username && (
        <motion.p
          className="mb-6 font-semibold"
          {...(!is_exporting && {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.8 },
          })}
        >
          @{username}
        </motion.p>
      )}
      <motion.p
        className="text-4xl"
        {...(!is_exporting && {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.5, delay: 1.1 },
        })}
      >
        From
      </motion.p>
      <motion.p
        className="text-4xl font-bold"
        {...(!is_exporting && {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.5, delay: 1.3 },
        })}
      >
        {formatted_date}
      </motion.p>
      <motion.p
        className="text-4xl"
        {...(!is_exporting && {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.5, delay: 1.5 },
        })}
      >
        to today!
      </motion.p>
    </>
  );
}
