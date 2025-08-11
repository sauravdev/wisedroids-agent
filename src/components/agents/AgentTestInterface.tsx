import React, { useState, useEffect } from 'react';
import { Send, Clock, Play, AlertCircle, CheckCircle, Loader2, Code, Terminal, Copy, Check } from 'lucide-react';
import { getAgentById } from '@/lib/supabase/agents';

interface AgentTestInterfaceProps {
  agentId: string;
  apiEndpoint?: string;
  apiKey?: string;
}

interface TestResult {
  id: string;
  timestamp: Date;
  input: string;
  output: string;
  executionTime: number;
  status: 'success' | 'error';
  error?: string;
  logs?: string[];
}

interface Agent {
  id: string;
  name: string;
  description: string;
  code?: string;
  html?: string;
  api_endpoint?: string;
  api_key?: string;
}

export function AgentTestInterface({ agentId }: AgentTestInterfaceProps) {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [agentLoading, setAgentLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [currentExecution, setCurrentExecution] = useState<{
    startTime: number;
    logs: string[];
  } | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Fetch agent data from Supabase
  useEffect(() => {
    async function fetchAgent() {
      setAgentLoading(true);
      setError(null);
      try {
        const agentData = await getAgentById(agentId);
        setAgent(agentData);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch agent');
      } finally {
        setAgentLoading(false);
      }
    }
    
    if (agentId) {
      fetchAgent();
    }
  }, [agentId]);

  const addLog = (message: string) => {
    if (currentExecution) {
      setCurrentExecution(prev => ({
        ...prev!,
        logs: [...prev!.logs, `${new Date().toLocaleTimeString()}: ${message}`]
      }));
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(type);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleExecute = async () => {
    if (!agentId || !input.trim()) return;

    const startTime = Date.now();
    const testId = `test_${Date.now()}`;
    
    setLoading(true);
    setCurrentExecution({
      startTime,
      logs: []
    });

    addLog('Starting agent execution...');
    addLog(`Input: "${input}"`);

    try {
      // Use the same API call as in Playground.tsx
      const res = await fetch(`/api/v1/agents/${agentId}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: input.trim() }),
      });

      addLog('API request sent successfully');

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      const executionTime = Date.now() - startTime;
      
      addLog(`Execution completed in ${executionTime}ms`);
      addLog('Processing response...');

      const output = data.output || JSON.stringify(data);
      addLog(`Output received: ${output.substring(0, 100)}${output.length > 100 ? '...' : ''}`);

      const result: TestResult = {
        id: testId,
        timestamp: new Date(),
        input: input.trim(),
        output,
        executionTime,
        status: 'success',
        logs: currentExecution?.logs || []
      };

      setTestResults(prev => [result, ...prev]);
      setInput('');
      
      addLog('Test completed successfully');

    } catch (err: any) {
      const executionTime = Date.now() - startTime;
      addLog(`Error occurred: ${err.message}`);
      
      const result: TestResult = {
        id: testId,
        timestamp: new Date(),
        input: input.trim(),
        output: '',
        executionTime,
        status: 'error',
        error: err.message,
        logs: currentExecution?.logs || []
      };

      setTestResults(prev => [result, ...prev]);
      addLog('Test failed');
    } finally {
      setLoading(false);
      setCurrentExecution(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleExecute();
    }
  };

  if (agentLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <span className="ml-2 text-gray-600">Loading agent...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <AlertCircle className="w-8 h-8 text-red-500" />
        <span className="ml-2 text-red-600">{error}</span>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="flex items-center justify-center h-64">
        <AlertCircle className="w-8 h-8 text-yellow-500" />
        <span className="ml-2 text-yellow-600">Agent not found</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Agent Info Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{agent.name}</h1>
            <p className="text-gray-600 mt-1">{agent.description}</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Code className="w-4 h-4" />
            <span>Agent ID: {agent.id}</span>
          </div>
        </div>

        {/* Agent Code Preview */}
        {agent.code && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Agent Code</h3>
            <div className="bg-gray-50 rounded-md p-4 max-h-40 overflow-y-auto">
              <pre className="text-xs text-gray-800 whitespace-pre-wrap">{agent.code}</pre>
            </div>
          </div>
        )}

        {/* HTML Preview */}
        {agent.html && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">HTML Preview</h3>
            <div className="bg-gray-50 rounded-md p-4 border">
              <div dangerouslySetInnerHTML={{ __html: agent.html }} />
            </div>
          </div>
        )}
      </div>

      {/* Test Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Input</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input for Agent
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your test input here..."
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                disabled={loading}
              />
            </div>

            <button
              onClick={handleExecute}
              disabled={loading || !input.trim()}
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Executing...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Execute Test
                </>
              )}
            </button>
          </div>

          {/* Current Execution Logs */}
          {currentExecution && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Terminal className="w-4 h-4 mr-2" />
                Live Logs
              </h3>
              <div className="bg-gray-900 text-green-400 rounded-md p-4 max-h-40 overflow-y-auto text-xs font-mono">
                {currentExecution.logs.map((log, index) => (
                  <div key={index}>{log}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Results</h2>
          
          {testResults.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Terminal className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No test results yet. Run a test to see results here.</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {testResults.map((result) => (
                <div
                  key={result.id}
                  className={`border rounded-lg p-4 ${
                    result.status === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {result.status === 'success' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      )}
                      <span className="text-sm font-medium">
                        {result.status === 'success' ? 'Success' : 'Error'}
                      </span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {result.executionTime}ms
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="text-xs font-medium text-gray-600">Input:</span>
                      <p className="text-sm bg-white rounded px-2 py-1 mt-1">{result.input}</p>
                    </div>

                    {result.status === 'success' ? (
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-medium text-gray-600">Output:</span>
                          <button
                            onClick={() => copyToClipboard(result.output, `output-${result.id}`)}
                            className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
                            title="Copy output to clipboard"
                          >
                            {copiedText === `output-${result.id}` ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </button>
                        </div>
                        <pre className="text-sm bg-white rounded px-2 py-1 mt-1 whitespace-pre-wrap overflow-x-auto">
                          {result.output}
                        </pre>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-medium text-gray-600">Error:</span>
                          <button
                            onClick={() => copyToClipboard(result.error || '', `error-${result.id}`)}
                            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors"
                            title="Copy error to clipboard"
                          >
                            {copiedText === `error-${result.id}` ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </button>
                        </div>
                        <p className="text-sm bg-white rounded px-2 py-1 mt-1 text-red-600">
                          {result.error}
                        </p>
                      </div>
                    )}

                    {result.logs && result.logs.length > 0 && (
                      <details className="mt-2">
                        <summary className="text-xs font-medium text-gray-600 cursor-pointer">
                          Execution Logs ({result.logs.length} entries)
                        </summary>
                        <div className="mt-2">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-gray-500">Logs:</span>
                            <button
                              onClick={() => copyToClipboard(result.logs?.join('\n') || '', `logs-${result.id}`)}
                              className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
                              title="Copy logs to clipboard"
                            >
                              {copiedText === `logs-${result.id}` ? (
                                <Check className="h-3 w-3" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </button>
                          </div>
                          <div className="bg-gray-900 text-green-400 rounded px-2 py-1 text-xs font-mono max-h-20 overflow-y-auto">
                            {result.logs.map((log, index) => (
                              <div key={index}>{log}</div>
                            ))}
                          </div>
                        </div>
                      </details>
                    )}

                    <div className="text-xs text-gray-500">
                      {result.timestamp.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}