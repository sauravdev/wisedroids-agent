import axios from "axios";

export async function deployAgent({name,repo} : {name: string, repo: string}) {
    const url = import.meta.env.VITE_API || 'http://localhost:5002/api/v1';
    try {
      const payload = {
        name : name,
        repo : repo
      }
      const response = await axios.post(`${url}/candidate/deploy-agent`,payload);
      return response
    } catch (error) {
      console.error('Error enhancing code:', error);
      throw new Error('Failed to enhance code. Please try again.');
    }
  }

export async function deleteDeployedAgent(service_id:string | null) {
    const url = import.meta.env.VITE_API || 'http://localhost:5002/api/v1';
    try {
      const payload = {
        service_id : service_id,
      }
      const response = await axios.post(`${url}/candidate/delete-agent`,payload);
      return response
    } catch (error) {
      console.error('Error enhancing code:', error);
      throw new Error('Failed to enhance code. Please try again.');
    }
}