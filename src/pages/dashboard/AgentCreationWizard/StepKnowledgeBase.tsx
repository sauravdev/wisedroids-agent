import React, { useCallback } from 'react';
import { Upload, X } from 'lucide-react';

interface File {
  id: string;
  name: string;
  size: string;
}

interface StepKnowledgeBaseProps {
  files: File[];
  setFiles: (files: File[]) => void;
}

export function StepKnowledgeBase({ files, setFiles }: StepKnowledgeBaseProps) {
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const newFiles = droppedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`
    }));
    setFiles([...files, ...newFiles]);
  }, [files, setFiles]);

  const removeFile = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Knowledge Base</h2>
      <p className="text-gray-600">Upload documents or provide links to train your AI agent.</p>
      
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors"
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-gray-600">Drag and drop files here, or click to select files</p>
        <p className="text-sm text-gray-500">PDF, DOC, TXT up to 10MB each</p>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500">{file.size}</p>
              </div>
              <button
                onClick={() => removeFile(file.id)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}