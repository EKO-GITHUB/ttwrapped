# TTWrapped

TTWrapped is a web application that analyzes your TikTok data and presents it in a visual "Wrapped" experience, similar to Spotify's year-end summaries. Upload your TikTok data export and discover insights about your viewing habits, interactions, and activity.

## What It Does

TTWrapped processes your TikTok data export to show you:

- **Slideshow Experience**: An auto-playing presentation highlighting your top stats like videos watched, total watch time, engagement patterns, and a personalized profile type
- **Analytics Dashboard**: Detailed breakdowns of your activity including login history, comments, direct messages, shopping activity, and more

All data processing happens entirely in your browser. Nothing is uploaded to any server.

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm, pnpm, or yarn

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/EKO-GITHUB/ttwrapped.git
cd ttwrapped
npm install
```

### Running the App

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## How to Use

### Step 1: Get Your TikTok Data

1. Open the TikTok app on your phone
2. Go to Settings > Privacy > Download your data
3. Request your data (this may take a few days)
4. Download the ZIP file when ready

### Step 2: Upload Your Data

1. Visit the TTWrapped application
2. Click the upload area or drag and drop your file
3. Upload either the full ZIP file or just the `user_data.json` file inside it

### Step 3: View Your Results

The app will:
1. Validate your data
2. Show you an auto-playing slideshow of your highlights
3. Give you access to a detailed analytics dashboard

## Privacy

All data processing happens locally in your browser. Your TikTok data never leaves your computer. The application does not send any information to external servers.

## Tech Stack

- Next.js 16 with App Router
- React 19 with React Compiler
- TypeScript (strict mode)
- Tailwind CSS 4
- Zustand for state management
- Zod for data validation
- shadcn/ui components

## Development

### Code Formatting

The project uses Prettier with Tailwind CSS class sorting:

```bash
npx prettier --write .
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── app/                    # Next.js pages and routes
├── components/
│   ├── analytics/          # Dashboard components
│   ├── slideshow/          # Wrapped slideshow
│   ├── custom/             # Reusable components
│   └── ui/                 # UI primitives
├── stores/                 # State management
└── types/                  # TypeScript type definitions
```

## Contributing

Contributions are welcome. Please open an issue first to discuss what you would like to change.

## License

This project is open source and available under the MIT License.
