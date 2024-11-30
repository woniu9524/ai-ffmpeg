import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileVideo, AlertCircle } from 'lucide-react';

interface VideoUploaderProps {
  onFileSelect: (file: File) => void;
}

export function VideoUploader({ onFileSelect }: VideoUploaderProps) {
  const [dragError, setDragError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
        setDragError('请上传支持的视频格式文件');
        return;
      }
      if (acceptedFiles.length > 0) {
        setDragError(null);
        acceptedFiles.forEach(file => {
          if (file.size <= 2 * 1024 * 1024 * 1024) { // 2GB limit
            onFileSelect(file);
          }
        });
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.avi', '.mov', '.mkv', '.webm', '.flv', '.wmv', '.m4v'],
    },
    multiple: true,
  });

  return (
    <div className='space-y-4'>
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 ease-in-out ${isDragActive
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : isDragReject
              ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
              : dragError
                ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }`}
      >
        <input {...getInputProps()} />
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className={`p-4 rounded-full transition-colors duration-200 ${isDragActive
              ? 'bg-blue-100 dark:bg-blue-900/40'
              : isDragReject || dragError
                ? 'bg-red-100 dark:bg-red-900/40'
                : 'bg-gray-100 dark:bg-gray-800'
            }`}>
            {isDragReject || dragError ? (
              <AlertCircle className='h-10 w-10 text-red-500' />
            ) : isDragActive ? (
              <FileVideo className='h-10 w-10 text-blue-500 animate-pulse' />
            ) : (
              <Upload className='h-10 w-10 text-gray-400 dark:text-gray-300' />
            )}
          </div>

          <div className='space-y-2'>
            <p className={`text-lg ${isDragActive
                ? 'text-blue-500'
                : isDragReject || dragError
                  ? 'text-red-500'
                  : 'text-gray-600 dark:text-gray-300'
              }`}>
              {isDragActive
                ? '松开鼠标上传视频'
                : isDragReject || dragError
                  ? dragError || '不支持的文件格式'
                  : '拖放一个或多个视频文件到这里，或点击选择'}
            </p>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              支持 MP4、AVI、MOV、MKV、WebM、FLV、WMV、M4V 等格式
            </p>
            <p className='text-xs text-gray-400 dark:text-gray-500'>
              单个文件大小不超过 2GB
            </p>
          </div>
        </div>
      </div>

      {dragError && (
        <div className='flex items-center space-x-2 text-red-500 text-sm'>
          <AlertCircle className='h-4 w-4' />
          <span>{dragError}</span>
        </div>
      )}
    </div>
  );
}
