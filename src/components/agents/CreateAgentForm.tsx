import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { createAgent } from '@/lib/supabase/agents';
import type { Agent } from '@/lib/supabase/agents';

interface FormData {
  name: string;
  description: string;
  capabilities: string[];
  personality: Record<string, number>;
  integrations: string[];
  isPublic: boolean;
}

interface FormErrors {
  name?: string;
  description?: string;
  capabilities?: string;
  personality?: string;
  integrations?: string;
}

export function CreateAgentForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    capabilities: [],
    personality: {},
    integrations: [],
    isPublic: false
  });

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (formData.capabilities.length === 0) newErrors.capabilities = 'Select at least one capability';
    if (Object.keys(formData.personality).length === 0) newErrors.personality = 'Set personality traits';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    setProgress(0);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      const agentData: Omit<Agent, 'id' | 'created_at' | 'updated_at'> = {
        user_id: user!.id,
        name: formData.name,
        description: formData.description,
        capabilities: formData.capabilities,
        personality: formData.personality,
        integrations: formData.integrations,
        is_public: formData.isPublic,
        status: 'draft',
        api_key: null,
        api_endpoint: null,
        metrics: { requests: 0, success_rate: 0, avg_response_time: 0 }
      };

      await createAgent(agentData);
      clearInterval(progressInterval);
      setProgress(100);
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Failed to create agent:', error);
      setErrors({ ...errors, submit: 'Failed to create agent' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Creating Your AI Agent</h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">
            {progress < 30 && 'Initializing agent...'}
            {progress >= 30 && progress < 60 && 'Configuring capabilities...'}
            {progress >= 60 && progress < 90 && 'Setting up integrations...'}
            {progress >= 90 && 'Almost done...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form fields here */}
    </form>
  );
}