import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

// Validate and construct OpenAI configuration
const openaiConfig: any = {
  apiKey: process.env.OPENAI_API_KEY,
};

if (process.env.OPENAI_BASE_URL) {
  try {
    // Validate the URL
    new URL(process.env.OPENAI_BASE_URL);
    openaiConfig.baseURL = process.env.OPENAI_BASE_URL;
  } catch (error) {
    console.error('Invalid OPENAI_BASE_URL:', error);
  }
}

const openai = new OpenAI(openaiConfig);

export async function POST(req: Request) {
  try {
    const { prompt, filename } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    console.log('Using OpenAI config:', {
      baseURL: openaiConfig.baseURL,
      model: process.env.AI_MODEL || 'gpt-3.5-turbo',
    });

    const completion = await openai.chat.completions.create({
      model: process.env.AI_MODEL || 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an expert in FFmpeg video processing. Generate FFmpeg commands based on natural language descriptions. 
          Return ONLY a valid JSON object with two properties:
          1. command: The FFmpeg command to execute
          2. description: A brief description of what the command will do
          
          The response must be a pure JSON object without any additional text or markdown formatting.
          Make sure the command is valid and safe to execute.`,
        },
        {
          role: 'user',
          content: `Generate an FFmpeg command for the following task: "${prompt}"
          The input filename is: "${filename}"`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    try {
      // 尝试提取 JSON 内容
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : response;

      const parsedResponse = JSON.parse(jsonStr);

      // 验证返回的对象具有必要的属性
      if (!parsedResponse.command || !parsedResponse.description) {
        throw new Error('Response missing required fields');
      }

      return NextResponse.json(parsedResponse);
    } catch (error) {
      console.error('Failed to parse OpenAI response:', response);
      throw new Error('Invalid response format from OpenAI');
    }
  } catch (error: any) {
    console.error('Error in generate route:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate command',
        details: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
