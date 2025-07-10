import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAgentById } from '@/lib/supabase/agents';
import { Clock, Play, AlertCircle, CheckCircle, Loader2, Code, Terminal } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  description: string;
  code?: string;
  html?: string;
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

export default function Playground() {
  const [searchParams] = useSearchParams();
  const agentId = searchParams.get('agent_id');
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(false);
  const [agentLoading, setAgentLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [currentExecution, setCurrentExecution] = useState<{
    startTime: number;
    logs: string[];
  } | null>(null);

  useEffect(() => {
    async function fetchAgent() {
      console.log(agentId)
      if (!agentId) {
        setAgentLoading(false);
        return;
      }

      setAgentLoading(true);
      setError(null);
      try {
        const agentData = await getAgentById(agentId);
        console.log(agentData)
        setAgent(agentData);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch agent');
      } finally {
        setAgentLoading(false);
      }
    }
    
    fetchAgent();
  }, [agentId]);

  const addLog = (message: string) => {
    if (currentExecution) {
      setCurrentExecution(prev => ({
        ...prev!,
        logs: [...prev!.logs, `${new Date().toLocaleTimeString()}: ${message}`]
      }));
    }
  };

  const handleExecute = async () => {
    if (!agentId || !agent?.code) return;

    const startTime = Date.now();
    const testId = `test_${Date.now()}`;
    
    setLoading(true);
    setCurrentExecution({
      startTime,
      logs: []
    });

    addLog('Starting agent execution...');
    addLog(`Code: ${agent.code.substring(0, 100)}${agent.code.length > 100 ? '...' : ''}`);

    try {
      const res = await fetch('https://agentapi.wisedroids.ai/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: agent.code }),
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
        input: '',
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
        input: '',
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
        <span className="ml-2 text-yellow-600">Agent not found. Please provide a valid agent_id parameter.</span>
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
                        <span className="text-xs font-medium text-gray-600">Output:</span>
                        <pre className="text-sm bg-white rounded px-2 py-1 mt-1 whitespace-pre-wrap overflow-x-auto">
                          {result.output}
                        </pre>
                      </div>
                    ) : (
                      <div>
                        <span className="text-xs font-medium text-gray-600">Error:</span>
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
                        <div className="mt-2 bg-gray-900 text-green-400 rounded px-2 py-1 text-xs font-mono max-h-20 overflow-y-auto">
                          {result.logs.map((log, index) => (
                            <div key={index}>{log}</div>
                          ))}
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