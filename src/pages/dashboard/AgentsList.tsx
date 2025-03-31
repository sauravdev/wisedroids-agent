import { Link } from 'react-router-dom';
import { Edit2, Trash2, Play, Download } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  lastDeployed: string;
}

const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Customer Service Bot',
    description: 'Handles customer inquiries and support tickets',
    status: 'active',
    lastDeployed: '2024-03-15'
  },
  {
    id: '2',
    name: 'Data Analysis Assistant',
    description: 'Processes and analyzes business metrics',
    status: 'inactive',
    lastDeployed: '2024-03-10'
  }
];

export function AgentsList() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Your AI Agents</h3>
        <Link
          to="/dashboard/create-agent"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Create New Agent
        </Link>
      </div>
      
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {mockAgents.map((agent) => (
            <li key={agent.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-medium text-gray-900">{agent.name}</h4>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      agent.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{agent.description}</p>
                  <p className="mt-1 text-xs text-gray-400">Last deployed: {agent.lastDeployed}</p>
                </div>
                
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-500">
                    <Play className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-500">
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-500">
                    <Download className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-red-400 hover:text-red-500">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}