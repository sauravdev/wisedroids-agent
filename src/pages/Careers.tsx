import React from 'react';
import { CareerForm } from '@/components/forms/CareerForm';

const openPositions = [
  {
    title: 'Senior AI Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
  },
  {
    title: 'Product Manager',
    department: 'Product',
    location: 'San Francisco, CA',
    type: 'Full-time',
  },
  {
    title: 'ML Research Scientist',
    department: 'Research',
    location: 'Remote',
    type: 'Full-time',
  },
];

export function Careers() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Join Our Team</h2>
          <p className="mt-4 text-lg text-gray-500">
            Help us shape the future of AI technology
          </p>
        </div>

        <div className="mt-16">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Open Positions</h3>
          <div className="grid gap-6 mb-16">
            {openPositions.map((position, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
              >
                <h4 className="text-lg font-medium text-gray-900">{position.title}</h4>
                <div className="mt-2 flex flex-wrap gap-4">
                  <span className="text-sm text-gray-500">{position.department}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{position.location}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{position.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Apply Now</h3>
          <CareerForm />
        </div>
      </div>
    </div>
  );
}