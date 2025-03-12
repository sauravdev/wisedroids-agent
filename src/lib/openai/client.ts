import axios from 'axios';
const url = import.meta.env.VITE_OPENAI_URL

export async function generateAgentCode(description: string) {
  try {
    const payload = {
      "type" : "generateAgentCode",
      description : description
    }
    const response = await axios.post(url,payload);
    return response.data.data
  } catch (error) {
    console.error('Error generating code:', error);
    if (error instanceof Error) {
      if (error.message.includes('API key is missing')) {
        throw new Error('OpenAI API key is missing. Please check your configuration.');
      }
      throw new Error(`Failed to generate code: ${error.message}`);
    }
    throw new Error('Failed to generate code. Please try again.');
  }
}

export async function enhanceCode(code: string, error: string): Promise<string> {
  try {
    const payload = {
      "type" : "enhanceCode",
      code : code,
      error : error
    }
    const response = await axios.post(url,payload);
    return response.data.data
  } catch (error) {
    console.error('Error enhancing code:', error);
    throw new Error('Failed to enhance code. Please try again.');
  }
}