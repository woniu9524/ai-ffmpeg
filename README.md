# AI-FFmpeg: Free Online Video Processing Platform | Video Compression & Conversion Tool

> 🎥 Free online video processing tool supporting video compression, speed adjustment, format conversion, and more. Process videos locally to protect privacy - no server upload needed. Use natural language AI chat to easily process videos without learning complex commands.



<p align="center">
  <img src="public/logo.png" alt="AI-FFmpeg Logo" width="200"/>
</p>

<div align="center">

[![GitHub license](https://img.shields.io/github/license/your-username/ai-ffmpeg)](https://github.com/your-username/ai-ffmpeg/blob/main/LICENSE)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org)

[English](README.md) | [中文文档](doc/README-zh.md)

</div>

## 🚀 Introduction

AI-FFmpeg is a web application based on FFmpeg.wasm that uses natural language processing to generate FFmpeg commands for video processing. It allows users to process videos easily without knowing complex FFmpeg commands.

## 🚀 Online Demo

Try it online: [https://ffmpeg-online.top/](https://ffmpeg-online.top/)

## ✨ Core Features

- 🎥 **Browser-based Processing**: Process videos directly in your browser using FFmpeg.wasm
- 🤖 **AI Command Generation**: Convert natural language to professional FFmpeg commands
- 📁 **Multi-format Support**: Support for major video formats (MP4, AVI, MOV, MKV, WebM)
- 🔄 **Real-time Progress**: Visual progress tracking for video processing
- 👀 **Preview Function**: Instant preview after processing
- 🌐 **Cross-platform**: Compatible with all modern browsers

## 🎯 Common Use Cases

- Compress Large Video Files
- Adjust Video Playback Speed
- Convert Between Video Formats
- Cut and Merge Videos
- Extract Audio from Videos
- Adjust Video Resolution and Quality

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18
- **Styling**: Tailwind CSS
- **Video Processing**: FFmpeg.wasm
- **AI Integration**: OpenAI API
- **Language**: TypeScript
- **Package Manager**: pnpm

## 📦 Installation & Deployment

1. **Clone Repository**
   ```bash
   git clone https://github.com/woniu9524/ai-ffmpeg.git
   cd ai-ffmpeg
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local`:
   ```
   OPENAI_API_KEY=your_llm_key
   OPENAI_BASE_URL=base_url
   AI_MODEL=model_name #qwen2.5-coder-3b-instruct is sufficient
   ```

4. **Start Development Server**
   ```bash
   pnpm dev
   ```

## 🎯 Usage Guide

1. Open the web application
2. Upload video by drag-and-drop or clicking
3. Describe your desired video processing in natural language
4. Review and confirm the generated FFmpeg command
5. Start processing and monitor progress
6. Preview and download the processed video

## 💡 Use Cases

- **Video Compression**: Easily reduce video file size
- **Format Conversion**: Convert between different video formats
- **Video Trimming**: Cut video segments
- **Resolution Adjustment**: Change video size and quality
- **Video Merging**: Combine multiple video clips
- **Audio Extraction**: Extract audio tracks from videos

## 🙏 Acknowledgments

- Thanks to the FFmpeg.wasm team for their excellent work
- Thanks to QWEN for powerful API support
- Thanks to Cursor for the powerful editor

---
