import { loadPyodide, type PyodideInterface } from 'pyodide';

let pyodide: PyodideInterface | null = null;
let isInitializing = false;
let initializationError: Error | null = null;
let initializationPromise: Promise<PyodideInterface> | null = null;
let fallbackMode = false;

const INITIALIZATION_TIMEOUT = 30000; // 30 seconds
const MAX_RETRIES = 3;
let retryCount = 0;

// Multiple CDN sources for redundancy
const CDN_URLS = [
  "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
  "https://pyodide-cdn2.iodide.io/v0.24.1/full/",
  "https://pyodide.org/v0.24.1/full/"
];

async function testCDN(url: string): Promise<boolean> {
  try {
    const response = await fetch(`${url}pyodide.js`, {
      method: 'HEAD',
      cache: 'no-cache'
    });
    return response.ok;
  } catch {
    return false;
  }
}

async function getBestCDN(): Promise<string> {
  for (const url of CDN_URLS) {
    if (await testCDN(url)) {
      return url;
    }
  }
  throw new Error('No available Pyodide CDN found');
}

export async function initializePyodide(forceRetry = false): Promise<PyodideInterface> {
  // Return existing instance if available
  if (pyodide && !forceRetry) {
    return pyodide;
  }

  // Return existing initialization promise if one is in progress
  if (initializationPromise && !forceRetry) {
    return initializationPromise;
  }

  // Reset state if forcing retry
  if (forceRetry) {
    resetPyodide();
  }

  // Check retry count
  if (retryCount >= MAX_RETRIES) {
    fallbackMode = true;
    throw new Error('Maximum initialization retries reached');
  }

  // Start initialization with timeout
  isInitializing = true;
  initializationPromise = (async () => {
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Initialization timeout')), INITIALIZATION_TIMEOUT);
    });

    try {
      // const indexURL = await getBestCDN();
      const indexURL = 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/';
      const initPromise = loadPyodide({
        indexURL,
        stdout: (text) => console.log('[Pyodide]', text),
        stderr: (text) => console.error('[Pyodide]', text),
        fullStdLib: false,
      });

      // Race between initialization and timeout
      const instance = await Promise.race([initPromise, timeoutPromise]);

      // Set up basic Python environment
      await instance.loadPackage(['micropip']);
      
      await instance.runPythonAsync(`
        import sys
        import io
        
        class OutputCapture:
            def __init__(self):
                self.stdout = io.StringIO()
                self.stderr = io.StringIO()
            
            def __enter__(self):
                self.old_stdout = sys.stdout
                self.old_stderr = sys.stderr
                sys.stdout = self.stdout
                sys.stderr = self.stderr
                return self
            
            def __exit__(self, exc_type, exc_val, exc_tb):
                sys.stdout = self.old_stdout
                sys.stderr = self.old_stderr
            
            def get_output(self):
                return {
                    'stdout': self.stdout.getvalue(),
                    'stderr': self.stderr.getvalue()
                }

        def run_code_safely(code):
            with OutputCapture() as output:
                try:
                    namespace = {}
                    exec(code, namespace)
                    return {
                        'success': True,
                        'output': output.get_output(),
                        'error': None
                    }
                except Exception as e:
                    import traceback
                    error_msg = f"{str(e)}\\n{traceback.format_exc()}"
                    return {
                        'success': False,
                        'output': output.get_output(),
                        'error': error_msg
                    }
      `);

      pyodide = instance;
      fallbackMode = false;
      retryCount = 0;
      return instance;

    } catch (error) {
      retryCount++;
      console.error(`Failed to initialize Pyodide (attempt ${retryCount}/${MAX_RETRIES}):`, error);
      
      if (retryCount < MAX_RETRIES) {
        // Exponential backoff with jitter
        const delay = Math.min(1000 * Math.pow(2, retryCount) + Math.random() * 1000, 5000);
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Clear the initialization promise to allow retry
        initializationPromise = null;
        isInitializing = false;
        
        // Retry initialization
        return initializePyodide();
      }

      initializationError = error instanceof Error ? error : new Error('Unknown initialization error');
      fallbackMode = true;
      throw initializationError;
    } finally {
      isInitializing = false;
      initializationPromise = null;
    }
  })();

  return initializationPromise;
}

// Rest of the file remains the same...
/**
 * Run Python code safely in the Pyodide environment.
 * Returns an object with:
 *   - success: boolean
 *   - output: { stdout: string, stderr: string }
 *   - error: string | null
 */
export async function runPythonCode(code: string) {
  if (!pyodide) {
    throw new Error("Pyodide is not initialized");
  }

  // Escape any special quotes inside the string
  const escapedCode = code.replace(/"/g, '\\"');

  // Call the Python function run_code_safely(...) defined in interpreter.py
  const result = await pyodide.runPythonAsync(`
    run_code_safely("${escapedCode}")
  `);

  // Example return format:
  // {
  //   success: true,
  //   output: { stdout: "...", stderr: "..." },
  //   error: null
  // }
  return result;
}
