'use client';

import React from 'react';

export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI-FFmpeg",
    "url": "https://ffmpeg-online.top",
    "description": "免费在线视频处理工具，支持视频压缩、倍速播放、格式转换等功能。无需上传到服务器，完全本地处理保护隐私。",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "视频压缩",
      "倍速播放",
      "格式转换",
      "本地处理",
      "AI智能处理"
    ],
    "screenshot": "https://ffmpeg-online.top/screenshot.png",
    "softwareVersion": "1.0",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "100"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
} 