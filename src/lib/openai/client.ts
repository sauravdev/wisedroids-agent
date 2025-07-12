import axios from 'axios';
const url = import.meta.env.VITE_API || `http://localhost:5002/api/v1`;

export async function generateAgentCode(description: string,capabilities: string[],integrations: string[],personality: Record<string, number>,name: string): Promise<string> {
  try {
    const payload = {
      "type" : "generateAgentCode",
      description : description,
      capabilities : capabilities,
      integrations : integrations,
      personality : personality,
      name : name
    }
    const response = await axios.post(`${url}/openai/wisedroid-agent`,payload);
    
    // Handle different response structures
    if (typeof response.data === 'string') {
      return response.data;
    } else if (response.data && typeof response.data === 'object') {
      // If response.data is an object, try to extract the code
      if (response.data.data && typeof response.data.data === 'string') {
        return response.data.data;
      } else if (response.data.code && typeof response.data.code === 'string') {
        return response.data.code;
      } else if (response.data.message && typeof response.data.message === 'string') {
        return response.data.message;
      } else {
        // If we can't find a string field, stringify the object for debugging
        console.warn('Unexpected response structure:', response.data);
        return JSON.stringify(response.data, null, 2);
      }
    } else {
      return String(response.data);
    }
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
    const response = await axios.post(`${url}/openai/wisedroid-agent`,payload);
    
    // Handle different response structures
    if (typeof response.data === 'string') {
      return response.data;
    } else if (response.data && typeof response.data === 'object') {
      // If response.data is an object, try to extract the code
      if (response.data.data && typeof response.data.data === 'string') {
        return response.data.data;
      } else if (response.data.code && typeof response.data.code === 'string') {
        return response.data.code;
      } else if (response.data.message && typeof response.data.message === 'string') {
        return response.data.message;
      } else {
        // If we can't find a string field, stringify the object for debugging
        console.warn('Unexpected response structure:', response.data);
        return JSON.stringify(response.data, null, 2);
      }
    } else {
      return String(response.data);
    }
  } catch (error) {
    console.error('Error enhancing code:', error);
    throw new Error('Failed to enhance code. Please try again.');
  }
}
export async function convertCodeToWebAPP(code: string): Promise<string> {
  try {
    const payload = {
      "type" : "convertToWebApp",
      code : code,
    }
    const response = await axios.post(`${url}/openai/wisedroid-agent`,payload);
    
    // Handle different response structures
    if (typeof response.data === 'string') {
      return response.data;
    } else if (response.data && typeof response.data === 'object') {
      // If response.data is an object, try to extract the code
      if (response.data.data && typeof response.data.data === 'string') {
        return response.data.data;
      } else if (response.data.code && typeof response.data.code === 'string') {
        return response.data.code;
      } else if (response.data.message && typeof response.data.message === 'string') {
        return response.data.message;
      } else {
        // If we can't find a string field, stringify the object for debugging
        console.warn('Unexpected response structure:', response.data);
        return JSON.stringify(response.data, null, 2);
      }
    } else {
      return String(response.data);
    }
  } catch (error) {
    console.error('Error converting code to web app:', error);
    throw new Error('Failed to convert code to web app. Please try again.');
  }
}