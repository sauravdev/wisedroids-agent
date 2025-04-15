import { useParams } from 'react-router-dom';
import { useAgent } from '@/hooks/useAgent';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import axios from 'axios';
import { useEffect, useState } from 'react';

export function AgentAnalytics() {
  const { id } = useParams<{ id: string }>();
  const { agent, loading, error } = useAgent(id!);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Process data for charts
  const processSuccessRateData = (data) => {
    if (!data || !data.successRate) return [];
    
    // We'll combine all status codes into one dataset with timestamps
    const timestampMap = {};
    
    // Process each status code dataset
    data.successRate.forEach(statusData => {
      const statusCode = statusData.labels.find(l => l.field === "statusCode")?.value;
      
      statusData.values.forEach(item => {
        const timestamp = new Date(item.timestamp).getTime();
        
        if (!timestampMap[timestamp]) {
          timestampMap[timestamp] = {
            timestamp: item.timestamp,
            time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            total: 0
          };
        }
        
        // Add this status code's value to the map
        timestampMap[timestamp][`status${statusCode}`] = item.value;
        timestampMap[timestamp].total += item.value;
      });
    });
    
    // Convert map to array and sort by timestamp
    return Object.values(timestampMap)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  };

  const processCpuUsageData = (data) => {
    if (!data || !data.cpuUsage || !data.cpuUsage[0]) return [];
    
    return data.cpuUsage[0].values.map(item => ({
      timestamp: item.timestamp,
      time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      cpuUsage: item.value * 100 // Convert to percentage
    }));
  };

  // Fetch stats
  const fetchStats = async () => {
    if (!agent?.service_id) return;
    
    setIsLoading(true);
    try {
      const url = import.meta.env.VITE_API || 'http://localhost:5002/api/v1';
      const response = await axios.post(`${url}/candidate/stats-agent`, { service_id: agent.service_id });
      
      if (response.data.code === 200) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Use the provided data directly for now - in production this would come from the API
  useEffect(() => {
    fetchStats();
    
    // In production, you would use:
    // fetchStats();
  }, [agent?.service_id]);

  // Prepare chart data
  const successRateData = stats ? processSuccessRateData(stats) : [];
  const cpuUsageData = stats ? processCpuUsageData(stats) : [];

  // Get only the data points where there was activity (non-zero values)
  const activeSuccessRateData = successRateData.filter(item => item.total > 0);
  const activeCpuPeriods = cpuUsageData.filter(item => item.cpuUsage > 0.05); // Filter for periods with significant CPU usage

  if (loading || isLoading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!agent) return <div>Agent not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Analytics for {agent.name}</h2>

      <div className="grid gap-6 mb-8">
        {/* Request Success Rate Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Request Success Rate by Status Code</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activeSuccessRateData.length > 0 ? activeSuccessRateData : successRateData.slice(-30)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                {stats && stats.successRate && stats.successRate.map((statusData) => {
                  const statusCode = statusData.labels.find(l => l.field === "statusCode")?.value;
                  return (
                    <Line 
                      key={statusCode}
                      type="monotone" 
                      dataKey={`status${statusCode}`} 
                      name={`Status ${statusCode}`} 
                      stroke={
                        statusCode === "200" ? "#10b981" : 
                        statusCode === "304" ? "#6366f1" : 
                        statusCode === "0" ? "#ef4444" :
                        statusCode === "502" ? "#f59e0b" : 
                        "#9333ea"
                      }
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CPU Usage Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">CPU Usage (%)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activeCpuPeriods.length > 0 ? activeCpuPeriods : cpuUsageData.slice(-30)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value.toFixed(3)}%`, 'CPU Usage']} />
                <Line 
                  type="monotone" 
                  dataKey="cpuUsage" 
                  stroke="#f59e0b" 
                  name="CPU Usage (%)" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Additional metrics could be added here */}
      </div>
      
      {/* Hidden element to store JSON data for demo purposes */}
      {/* <div id="pasteData" style={{ display: 'none' }}>
        {JSON.stringify({
          "successRate": [
            {
              "labels": [
                { "field": "statusCode", "value": "0" },
                { "field": "resource", "value": "srv-cvub9f1r0fns73fvndmg" }
              ],
              "values": [
                { "timestamp": "2025-04-14T08:35:00Z", "value": 0 },
                { "timestamp": "2025-04-14T09:11:00Z", "value": 1 },
                { "timestamp": "2025-04-14T09:20:00Z", "value": 1 },
                { "timestamp": "2025-04-14T09:26:00Z", "value": 1 }
              ],
              "unit": "unitless"
            },
            {
              "labels": [
                { "field": "resource", "value": "srv-cvub9f1r0fns73fvndmg" },
                { "field": "statusCode", "value": "200" }
              ],
              "values": [
                { "timestamp": "2025-04-14T08:35:00Z", "value": 0 },
                { "timestamp": "2025-04-14T09:35:00Z", "value": 0 }
              ],
              "unit": "unitless"
            },
            {
              "labels": [
                { "field": "resource", "value": "srv-cvub9f1r0fns73fvndmg" },
                { "field": "statusCode", "value": "304" }
              ],
              "values": [
                { "timestamp": "2025-04-14T08:35:00Z", "value": 0 },
                { "timestamp": "2025-04-14T09:08:00Z", "value": 2 },
                { "timestamp": "2025-04-14T09:11:00Z", "value": 10 },
                { "timestamp": "2025-04-14T09:20:00Z", "value": 2 }
              ],
              "unit": "unitless"
            },
            {
              "labels": [
                { "field": "resource", "value": "srv-cvub9f1r0fns73fvndmg" },
                { "field": "statusCode", "value": "502" }
              ],
              "values": [
                { "timestamp": "2025-04-14T08:35:00Z", "value": 0 },
                { "timestamp": "2025-04-14T09:35:00Z", "value": 0 }
              ],
              "unit": "unitless"
            }
          ],
          "cpuUsage": [
            {
              "labels": [
                { "field": "instance", "value": "srv-cvub9f1r0fns73fvndmg-tvjhd" },
                { "field": "service", "value": "srv-cvub9f1r0fns73fvndmg" },
                { "field": "resource", "value": "srv-cvub9f1r0fns73fvndmg" }
              ],
              "values": [
                { "timestamp": "2025-04-14T08:35:00Z", "value": 0.00012629999999997922 },
                { "timestamp": "2025-04-14T09:08:00Z", "value": 0.008243766666666671 },
                { "timestamp": "2025-04-14T09:09:00Z", "value": 0.0006372999999999962 },
                { "timestamp": "2025-04-14T09:10:00Z", "value": 0.0007610666666666728 },
                { "timestamp": "2025-04-14T09:11:00Z", "value": 0.01298961666666667 },
                { "timestamp": "2025-04-14T09:20:00Z", "value": 0.0008969999999999997 },
                { "timestamp": "2025-04-14T09:26:00Z", "value": 0.00012348333333331852 },
                { "timestamp": "2025-04-14T09:35:00Z", "value": 0.00011639999999998688 }
              ],
              "unit": "cpu"
            }
          ],
          "bandwidhtUsage": [
            {
              "labels": [
                { "field": "service", "value": "srv-cvub9f1r0fns73fvndmg" },
                { "field": "resource", "value": "srv-cvub9f1r0fns73fvndmg" }
              ],
              "values": [
                { "timestamp": "2025-04-14T09:00:00Z", "value": 0.0010509490966796875 }
              ],
              "unit": "mb"
            }
          ]
        })}
      </div> */}
    </div>
  );
}