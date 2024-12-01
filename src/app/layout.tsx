import '@/styles/globals.css';
import { Metadata } from 'next';
import { Toaster } from 'sonner';
import '@/i18n';  // 导入 i18n 配置
import { GoogleAnalytics } from '@next/third-parties/google'
import JsonLd from './components/JsonLd'

export const metadata: Metadata = {
  title: 'AI-FFmpeg | 免费在线视频处理工具 - 视频压缩、转换、倍速',
  description: '免费在线视频处理工具，支持视频压缩、倍速播放、格式转换等功能。无需上传到服务器，完全本地处理保护隐私。通过AI自然语言对话，轻松处理视频，无需学习复杂命令。Free online video processing tool with compression, speed adjustment, and format conversion. Process locally for privacy.',
  keywords: [
    // 中文关键词
    '在线视频处理',
    '免费视频压缩',
    '视频倍速转换',
    '视频格式转换',
    '视频剪辑',
    '视频合并',
    '提取视频音频',
    '本地视频处理',
    'AI视频处理',
    '视频压缩工具',
    // 英文关键词
    'online video processing',
    'free video compression',
    'video speed converter',
    'video format converter',
    'video editor',
    'merge videos',
    'extract audio',
    'local video processing',
    'AI video processing',
    'video compression tool'
  ],
  authors: [{ name: 'woniu9524' }],
  openGraph: {
    title: 'AI-FFmpeg | Free Online Video Processing Tool',
    description: 'Free online video processing tool with compression, speed adjustment, and format conversion. Process locally for privacy.',
    url: 'https://ffmpeg-online.top',
    siteName: 'AI-FFmpeg',
    images: [
      {
        url: '/logo.png',
        width: 200,
        height: 200,
      }
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification', // 需要替换为实际的Google验证码
  },
  alternates: {
    canonical: 'https://ffmpeg-online.top',
    languages: {
      'en-US': 'https://ffmpeg-online.top/en',
      'zh-CN': 'https://ffmpeg-online.top',
    },
  },
  other: {
    'theme-color': '#ffffff',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'msapplication-tap-highlight': 'no',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no,email=no,address=no" />
      </head>
      <body>
        <Toaster richColors />
        <JsonLd />
        {children}
        <GoogleAnalytics gaId="G-YYZZQP968S" />
      </body>
    </html>
  );
}
