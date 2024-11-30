'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { VideoProcessor } from '@/components/video/VideoProcessor';
import { VideoUploader } from '@/components/video/VideoUploader';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import {
  Video,
  Image,
  Volume2,
  Crop,
  RotateCw,
  Palette,
  MonitorPlay,
  Quote
} from 'lucide-react';

const GitHubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="currentColor"
    className="text-gray-600 dark:text-gray-400"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export default function HomePage() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number>(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 在客户端渲染之前返回加载状态或空白内容
  if (!mounted) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />;
  }

  const handleFileSelect = (file: File) => {
    setVideoFiles(prev => {
      const newFiles = [...prev, file];
      if (prev.length === 0) {
        setSelectedVideoIndex(0);
      }
      return newFiles;
    });
  };

  const handleRemoveVideo = (index: number) => {
    setVideoFiles(prev => {
      const newFiles = prev.filter((_, i) => i !== index);
      if (selectedVideoIndex === index) {
        if (newFiles.length > 0) {
          setSelectedVideoIndex(0);
        } else {
          setSelectedVideoIndex(-1);
        }
      } else if (selectedVideoIndex > index) {
        setSelectedVideoIndex(selectedVideoIndex - 1);
      }
      return newFiles;
    });
  };

  const features = [
    {
      icon: <MonitorPlay className="w-5 h-5" />,
      title: t('features.videoTranscode.title'),
      description: t('features.videoTranscode.description')
    },
    {
      icon: <Image className="w-5 h-5" />,
      title: t('features.videoCompression.title'),
      description: t('features.videoCompression.description')
    },
    {
      icon: <Volume2 className="w-5 h-5" />,
      title: t('features.audioExtraction.title'),
      description: t('features.audioExtraction.description')
    },
    {
      icon: <Crop className="w-5 h-5" />,
      title: t('features.videoCrop.title'),
      description: t('features.videoCrop.description')
    },
    {
      icon: <RotateCw className="w-5 h-5" />,
      title: t('features.videoRotation.title'),
      description: t('features.videoRotation.description')
    },
    {
      icon: <Palette className="w-5 h-5" />,
      title: t('features.basicEffects.title'),
      description: t('features.basicEffects.description')
    }
  ];

  return (
    <main className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      <div className="relative w-full px-4 sm:px-6 lg:px-8 py-4 flex justify-end items-center gap-4">
        <LanguageSwitcher />
        <a
          href="https://github.com/woniu9524/ai-ffmpeg/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 shadow-sm"
          aria-label="GitHub Repository"
        >
          <GitHubIcon />
        </a>
      </div>

      <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-8'>
        <div className='text-center space-y-4 mb-8 sm:mb-12'>
          <div className='inline-flex items-center justify-center space-x-2 bg-blue-100 dark:bg-blue-900/30 rounded-full px-3 sm:px-4 py-1'>
            <MonitorPlay className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
            <span className='text-xs sm:text-sm text-blue-700 dark:text-blue-300'>{t('title')}</span>
          </div>
          <div className='max-w-2xl mx-auto px-2 sm:px-0'>
            <div className='flex items-start space-x-2 text-gray-600 dark:text-gray-400 text-xs sm:text-sm italic bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 sm:p-3'>
              <Quote className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
              <p>{t('quote')}
                <span className='text-gray-500 dark:text-gray-500 ml-2'>{t('quoteAuthor')}</span>
              </p>
            </div>
          </div>
        </div>

        <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-8 mb-8 sm:mb-12'>
          <div className='space-y-4'>
            {videoFiles.length > 0 && (
              <div className='flex flex-wrap gap-2 mb-4'>
                {videoFiles.map((file, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm ${selectedVideoIndex === index
                      ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      } cursor-pointer transition-colors duration-200`}
                    onClick={() => setSelectedVideoIndex(index)}
                  >
                    <Video className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className='max-w-[100px] sm:max-w-[150px] truncate'>{file.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveVideo(index);
                      }}
                      className='hover:text-red-500 transition-colors duration-200'
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {selectedVideoIndex === -1 ? (
              <VideoUploader onFileSelect={handleFileSelect} />
            ) : (
              <VideoProcessor
                videoFile={videoFiles[selectedVideoIndex]}
                onReset={() => setSelectedVideoIndex(-1)}
                isProcessing={isProcessing}
                isGenerating={isGenerating}
                setIsProcessing={setIsProcessing}
                setIsGenerating={setIsGenerating}
              />
            )}
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='group bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-4 sm:p-6 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300'
            >
              <div className='flex items-start space-x-3 sm:space-x-4'>
                <div className='flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300'>
                  {feature.icon}
                </div>
                <div>
                  <h3 className='font-medium text-sm sm:text-base text-gray-900 dark:text-white mb-1 sm:mb-2'>
                    {feature.title}
                  </h3>
                  <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
