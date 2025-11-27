import Link from "next/link";
import Footer from "@/components/layout/Footer";

export default function Usage_Guidelines() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br">
      <div className="container mx-auto max-w-4xl grow px-4 py-8">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-black/60 hover:text-black"
        >
          &larr; Back to Home
        </Link>

        <h1 className="mb-8 text-4xl font-bold">Usage Guidelines</h1>

        <div className="space-y-6 text-gray-700">
          <p className="text-lg">
            Welcome to TTWrapped! These guidelines will help you get the most out of your TikTok data analysis while
            using our service responsibly.
          </p>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">Supported File Formats</h2>
            <p>TTWrapped accepts:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>JSON files (.json)</strong> - The direct data export file from TikTok
              </li>
              <li>
                <strong>ZIP files (.zip)</strong> - The compressed archive containing your JSON data
              </li>
            </ul>
            <p className="text-sm text-gray-500">
              Note: Make sure to request your data in JSON format, not text. The text format is not supported.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">Acceptable Use</h2>
            <p>When using TTWrapped, please:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Only analyze your own TikTok data or data you have explicit permission to access</li>
              <li>Use the insights for personal reflection and entertainment purposes</li>
              <li>Respect the privacy of others who may appear in your data (e.g., in direct messages)</li>
              <li>Do not use the service to harass, stalk, or harm others</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">Sharing Your Results</h2>
            <p>
              You are welcome to share your TTWrapped results on social media or with friends. However, please be
              mindful of:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Not sharing sensitive personal information visible in screenshots</li>
              <li>Being aware that your viewing habits and interests will be visible</li>
              <li>Respecting the privacy of any usernames or conversations that may appear</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">Understanding Your Data</h2>
            <p>
              The analysis provided by TTWrapped is based entirely on the data TikTok includes in your export. Please
              note:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Watch time estimates are calculated based on your watch history timestamps</li>
              <li>Some data may be incomplete or missing depending on when you started using TikTok</li>
              <li>The data reflects your account activity and may not capture all interactions</li>
              <li>Profile categorizations are for entertainment and self-reflection purposes</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">Prohibited Activities</h2>
            <p>The following activities are not permitted:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Analyzing data that does not belong to you without permission</li>
              <li>Using the service for any illegal purposes</li>
              <li>Attempting to exploit, hack, or interfere with the service</li>
              <li>Using automated tools to abuse the service</li>
              <li>Misrepresenting TTWrapped or claiming false affiliation with TikTok</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">Troubleshooting</h2>
            <p>If you encounter issues:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>File not loading?</strong> Make sure you selected JSON format when requesting your data from
                TikTok
              </li>
              <li>
                <strong>Missing data?</strong> TikTok may not include all historical data in exports
              </li>
              <li>
                <strong>Error messages?</strong> Try refreshing the page and uploading again
              </li>
              <li>
                <strong>Other issues?</strong> Report them on our GitHub repository
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">Privacy and Analytics</h2>
            <p>
              Your TikTok data is processed entirely in your browser and never leaves your device. However, we use
              Vercel Web Analytics to collect anonymous usage statistics (page views, visitor counts, geographic
              regions) to help improve the service. This analytics service is privacy-friendly, does not use cookies,
              and is GDPR compliant. For full privacy details, see the Privacy section on the homepage.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">Questions?</h2>
            <p>
              If you have questions about these guidelines or how to use TTWrapped, feel free to open an issue on our
              GitHub repository. We are happy to help!
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
