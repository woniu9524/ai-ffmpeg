# AI-FFmpeg Video Processing Platform

A web application that uses AI to generate FFmpeg commands from natural language descriptions and process videos directly in the browser using FFmpeg.wasm.

## Features

- Upload video files (supports MP4, AVI, MOV, MKV, WebM)
- Natural language to FFmpeg command generation using OpenAI
- Browser-based video processing using FFmpeg.wasm
- Real-time processing progress
- Preview and download processed videos

## Prerequisites

- Node.js 18+ and npm/pnpm
- OpenAI API key

## Getting Started

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/ai-ffmpeg.git
   cd ai-ffmpeg
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   pnpm install
   \`\`\`

3. Create a \`.env.local\` file in the root directory and add your environment variables:
   \`\`\`
   OPENAI_API_KEY=your_openai_api_key_here
   OPENAI_BASE_URL=your_openai_base_url_here # Optional: Custom OpenAI API base URL
   AI_MODEL=gpt-3.5-turbo # Optional: Defaults to gpt-3.5-turbo
   \`\`\`

4. Start the development server:
   \`\`\`bash
   pnpm dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Upload a video file by dragging and dropping or clicking the upload area
2. Enter a natural language description of the video processing task
3. Click "Generate Command" to get the FFmpeg command
4. Review the command and its description
5. Click "Process Video" to execute the command
6. Wait for processing to complete
7. Preview and download the processed video

## Technology Stack

- Next.js 14
- React 18
- Tailwind CSS
- FFmpeg.wasm
- OpenAI API
- TypeScript

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
