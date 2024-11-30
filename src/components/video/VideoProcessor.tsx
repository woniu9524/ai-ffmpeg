import { useState } from 'react';
import { Loader2, X } from 'lucide-react';
import { processVideo } from '@/lib/ffmpeg';

interface VideoProcessorProps {
  videoFile: File;
  onReset: () => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
}

export function VideoProcessor({
  videoFile,
  onReset,
  isProcessing,
  setIsProcessing,
}: VideoProcessorProps) {
  const [prompt, setPrompt] = useState('');
  const [command, setCommand] = useState('');
  const [description, setDescription] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [outputUrl, setOutputUrl] = useState<string | null>(null);

  const handleGenerateCommand = async () => {
    try {
      setIsProcessing(true);
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
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate command');
      }

      const data = await response.json();
      setCommand(data.command);
      setDescription(data.description);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleProcessVideo = async () => {
    try {
      setIsProcessing(true);
      setError('');
      setProgress(0);

      const processedVideo = await processVideo(
        videoFile,
        command,
        setProgress
      );
      const url = URL.createObjectURL(processedVideo);
      setOutputUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process video');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className='w-full space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-xl font-semibold'>Selected Video</h2>
          <p className='text-gray-600'>{videoFile.name}</p>
        </div>
        <button
          onClick={onReset}
          className='p-2 text-gray-500 hover:text-gray-700'
        >
          <X className='h-6 w-6' />
        </button>
      </div>

      <div className='space-y-4'>
        <div>
          <label
            htmlFor='prompt'
            className='block text-sm font-medium text-gray-700'
          >
            Describe what you want to do with the video
          </label>
          <textarea
            id='prompt'
            rows={3}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
            placeholder='E.g., Trim the first 10 seconds and add a watermark'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        <button
          onClick={handleGenerateCommand}
          disabled={isProcessing || !prompt}
          className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400'
        >
          {isProcessing ? (
            <>
              <Loader2 className='animate-spin -ml-1 mr-2 h-4 w-4' />
              Generating...
            </>
          ) : (
            'Generate Command'
          )}
        </button>

        {error && <div className='text-red-600 text-sm'>{error}</div>}

        {command && (
          <div className='space-y-4'>
            <div>
              <h3 className='text-sm font-medium text-gray-700'>
                Generated Command
              </h3>
              <pre className='mt-1 p-4 bg-gray-100 rounded-md overflow-x-auto'>
                {command}
              </pre>
            </div>

            <div>
              <h3 className='text-sm font-medium text-gray-700'>
                Command Description
              </h3>
              <p className='mt-1 text-gray-600'>{description}</p>
            </div>

            <button
              className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400'
              onClick={handleProcessVideo}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className='animate-spin -ml-1 mr-2 h-4 w-4' />
                  Processing...
                </>
              ) : (
                'Process Video'
              )}
            </button>
          </div>
        )}

        {progress > 0 && (
          <div className='space-y-2'>
            <div className='flex justify-between text-sm text-gray-600'>
              <span>Processing...</span>
              <span>{progress}%</span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2'>
              <div
                className='bg-blue-600 h-2 rounded-full'
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {outputUrl && (
          <div className='space-y-4'>
            <h3 className='text-sm font-medium text-gray-700'>
              Processed Video
            </h3>
            <video
              controls
              className='w-full rounded-lg shadow-lg'
              src={outputUrl}
            />
            <a
              href={outputUrl}
              download={`processed_${videoFile.name}`}
              className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              Download Processed Video
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
