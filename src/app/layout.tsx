import '@/styles/globals.css';
import { Metadata } from 'next';
import { Toaster } from 'sonner';
import '@/i18n';  // 导入 i18n 配置
import { GoogleAnalytics } from '@next/third-parties/google'
import JsonLd from './components/JsonLd'
import dynamic from 'next/dynamic'

const InstallPWA = dynamic(() => import('./components/InstallPWA'), {
  ssr: false
});

export const metadata: Metadata = {
  title: 'AI FFmpeg Online · Simple Online Audio/Video Processing Tool',
  description: '免费在线视频处理工具，支持视频压缩、倍速播放、格式转换等功能。无需上传到服务器，完全本地处理保护隐私。通过AI自然语言对话，轻松处理视频，无需学习复杂命令。Free online video processing tool with compression, speed adjustment, and format conversion. Process locally for privacy.',
  manifest: '/manifest.json',
  themeColor: '#000000',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'AI-FFmpeg',
  },
  keywords: [
    // English keywords
    'online video processing',
    'free video compression',
    'video speed converter',
    'video format converter',
    'video editor',
    'merge videos',
    'extract audio',
    'local video processing',
    'AI video processing',
    'video compression tool',
    // Japanese keywords
    'オンライン動画処理',
    '無料動画圧縮',
    '動画速度変換',
    '動画フォーマット変換',
    '動画編集',
    '動画結合',
    '音声抽出',
    'ローカル処理',
    'AI動画処理',
    '動画圧縮ツール',
    // French keywords
    'traitement vidéo en ligne',
    'compression vidéo gratuite',
    'convertisseur de vitesse vidéo',
    'convertisseur de format vidéo',
    'éditeur vidéo',
    'fusionner des vidéos',
    'extraction audio',
    'traitement vidéo local',
    'traitement vidéo IA',
    'outil de compression vidéo'
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
    google: 'your-google-site-verification', // 需要替换为实际Google验证码
  },
  alternates: {
    canonical: 'https://ffmpeg-online.top',
    languages: {
      'en-US': 'https://ffmpeg-online.top/en',
      'zh-CN': 'https://ffmpeg-online.top',
      'ja-JP': 'https://ffmpeg-online.top/ja',
      'fr-FR': 'https://ffmpeg-online.top/fr',
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

// 注册Service Worker的函数
const registerServiceWorker = () => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('ServiceWorker registration successful');
        })
        .catch((err) => {
          console.log('ServiceWorker registration failed: ', err);
        });
    });
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 在客户端注册Service Worker
  if (typeof window !== 'undefined') {
    registerServiceWorker();
  }

  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
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
        <InstallPWA />
        {children}
        <GoogleAnalytics gaId="G-YYZZQP968S" />
      </body>
    </html>
  );
}
