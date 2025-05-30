import React from 'react';
import ElectionList from '../components/elections/ElectionList';

const ElectionsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Elections</h1>
        <p className="mt-2 text-lg text-gray-600">
          Browse and participate in available elections
        </p>
      </div>
      
      <ElectionList />
    </div>
  );
};

export default ElectionsPage;