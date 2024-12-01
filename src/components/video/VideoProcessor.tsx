'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2, X, Play, Download, RefreshCw, Wand2, AlertCircle } from 'lucide-react';
import { processVideo } from '@/lib/ffmpeg';

interface VideoProcessorProps {
  videoFile: File;
  onReset: () => void;
  isProcessing: boolean;
  isGenerating: boolean;
  setIsProcessing: (value: boolean) => void;
  setIsGenerating: (value: boolean) => void;
}

export function VideoProcessor({
  videoFile,
  onReset,
  isProcessing,
  isGenerating,
  setIsProcessing,
  setIsGenerating,
}: VideoProcessorProps) {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState('');
  const [command, setCommand] = useState('');
  const [description, setDescription] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputFileName, setOutputFileName] = useState<string>('');

  const handleGenerateCommand = async () => {
    setIsGenerating(true);
    try {
      setError('');
      setOutputUrl(null);

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          filename: videoFile.name,
          fileInfo: {
            name: videoFile.name,
            size: videoFile.size,
            type: videoFile.type
          }
        }),
      });

      if (!response.ok) {
        throw new Error(t('processor.errors.generateFailed'));
      }

      const data = await response.json();
      setCommand(data.command);
      setDescription(data.description);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('processor.errors.error'));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleProcessVideo = async () => {
    setIsProcessing(true);
    try {
      setError('');
      setProgress(0);

      const { blob: processedVideo, outputFileName } = await processVideo(
        videoFile,
        command,
        (progress) => {
          setProgress(progress);
        }
      );

      const url = URL.createObjectURL(processedVideo);
      setOutputUrl(url);
      setOutputFileName(outputFileName);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('processor.errors.processingFailed'));
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  // 在组件卸载时清理 URL
  useEffect(() => {
    return () => {
      if (outputUrl) {
        URL.revokeObjectURL(outputUrl);
      }
    };
  }, [outputUrl]);

  return (
    <div className='w-full space-y-6'>
      <div className='flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-lg'>
        <div className='flex items-center space-x-4'>
          <div className='p-2 bg-blue-100 dark:bg-blue-900 rounded-lg'>
            <Play className='h-6 w-6 text-blue-600 dark:text-blue-400' />
          </div>
          <div>
            <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>{t('processor.currentVideo')}</h2>
            <p className='text-sm text-gray-600 dark:text-gray-300'>{videoFile.name}</p>
            <p className='text-xs text-gray-500 dark:text-gray-400'>
              {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
        </div>
        <button
          onClick={onReset}
          className='p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors'
          title={t('processor.reset')}
        >
          <X className='h-5 w-5' />
        </button>
      </div>

      <div className='space-y-4'>
        <div className='space-y-2'>
          <label
            htmlFor='prompt'
            className='block text-sm font-medium text-gray-700 dark:text-gray-300'
          >
            {t('processor.promptLabel')}
          </label>
          <textarea
            id='prompt'
            rows={3}
            className='mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
            placeholder={t('processor.promptPlaceholder')}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <p className='text-xs text-gray-500 dark:text-gray-400'>
            {t('processor.promptTip')}
          </p>
        </div>

        <button
          onClick={handleGenerateCommand}
          disabled={isGenerating}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 dark:disabled:bg-gray-600 transition-colors ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isGenerating ? (
            <>
              <Loader2 className='animate-spin -ml-1 mr-2 h-4 w-4' />
              {t('processor.generating')}
            </>
          ) : (
            <>
              <Wand2 className='h-4 w-4 mr-2' />
              {t('processor.generateCommand')}
            </>
          )}
        </button>

        {error && (
          <div className='flex items-center space-x-2 text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg'>
            <AlertCircle className='h-4 w-4 flex-shrink-0' />
            <span>{error}</span>
          </div>
        )}

        {command && (
          <div className='space-y-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg'>
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                  {t('processor.generatedCommand')}
                </h3>
                <button
                  onClick={() => setCommand('')}
                  className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {t('processor.clear')}
                </button>
              </div>
              <div className="relative">
                <textarea
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  className='w-full p-4 bg-gray-900 dark:bg-black rounded-lg font-mono text-sm text-white dark:text-gray-100 resize-y min-h-[100px] focus:ring-1 focus:ring-blue-500 focus:border-transparent border border-gray-700 dark:border-gray-800'
                  spellCheck="false"
                />
              </div>
            </div>

            <div>
              <h3 className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                {t('processor.commandDescription')}
              </h3>
              <p className='text-gray-600 dark:text-gray-400 text-sm bg-gray-100 dark:bg-gray-900/50 p-4 rounded-lg'>
                {description}
              </p>
            </div>

            <button
              className={`w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 dark:disabled:bg-gray-600 transition-colors ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleProcessVideo}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className='animate-spin -ml-1 mr-2 h-4 w-4' />
                  {t('processor.processing')}
                </>
              ) : (
                <>
                  <RefreshCw className='h-4 w-4 mr-2' />
                  {t('processor.startProcessing')}
                </>
              )}
            </button>
          </div>
        )}

        {progress > 0 && (
          <div className='space-y-2 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg'>
            <div className='flex justify-between text-sm text-blue-600 dark:text-blue-400'>
              <span>{t('processor.progress')}</span>
              <span>{progress}%</span>
            </div>
            <div className='w-full bg-blue-100 dark:bg-blue-900 rounded-full h-2'>
              <div
                className='bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-300 ease-in-out'
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {outputUrl && (
          <div className='space-y-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg'>
            <h3 className='text-lg font-medium text-gray-900 dark:text-white'>
              {t('processor.completed')}
            </h3>
            <a
              href={outputUrl}
              download={outputFileName || videoFile.name}
              className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors'
            >
              <Download className='h-4 w-4 mr-2' />
              {t('processor.downloadProcessed')}
            </a>
            <video
              controls
              className='w-full rounded-lg shadow-lg'
              src={outputUrl}
            />
          </div>
        )}
      </div>
    </div>
  );
}
