import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { createAgent } from '@/lib/supabase/agents';
import type { Agent } from '@/lib/supabase/agents';
import axios from 'axios';

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

      const repo = await createNewRepo(formData.name);

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
        repo_url: repo.html_url,
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
  const createNewRepo = async (repoName: string,) => {
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
      )
      const data = await response.data;
      return data;
    } catch (error) {
      console.error('Error creating new repository:', error);
      setErrors({ ...errors, repo: 'Failed to create repository' });
      
    }
  }
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
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New AI Agent</h2>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Agent Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublic"
              checked={formData.isPublic}
              onChange={(e) => setFormData(prev => ({ ...prev, isPublic: e.target.checked }))}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700">
              Make this agent public
            </label>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Agent
          </button>
        </div>
      </div>
    </form>
  );
}