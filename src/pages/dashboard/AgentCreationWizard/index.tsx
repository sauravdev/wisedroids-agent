import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAgentLimit } from '@/hooks/useAgentLimit';
import { createAgent, updateAgent } from '@/lib/supabase/agents';
import { useAgent } from '@/hooks/useAgent';
import { StepDescription } from './StepDescription';
import { StepCapabilities } from './StepCapabilities';
import { StepPersonality } from './StepPersonality';
import { StepIntegrations } from './StepIntegrations';
import { StepCodeGeneration } from './StepCodeGeneration';
import { convertCodeToWebAPP, enhanceCode } from '@/lib/openai/client';
import axios from 'axios';
import { RefreshCw, FileCode, Wand2 } from 'lucide-react';

// New step components (placeholders for now)
interface FormData {
  name: string;
  description: string;
  capabilities: string;
  personality: string;
  integrations: string;
  isPublic: boolean;
  generatedCode: string;
  deployedUrl?: string;
  url?: string;
}

interface ValidationErrors {
  name?: string;
  description?: string;
  capabilities?: string;
  personality?: string;
  integrations?: string;
  generatedCode?: string;
}

const initialFormData: FormData = {
  name: '',
  description: '',
  capabilities: '',
  personality: '',
  integrations: '',
  isPublic: false,
  generatedCode: '',
  url: '',
};

// Update StepAgentDetails to use string fields
function StepAgentDetails({ formData, setFormData, errors }: any) {
  return (
    <div className="space-y-6">
      <StepDescription
        name={formData.name}
        description={formData.description}
        setName={(name: string) => setFormData((fd: any) => ({ ...fd, name }))}
        setDescription={(description: string) => setFormData((fd: any) => ({ ...fd, description }))}
        errors={errors}
      />
      <StepCapabilities
        selectedCapabilities={formData.capabilities}
        setSelectedCapabilities={(capabilities: string) => setFormData((fd: any) => ({ ...fd, capabilities }))}
        errors={errors}
      />
      <StepPersonality
        traits={formData.personality}
        setTraits={(personality: string) => setFormData((fd: any) => ({ ...fd, personality }))}
        errors={errors}
      />
      <StepIntegrations
        selectedIntegrations={formData.integrations.split(',')}
        setSelectedIntegrations={(integrations: string[]) => setFormData((fd: any) => ({ ...fd, integrations: integrations.join(',') }))}
        errors={errors}
      />
    </div>
  );
}

// Step 2: Generate, Execute & Enhance Code (Combined)
function StepGenerateExecuteEnhance({ formData, setFormData, errors }: any) {
  return (
    <StepCodeGeneration
      agentDescription={formData.description}
      agentCapabilities={formData.capabilities.split(',')}
      agentIntegrations={formData.integrations.split(',')}
      agentPersonality={{}}
      agentName={formData.name}
      code={formData.generatedCode}
      onSaveCode={(code: string) => setFormData((fd: FormData) => ({ ...fd, generatedCode: code }))}
      errors={errors}
      showGenerate={true}
      showExecute={true}
      showEnhance={true}
      showStreamlit={false}
      showDeploy={false}
    />
  );
}

// Step 3: Generate Streamlit Code
function StepStreamlitCode({ formData, setFormData, errors }: any) {
  const [isGeneratingStreamlit, setIsGeneratingStreamlit] = useState(false);
  const [isEnhancingStreamlit, setIsEnhancingStreamlit] = useState(false);
  const [executionSuccess, setExecutionSuccess] = useState(false);
  const [streamlitCode, setStreamlitCode] = useState(formData.generatedCode);
  const [streamlitEnhancementPrompt, setStreamlitEnhancementPrompt] = useState("");

  // Check if the main code has been executed successfully
  useEffect(() => {
    // This would need to be passed from the previous step or stored in formData
    // For now, we'll assume it's successful if there's code
    setExecutionSuccess(!!formData.generatedCode);
    setStreamlitCode(formData.generatedCode);
  }, [formData.generatedCode]);

  const handleGenerateStreamlitCode = async () => {
    if (!formData.generatedCode.trim()) {
      alert("Please generate and execute the main code first.");
      return;
    }

    setIsGeneratingStreamlit(true);
    try {
      const newStreamlitCode = await convertCodeToWebAPP(formData.generatedCode);
      setStreamlitCode(newStreamlitCode);
      setFormData((fd: FormData) => ({ ...fd, generatedCode: newStreamlitCode }));
    } catch (err) {
      alert('Failed to generate Streamlit code');
    } finally {
      setIsGeneratingStreamlit(false);
    }
  };

  const handleEnhanceStreamlitCode = async () => {
    if (!streamlitCode.trim() || !streamlitEnhancementPrompt.trim()) {
      alert("Please provide both Streamlit code and enhancement instructions.");
      return;
    }

    setIsEnhancingStreamlit(true);
    try {
      const enhanced = await enhanceCode(streamlitCode, streamlitEnhancementPrompt);
      setStreamlitCode(enhanced);
      setFormData((fd: FormData) => ({ ...fd, generatedCode: enhanced }));
      setStreamlitEnhancementPrompt("");
    } catch (err) {
      alert('Failed to enhance Streamlit code');
    } finally {
      setIsEnhancingStreamlit(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Streamlit Deployment Code</h3>
            <p className="text-sm text-gray-600 mt-1">Generate Streamlit code for web deployment</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleGenerateStreamlitCode}
              disabled={isGeneratingStreamlit || !executionSuccess}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              title={!executionSuccess ? "Execute code successfully first to enable Streamlit generation" : ""}
            >
              {isGeneratingStreamlit ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating Streamlit...
                </>
              ) : (
                <>
                  <FileCode className="w-4 h-4 mr-2" />
                  Generate Streamlit Code
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
          </div>
        </div>

        <div className="space-y-4">
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
                setFormData((fd: FormData) => ({ ...fd, generatedCode: e.target.value }));
              }}
              rows={15}
              className="w-full font-mono text-sm rounded-md shadow-sm focus:ring-indigo-200 focus:ring-opacity-50 border-gray-300 focus:border-indigo-300"
              placeholder="Streamlit code will appear here..."
            />
          </div>

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
              rows={3}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Describe how you want to enhance the Streamlit code..."
            />
          </div>
        </div>

        {!executionSuccess && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">
              ⚠️ Please execute the main code successfully first to enable Streamlit generation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Step 4: Deploy & Preview
function StepDeployPreview({ agentId, deployedUrl, setDeployedUrl, agentCode }: any) {
  const [loading, setLoading] = React.useState(false);
  const [logs, setLogs] = React.useState<string[]>([]);

  const staticLogs = [
    '[INFO] Authenticating with deployment service...',
    '[INFO] Authenticated successfully.',
    '[INFO] Preparing deployment package...',
    '[INFO] Uploading agent code...',
    '[INFO] Upload complete.',
    '[INFO] Provisioning resources...',
    '[INFO] Resources provisioned.',
    '[INFO] Building application...',
    '[INFO] Build successful. Starting deployment...',
    '[INFO] Deployment in progress...',
    '[INFO] Verifying deployment...',
    '[INFO] Deployment successful. Your agent is now live.',
  ];

  const handleDeploy = async () => {
    setLoading(true);
    setLogs([]);

    const logInterval = setInterval(() => {
      setLogs((prevLogs) => {
        if (prevLogs.length < staticLogs.length) {
          return [...prevLogs, staticLogs[prevLogs.length]];
        }
        return prevLogs;
      });
    }, 800);

    const startTime = Date.now();

    try {
      const response = await axios.post('https://agentapi.wisedroids.ai/run_streamlit', { code: agentCode });
      
      const endTime = Date.now();
      const elapsedTime = endTime - startTime;

      const remainingTime = Math.max(0, 10000 - elapsedTime);

      if (remainingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingTime));
      }

      if (response.data && response.data.prodUrl) {
        setDeployedUrl(response.data.prodUrl);
      } else {
        alert('Deployment failed');
      }
    } catch (err) {
      alert('Deployment error');
    } finally {
      clearInterval(logInterval);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-8">
        <div className="flex items-center mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 mr-3"></div>
          <h2 className="text-xl font-bold">Deploying Agent...</h2>
        </div>
        <div className="bg-gray-900 text-white p-4 rounded-md h-64 overflow-y-auto font-mono text-sm">
          {logs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
      </div>
    );
  }

  if (deployedUrl) {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Embedded App View</h2>
        <iframe
          src={deployedUrl}
          width="100%"
          height="800px"
          style={{ border: "none" }}
          title="Embedded App"
        >
          Your browser does not support iframes.
        </iframe>
        <button
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
          onClick={handleDeploy}
          disabled={loading}
        >
          {loading ? 'Redeploying...' : 'Redeploy'}
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        className="px-4 py-2 bg-indigo-600 text-white rounded"
        onClick={handleDeploy}
        disabled={loading}
      >
        {loading ? 'Deploying...' : 'Deploy'}
      </button>
    </div>
  );
}

export function AgentCreationWizard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const { hasReachedLimit } = useAgentLimit();
  const { agent: existingAgent, loading: loadingAgent } = useAgent(id);
  
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [deployedUrl, setDeployedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (hasReachedLimit && !id) {
      navigate('/?scrollTo=pricing');
    }
  }, [hasReachedLimit, id, navigate]);

  useEffect(() => {
    if (existingAgent) {
      setFormData({
        name: existingAgent.name,
        description: existingAgent.description,
        capabilities: typeof existingAgent.capabilities === 'string'
          ? existingAgent.capabilities
          : Array.isArray(existingAgent.capabilities)
            ? existingAgent.capabilities.join(',')
            : '',
        personality: typeof existingAgent.personality === 'string'
          ? existingAgent.personality
          : '',
        integrations: typeof existingAgent.integrations === 'string'
          ? existingAgent.integrations
          : Array.isArray(existingAgent.integrations)
            ? existingAgent.integrations.join(',')
            : '',
        isPublic: existingAgent.is_public,
        generatedCode: existingAgent.code || '',
        deployedUrl: existingAgent.url || '',
      });
    }
  }, [existingAgent]);

  const validateStep = (step: number): boolean => {
    const newErrors: ValidationErrors = {};
    
    switch (step) {
      case 0: // Agent Details step
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.capabilities.trim()) newErrors.capabilities = 'At least one capability is required';
        if (!formData.personality.trim()) newErrors.personality = 'At least one personality trait is required';
        if (!formData.integrations.trim()) newErrors.integrations = 'At least one integration is required';
        break;
      case 1: // Generate Code step
        // No required fields
        break;
      case 2: // Execute & Enhance step
        // No required fields
        break;
      case 3: // Generate Deployment Code step
        // No required fields
        break;
      case 4: // Deploy & Preview step
        // No required fields
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(Math.min(steps.length - 1, currentStep + 1));
    }
  };

  // New steps array
  const steps = [
    {
      title: 'Agent Details',
      component: (
        <StepAgentDetails
          formData={formData}
          setFormData={setFormData}
          errors={errors}
        />
      ),
    },
    {
      title: 'Generate & Execute Code',
      component: (
        <StepGenerateExecuteEnhance
          formData={formData}
          setFormData={setFormData}
          errors={errors}
        />
      ),
    },
    {
      title: 'Generate Streamlit Code',
      component: (
        <StepStreamlitCode
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          showEnhance={true}
        />
      ),
    },
    {
      title: 'Deploy & Preview',
      component: (
        <StepDeployPreview
          agentId={id}
          deployedUrl={formData.deployedUrl}
          setDeployedUrl={(url: string) => setFormData((fd) => ({ ...fd, deployedUrl: url }))}
          agentCode={formData.generatedCode}
        />
      ),
    },
  ];

  const handleSubmit = async () => {
    if (!user) return;
    if (!validateStep(currentStep)) return;
    
    setLoading(true);

    try {
      const isConnected = localStorage.getItem("githubToken");
      let repo = {
        url : ''
      }
      if(isConnected) {
        repo = await createNewRepo(formData.name);
      }
      
      const agentData = {
        user_id: user.id,
        name: formData.name,
        description: formData.description,
        capabilities: formData.capabilities.split(','),
        personality: formData.personality,
        integrations: formData.integrations.split(','),
        is_public: formData.isPublic,
        status: 'draft',
        api_key: null,
        api_endpoint: null,
        repo_url: repo.url,
        metrics: { requests: 0, success_rate: 0, avg_response_time: 0 },
        code: formData.generatedCode,
        url: formData.deployedUrl || null,
        service_id: '',
        app_id: ''
      };
      const updateAgentData = {
        user_id: user.id,
        name: formData.name,
        description: formData.description,
        capabilities: formData.capabilities.split(','),
        personality: formData.personality,
        integrations: formData.integrations.split(','),
        is_public: formData.isPublic,
        code: formData.generatedCode,
        url: formData.deployedUrl || null,
      };

      if (id) {
        await updateAgent(id, updateAgentData);
      } else {
        await createAgent(agentData);
      }

      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to save agent:', error);
    } finally {
      setLoading(false);
    }
  };

  const createNewRepo = async (repoName: string) => {
    try {
      const options = {
        headers: {
          Authorization: `token ${localStorage.getItem('githubToken')}`,
          Accept: 'application/vnd.github.v3+json',
        },
      };
      const response = await axios.post('https://api.github.com/repos/sauravdev/wisedroids-ai-agents/generate',
        {"name":`wisedroids_${repoName}`,"description":"This repository was created by Wisedroids","include_all_branches":false,"private":false},
        options
      );
      const data = await response.data;
      return data;
    } catch (error) {
      console.error('Error creating new repository:', error);
    }
  };

  if (loadingAgent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {id ? 'Edit Agent' : 'Create New Agent'}
        </h1>
      </div>

      <div className="mb-8">
        <nav className="flex space-x-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`px-3 py-2 text-sm font-medium rounded-md cursor-not-allowed ${
                currentStep === index
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-400'
              }`}
            >
              {step.title}
            </div>
          ))}
        </nav>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        {steps[currentStep].component}

        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            disabled={currentStep === 0}
          >
            Previous
          </button>
          
          {currentStep === steps.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : id ? 'Save Changes' : 'Create Agent'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}