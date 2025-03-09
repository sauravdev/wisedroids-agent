import OpenAI from 'openai';

let openai: OpenAI | null = null;

function getOpenAIClient() {
  if (!openai) {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OpenAI API key is missing. Please add VITE_OPENAI_API_KEY to your .env file.');
    }
    openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });
  }
  return openai;
}

export async function generateAgentCode(description: string): Promise<string> {
  try {
    const client = getOpenAIClient();
    const response = await client.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert AI developer specializing in LangGraph and LangChain. Generate production-ready Python code for AI agents.

Instructions:
1. Create a complete, working agent implementation
2. Use LangChain for core functionality
3. Use LangGraph for agent orchestration
4. Include proper error handling and logging
5. Create a FastAPI endpoint for interaction
6. Follow production best practices
7. Include comprehensive documentation

The code must be complete and runnable.`
        },
        {
          role: "user",
          content: `Create a complete LangGraph agent with this description:\n\n${description}\n\nRequirements:
1. Complete agent implementation with LangChain and LangGraph
2. FastAPI endpoint for interaction
3. Proper error handling and logging
4. Environment variable configuration
5. Type hints and documentation
6. Example usage code
7. Unit tests

The code must be production-ready and fully functional.`
        }
      ],
      temperature: 0.2,
      max_tokens: 4000,
      presence_penalty: 0.3,
      frequency_penalty: 0.3
    });

    const code = response.choices[0].message.content;
    if (!code) {
      throw new Error('No code was generated');
    }

    const codeBlocks = code.match(/```python\n([\s\S]*?)```/g);
    if (!codeBlocks) {
      throw new Error('No valid Python code blocks found in the response');
    }

    const cleanCode = codeBlocks
      .map(block => block.replace(/```python\n|```/g, ''))
      .join('\n\n');

    return cleanCode;
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
    const client = getOpenAIClient();
    const response = await client.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert Python developer specializing in fixing and improving LangGraph and LangChain code. Analyze the code and error message, then provide a corrected version with explanations."
        },
        {
          role: "user",
          content: `Please fix and improve this code that encountered an error:

CODE:
${code}

ERROR:
${error}

Please provide:
1. A corrected version of the code
2. Brief explanation of what was wrong
3. Improvements made to prevent similar issues`
        }
      ],
      temperature: 0.2,
      max_tokens: 4000
    });

    const improvedCode = response.choices[0].message.content;
    if (!improvedCode) {
      throw new Error('No improved code was generated');
    }

    // Extract the code blocks and explanation
    const codeBlocks = improvedCode.match(/```python\n([\s\S]*?)```/g);
    if (!codeBlocks) {
      throw new Error('No valid Python code blocks found in the response');
    }

    const cleanCode = codeBlocks
      .map(block => block.replace(/```python\n|```/g, ''))
      .join('\n\n');

    // Extract explanation (text before and after code blocks)
    const explanation = improvedCode
      .split(/```python\n[\s\S]*?```/)
      .filter(text => text.trim())
      .join('\n\n');

    return `${explanation}\n\n${cleanCode}`;
  } catch (error) {
    console.error('Error enhancing code:', error);
    throw new Error('Failed to enhance code. Please try again.');
  }
}