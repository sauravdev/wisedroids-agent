import React, { useState } from 'react';
import { Wand2, RefreshCw, Image as ImageIcon, Calendar, Send } from 'lucide-react';
import { generateSocialContent, generateImagePrompt, generateImage, refineContent } from '@/lib/openai/social';
import type { Platform } from '@/lib/openai/constants';

interface ContentGeneratorProps {
  onGenerate: (content: any) => void;
}

export function ContentGenerator({ onGenerate }: ContentGeneratorProps) {
  const [keyword, setKeyword] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [tone, setTone] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any[]>([]);
  const [showImageGen, setShowImageGen] = useState(false);

  const handleGenerate = async () => {
    if (!keyword || selectedPlatforms.length === 0) return;
    
    setLoading(true);
    try {
      const content = await generateSocialContent(keyword, selectedPlatforms, tone);
      setGeneratedContent(content);
      onGenerate(content);
    } catch (error) {
      console.error('Failed to generate content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateImage = async (content: string) => {
    setLoading(true);
    try {
      const prompt = await generateImagePrompt(content);
      const imageUrl = await generateImage(prompt);
      const updatedContent = generatedContent.map(item => 
        item.content === content ? { ...item, image: imageUrl } : item
      );
      setGeneratedContent(updatedContent);
      onGenerate(updatedContent);
    } catch (error) {
      console.error('Failed to generate image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefine = async (content: string, instruction: string) => {
    setLoading(true);
    try {
      const refinedContent = await refineContent(content, instruction);
      const updatedContent = generatedContent.map(item =>
        item.content === content ? { ...item, content: refinedContent } : item
      );
      setGeneratedContent(updatedContent);
      onGenerate(updatedContent);
    } catch (error) {
      console.error('Failed to refine content:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter keyword or topic..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />

        <div className="flex flex-wrap gap-2">
          {(['twitter', 'linkedin', 'instagram', 'tiktok'] as Platform[]).map((platform) => (
            <button
              key={platform}
              onClick={() => setSelectedPlatforms(prev => 
                prev.includes(platform) 
                  ? prev.filter(p => p !== platform)
                  : [...prev, platform]
              )}
              className={`px-4 py-2 rounded-lg ${
                selectedPlatforms.includes(platform)
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </button>
          ))}
        </div>

        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300"
        >
          <option value="">Select Tone (Optional)</option>
          <option value="professional">Professional</option>
          <option value="casual">Casual</option>
          <option value="humorous">Humorous</option>
          <option value="formal">Formal</option>
        </select>

        <button
          onClick={handleGenerate}
          disabled={loading || !keyword || selectedPlatforms.length === 0}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              Generate Content
            </>
          )}
        </button>
      </div>

      {generatedContent.length > 0 && (
        <div className="space-y-6">
          {generatedContent.map((item, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold capitalize">{item.platform}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleGenerateImage(item.content)}
                    className="p-2 text-gray-600 hover:text-indigo-600"
                  >
                    <ImageIcon className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-indigo-600">
                    <Calendar className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-indigo-600">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="prose prose-sm max-w-none">
                <p>{item.content}</p>
              </div>

              {item.image && (
                <div className="mt-4">
                  <img src={item.image} alt="Generated content" className="rounded-lg" />
                </div>
              )}

              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Enter refinement instructions..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleRefine(item.content, e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                  className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}