import { runPythonCode } from '../pyodide/interpreter';

interface ExecutionResult {
  success: boolean;
  output: {
    stdout: string;
    stderr: string;
  };
  error: string | null;
}

export async function executeCode(code: string): Promise<ExecutionResult> {
  try {
    // Execute the code using Pyodide
    const result = await runPythonCode(code);
    
    console.log("Executor received result:", result); // Debug log

    // The result from runPythonCode already has the correct structure
    return result;
  } catch (error) {
    console.error("Executor error:", error);
    return {
      success: false,
      output: {
        stdout: '',
        stderr: error instanceof Error ? error.message : 'Unknown error'
      },
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}