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
          <strong className="text-gray-800 dark:text-gray-200">Your data stays on your device.</strong> All processing
          happens entirely in your browser. Your TikTok data export is never uploaded to any server, never transmitted
          over the internet, and never stored anywhere outside your own computer or phone.
        </p>

        <p>
          <strong className="text-gray-800 dark:text-gray-200">We have zero access to your information.</strong> Unlike
          other analytics tools, TTWrapped cannot see, collect, or store any of your personal data. There are no
          accounts, no sign-ups, and no databases storing your information. We physically cannot access your data
          because it never reaches us.
        </p>

        <p>
          <strong className="text-gray-800 dark:text-gray-200">Your TikTok data is never shared.</strong> We do not
          collect, sell, or share any of your TikTok data with third parties. The personal information in your data
          export - your watch history, comments, likes, and messages - stays completely private.
        </p>

        <p>
          <strong className="text-gray-800 dark:text-gray-200">100% client-side processing.</strong> The entire
          application runs in your browser using JavaScript. When you upload your TikTok data export, the file is read
          and processed locally. The statistics, charts, and insights are all generated on your device in real-time.
          Once you close this website, all processed data is gone - nothing is stored or cached. Your original file
          remains safely in your downloads folder, untouched.
        </p>

        <p>
          <strong className="text-gray-800 dark:text-gray-200">Open source and transparent.</strong> Our entire codebase
          is publicly available for anyone to inspect. You can verify exactly how your data is processed and confirm
          that nothing is being sent anywhere. Trust through transparency.
        </p>

        <p>
          <strong className="text-gray-800 dark:text-gray-200">Analytics disclaimer.</strong> While your TikTok data
          remains completely private and never leaves your device, we use Vercel Web Analytics to collect anonymous
          usage statistics such as page views, visitor count, and geographic regions. This helps us understand how the
          service is being used and improve the experience. Vercel Analytics does not use cookies, does not collect
          personal information, and is fully GDPR compliant. No analytics data is ever connected to your TikTok data.
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
