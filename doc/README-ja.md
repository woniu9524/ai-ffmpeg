# AI-FFmpeg: 無料オンラインビデオ処理プラットフォーム | ビデオ圧縮・変換ツール

> 🎥 ビデオ圧縮、再生速度調整、フォーマット変換などをサポートする無料オンラインビデオ処理ツール。プライバシー保護のため、サーバーにアップロードせずにローカルで処理。AIとの自然な対話で、複雑なコマンドを学ぶ必要なく簡単にビデオを処理できます。

<div align="center">

[![GitHub license](https://img.shields.io/github/license/your-username/ai-ffmpeg)](https://github.com/your-username/ai-ffmpeg/blob/main/LICENSE)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org)

[English](../README.md) | [中文文档](README-zh.md) | [日本語](README-ja.md)

</div>

<p align="center">
  <img src="../public/logo.png" alt="AI-FFmpeg Logo" width="200"/>
</p>

## 🚀 プロジェクト紹介

AI-FFmpegは、FFmpeg.wasmをベースにしたWebアプリケーションで、自然言語処理を使用してビデオ処理用のFFmpegコマンドを生成します。複雑なFFmpegコマンドを知らなくても、簡単にビデオ処理を行うことができます。

## 🚀 オンラインデモ

オンラインで試す: [https://ffmpeg-online.top/](https://ffmpeg-online.top/)

## ✨ 主な機能

- 🎥 **ブラウザベースの処理**: FFmpeg.wasmを使用してブラウザで直接ビデオを処理
- 🤖 **AIコマンド生成**: 自然言語を専門的なFFmpegコマンドに変換
- 📁 **マルチフォーマット対応**: 主要なビデオフォーマット（MP4、AVI、MOV、MKV、WebM）をサポート
- 🔄 **リアルタイム進捗**: ビデオ処理の進捗を視覚的に表示
- 👀 **プレビュー機能**: 処理後の即時プレビュー
- 🌐 **クロスプラットフォーム**: すべての最新ブラウザに対応

## 🎯 一般的な使用例

- 大容量ビデオファイルの圧縮
- ビデオ再生速度の調整
- ビデオフォーマットの変換
- ビデオの切り取りと結合
- ビデオからの音声抽出
- 解像度と品質の調整

## 🛠️ 技術スタック

- **フロントエンド**: Next.js 14, React 18
- **スタイリング**: Tailwind CSS
- **ビデオ処理**: FFmpeg.wasm
- **AI統合**: OpenAI API
- **言語**: TypeScript
- **パッケージマネージャー**: pnpm

## 📦 インストール＆デプロイメント

1. **リポジトリのクローン**
   ```bash
   git clone https://github.com/woniu9524/ai-ffmpeg.git
   cd ai-ffmpeg
   ```

2. **依存関係のインストール**
   ```bash
   pnpm install
   ```

3. **環境設定**
   ```bash
   cp .env.example .env.local
   ```
   `.env.local`の編集：
   ```
   OPENAI_API_KEY=your_llm_key
   OPENAI_BASE_URL=base_url
   AI_MODEL=model_name #qwen2.5-coder-3b-instructで十分です
   ```

4. **開発サーバーの起動**
   ```bash
   pnpm dev
   ```

## 🎯 使用ガイド

1. Webアプリケーションを開く
2. ドラッグ＆ドロップまたはクリックでビデオをアップロード
3. 自然言語で希望するビデオ処理を説明
4. 生成されたFFmpegコマンドを確認
5. 処理を開始し、進捗を監視
6. 処理済みビデオをプレビューしてダウンロード

## 💡 使用シーン

- **ビデオ圧縮**: 簡単にファイルサイズを削減
- **フォーマット変換**: 異なるビデオフォーマット間の変換
- **ビデオトリミング**: ビデオセグメントの切り取り
- **解像度調整**: ビデオサイズと品質の変更
- **ビデオ結合**: 複数のビデオクリップの結合
- **音声抽出**: ビデオから音声トラックを抽出

## 🙏 謝辞

- FFmpeg.wasmチームの素晴らしい仕事に感謝
- QWENの強力なAPIサポートに感謝
- Cursorの強力なエディタに感謝

--- 