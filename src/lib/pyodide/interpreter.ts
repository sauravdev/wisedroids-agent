import { loadPyodide, type PyodideInterface } from 'pyodide';

let pyodide: PyodideInterface | null = null;
let isInitializing = false;
let initializationError: Error | null = null;
let initializationPromise: Promise<PyodideInterface> | null = null;
let fallbackMode = false;
let installationStatus = {
  isInstalling: false,
  currentPackage: '',
  totalPackages: 0,
  installedPackages: 0,
  logs: [] as string[]
};

const INITIALIZATION_TIMEOUT = 30000; // 30 seconds
const MAX_RETRIES = 3;
let retryCount = 0;

// Multiple CDN sources for redundancy
const CDN_URLS = [
  "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
  "https://pyodide-cdn2.iodide.io/v0.24.1/full/",
  "https://pyodide.org/v0.24.1/full/"
];

// Function to reset Pyodide state
function resetPyodide() {
  pyodide = null;
  isInitializing = false;
  initializationError = null;
  initializationPromise = null;
  fallbackMode = false;
  retryCount = 0;
  installationStatus = {
    isInstalling: false,
    currentPackage: '',
    totalPackages: 0,
    installedPackages: 0,
    logs: []
  };
}

// Function to get installation status
export function getInstallationStatus() {
  return { ...installationStatus };
}

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
      
      // Install crewai and its dependencies
      installationStatus.isInstalling = true;
      installationStatus.logs = [];
      installationStatus.totalPackages = 20; // Update this if you add more packages
      installationStatus.installedPackages = 0;
      
      await instance.runPythonAsync(`
        import micropip
        import sys
        
        def log_message(message):
            print(f"[INSTALL_LOG] {message}")
            sys.stdout.flush()
        
        async def install_package(package_name):
            try:
                log_message(f"Installing {package_name}...")
                await micropip.install(package_name)
                log_message(f"Successfully installed {package_name}")
            except Exception as e:
                log_message(f"Failed to install {package_name}: {str(e)}")
        
        # Core packages
        await install_package('crewai')
        await install_package('langchain')
        await install_package('openai')
        
        # Dependencies
        await install_package('tiktoken')
        await install_package('pydantic')
        await install_package('python-dotenv')
        await install_package('requests')
        await install_package('beautifulsoup4')
        await install_package('selenium')
        await install_package('playwright')
        await install_package('duckduckgo-search')
        await install_package('google-search-results')
        await install_package('wikipedia')
        
        # Data science packages
        await install_package('pandas')
        await install_package('numpy')
        await install_package('matplotlib')
        await install_package('seaborn')
        await install_package('scikit-learn')
        
        # ML/AI packages
        await install_package('tensorflow')
        await install_package('torch')
        await install_package('transformers')
        await install_package('sentence-transformers')
        await install_package('faiss-cpu')
        await install_package('chromadb')
        
        log_message("Package installation completed")
      `);
      
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
      installationStatus.isInstalling = false;
      installationStatus.logs.push("Pyodide initialization completed successfully");
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
      installationStatus.isInstalling = false;
      installationStatus.logs.push(`Initialization error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw initializationError;
    } finally {
      isInitializing = false;
      initializationPromise = null;
    }
  })();

  return initializationPromise;
}

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

  try {
    // Properly escape the code string for Python
    const escapedCode = code
      .replace(/\\/g, '\\\\')  // Escape backslashes first
      .replace(/"/g, '\\"')    // Escape quotes
      .replace(/\n/g, '\\n')   // Escape newlines
      .replace(/\r/g, '\\r')   // Escape carriage returns
      .replace(/\t/g, '\\t');  // Escape tabs

    // Call the Python function run_code_safely with the escaped code
    const result = await pyodide.runPythonAsync(`
      try:
        result = run_code_safely("""${escapedCode}""")
        result
      except Exception as e:
        import traceback
        error_msg = f"Python execution error:\\n{str(e)}\\n{traceback.format_exc()}"
        print(error_msg, file=sys.stderr)
        {
          'success': False,
          'output': {'stdout': '', 'stderr': error_msg},
          'error': error_msg
        }
    `);

    console.log("Raw Pyodide result:", result); // Debug log

    if (!result) {
      throw new Error("No result returned from Python execution");
    }

    // Ensure the result has the expected structure
    if (typeof result !== 'object' || result === null) {
      throw new Error("Invalid result structure from Python execution");
    }

    // Convert the Python object to a JavaScript object with safe defaults
    const jsResult = {
      success: Boolean(result.success),
      output: {
        stdout: String(result.output?.stdout || ''),
        stderr: String(result.output?.stderr || '')
      },
      error: result.error ? String(result.error) : null
    };

    return jsResult;
  } catch (error) {
    console.error("Pyodide execution error:", error);
    // Return a properly structured error result
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
