# AI-FFmpeg Video Processing Platform

A web application that uses AI to generate FFmpeg commands from natural language descriptions and process videos directly in the browser using FFmpeg.wasm.

[English](#features) | [中文说明](#功能特点)

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

---

# AI-FFmpeg 视频处理平台

一个基于 AI 的网页应用，可以通过自然语言描述生成 FFmpeg 命令，并直接在浏览器中使用 FFmpeg.wasm 处理视频。

## 功能特点

- 支持上传视频文件（支持 MP4、AVI、MOV、MKV、WebM 格式）
- 使用 OpenAI 将自然语言转换为 FFmpeg 命令
- 使用 FFmpeg.wasm 在浏览器中处理视频
- 实时显示处理进度
- 预览和下载处理后的视频

## 环境要求

- Node.js 18+ 和 npm/pnpm
- OpenAI API 密钥

## 快速开始

1. 克隆仓库：
   \`\`\`bash
   git clone https://github.com/yourusername/ai-ffmpeg.git
   cd ai-ffmpeg
   \`\`\`

2. 安装依赖：
   \`\`\`bash
   pnpm install
   \`\`\`

3. 在根目录创建 `.env.local` 文件并添加环境变量：
   \`\`\`
   OPENAI_API_KEY=你的_openai_api_密钥
   OPENAI_BASE_URL=你的_openai_api_基础url # 可选：自定义 OpenAI API 基础 URL
   AI_MODEL=gpt-3.5-turbo # 可选：默认为 gpt-3.5-turbo
   \`\`\`

4. 启动开发服务器：
   \`\`\`bash
   pnpm dev
   \`\`\`

5. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)。

## 使用方法

1. 通过拖放或点击上传区域上传视频文件
2. 输入视频处理任务的自然语言描述
3. 点击"生成命令"获取 FFmpeg 命令
4. 查看命令及其描述
5. 点击"处理视频"执行命令
6. 等待处理完成
7. 预览并下载处理后的视频
