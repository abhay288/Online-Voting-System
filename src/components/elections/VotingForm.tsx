import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Election } from '../../types';
import { castVote } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';

interface VotingFormProps {
  election: Election;
  onVoteSuccess: () => void;
}

const VotingForm: React.FC<VotingFormProps> = ({ election, onVoteSuccess }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const handleVote = async () => {
    if (!selectedOption) {
      setError('Please select an option to vote');
      return;
    }
    
    if (!user) {
      navigate('/login', { state: { from: `/elections/${election.id}` } });
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await castVote(user.id, election.id, selectedOption);
      
      if (response.success) {
        setSuccess('Your vote has been cast successfully!');
        setTimeout(() => {
          onVoteSuccess();
        }, 2000);
      } else {
        setError(response.error || 'Failed to cast vote');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (success) {
    return (
      <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-start">
        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
        <div>
          <h3 className="text-green-800 font-medium">Vote successful!</h3>
          <p className="text-green-700 text-sm mt-1">{success}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      {error && (
        <div className="mb-4 bg-red-50 border border-red-100 rounded-lg p-4 flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3" />
          <div>
            <h3 className="text-red-800 font-medium">Error</h3>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}
      
      <div className="mt-4 space-y-3">
        {election.options.map((option) => (
          <div
            key={option.id}
            className={`
              border rounded-md p-4 cursor-pointer transition-all
              ${selectedOption === option.id
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }
            `}
            onClick={() => setSelectedOption(option.id)}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div
                  className={`w-5 h-5 border rounded-full flex items-center justify-center
                    ${selectedOption === option.id
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-300'
                    }
                  `}
                >
                  {selectedOption === option.id && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
              <div className="ml-3">
                <label
                  htmlFor={`option-${option.id}`}
                  className="block text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {option.text}
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
          onClick={handleVote}
          disabled={!selectedOption}
        >
          Cast Your Vote
        </Button>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Your vote is secure and anonymous. Once cast, it cannot be changed.
        </p>
      </div>
    </div>
  );
};

export default VotingForm;