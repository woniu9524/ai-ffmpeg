'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Loader2, Upload } from 'lucide-react';
import { VideoProcessor } from '@/components/video/VideoProcessor';
import { VideoUploader } from '@/components/video/VideoUploader';

export default function HomePage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm'>
        <h1 className='text-4xl font-bold mb-8 text-center'>
          AI-FFmpeg Video Processing
        </h1>

        {!videoFile ? (
          <VideoUploader onFileSelect={setVideoFile} />
        ) : (
          <VideoProcessor
            videoFile={videoFile}
            onReset={() => setVideoFile(null)}
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
          />
        )}
      </div>
    </main>
  );
}
