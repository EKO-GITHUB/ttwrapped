export function Seo_Info_Section() {
  return (
    <section className="space-y-3 rounded-lg border border-gray-200 bg-white px-6 py-5 dark:border-gray-700 dark:bg-gray-800/30">
      <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
        Information for Search Engines & Web Crawlers
      </h2>

      <div className="space-y-3 text-xs text-gray-600 dark:text-gray-400">
        <p className="text-xs text-gray-500 italic dark:text-gray-500">
          The following information is optimized for search engines, web crawlers, and SEO indexing to help users
          discover TTWrapped when searching for TikTok analytics tools.
        </p>
        <p>
          TTWrapped is a free, privacy-focused TikTok Wrapped analytics tool that transforms your TikTok data export
          into beautiful insights and statistics. Similar to Spotify Wrapped, TTWrapped creates an engaging TikTok
          Wrapped slideshow experience showcasing your TikTok activity, watch time, engagement patterns, and
          personalized user profile.
        </p>

        <p>
          Our TikTok data analyzer processes your complete data export including watch history, likes, comments, shares,
          direct messages, shopping activity, and login history. Upload your TikTok JSON file or ZIP archive to
          instantly generate comprehensive analytics dashboards with interactive charts, tables, and visualizations.
        </p>

        <p>
          <strong>Key Features:</strong> Auto-playing Wrapped-style slideshow with 10+ personalized slides, detailed
          analytics dashboard with activity summaries, watch time calculations, session statistics, engagement metrics,
          ad tracking insights, login history analysis, shopping cart review, and user personality categorization across
          64 unique profiles based on consumption, engagement, sharing, and creation patterns.
        </p>

        <p>
          <strong>Complete Privacy Protection:</strong> TTWrapped performs 100% client-side processing in your browser.
          Your TikTok data never leaves your device, is never uploaded to servers, and is never stored or transmitted.
          All analysis happens locally using JavaScript with zero data collection, no accounts required, and full GDPR
          compliance. Open source code available for transparency and verification.
        </p>

        <p>
          <strong>How to Use:</strong> Request your TikTok data export from TikTok app settings, download the JSON or
          ZIP file (typically 1-30 days processing time), upload to TTWrapped, and instantly view your personalized
          Wrapped slideshow followed by in-depth analytics. Works with all TikTok data export formats including JSON
          files and ZIP archives containing user data, activity logs, and media information.
        </p>

        <p>
          Built with Next.js, React, TypeScript, and Tailwind CSS. Features include real-time data validation using Zod
          schemas, interactive data tables powered by TanStack Table, responsive design for mobile and desktop, and
          comprehensive error handling. Perfect for TikTok users who want to understand their viewing habits, content
          preferences, and platform engagement without compromising privacy.
        </p>
      </div>
    </section>
  );
}
