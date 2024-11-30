'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface VideoUploaderProps {
  onFileSelect: (file: File) => void;
}

export function VideoUploader({ onFileSelect }: VideoUploaderProps) {
  const { t } = useTranslation();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.avi', '.mov', '.mkv', '.webm']
    },
    maxSize: 500 * 1024 * 1024, // 500MB
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${isDragActive
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
          : 'border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500'
        }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        <Upload className="w-12 h-12 text-gray-400 dark:text-gray-600" />
        <div className="space-y-1">
          <p className="text-gray-600 dark:text-gray-400">
            {isDragActive ? t('uploader.dragText') : t('uploader.dragText')}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            {t('uploader.orText')} <span className="text-blue-500 hover:text-blue-600">{t('uploader.browseText')}</span>
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-600">
            {t('uploader.acceptedFiles')}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-600">
            {t('uploader.maxSize')}
          </p>
        </div>
      </div>
    </div>
  );
}
