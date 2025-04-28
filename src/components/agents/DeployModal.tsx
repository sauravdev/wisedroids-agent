import React, { useState } from 'react';

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeploy: (name: string, repoURL: string, repoName: string, code: string, buildCommand: string, startCommand: string) => void;
  agent: {
    id: string;
    name: string;
    code?: string;
  };
}

export function DeployModal({ isOpen, onClose, onDeploy, agent }: DeployModalProps) {
  const [repoURL, setRepoURL] = useState('');
  const [repoName, setRepoName] = useState('');
  const [buildCommand, setBuildCommand] = useState('pip install -r requirements.txt');
  const [startCommand, setStartCommand] = useState('python main.py');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDeploy(agent.name, repoURL, repoName, agent.code || '', buildCommand, startCommand);
    onClose();
  };

  // ... rest of the component code ...
} 