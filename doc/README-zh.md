# AI-FFmpeg 免费在线视频处理平台 | 视频压缩转换工具

> 🎥 免费在线视频处理工具，支持视频压缩、倍速播放、格式转换等功能。无需上传到服务器，完全本地处理保护隐私。通过AI自然语言对话，轻松处理视频，无需学习复杂命令。

<div align="center">

[![GitHub license](https://img.shields.io/github/license/your-username/ai-ffmpeg)](https://github.com/your-username/ai-ffmpeg/blob/main/LICENSE)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org)

[English](../README.md) | [中文文档](README-zh.md)

</div>


<p align="center">
  <img src="../public/logo.png" alt="AI-FFmpeg Logo" width="200"/>
</p>


## 🚀 项目介绍

本项目是基于FFmpeg.wasm的网页应用，通过自然语言描述由LLM来生成FFmpeg命令，从而实现视频处理。可以在不熟悉FFmpeg命令的情况下，方便的完成视频处理任务。

## 🚀 在线演示

在线体验地址：[https://ffmpeg-online.top/](https://ffmpeg-online.top/)

## ✨ 核心特性

- 🎥 **浏览器端视频处理**：基于 FFmpeg.wasm，直接在浏览器中处理视频，无需服务器
- 🤖 **AI 智能命令生成**：使用LLM将自然语言转换为专业的 FFmpeg 命令
- 📁 **多格式支持**：支持主流视频格式（MP4、AVI、MOV、MKV、WebM）
- 🔄 **实时进度显示**：直观展示视频处理进度
- 👀 **预览功能**：处理完成后即时预览效果
- 🌐 **跨平台兼容**：支持所有现代浏览器


## 🎯 常见使用场景
- 视频文件太大需要压缩
- 视频播放速度调整（加速/减速）
- 不同格式视频转换
- 视频剪辑和合并
- 提取视频音频
- 调整视频分辨率和画质

## 🛠️ 技术栈

- **前端框架**: Next.js 14, React 18
- **样式方案**: Tailwind CSS
- **视频处理**: FFmpeg.wasm
- **AI 集成**: OpenAI API
- **开发语言**: TypeScript
- **包管理器**: pnpm

## 📦 安装部署

1. **克隆仓库**
   ```bash
   git clone https://github.com/woniu9524/ai-ffmpeg.git
   cd ai-ffmpeg
   ```

2. **安装依赖**
   ```bash
   pnpm install
   ```

3. **配置环境变量**
   ```bash
   cp .env.example .env.local
   ```
   编辑 `.env.local` 文件：
   ```
   OPENAI_API_KEY=LLM密匙
   OPENAI_BASE_URL=基础url
   AI_MODEL=模型名称 #我使用qwen2.5-coder-3b-instruct就足够完成任务
   ```

4. **启动开发服务器**
   ```bash
   pnpm dev
   ```

## 🎯 使用指南

1. 打开应用网页
2. 通过拖放或点击上传区域添加视频文件
3. 用自然语言描述你想要的视频处理效果
4. 查看并确认生成的 FFmpeg 命令
5. 开始处理视频并查看进度
6. 预览并下载处理完成的视频

## 💡 使用场景

- **视频压缩**：轻松压缩视频文件大小
- **格式转换**：在不同视频格式之间转换
- **视频裁剪**：截取视频片段
- **调整分辨率**：更改视频尺寸和质量

- **视频合并**：将多个视频片段组合
- **提取音频**：从视频中提取音频轨道



## 🙏 致谢

- 感谢 FFmpeg.wasm 团队的杰出���作
- 感谢 QWEN 提供强大的 API 支持
- 感谢 Cursor 提供强大的编辑器

---
