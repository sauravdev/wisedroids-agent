import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
interface LogLabel {
  name: string;
  value: string;
}

interface LogEntry {
  id: string;
  labels: LogLabel[];
  message: string;
  timestamp: string;
}

interface LogsResponse {
  hasMore: boolean;
  logs: LogEntry[];
  nextEndTime?: string;
  nextStartTime?: string;
}

interface AgentLogsModalProps {
  serviceId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function AgentLogsModal({ serviceId, isOpen, onClose }: AgentLogsModalProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = import.meta.env.VITE_API || "http://localhost:5002/api/v1";
      const res = await axios.post(`${url}/candidate/logs-agent`, { service_id: serviceId });
      if (!res.status) throw new Error('Failed to fetch logs');
      const data: LogsResponse = await res.data.data;
      if(data.logs.length > 0) {
        setLogs(data.logs);
      }
      
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    fetchLogs();
    intervalRef.current = setInterval(fetchLogs, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isOpen, serviceId]);

  if (!isOpen) return null;

  const getLevel = (labels: LogLabel[]) => {
    const level = labels.find(l => l.name === 'level');
    return level ? level.value : 'info';
  };

  const getColor = (level: string) => {
    switch (level) {
      case 'error':
        return 'text-red-600';
      case 'warning':
        return 'text-yellow-700';
      case 'info':
      default:
        return 'text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Live Agent Logs</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50">
          {loading && <div className="text-center text-gray-500">Loading logs...</div>}
          {error && <div className="text-center text-red-500">{error}</div>}
          {!loading && !error && logs.length === 0 && (
            <div className="text-center text-gray-400">No logs found.</div>
          )}
          <ul className="space-y-2">
            {logs.map(log => {
              const level = getLevel(log.labels);
              const color = getColor(level);
              return (
                <li key={log.id} className="text-xs">
                  <span className="text-gray-400 mr-2">[{new Date(log.timestamp).toLocaleString()}]</span>
                  <span className={`font-semibold mr-2 ${color}`}>{level.toUpperCase()}</span>
                  <span className={color}>{log.message || <span className="italic text-gray-300">(no message)</span>}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
} 