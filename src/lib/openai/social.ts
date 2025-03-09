import OpenAI from 'openai';
import { PLATFORM_PROMPTS, type Platform } from './constants';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateSocialContent(
  keyword: string,
  platforms: Platform[],
  tone?: string
) {
  try {
    const results = await Promise.all(
      platforms.map(async (platform) => {
        const response = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `You are a professional social media content creator. ${PLATFORM_PROMPTS[platform]} ${
                tone ? `Use a ${tone} tone.` : ''
              }`
            },
            {
              role: "user",
              content: `Create engaging social media content about: ${keyword}`
            }
          ],
          temperature: 0.7,
          max_tokens: 300
        });

        return {
          platform,
          content: response.choices[0].message.content || '',
        };
      })
    );

    return results;
  } catch (error) {
    console.error('Error generating social content:', error);
    throw new Error('Failed to generate social media content');
  }
}

export async function generateImagePrompt(content: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Generate a detailed DALL-E prompt that would create an engaging image to accompany this social media post."
        },
        {
          role: "user",
          content: `Create an image prompt for this social media content: ${content}`
        }
      ],
      temperature: 0.7,
      max_tokens: 100
    });

    return response.choices[0].message.content || '';
  } catch (error) {
    console.error('Error generating image prompt:', error);
    throw new Error('Failed to generate image prompt');
  }
}

export async function generateImage(prompt: string) {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    return response.data[0].url;
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error('Failed to generate image');
  }
}

export async function refineContent(content: string, instruction: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a social media content editor. Refine the provided content according to the user's instructions."
        },
        {
          role: "user",
          content: `Original content: ${content}\n\nInstruction: ${instruction}`
        }
      ],
      temperature: 0.7,
      max_tokens: 300
    });

    return response.choices[0].message.content || '';
  } catch (error) {
    console.error('Error refining content:', error);
    throw new Error('Failed to refine content');
  }
}