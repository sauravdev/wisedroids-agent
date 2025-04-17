import { useState } from 'react';
import { BookOpen, Code, Terminal, Github, Box, Layers, Zap, ChevronRight, Copy, Check, ExternalLink,ZapIcon } from 'lucide-react';

export function Documentation() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text:string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sampleCode = `// Sample WiseDroid Agent Configuration
from crewai import Agent, Task, Crew

# Define the agent
researcher = Agent(
    role="Researcher",
    goal="Gather information on a given topic and summarize it",
    backstory="You are an expert researcher skilled at finding and condensing information.",
    verbose=True,  # Changed to boolean
    allow_delegation=False
)

# Define the task
research_task = Task(
    description="Research the topic 'Artificial Intelligence Trends in 2025' and write a short summary.",
    expected_output="A concise summary of AI trends in 2025, about 100 words.",
    agent=researcher
)

# Create the crew (group of agents) and assign the task
crew = Crew(
    agents=[researcher],
    tasks=[research_task],
    verbose=True  # Changed to boolean
)

# Execute the crew's task
result = crew.kickoff()

# Print the result
print("Research Summary:")
print(result)`;

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
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm font-medium">API Reference</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm font-medium">SDK</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm font-medium">Community</a>
              <a href="/dashboard" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition">Dashboard</a>
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
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Getting Started</h2>
                <ul className="mt-3 space-y-3">
                  <li>
                    <a href="#" className="text-indigo-600 font-medium hover:text-indigo-800 flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1" />
                      Creating Agents
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-indigo-600 flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1 opacity-0" />
                      Agent Types
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-indigo-600 flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1 opacity-0" />
                      Quick Start Guide
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Core Concepts</h2>
                <ul className="mt-3 space-y-3">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-indigo-600 flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1 opacity-0" />
                      Capabilities
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-indigo-600 flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1 opacity-0" />
                      Integrations
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-indigo-600 flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1 opacity-0" />
                      Code Generation
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Deployment</h2>
                <ul className="mt-3 space-y-3">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-indigo-600 flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1 opacity-0" />
                      GitHub Integration
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-indigo-600 flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1 opacity-0" />
                      Render Deployment
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-indigo-600 flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1 opacity-0" />
                      Custom Deployments
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
                <h1 className='flex items-center text-2xl font-bold text-gray-900'><ZapIcon className="h-6 w-6 text-indigo-600 mr-2" />Creating and Deploying Agents</h1>
                <p>
                  Learn how to create, configure, and deploy intelligent AI agents with WiseDroid AI in minutes.
                </p>

                <div className="my-12">
                  <h2 className="flex items-center text-2xl font-bold text-gray-900">
                    <Box className="h-6 w-6 text-indigo-600 mr-2" />
                    Overview
                  </h2>
                  <p>
                    WiseDroid AI simplifies the process of creating and deploying powerful AI agents for your business needs. With our intuitive dashboard interface, you can go from concept to deployment in just a few clicks. This guide will walk you through the entire process of creating and deploying your first agent.
                  </p>
                </div>

                {/* Step 1 */}
                <div className="relative my-16">
                  <div className="absolute left-0 top-0 flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600 text-white font-bold text-lg">
                    1
                  </div>
                  <div className="ml-16">
                    <h3 className="text-xl font-bold text-gray-900">Access Your Dashboard</h3>
                    <p className="mt-2 text-gray-600">
                      Log in to your WiseDroid AI account and navigate to the dashboard. The dashboard provides a comprehensive overview of all your existing agents and their performance metrics.
                    </p>
                    <div className="mt-6 bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <Zap className="h-5 w-5 text-indigo-500 mr-2" />
                        <span>Pro Tip: Pin frequently used agents to the top of your dashboard for quick access.</span>
                      </div>
                      <img src="https://firebasestorage.googleapis.com/v0/b/wisedroids-c9988.appspot.com/o/Screenshot%202025-04-17%20at%201.06.42%E2%80%AFPM.png?alt=media&token=3cd17efb-ec7a-4750-ab4c-55a34022658f" alt="WiseDroid Dashboard" className="rounded-md shadow-sm w-full" />
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative my-16">
                  <div className="absolute left-0 top-0 flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600 text-white font-bold text-lg">
                    2
                  </div>
                  <div className="ml-16">
                    <h3 className="text-xl font-bold text-gray-900">Create a New Agent</h3>
                    <p className="mt-2 text-gray-600">
                      Click on the "Create Agent" button in the top right corner of your dashboard. This will open the agent creation wizard that will guide you through the process.
                    </p>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="font-medium text-gray-900 mb-2">Basic Agent Information</h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                          <li>Enter a unique name for your agent</li>
                          <li>Provide a detailed description of its purpose</li>
                          <li>Select the agent's primary category</li>
                          <li>Set visibility (public or private)</li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="font-medium text-gray-900 mb-2">Agent Configuration</h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                          <li>Define agent capabilities</li>
                          <li>Set up response parameters</li>
                          <li>Configure rate limits and quotas</li>
                          <li>Add team members (Enterprise plan)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative my-16">
                  <div className="absolute left-0 top-0 flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600 text-white font-bold text-lg">
                    3
                  </div>
                  <div className="ml-16">
                    <h3 className="text-xl font-bold text-gray-900">Select Capabilities & Integrations</h3>
                    <p className="mt-2 text-gray-600">
                      Choose from our library of pre-built capabilities and integrations to power your agent. This determines what your agent can do and which services it can interact with.
                    </p>
                    <div className="mt-6 bg-gray-50 rounded-lg p-6">
                      <h4 className="font-medium text-gray-900 mb-4">Common Capabilities & Integrations</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                          <div className="flex items-center mb-3">
                            <Layers className="h-5 w-5 text-indigo-500 mr-2" />
                            <h5 className="font-medium text-gray-900">Natural Language</h5>
                          </div>
                          <p className="text-sm text-gray-600">
                            Allow your agent to understand and respond to natural language queries.
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                          <div className="flex items-center mb-3">
                            <Layers className="h-5 w-5 text-indigo-500 mr-2" />
                            <h5 className="font-medium text-gray-900">Data Analysis</h5>
                          </div>
                          <p className="text-sm text-gray-600">
                            Process and analyze data to extract insights and make recommendations.
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                          <div className="flex items-center mb-3">
                            <Layers className="h-5 w-5 text-indigo-500 mr-2" />
                            <h5 className="font-medium text-gray-900">Task Automation</h5>
                          </div>
                          <p className="text-sm text-gray-600">
                            Automate repetitive tasks and workflows to increase efficiency.
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                          <div className="flex items-center mb-3">
                            <Layers className="h-5 w-5 text-indigo-500 mr-2" />
                            <h5 className="font-medium text-gray-900">Slack Integration</h5>
                          </div>
                          <p className="text-sm text-gray-600">
                            Connect your agent to Slack channels and direct messages.
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                          <div className="flex items-center mb-3">
                            <Layers className="h-5 w-5 text-indigo-500 mr-2" />
                            <h5 className="font-medium text-gray-900">CRM Integration</h5>
                          </div>
                          <p className="text-sm text-gray-600">
                            Connect to popular CRM systems like Salesforce, HubSpot, etc.
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                          <div className="flex items-center mb-3">
                            <Layers className="h-5 w-5 text-indigo-500 mr-2" />
                            <h5 className="font-medium text-gray-900">Email Integration</h5>
                          </div>
                          <p className="text-sm text-gray-600">
                            Send and receive emails through your agent's functionality.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative my-16">
                  <div className="absolute left-0 top-0 flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600 text-white font-bold text-lg">
                    4
                  </div>
                  <div className="ml-16">
                    <h3 className="text-xl font-bold text-gray-900">Generate & Enhance Code</h3>
                    <p className="mt-2 text-gray-600">
                      Once you've configured your agent's capabilities and integrations, WiseDroid AI automatically generates the code for your agent. You can review, enhance, and customize this code as needed.
                    </p>
                    <div className="mt-6">
                      <div className="bg-gray-800 rounded-t-lg p-4 flex items-center justify-between">
                        <div className="flex space-x-2">
                          <div className="h-3 w-3 rounded-full bg-red-500"></div>
                          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-gray-400 text-sm">main.py</div>
                        <button 
                          onClick={() => copyToClipboard(sampleCode)}
                          className="flex items-center text-gray-400 hover:text-white"
                        >
                          {copied ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <div className="bg-gray-900 rounded-b-lg p-4 overflow-x-auto">
                        <pre className="text-gray-100 text-sm">
                          <code>{sampleCode}</code>
                        </pre>
                      </div>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-indigo-50 p-4 rounded-md">
                          <h4 className="font-medium text-indigo-800 mb-2 flex items-center">
                            <Code className="h-5 w-5 mr-2" />
                            Code Generation
                          </h4>
                          <p className="text-sm text-indigo-700">
                            Our AI automatically generates optimized code based on your selected capabilities and integrations.
                          </p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-md">
                          <h4 className="font-medium text-green-800 mb-2 flex items-center">
                            <Zap className="h-5 w-5 mr-2" />
                            Code Enhancement
                          </h4>
                          <p className="text-sm text-green-700">
                            Use our built-in code editor to customize your agent's behavior and add custom logic.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="relative my-16">
                  <div className="absolute left-0 top-0 flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600 text-white font-bold text-lg">
                    5
                  </div>
                  <div className="ml-16">
                    <h3 className="text-xl font-bold text-gray-900">Execute & Create Agent</h3>
                    <p className="mt-2 text-gray-600">
                      Test your agent's functionality by executing it in our sandbox environment. Once you're satisfied with its performance, finalize creation with a single click.
                    </p>
                    <div className="mt-6 bg-gray-50 rounded-lg p-6">
                      <div className="mb-6">
                        <h4 className="font-medium text-gray-900 mb-2">Test Execution</h4>
                        <p className="text-sm text-gray-600">
                          Before finalizing your agent, test it with sample queries and tasks to ensure it performs as expected. Our sandbox environment provides real-time feedback on your agent's responses and actions.
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                        <h5 className="font-medium text-gray-900 mb-2">Sample Outputs</h5>
                        <div className="border-l-4 border-green-500 pl-4 py-2 mb-2">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Input:</span> "What is the status of my order #12345?"
                          </p>
                          <p className="text-sm text-gray-800 mt-1">
                            <span className="font-medium">Agent Response:</span> "I've found your order #12345. It's currently in transit and expected to arrive by April 20th. Would you like to receive tracking updates?"
                          </p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4 py-2">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Input:</span> "I need to process a return for my recent purchase."
                          </p>
                          <p className="text-sm text-gray-800 mt-1">
                            <span className="font-medium">Agent Response:</span> "I'd be happy to help you process a return. To get started, could you please provide your order number or the email address used for the purchase?"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 6 */}
                <div className="relative my-16">
                  <div className="absolute left-0 top-0 flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600 text-white font-bold text-lg">
                    6
                  </div>
                  <div className="ml-16">
                    <h3 className="text-xl font-bold text-gray-900">Connect to GitHub & Deploy</h3>
                    <p className="mt-2 text-gray-600">
                      Connect your WiseDroid AI account to GitHub to manage your agent's code in a repository. Then, deploy your agent to Render.com directly from our dashboard for production use.
                    </p>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center mb-4">
                          <Github className="h-6 w-6 text-gray-900 mr-2" />
                          <h4 className="font-medium text-gray-900">GitHub Integration</h4>
                        </div>
                        <ul className="text-sm text-gray-600 space-y-2">
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-indigo-500 mt-0.5 mr-1 flex-shrink-0" />
                            <span>Connect to your GitHub account</span>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-indigo-500 mt-0.5 mr-1 flex-shrink-0" />
                            <span>Select existing repository or create new</span>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-indigo-500 mt-0.5 mr-1 flex-shrink-0" />
                            <span>Automatically push agent code to repository</span>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-indigo-500 mt-0.5 mr-1 flex-shrink-0" />
                            <span>Enable version control and collaboration</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center mb-4">
                          <Terminal className="h-6 w-6 text-gray-900 mr-2" />
                          <h4 className="font-medium text-gray-900">Render Deployment</h4>
                        </div>
                        <ul className="text-sm text-gray-600 space-y-2">
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-indigo-500 mt-0.5 mr-1 flex-shrink-0" />
                            <span>Connect to your Render.com account</span>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-indigo-500 mt-0.5 mr-1 flex-shrink-0" />
                            <span>Configure deployment settings</span>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-indigo-500 mt-0.5 mr-1 flex-shrink-0" />
                            <span>Deploy agent with one click</span>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-indigo-500 mt-0.5 mr-1 flex-shrink-0" />
                            <span>Monitor deployment status from dashboard</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="bg-indigo-50 rounded-lg p-6 mt-12">
                  <h3 className="text-xl font-bold text-indigo-900 mb-4">What's Next?</h3>
                  <p className="text-indigo-700 mb-4">
                    Once your agent is deployed, you can:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-indigo-600 mt-0.5 mr-1 flex-shrink-0" />
                      <span className="text-indigo-700">Monitor your agent's performance and usage metrics in the dashboard</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-indigo-600 mt-0.5 mr-1 flex-shrink-0" />
                      <span className="text-indigo-700">Train your agent with more data to improve its performance</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-indigo-600 mt-0.5 mr-1 flex-shrink-0" />
                      <span className="text-indigo-700">Integrate your agent with additional services and platforms</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-indigo-600 mt-0.5 mr-1 flex-shrink-0" />
                      <span className="text-indigo-700">Create custom UI interfaces for your agent using our API</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <a href="#" className="flex items-center text-indigo-600 font-medium hover:text-indigo-800">
                      Learn more about agent management <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}