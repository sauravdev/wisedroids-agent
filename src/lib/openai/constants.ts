export type Platform = 'twitter' | 'linkedin' | 'instagram' | 'tiktok';

export const PLATFORM_PROMPTS: Record<Platform, string> = {
  twitter: "Create a concise, engaging tweet with relevant hashtags. Max 280 characters.",
  linkedin: "Write a professional, insightful post that demonstrates industry expertise. Include relevant hashtags.",
  instagram: "Create a visually descriptive post with engaging storytelling and relevant hashtags. Include emojis where appropriate.",
  tiktok: "Write a short, trendy script that's entertaining and engaging. Include relevant hashtags and trending audio suggestions."
};

export const CONTENT_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video'
} as const;

export const ENGAGEMENT_TYPES = {
  REPLY: 'reply',
  REPOST: 'repost',
  QUOTE: 'quote',
  LIKE: 'like'
} as const;