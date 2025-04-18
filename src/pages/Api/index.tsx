import React, { useState } from 'react';
import { BookOpen, Code, Terminal, Server, Key, Send, ChevronRight, Copy, Check, Globe, Database, Shield, Clock } from 'lucide-react';

export function APIReference() {
  const [activeTab, setActiveTab] = useState('authentication');
  const [copied, setCopied] = useState({});

  const copyToClipboard = (text:string, id:string) => {
    navigator.clipboard.writeText(text);
    setCopied(prev => ({...prev, [id]: true}));
    setTimeout(() => setCopied(prev => ({...prev, [id]: false})), 2000);
  };

  const codeSnippets = {
    authentication: `// API Authentication Example
const apiKey = 'your_api_key_here';

const headers = {
  'Authorization': \`Bearer \${apiKey}\`,
  'Content-Type': 'application/json'
};`,
    query: `// Example: Query your agent
const response = await fetch('https://your-app.onrender.com/api/v1/query', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${apiKey}\`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: "What is the status of order #12345?",
    context: {
      userId: "user_123",
      history: []
    }
  })
});

const data = await response.json();
console.log(data.response);`,
    action: `// Example: Trigger an agent action
const response = await fetch('https://your-app.onrender.com/api/v1/actions/process-return', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${apiKey}\`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    orderId: "12345",
    reason: "Wrong size",
    requestRefund: true
  })
});

const data = await response.json();
console.log(data.status);`,
    webhook: `// Example: Setting up a webhook handler in Express
const express = require('express');
const app = express();
app.use(express.json());

app.post('/webhooks/wisedroid', (req, res) => {
  const { eventType, data } = req.body;
  
  switch(eventType) {
    case 'agent.response.completed':
      console.log('Agent completed response:', data);
      break;
    case 'agent.action.triggered':
      console.log('Agent triggered action:', data);
      break;
    default:
      console.log('Unknown event:', eventType);
  }
  
  res.status(200).send('Webhook received');
});

app.listen(3000, () => console.log('Webhook server running on port 3000'));`
  };

  const endpoints = [
    {
      method: 'POST',
      path: '/api/v1/query',
      description: 'Send a query to your agent and receive a response'
    },
    {
      method: 'POST',
      path: '/api/v1/actions/{action-name}',
      description: 'Trigger a specific action from your agent'
    },
    {
      method: 'GET',
      path: '/api/v1/capabilities',
      description: 'List all capabilities available for your agent'
    },
    {
      method: 'POST',
      path: '/api/v1/integrations/connect',
      description: 'Connect a new integration to your agent'
    },
    {
      method: 'GET',
      path: '/api/v1/analytics/usage',
      description: 'Get usage statistics for your agent'
    }
  ];

  const tabClass = (tab) => {
    return `px-4 py-2 ${activeTab === tab ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'} rounded-md cursor-pointer transition`;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Documentation Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">WiseDroid AI Documentation</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-indigo-600 font-medium hover:text-indigo-700 text-sm">API Reference</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm font-medium">SDK</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm font-medium">Community</a>
              <a href="#" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition">Dashboard</a>
            </div>
          </div>
        </div>
      </div>

      {/* Documentation Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">API Guide</h2>
                <ul className="mt-3 space-y-3">
                  <li>
                    <a href="#" className="text-indigo-600 font-medium hover:text-indigo-800 flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1" />
                      API Overview
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-indigo-600 flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1 opacity-0" />
                      Getting Started
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-indigo-600 flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1 opacity-0" />
                      Authentication
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Endpoints</h2>
                <ul className="mt-3 space-y-3">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-indigo-600 flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1 opacity-0" />
                      Query Endpoints
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-indigo-600 flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1 opacity-0" />
                      Action Endpoints
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-indigo-600 flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1 opacity-0" />
                      Integration Endpoints
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Integrations</h2>
                <ul className="mt-3 space-y-3">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-indigo-600 flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1 opacity-0" />
                      Webhooks
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-indigo-600 flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1 opacity-0" />
                      SDKs & Libraries
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-indigo-600 flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1 opacity-0" />
                      Custom Integrations
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:flex-1">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="prose prose-indigo max-w-none">
                <div className="">
                  <h2 className="flex items-center text-2xl font-bold text-gray-900">
                    <Server className="h-6 w-6 text-indigo-600 mr-2" />
                    API Overview
                  </h2>
                  <p>
                    WiseDroid AI provides a powerful REST API that allows you to interact with your deployed agents from any platform or application. This guide will help you understand how to authenticate, make requests, and handle responses from your agents through the API.
                  </p>
                  
                  <div className="bg-indigo-50 p-4 rounded-lg my-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <Globe className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-indigo-800">Base URL</h3>
                        <p className="mt-1 text-sm text-indigo-700">
                          All API requests should be made to your unique agent endpoint:
                        </p>
                        <code className="mt-1 block bg-indigo-100 p-2 rounded text-indigo-800">
                          https://your-app-name.onrender.com/api/v1/
                        </code>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex space-x-2 overflow-x-auto pb-2 mb-6">
                  <div 
                    className={tabClass('authentication')}
                    onClick={() => setActiveTab('authentication')}
                  >
                    <Key className="inline-block h-4 w-4 mr-1" />
                    Authentication
                  </div>
                  <div 
                    className={tabClass('query')}
                    onClick={() => setActiveTab('query')}
                  >
                    <Send className="inline-block h-4 w-4 mr-1" />
                    Querying Agents
                  </div>
                  <div 
                    className={tabClass('action')}
                    onClick={() => setActiveTab('action')}
                  >
                    <Code className="inline-block h-4 w-4 mr-1" />
                    Agent Actions
                  </div>
                  <div 
                    className={tabClass('webhook')}
                    onClick={() => setActiveTab('webhook')}
                  >
                    <Server className="inline-block h-4 w-4 mr-1" />
                    Webhooks
                  </div>
                </div>

                {/* Authentication Section */}
                {activeTab === 'authentication' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">API Authentication</h3>
                    <p className="mt-2 text-gray-600 mb-6">
                      WiseDroid API uses API keys to authenticate requests. You can view and manage your API keys from your WiseDroid dashboard.
                    </p>

                    <div className="bg-gray-50 p-6 rounded-lg mb-6">
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Authentication Methods</h4>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="bg-indigo-100 p-2 rounded-full">
                            <Key className="h-5 w-5 text-indigo-600" />
                          </div>
                          <div className="ml-4">
                            <h5 className="font-medium text-gray-800">API Key Authentication</h5>
                            <p className="text-sm text-gray-600 mt-1">
                              Include your API key in the request headers using the format: <code className="bg-gray-100 px-1 py-0.5 rounded">Authorization: Bearer YOUR_API_KEY</code>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="bg-indigo-100 p-2 rounded-full">
                            <Shield className="h-5 w-5 text-indigo-600" />
                          </div>
                          <div className="ml-4">
                            <h5 className="font-medium text-gray-800">OAuth 2.0 (Enterprise Only)</h5>
                            <p className="text-sm text-gray-600 mt-1">
                              Enterprise users can configure OAuth 2.0 authentication for more secure integrations.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <div className="bg-gray-800 rounded-t-lg p-4 flex items-center justify-between">
                        <div className="flex space-x-2">
                          <div className="h-3 w-3 rounded-full bg-red-500"></div>
                          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-gray-400 text-sm">authentication.js</div>
                        <button 
                          onClick={() => copyToClipboard(codeSnippets.authentication, 'auth')}
                          className="flex items-center text-gray-400 hover:text-white"
                        >
                          {copied.auth ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <div className="bg-gray-900 rounded-b-lg p-4 overflow-x-auto">
                        <pre className="text-gray-100 text-sm">
                          <code>{codeSnippets.authentication}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-md">
                      <h4 className="font-medium text-yellow-800 mb-2 flex items-center">
                        <Shield className="h-5 w-5 mr-2" />
                        Security Best Practices
                      </h4>
                      <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
                        <li>Never expose your API key in client-side code</li>
                        <li>Rotate your API keys periodically</li>
                        <li>Set appropriate access controls and permissions</li>
                        <li>Monitor API usage for suspicious activities</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Querying Agents Section */}
                {activeTab === 'query' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Querying Your Agents</h3>
                    <p className="mt-2 text-gray-600 mb-6">
                      Send natural language queries to your deployed agents and receive structured responses.
                    </p>

                    <div className="bg-gray-50 p-6 rounded-lg mb-6">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Query Endpoint</h4>
                      
                      <div className="flex items-center bg-white p-3 rounded-md border border-gray-200 mb-4">
                        <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium mr-3">POST</span>
                        <code className="text-gray-800">/api/v1/query</code>
                      </div>
                      
                      <h5 className="font-medium text-gray-800 mt-6 mb-2">Request Parameters</h5>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-4 py-3 text-sm text-gray-900">query</td>
                              <td className="px-4 py-3 text-sm text-gray-500">string</td>
                              <td className="px-4 py-3 text-sm text-gray-500">Yes</td>
                              <td className="px-4 py-3 text-sm text-gray-500">The natural language query to send to your agent</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm text-gray-900">context</td>
                              <td className="px-4 py-3 text-sm text-gray-500">object</td>
                              <td className="px-4 py-3 text-sm text-gray-500">No</td>
                              <td className="px-4 py-3 text-sm text-gray-500">Additional context like user ID, conversation history, etc.</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm text-gray-900">responseFormat</td>
                              <td className="px-4 py-3 text-sm text-gray-500">string</td>
                              <td className="px-4 py-3 text-sm text-gray-500">No</td>
                              <td className="px-4 py-3 text-sm text-gray-500">Format of the response: "text" (default), "json", or "markdown"</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="mb-8">
                      <div className="bg-gray-800 rounded-t-lg p-4 flex items-center justify-between">
                        <div className="flex space-x-2">
                          <div className="h-3 w-3 rounded-full bg-red-500"></div>
                          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-gray-400 text-sm">query_example.js</div>
                        <button 
                          onClick={() => copyToClipboard(codeSnippets.query, 'query')}
                          className="flex items-center text-gray-400 hover:text-white"
                        >
                          {copied.query ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <div className="bg-gray-900 rounded-b-lg p-4 overflow-x-auto">
                        <pre className="text-gray-100 text-sm">
                          <code>{codeSnippets.query}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Response Structure</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        When your query is successful, you'll receive a JSON response with the following structure:
                      </p>
                      <div className="bg-white p-4 rounded-md border border-gray-200">
                        <pre className="text-sm text-gray-800 overflow-x-auto">
{`{
  "id": "resp_12345abcde",
  "timestamp": "2025-04-18T15:30:00Z",
  "response": "Your order #12345 is currently in transit and expected to arrive by April 20th.",
  "confidence": 0.95,
  "intent": "order_status_inquiry",
  "entities": [
    {
      "type": "order_number",
      "value": "12345"
    }
  ],
  "suggestedActions": [
    {
      "type": "tracking_update",
      "label": "Get tracking updates"
    }
  ]
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}

                {/* Agent Actions Section */}
                {activeTab === 'action' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Agent Actions</h3>
                    <p className="mt-2 text-gray-600 mb-6">
                      Trigger specific actions that your agent is configured to perform, such as processing returns, updating orders, or generating reports.
                    </p>

                    <div className="bg-gray-50 p-6 rounded-lg mb-6">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Action Endpoints</h4>
                      
                      <div className="flex items-center bg-white p-3 rounded-md border border-gray-200 mb-4">
                        <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium mr-3">POST</span>
                        <code className="text-gray-800">/api/v1/actions/action-name</code>
                      </div>
                      
                      <h5 className="font-medium text-gray-800 mt-6 mb-2">Available Actions</h5>
                      <p className="text-sm text-gray-600 mb-4">
                        The actions available depend on the capabilities you've configured for your agent. Here are some common actions:
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h6 className="font-medium text-gray-900">process-return</h6>
                          <p className="text-sm text-gray-600 mt-1">Process a customer return request</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h6 className="font-medium text-gray-900">update-order</h6>
                          <p className="text-sm text-gray-600 mt-1">Update an existing order's details</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h6 className="font-medium text-gray-900">generate-report</h6>
                          <p className="text-sm text-gray-600 mt-1">Generate analytical reports from data</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h6 className="font-medium text-gray-900">escalate-issue</h6>
                          <p className="text-sm text-gray-600 mt-1">Escalate customer issues to human support</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <div className="bg-gray-800 rounded-t-lg p-4 flex items-center justify-between">
                        <div className="flex space-x-2">
                          <div className="h-3 w-3 rounded-full bg-red-500"></div>
                          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-gray-400 text-sm">action_example.js</div>
                        <button 
                          onClick={() => copyToClipboard(codeSnippets.action, 'action')}
                          className="flex items-center text-gray-400 hover:text-white"
                        >
                          {copied.action ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <div className="bg-gray-900 rounded-b-lg p-4 overflow-x-auto">
                        <pre className="text-gray-100 text-sm">
                          <code>{codeSnippets.action}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-md">
                      <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                        <Database className="h-5 w-5 mr-2" />
                        Custom Actions
                      </h4>
                      <p className="text-sm text-blue-700">
                        You can create custom actions for your agent by modifying its code in your GitHub repository. Once deployed, these custom actions will be available through the API.
                      </p>
                    </div>
                  </div>
                )}

                {/* Webhooks Section */}
                {activeTab === 'webhook' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Webhooks</h3>
                    <p className="mt-2 text-gray-600 mb-6">
                      Receive real-time notifications when specific events occur in your WiseDroid agent through webhooks.
                    </p>

                    <div className="bg-gray-50 p-6 rounded-lg mb-6">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Webhook Configuration</h4>
                      
                      <p className="text-sm text-gray-600 mb-4">
                        Set up webhooks in your WiseDroid dashboard by providing a URL where event notifications should be sent.
                      </p>
                      
                      <h5 className="font-medium text-gray-800 mt-6 mb-2">Available Events</h5>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Type</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-4 py-3 text-sm text-gray-900">agent.response.completed</td>
                              <td className="px-4 py-3 text-sm text-gray-500">Fired when your agent completes a response to a query</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm text-gray-900">agent.action.triggered</td>
                              <td className="px-4 py-3 text-sm text-gray-500">Fired when an action is triggered by your agent</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm text-gray-900">agent.error.occurred</td>
                              <td className="px-4 py-3 text-sm text-gray-500">Fired when an error occurs during agent processing</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-sm text-gray-900">integration.connected</td>
                              <td className="px-4 py-3 text-sm text-gray-500">Fired when a new integration is connected to your agent</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    </div>)}
            </div>
                 </div>
                 </div>
                 </div>
                 </div>
                 </div>
  )}   