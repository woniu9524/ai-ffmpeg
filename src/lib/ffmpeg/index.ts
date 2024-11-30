import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL, fetchFile } from '@ffmpeg/util';

let ffmpeg: FFmpeg | null = null;

export async function getFFmpeg() {
  if (ffmpeg) {
    return ffmpeg;
  }

  ffmpeg = new FFmpeg();

  if (!ffmpeg.loaded) {
    try {
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
      await ffmpeg.load({
        coreURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.js`,
          'text/javascript'
        ),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          'application/wasm'
        ),
      });
    } catch (error) {
      console.error('Error loading FFmpeg:', error);
      throw new Error('Failed to load FFmpeg');
    }
  }

  return ffmpeg;
}

export async function processVideo(
  videoFile: File,
  command: string,
  onProgress?: (progress: number) => void
): Promise<Blob> {
  const ffmpeg = await getFFmpeg();
  const inputFileName = 'input' + getFileExtension(videoFile.name);
  const outputFileName = 'output' + getFileExtension(videoFile.name);

  try {
    // Write the input file to FFmpeg's virtual file system
    await ffmpeg.writeFile(inputFileName, await fetchFile(videoFile));

    // Set up progress handler
    if (onProgress) {
      ffmpeg.on('progress', ({ progress }) => {
        onProgress(Math.round(progress * 100));
      });
    }

    // Parse and execute the command
    const commandParts = parseFFmpegCommand(
      command,
      inputFileName,
      outputFileName
    );
    await ffmpeg.exec(commandParts);

    // Read the output file
    const data = await ffmpeg.readFile(outputFileName);
    const blob = new Blob([data], { type: videoFile.type });

    // Clean up
    await ffmpeg.deleteFile(inputFileName);
    await ffmpeg.deleteFile(outputFileName);

    return blob;
  } catch (error) {
    console.error('Error processing video:', error);
    throw new Error('Failed to process video');
  }
}

function getFileExtension(filename: string): string {
  const match = filename.match(/\.[^.]*$/);
  return match ? match[0] : '';
}

function parseFFmpegCommand(
  command: string,
  inputFileName: string,
  outputFileName: string
): string[] {
  // Replace input and output file names in the command
  const normalizedCommand = command
    .replace(/^ffmpeg\s+/, '') // Remove 'ffmpeg' from the start
    .replace(/\s*-i\s+["']?[^"'\s]+["']?/, ` -i ${inputFileName}`) // Replace input file
    .replace(/\s+["']?[^"'\s]+["']?\s*$/, ` ${outputFileName}`); // Replace output file

  // Split the command into parts, preserving quoted strings
  return (
    normalizedCommand
      .match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g)
      ?.map((part) => part.replace(/^["']|["']$/g, '')) || []
  );
}