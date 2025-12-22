import { Lock } from "lucide-react";
import Icon_Section from "./Icon_Section";

export default function Privacy_Section() {
  return (
    <Icon_Section
      value="privacy"
      icon={<Lock className="h-6 w-6" />}
      title="Your Privacy First"
      bg_color="bg-green-100 dark:bg-green-900/20"
      icon_color="text-green-600 dark:text-green-400"
    >
      <div className="space-y-4 text-gray-600 dark:text-gray-400">
        <p>
          <strong className="text-gray-800 dark:text-gray-200">Your TikTok data stays on your device.</strong> All
          analytics processing happens entirely in your browser. Your watch history, comments, likes, and messages are
          never uploaded to any server. The statistics, charts, and insights are generated locally in real-time, and
          once you close the page, all processed data is gone.
        </p>

        <p>
          <strong className="text-gray-800 dark:text-gray-200">Optional sign-in.</strong> You can use TTWrapped without
          creating an account by manually uploading your TikTok data export. Signing in with TikTok is completely
          optional and only required if you want to use the automatic data request feature (available to EEA/UK users).
        </p>

        <p>
          <strong className="text-gray-800 dark:text-gray-200">Minimal data stored.</strong> If you choose to sign in,
          we store only your TikTok profile information (display name and avatar) and the status of any data export
          requests. Your actual TikTok activity data (watch history, comments, likes, messages) is never stored on our
          servers - it is downloaded directly to your browser and processed locally.
        </p>

        <p>
          <strong className="text-gray-800 dark:text-gray-200">Download or delete your data.</strong> Signed-in users
          can download all data we store about them directly from their profile menu. You can also delete your account
          at any time, which removes all stored information.
        </p>

        <p>
          <strong className="text-gray-800 dark:text-gray-200">Your TikTok data is never shared.</strong> We do not
          collect, sell, or share any of your TikTok activity data with third parties. The personal information in your
          data export stays completely private and is processed only on your device.
        </p>

        <p>
          <strong className="text-gray-800 dark:text-gray-200">Open source and transparent.</strong> Our entire codebase
          is publicly available for anyone to inspect. You can verify exactly how your data is processed and confirm
          that your TikTok activity never leaves your browser. Trust through transparency.
        </p>

        <p>
          <strong className="text-gray-800 dark:text-gray-200">Analytics disclaimer.</strong> We use Vercel Web
          Analytics to collect anonymous usage statistics such as page views, visitor count, and geographic regions.
          This helps us understand how the service is being used. Vercel Analytics does not use cookies, does not
          collect personal information, and is fully GDPR compliant. No analytics data is ever connected to your TikTok
          data.
        </p>

        <p>
          <strong className="text-gray-800 dark:text-gray-200">Questions or GDPR requests?</strong> For any privacy
          questions or GDPR-related inquiries (data access, deletion, or portability requests), please contact us at{" "}
          <a
            href="mailto:contact@ttwrapped.com"
            className="underline"
          >
            contact@ttwrapped.com
          </a>
          .
        </p>

        <p className="text-sm italic">
          Your data is yours. We believe privacy should be the default, not a premium feature.
        </p>
      </div>
    </Icon_Section>
  );
}
