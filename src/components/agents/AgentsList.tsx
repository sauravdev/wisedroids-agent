import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { AgentCard } from "./AgentCard";
import { useAgents } from "@/hooks/useAgents";
import { useAgentActions } from "@/hooks/useAgentActions";
import { useAgentLimit } from "@/hooks/useAgentLimit";
import axios from "axios";
import { updateAgent } from '@/lib/supabase/agents';
import { deployAgent, redeployAgent } from "@/lib/render/deploy";
import { supabase } from "@/lib/supabase/client";
import { convertCodeToWebAPP } from "@/lib/openai/client";

export function AgentsList() {
  const { agents, loading, error } = useAgents();
  const { handleDelete, handleEdit, handleAnalytics } = useAgentActions();
  const { hasReachedLimit, remainingAgents, isChecking, subscriptionType } =
    useAgentLimit();
  const [loadingAgents, setLoadingAgents] = useState<Map<string, boolean>>(
    new Map()
  );

  // Function to check if deployment is still in progress
  const isDeploymentInProgress = (updatedAt: string) => {
    const lastUpdate = new Date(updatedAt);
    const now = new Date();
    const diffInMinutes = (now.getTime() - lastUpdate.getTime()) / (1000 * 60);
    return diffInMinutes < 3;
  };

  // Function to get deployment status
  const getDeploymentStatus = (agent: any) => {
    if (
      agent.status === "deployed" &&
      isDeploymentInProgress(agent.updated_at)
    ) {
      return "deploying";
    }
    return agent.status;
  };

  const handleCreateAgent = () => {
    window.location.href = "/dashboard/create-agent";
  };

  const updateAgentStatus = async (
    id: string,
    service_id: string,
    api_endpoint: string
  ) => {
    try {
      const { data, error } = await supabase
        .from("agents")
        .update({
          status: "deployed", // Set initial status as deploying
          service_id: service_id,
          api_endpoint: api_endpoint,
          updated_at: new Date().toISOString(), // Update the timestamp
        })
        .eq("id", id);

      if (error) {
        console.error("Error updating agent status:", error);
        return { success: false, error };
      }
      setLoadingAgents((prev) => {
        const newMap = new Map(prev);
        newMap.delete(id);
        return newMap;
      });
      window.location.reload();
      return { success: true, data };
    } catch (error) {
      console.error("Exception updating agent status:", error);
      setLoadingAgents((prev) => {
        const newMap = new Map(prev);
        newMap.delete(id);
        return newMap;
      });
      return { success: false, error };
    }
  };

  const updateReDeployAgentStatus = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("agents")
        .update({
          status: "deployed", // Set initial status as deploying
          updated_at: new Date().toISOString(), // Update the timestamp
        })
        .eq("id", id);

      if (error) {
        console.error("Error updating agent status:", error);
        return { success: false, error };
      }
      setLoadingAgents((prev) => {
        const newMap = new Map(prev);
        newMap.delete(id);
        return newMap;
      });
      window.location.reload();
      return { success: true, data };
    } catch (error) {
      console.error("Exception updating agent status:", error);
      setLoadingAgents((prev) => {
        const newMap = new Map(prev);
        newMap.delete(id);
        return newMap;
      });
      return { success: false, error };
    }
  };

  const updateAgentPublicStatus = async (id: string, is_public: boolean) => {
    try {
      const { data, error } = await supabase
        .from("agents")
        .update({
          is_public: is_public,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) {
        console.error("Error updating agent status:", error);
        return { success: false, error };
      }
      window.location.reload();
      return { success: true, data };
    } catch (error) {
      console.error("Exception updating agent status:", error);
      return { success: false, error };
    }
  };

  function toBase64Utf8(str: string) {
    return btoa(unescape(encodeURIComponent(str)));
  }

  // New deploy logic
  const handleDeploy = async (
    agent_id: string,
    name: string,
    repoURL: string,
    repoName: string,
    code: string,
    buildCommand: string,
    startCommand: string
  ) => {
    setLoadingAgents((prev) => {
      const newMap = new Map(prev);
      newMap.set(agent_id, true);
      return newMap;
    });

    try {
      // Call the new deploy API
      const response = await axios.post('https://agentapi.wisedroids.ai/run_streamlit', { code });
      if (response.data && response.data.success && response.data.prodUrl && response.data.app_id) {
        // Save url and app_id to agent in Supabase
        await updateAgent(agent_id, {
          url: response.data.prodUrl,
          app_id: response.data.app_id,
          status: 'deployed',
          updated_at: new Date().toISOString(),
        });
      }
      setLoadingAgents((prev) => {
        const newMap = new Map(prev);
        newMap.delete(agent_id);
        return newMap;
      });
      window.location.reload();
    } catch (error) {
      setLoadingAgents((prev) => {
        const newMap = new Map(prev);
        newMap.delete(agent_id);
        return newMap;
      });
      console.log(error);
    }
  };

  // Re-deploy logic - same as deploy but for already deployed agents
  const handleReDeploy = async (
    agent_id: string,
    name: string,
    repoURL: string,
    repoName: string,
    code: string,
    buildCommand: string,
    startCommand: string
  ) => {
    setLoadingAgents((prev) => {
      const newMap = new Map(prev);
      newMap.set(agent_id, true);
      return newMap;
    });

    try {
      // Call the same deploy API for re-deployment
      const response = await axios.post('https://agentapi.wisedroids.ai/run_streamlit', { code });
      if (response.data && response.data.success && response.data.prodUrl && response.data.app_id) {
        // Update url and app_id to agent in Supabase
        await updateAgent(agent_id, {
          url: response.data.prodUrl,
          app_id: response.data.app_id,
          status: 'deployed',
          updated_at: new Date().toISOString(),
        });
      }
      setLoadingAgents((prev) => {
        const newMap = new Map(prev);
        newMap.delete(agent_id);
        return newMap;
      });
      window.location.reload();
    } catch (error) {
      setLoadingAgents((prev) => {
        const newMap = new Map(prev);
        newMap.delete(agent_id);
        return newMap;
      });
      console.log(error);
    }
  };

  const handleTogglePublic = async (agentId: string, isPublic: boolean) => {
    await updateAgentPublicStatus(agentId, isPublic);
  };

  useEffect(() => {
    // No GitHub connection logic to remove
  }, []);

  if (loading || isChecking) {
    return <div className="text-center py-8">Loading agents...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">Failed to load agents</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Your AI Agents</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={handleCreateAgent}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5" />
            Create New Agent
          </button>
        </div>
      </div>

      {!hasReachedLimit && remainingAgents > 0 && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <p className="text-sm text-blue-700">
            You can create {remainingAgents} more agent
            {remainingAgents !== 1 ? "s" : ""} on the {subscriptionType} plan
          </p>
        </div>
      )}

      {hasReachedLimit && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <p className="text-sm text-yellow-700">
            You've reached the free plan limit.
            <Link
              to="/?scrollTo=pricing"
              className="ml-2 font-medium underline"
            >
              Upgrade your plan
            </Link>{" "}
            to create more agents.
          </p>
        </div>
      )}

      {agents.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No agents yet
          </h3>
          <p className="text-gray-500 mb-4">
            Create your first AI agent to get started
          </p>
          <button
            onClick={handleCreateAgent}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5" />
            Create New Agent
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={{
                id: agent.id,
                name: agent.name,
                description: agent.description,
                status: agent.status,
                is_public: agent.is_public,
                metrics: agent.metrics as { requests: number; success_rate: number; avg_response_time: number; } | undefined,
                api_endpoint: agent.api_endpoint || undefined,
                service_id: agent.service_id || undefined,
                repo_url: agent.repo_url || undefined,
                code: agent.code || undefined,
                build_command: (agent as any).build_command || 'npm run build',
                start_command: (agent as any).start_command || 'npm start',
                url: (agent as any).url || undefined, // Pass url to AgentCard
              }}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onAnalytics={handleAnalytics}
              onDeploy={handleDeploy}
              onReDeploy={handleReDeploy}
              onTogglePublic={handleTogglePublic}
              isLoading={loadingAgents.get(agent.id) || false}
              deploymentStatus={getDeploymentStatus(agent)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
