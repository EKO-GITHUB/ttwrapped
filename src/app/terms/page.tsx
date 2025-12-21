import Link from "next/link";
import Footer from "@/components/layout/Footer";

export default function Terms_Of_Service() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br">
      <div className="container mx-auto max-w-4xl grow px-4 py-8">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-black/60 hover:text-black"
        >
          &larr; Back to Home
        </Link>

        <h1 className="mb-8 text-4xl font-bold">Terms of Service</h1>

        <div className="space-y-6 text-gray-700">
          <p className="text-sm text-gray-500">Last updated: January 2025</p>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
            <p>
              By accessing and using TTWrapped, you agree to be bound by these Terms of Service. If you do not agree to
              these terms, please do not use our service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">2. Description of Service</h2>
            <p>
              TTWrapped is a free, open-source web application that allows users to analyze their TikTok data exports
              locally in their browser. The service processes your data entirely on your device and does not store,
              transmit, or collect any of your personal information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">3. User Responsibilities</h2>
            <p>You are responsible for:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Obtaining your own TikTok data export through official TikTok channels</li>
              <li>Ensuring you have the right to access and analyze the data you upload</li>
              <li>Using the service in compliance with all applicable laws and regulations</li>
              <li>Not attempting to modify, or misuse the service</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">4. Privacy and Data</h2>
            <p>
              Your privacy is fundamental to our service. All data processing occurs locally in your browser. We do not
              have access to your TikTok data, and we do not collect, store, or transmit any personal information from
              your data exports.
            </p>
            <p>
              <strong>Web Analytics:</strong> We use Vercel Web Analytics to collect anonymous usage statistics
              including page views, visitor counts, and geographic regions. This analytics service does not use cookies,
              does not collect personally identifiable information, and is GDPR compliant. The analytics data collected
              is completely separate from your TikTok data and cannot be linked to any individual user or their uploaded
              files.
            </p>
            <p>
              For more details about privacy, please see our Privacy section on the homepage. For GDPR-related inquiries
              (data access, deletion, or portability requests), contact us at{" "}
              <a
                href="mailto:contact@ttwrapped.com"
                className="underline"
              >
                contact@ttwrapped.com
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">5. Intellectual Property</h2>
            <p>
              TTWrapped is open-source software. The source code is publicly available, and you are free to inspect,
              fork, and contribute to the project in accordance with the applicable open-source license. TikTok and
              related trademarks are the property of their respective owners.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">6. Disclaimer of Warranties</h2>
            <p>
              TTWrapped is provided &quot;as is&quot; and &quot;as available&quot; without any warranties of any kind,
              either express or implied. We do not guarantee that the service will be uninterrupted, error-free, or free
              of harmful components. The accuracy of the analysis depends on the data provided by TikTok in your export.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, TTWrapped and its creators shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages arising from your use of the service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">8. Third-Party Services</h2>
            <p>
              TTWrapped is not affiliated with, endorsed by, or sponsored by TikTok or ByteDance. We are an independent
              project that helps users analyze their own data exports.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately
              upon posting. Your continued use of the service after changes constitutes acceptance of the modified
              terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">10. Contact</h2>
            <p>
              If you have any questions about these Terms of Service, please email us at{" "}
              <a
                href="mailto:contact@ttwrapped.com"
                className="underline"
              >
                contact@ttwrapped.com
              </a>
              . You can also reach out through our GitHub repository.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
