import { Code } from "lucide-react";
import Icon_Section from "./Icon_Section";

export default function Tech_Stack_Section() {
  return (
    <Icon_Section
      value="tech"
      icon={<Code className="h-6 w-6" />}
      title="Modern Tech Stack"
      bg_color="bg-blue-100 dark:bg-blue-900/20"
      icon_color="text-blue-600 dark:text-blue-400"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Frontend Framework</h4>
          <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start">
              <span className="mt-0.5 mr-2 text-blue-500">▸</span>
              <span>
                <strong className="text-gray-700 dark:text-gray-300">Next.js 16</strong> with App Router for fast,
                modern web experiences
              </span>
            </li>
            <li className="flex items-start">
              <span className="mt-0.5 mr-2 text-blue-500">▸</span>
              <span>
                <strong className="text-gray-700 dark:text-gray-300">React 19</strong> with the new React Compiler for
                automatic performance optimizations
              </span>
            </li>
            <li className="flex items-start">
              <span className="mt-0.5 mr-2 text-blue-500">▸</span>
              <span>
                <strong className="text-gray-700 dark:text-gray-300">TypeScript</strong> for type-safe, reliable code
              </span>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Data & Validation</h4>
          <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start">
              <span className="mt-0.5 mr-2 text-blue-500">▸</span>
              <span>
                <strong className="text-gray-700 dark:text-gray-300">Zod schema validation</strong> ensures your data is
                parsed correctly and securely
              </span>
            </li>
            <li className="flex items-start">
              <span className="mt-0.5 mr-2 text-blue-500">▸</span>
              <span>
                <strong className="text-gray-700 dark:text-gray-300">In-browser ZIP extraction</strong> handles TikTok
                exports without server uploads
              </span>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">UI & Styling</h4>
          <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start">
              <span className="mt-0.5 mr-2 text-blue-500">▸</span>
              <span>
                <strong className="text-gray-700 dark:text-gray-300">Tailwind CSS 4</strong> for responsive, modern
                styling with dark mode support
              </span>
            </li>
            <li className="flex items-start">
              <span className="mt-0.5 mr-2 text-blue-500">▸</span>
              <span>
                <strong className="text-gray-700 dark:text-gray-300">Accessible components</strong> built on Radix UI
                primitives
              </span>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Privacy First</h4>
          <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start">
              <span className="mt-0.5 mr-2 text-blue-500">▸</span>
              <span>
                <strong className="text-gray-700 dark:text-gray-300">100% client-side processing</strong> - your data
                never leaves your browser
              </span>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Hosting</h4>
          <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start">
              <span className="mt-0.5 mr-2 text-blue-500">▸</span>
              <span>
                The application is hosted by{" "}
                <a
                  href={"https://vercel.com/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  <strong>Vercel</strong>
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </Icon_Section>
  );
}
