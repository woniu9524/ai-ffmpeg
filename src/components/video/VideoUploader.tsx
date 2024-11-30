import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface VideoUploaderProps {
  onFileSelect: (file: File) => void;
}

export function VideoUploader({ onFileSelect }: VideoUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.avi', '.mov', '.mkv', '.webm'],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className='border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-gray-400 transition-colors'
    >
      <input {...getInputProps()} />
      <Upload className='mx-auto h-12 w-12 text-gray-400' />
      <p className='mt-4 text-lg text-gray-600'>
        {isDragActive
          ? 'Drop the video here...'
          : 'Drag and drop a video file here, or click to select'}
      </p>
      <p className='mt-2 text-sm text-gray-500'>
        Supports MP4, AVI, MOV, MKV, and WebM formats
      </p>
    </div>
  );
}
