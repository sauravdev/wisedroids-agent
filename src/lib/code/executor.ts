import { runPythonCode } from '../pyodide/interpreter';

export async function executeCode(code: string): Promise<string> {
  try {
    // Execute the code using Pyodide
    const result = await runPythonCode(code);
    return result;
  } catch (error) {
    return `Error executing code: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}