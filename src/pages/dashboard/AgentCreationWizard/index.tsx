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
import axios from 'axios';

interface FormData {
  name: string;
  description: string;
  capabilities: string;
  personality: string;
  integrations: string;
  isPublic: boolean;
  generatedCode: string;
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
  generatedCode: ''
};

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
        capabilities: existingAgent.capabilities,
        personality: existingAgent.personality,
        integrations: existingAgent.integrations,
        isPublic: existingAgent.is_public,
        generatedCode: existingAgent.code || ''
      });
    }
  }, [existingAgent]);

  const validateStep = (step: number): boolean => {
    const newErrors: ValidationErrors = {};
    
    switch (step) {
      case 0: // Description step
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        break;
      case 1: // Capabilities step
        if (formData.capabilities.length === 0) newErrors.capabilities = 'At least one capability is required';
        break;
      case 2: // Personality step
        if (Object.keys(formData.personality).length === 0) newErrors.personality = 'At least one personality trait is required';
        break;
      case 3: // Integrations step
        if (formData.integrations.length === 0) newErrors.integrations = 'At least one integration is required';
        break;
      case 4: // Code Generation step
        if (!formData.generatedCode.trim()) newErrors.generatedCode = 'Generated code is required';
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

  const steps = [
    {
      title: 'Description',
      component: (
        <StepDescription
          name={formData.name}
          description={formData.description}
          setName={(name) => setFormData({ ...formData, name })}
          setDescription={(description) => setFormData({ ...formData, description })}
          errors={errors}
        />
      ),
    },
    {
      title: 'Capabilities',
      component: (
        <StepCapabilities
          selectedCapabilities={formData.capabilities}
          setSelectedCapabilities={(capabilities) => setFormData({ ...formData, capabilities })}
          errors={errors}
        />
      ),
    },
    {
      title: 'Personality',
      component: (
        <StepPersonality
          traits={formData.personality}
          setTraits={(personality) => setFormData({ ...formData, personality })}
          errors={errors}
        />
      ),
    },
    {
      title: 'Integrations',
      component: (
        <StepIntegrations
          selectedIntegrations={formData.integrations}
          setSelectedIntegrations={(integrations) => setFormData({ ...formData, integrations })}
          errors={errors}
        />
      ),
    },
    {
      title: 'Code Generation',
      component: (
        <StepCodeGeneration
          agentDescription={formData.description}
          agentCapabilities={formData.capabilities}
          agentIntegrations={formData.integrations}
          agentPersonality={formData.personality}
          agentName={formData.name}
          code={formData.generatedCode}
          onSaveCode={(code) => setFormData({ ...formData, generatedCode: code })}
          errors={errors}
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
        capabilities: formData.capabilities,
        personality: formData.personality,
        integrations: formData.integrations,
        is_public: formData.isPublic,
        status: 'draft',
        api_key: null,
        api_endpoint: null,
        repo_url: repo.url,
        metrics: { requests: 0, success_rate: 0, avg_response_time: 0 },
        code: formData.generatedCode
      };
      const updateAgentData = {
        user_id: user.id,
        name: formData.name,
        description: formData.description,
        capabilities: formData.capabilities,
        personality: formData.personality,
        integrations: formData.integrations,
        is_public: formData.isPublic,
        code: formData.generatedCode
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