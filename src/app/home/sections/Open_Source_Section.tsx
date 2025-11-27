import { Bug, ExternalLink, GitFork, Github, Star } from "lucide-react";
import Icon_Section from "./Icon_Section";

export default function Open_Source_Section() {
  return (
    <Icon_Section
      value="github"
      icon={<Github className="h-6 w-6" />}
      title="Open Source"
      bg_color="bg-purple-100 dark:bg-purple-900/20"
      icon_color="text-purple-600 dark:text-purple-400"
    >
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-400">
          TTWrapped is fully open source. The entire codebase is available for you to explore, learn from, or contribute
          to.
        </p>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Get Involved</h4>
          <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start">
              <Star className="mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-purple-500" />
              <span>Star the repository to show your support</span>
            </li>
            <li className="flex items-start">
              <GitFork className="mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-purple-500" />
              <span>Fork and submit pull requests with improvements</span>
            </li>
            <li className="flex items-start">
              <Bug className="mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-purple-500" />
              <span>Report bugs or request features via GitHub Issues</span>
            </li>
          </ul>
        </div>

        <div className={"flex justify-center"}>
          <a
            href="https://github.com/EKO-GITHUB/ttwrapped"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
          >
            <Github className="mr-2 h-4 w-4" />
            View on GitHub
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </Icon_Section>
  );
}
