import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import CreateElectionForm from '../components/admin/CreateElectionForm';

const CreateElectionPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <div className="mb-6">
        <button
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
          onClick={() => navigate('/admin')}
        >
          <ChevronLeft size={16} className="mr-1" /> Back to Admin
        </button>
      </div>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Create New Election</h2>
        <p className="mt-1 text-gray-600">
          Fill out the form below to create a new election
        </p>
      </div>
      
      <CreateElectionForm />
    </div>
  );
};

export default CreateElectionPage;