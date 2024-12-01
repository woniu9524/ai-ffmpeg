'use client';

import '@/styles/globals.css';
import { Metadata } from 'next';
import { Toaster } from 'sonner';
import '@/i18n';  // 导入 i18n 配置
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Toaster richColors />
        {children}
        <GoogleAnalytics gaId="G-YYZZQP968S" />
      </body>
    </html>
  );
}
