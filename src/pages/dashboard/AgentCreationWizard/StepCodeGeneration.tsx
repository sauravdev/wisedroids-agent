import React, { useState, useEffect } from "react";
import { RefreshCw, Wand2, Play, FileCode, Copy, Check } from "lucide-react";
import { generateAgentCode, enhanceCode, convertCodeToWebAPP } from "@/lib/openai/client";
// import { executeCode } from '@/lib/code/executor';
// import { initializePyodide, getInstallationStatus } from '@/lib/pyodide/interpreter';
import axios from "axios";

interface StepCodeGenerationProps {
  agentDescription: string;
  agentCapabilities: string[];
  agentPersonality: Record<string, number>;
  agentIntegrations: string[];
  agentName: string;
  code: string;
  onSaveCode: (code: string) => void;
  errors?: {
    generatedCode?: string;
  };
  showGenerate?: boolean;
  showExecute?: boolean;
  showEnhance?: boolean;
  showStreamlit?: boolean;
  showDeploy?: boolean;
  onDeploy?: () => void;
  isDeployed?: boolean;
}

export function StepCodeGeneration({
  agentDescription,
  agentCapabilities,
  agentIntegrations,
  agentPersonality,
  agentName,
  code,
  onSaveCode,
  errors,
  showGenerate = true,
  showExecute = true,
  showEnhance = true,
  showStreamlit = false,
  showDeploy = false,
  onDeploy,
  isDeployed
}: StepCodeGenerationProps) {
  const [generatedCode, setGeneratedCode] = useState(code);
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isGeneratingStreamlit, setIsGeneratingStreamlit] = useState(false);
  const [isEnhancingStreamlit, setIsEnhancingStreamlit] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enhancementPrompt, setEnhancementPrompt] = useState("");
  const [streamlitEnhancementPrompt, setStreamlitEnhancementPrompt] = useState("");
  const [streamlitCode, setStreamlitCode] = useState("");
  const [isPyodideReady, setIsPyodideReady] = useState(false);
  const [executionSuccess, setExecutionSuccess] = useState(false);
  const [activeStreamlitTab, setActiveStreamlitTab] = useState<'code' | 'enhancement'>('code');
  const [copiedError, setCopiedError] = useState(false);
  // const [installationStatus, setInstallationStatus] = useState(getInstallationStatus());

  // Reset execution success when code changes from props
  useEffect(() => {
    if (code !== generatedCode) {
      setGeneratedCode(code);
      setStreamlitCode(code);
      setExecutionSuccess(false);
    }
  }, [code]);

  // Initialize Pyodide when component mounts
  // useEffect(() => {
  //   const initPyodide = async () => {
  //     try {
  //       await initializePyodide();
  //       setIsPyodideReady(true);
  //       console.log('Pyodide initialized successfully');
  //     } catch (err) {
  //       console.error('Failed to initialize Pyodide:', err);
  //       setError('Python execution environment initialization failed. Please refresh the page to try again.');
  //       setIsPyodideReady(false);
  //     }
  //   };

  //   initPyodide();
  // }, []);

  // Update installation status periodically
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // const status = getInstallationStatus();
  //     // setInstallationStatus(status);

  //     // If installation is complete, update Pyodide ready state
  //     if (!status.isInstalling && isPyodideReady === false) {
  //       setIsPyodideReady(true);
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [isPyodideReady]);

  const copyErrorToClipboard = async (errorText: string) => {
    try {
      await navigator.clipboard.writeText(errorText);
      setCopiedError(true);
      setTimeout(() => setCopiedError(false), 2000);
    } catch (err) {
      console.error('Failed to copy error:', err);
    }
  };

  const handleGenerateCode = async () => {
    if (!agentDescription.trim()) {
      setError("Please provide a description for your agent.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setOutput("");
    setExecutionSuccess(false);

    try {
      const code = await generateAgentCode(
        agentDescription,
        agentCapabilities,
        agentIntegrations,
        agentPersonality,
        agentName
      );
      setGeneratedCode(code);
      onSaveCode(code);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate code");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExecuteCode = async () => {
    if (!generatedCode.trim()) {
      setError("No code to execute. Please generate code first.");
      return;
    }

    setIsExecuting(true);
    setError(null);
    setOutput("");
    setExecutionSuccess(false);

    try {
      const response = await axios.post(
        "https://agentapi.wisedroids.ai/execute",
        {
          code: generatedCode,
        }
      );
      if (response.data.output) {
        setOutput(response.data.output || "No output");
        setExecutionSuccess(true);
      } else {
        setError(response.data.error);
        setExecutionSuccess(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to execute code");
      setExecutionSuccess(false);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleEnhanceCode = async () => {
    if (!generatedCode.trim() || !enhancementPrompt.trim()) {
      setError("Please provide both code and enhancement instructions.");
      return;
    }

    setIsEnhancing(true);
    setError(null);

    try {
      const enhanced = await enhanceCode(generatedCode, enhancementPrompt);
      setGeneratedCode(enhanced);
      onSaveCode(enhanced);
      setEnhancementPrompt("");
      setExecutionSuccess(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to enhance code");
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleGenerateStreamlitCode = async () => {
    if (!generatedCode.trim()) {
      setError("No code to convert. Please generate or enter code first.");
      return;
    }

    setIsGeneratingStreamlit(true);
    setError(null);

    try {
      const newStreamlitCode = await convertCodeToWebAPP(generatedCode);
      setStreamlitCode(newStreamlitCode);
      setGeneratedCode(newStreamlitCode);
      onSaveCode(newStreamlitCode);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate Streamlit code");
    } finally {
      setIsGeneratingStreamlit(false);
    }
  };

  const handleEnhanceStreamlitCode = async () => {
    if (!streamlitCode.trim() || !streamlitEnhancementPrompt.trim()) {
      setError("Please provide both Streamlit code and enhancement instructions.");
      return;
    }

    setIsEnhancingStreamlit(true);
    setError(null);

    try {
      const enhanced = await enhanceCode(streamlitCode, streamlitEnhancementPrompt);
      setStreamlitCode(enhanced);
      setGeneratedCode(enhanced);
      onSaveCode(enhanced);
      setStreamlitEnhancementPrompt("");
      setExecutionSuccess(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to enhance Streamlit code");
    } finally {
      setIsEnhancingStreamlit(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Agent Code</h3>
            {executionSuccess && (
              <p className="text-sm text-green-600 mt-1">✓ Code executed successfully - Ready for Streamlit generation</p>
            )}
          </div>
          <div className="flex gap-2">
            {showGenerate && (
              <button
                onClick={handleGenerateCode}
                disabled={isGenerating}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate Code
                  </>
                )}
              </button>
            )}
            {showExecute && (
              <button
                onClick={handleExecuteCode}
                disabled={isExecuting}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
              >
                {isExecuting ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Executing...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Execute Code
                  </>
                )}
              </button>
            )}
            {showEnhance && (
              <button
                onClick={handleEnhanceCode}
                disabled={isEnhancing}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
              >
                {isEnhancing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Enhancing...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Enhance Code
                  </>
                )}
              </button>
            )}
            {showStreamlit && (
              <>
                <button
                  onClick={handleGenerateStreamlitCode}
                  disabled={isGeneratingStreamlit}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  {isGeneratingStreamlit ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating Streamlit...
                    </>
                  ) : (
                    <>
                      <FileCode className="w-4 h-4 mr-2" />
                      Generate Streamlit
                    </>
                  )}
                </button>
                <button
                  onClick={handleEnhanceStreamlitCode}
                  disabled={isEnhancingStreamlit}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
                >
                  {isEnhancingStreamlit ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Enhancing Streamlit...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Enhance Streamlit
                    </>
                  )}
                </button>
              </>
            )}
            {showDeploy && onDeploy && (
              <button
                onClick={onDeploy}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-800 disabled:opacity-50"
              >
                {isDeployed ? 'Redeploy' : 'Deploy'}
              </button>
            )}
          </div>
        </div>

        <div className="relative">
          <textarea
            value={generatedCode}
            onChange={(e) => {
              setGeneratedCode(e.target.value);
              onSaveCode(e.target.value);
              setExecutionSuccess(false);
            }}
            rows={15}
            className={`w-full font-mono text-sm rounded-md shadow-sm focus:ring-indigo-200 focus:ring-opacity-50 ${
              errors?.generatedCode
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-indigo-300"
            }`}
            placeholder="Generated code will appear here..."
          />
          {errors?.generatedCode && (
            <p className="mt-1 text-sm text-red-600">{errors.generatedCode}</p>
          )}
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex justify-between items-start">
              <p className="text-sm text-red-600 flex-1">{error}</p>
              <button
                onClick={() => copyErrorToClipboard(error)}
                className="ml-2 p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors"
                title="Copy error to clipboard"
              >
                {copiedError ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        )}

        {output && (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-gray-900">
                Execution Output:
              </h4>
              <button
                onClick={() => copyErrorToClipboard(output)}
                className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
                title="Copy output to clipboard"
              >
                {copiedError ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
            <pre className="text-sm text-gray-600 whitespace-pre-wrap font-mono bg-gray-100 p-3 rounded">
              {output}
            </pre>
          </div>
        )}

        {showEnhance && (
          <div className="space-y-2">
            <label
              htmlFor="enhancement"
              className="block text-sm font-medium text-gray-700"
            >
              Enhancement Instructions
            </label>
            <textarea
              id="enhancement"
              value={enhancementPrompt}
              onChange={(e) => setEnhancementPrompt(e.target.value)}
              rows={3}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Describe how you want to enhance the code..."
            />
          </div>
        )}

        {showStreamlit && (
          <div className="space-y-4">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveStreamlitTab('code')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeStreamlitTab === 'code'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Streamlit Code
                </button>
                <button
                  onClick={() => setActiveStreamlitTab('enhancement')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeStreamlitTab === 'enhancement'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Enhancement Instructions
                </button>
              </nav>
            </div>

            {activeStreamlitTab === 'code' && (
              <div className="space-y-2">
                <label
                  htmlFor="streamlit-code"
                  className="block text-sm font-medium text-gray-700"
                >
                  Streamlit Code
                </label>
                <textarea
                  id="streamlit-code"
                  value={streamlitCode}
                  onChange={(e) => {
                    setStreamlitCode(e.target.value);
                    setGeneratedCode(e.target.value);
                    onSaveCode(e.target.value);
                    setExecutionSuccess(false);
                  }}
                  rows={15}
                  className="w-full font-mono text-sm rounded-md shadow-sm focus:ring-indigo-200 focus:ring-opacity-50 border-gray-300 focus:border-indigo-300"
                  placeholder="Streamlit code will appear here..."
                />
              </div>
            )}

            {activeStreamlitTab === 'enhancement' && (
              <div className="space-y-2">
                <label
                  htmlFor="streamlit-enhancement"
                  className="block text-sm font-medium text-gray-700"
                >
                  Streamlit Enhancement Instructions
                </label>
                <textarea
                  id="streamlit-enhancement"
                  value={streamlitEnhancementPrompt}
                  onChange={(e) => setStreamlitEnhancementPrompt(e.target.value)}
                  rows={15}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Describe how you want to enhance the Streamlit code..."
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
