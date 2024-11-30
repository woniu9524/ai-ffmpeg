# AI-FFmpeg Video Processing Platform

<p align="center">
  <img src="./public/logo.png" alt="AI-FFmpeg Logo" width="200"/>
</p>

<div align="center">

[![GitHub license](https://img.shields.io/github/license/your-username/ai-ffmpeg)](https://github.com/your-username/ai-ffmpeg/blob/main/LICENSE)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org)

[English](README.md) | [中文文档](doc/README-zh.md)

</div>

## 🚀 Online Demo

Try out the online demo at: [https://ffmpeg-online.top/](https://ffmpeg-online.top/)

## Introduction

This project is a web application based on FFmpeg.wasm that uses LLM to generate FFmpeg commands from natural language descriptions for video processing. It allows users to complete video processing tasks without being familiar with FFmpeg commands.

## Core Features

- 🎥 **Browser-side Video Processing**: Process videos directly in the browser using FFmpeg.wasm, no server required
- 🤖 **AI Command Generation**: Convert natural language to professional FFmpeg commands using LLM
- 📁 **Multiple Format Support**: Support for major video formats (MP4, AVI, MOV, MKV, WebM)
- 🔄 **Real-time Progress**: Intuitive display of video processing progress
- 👀 **Preview Function**: Instant preview after processing
- 🌐 **Cross-platform Compatibility**: Support for all modern browsers

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 14, React 18
- **Styling**: Tailwind CSS
- **Video Processing**: FFmpeg.wasm
- **AI Integration**: OpenAI API
- **Development Language**: TypeScript
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

3. **Configure Environment Variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` file:
   ```
   OPENAI_API_KEY=LLM Key
   OPENAI_BASE_URL=Base URL
   AI_MODEL=Model Name #qwen2.5-coder-3b-instruct is sufficient for the task
   ```

4. **Start Development Server**
   ```bash
   pnpm dev
   ```

## 🎯 Usage Guide

1. Open the application webpage
2. Add video files via drag-and-drop or clicking the upload area
3. Describe your desired video processing effect in natural language
4. Review and confirm the generated FFmpeg command
5. Start processing and monitor progress
6. Preview and download the processed video

## 💡 Use Cases

- **Video Compression**: Easily compress video file size
- **Format Conversion**: Convert between different video formats
- **Video Trimming**: Cut video segments
- **Resolution Adjustment**: Change video size and quality
- **Video Merging**: Combine multiple video clips
- **Audio Extraction**: Extract audio tracks from videos

## 🙏 Acknowledgments

- Thanks to the FFmpeg.wasm team for their outstanding work
- Thanks to QWEN for providing powerful API support
- Thanks to Cursor for providing a powerful editor

---
