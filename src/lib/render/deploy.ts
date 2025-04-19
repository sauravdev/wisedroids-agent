import axios from "axios";

export async function deployAgent({name,repo,buildCommand,startCommand} : {name: string, repo: string,buildCommand:string,startCommand:string}) {
    const url = import.meta.env.VITE_API || 'http://localhost:5002/api/v1';
    try {
      const payload = {
        name : name,
        repo : repo,
        buildCommand : buildCommand,
        startCommand : startCommand,
      }
      const response = await axios.post(`${url}/candidate/deploy-agent`,payload);
      return response
    } catch (error) {
      console.error('Error enhancing code:', error);
      throw new Error('Failed to enhance code. Please try again.');
    }
  }
export async function redeployAgent({service_id} : {service_id: string}) {
    const url = import.meta.env.VITE_API || 'http://localhost:5002/api/v1';
    try {
      const payload = {
        service_id : service_id,
      }
      const response = await axios.post(`${url}/candidate/redeploy-agent`,payload);
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

export async function deleteGitRepo(repoURL:string) {
  try {
    const options = {
      headers: {
        Authorization: `token ${localStorage.getItem('githubToken')}`,
        Accept: 'application/vnd.github.v3+json',
      }
    };
    const response = await axios.delete(repoURL, options);
    if (response.data) {
      console.log('Repository deleted successfully');
    }
  } catch (error) {
    console.error('Error deleting repository:', error);
    throw new Error('Failed to delete repository. Please try again.');
    
  }
}