'use client';

import { useState } from 'react';
import { VideoProcessor } from '@/components/video/VideoProcessor';
import { VideoUploader } from '@/components/video/VideoUploader';
import {
  Video,
  Scissors,
  Image,
  Volume2,
  Crop,
  RotateCw,
  Palette,
  MonitorPlay,
  Quote
} from 'lucide-react';

export default function HomePage() {
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number>(-1);
  const [isProcessing, setIsProcessing] = useState(false);

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
      title: "视频转码",
      description: "支持多种格式转换，如MP4、WebM等"
    },
    {
      icon: <Image className="w-5 h-5" />,
      title: "视频压缩",
      description: "调整码率和分辨率以减小文件体积"
    },
    {
      icon: <Volume2 className="w-5 h-5" />,
      title: "音频提取",
      description: "从视频中提取音频文件"
    },
    {
      icon: <Crop className="w-5 h-5" />,
      title: "视频裁剪",
      description: "裁剪视频时长和画面大小"
    },
    {
      icon: <RotateCw className="w-5 h-5" />,
      title: "画面旋转",
      description: "旋转视频方向（90°/180°/270°）"
    },
    {
      icon: <Palette className="w-5 h-5" />,
      title: "基础特效",
      description: "调整亮度、对比度等基础参数"
    }
  ];

  return (
    <main className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='text-center space-y-4 mb-12'>
          <div className='inline-flex items-center justify-center space-x-2 bg-blue-100 dark:bg-blue-900/30 rounded-full px-4 py-1'>
            <MonitorPlay className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className='text-sm text-blue-700 dark:text-blue-300'>AI FFmpeg Online · 简单的在线音视频处理工具</span>
          </div>
          <div className='max-w-2xl mx-auto'>
            <div className='flex items-start space-x-2 text-gray-600 dark:text-gray-400 text-sm italic bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3'>
              <Quote className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>没有FFmpeg解决不了的音视频问题，如果有，说明你的命令还不够长。
                <span className='text-gray-500 dark:text-gray-500 ml-2'>——鲁迅</span>
              </p>
            </div>
          </div>
        </div>

        <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-8 mb-12'>
          <div className='space-y-4'>
            {videoFiles.length > 0 && (
              <div className='flex flex-wrap gap-2 mb-4'>
                {videoFiles.map((file, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm ${selectedVideoIndex === index
                      ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      } cursor-pointer transition-colors duration-200`}
                    onClick={() => setSelectedVideoIndex(index)}
                  >
                    <Video className="w-4 h-4" />
                    <span className='max-w-[150px] truncate'>{file.name}</span>
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
                setIsProcessing={setIsProcessing}
              />
            )}
          </div>
        </div>

        <div className='grid grid-cols-2 lg:grid-cols-3 gap-6'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='group bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-6 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300'
            >
              <div className='flex items-start space-x-4'>
                <div className='flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300'>
                  {feature.icon}
                </div>
                <div>
                  <h3 className='font-medium text-gray-900 dark:text-white mb-2'>
                    {feature.title}
                  </h3>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
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
