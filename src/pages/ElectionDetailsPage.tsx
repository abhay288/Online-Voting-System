import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, CalendarDays, Users, AlertTriangle } from 'lucide-react';
import { Election } from '../types';
import { getElectionById } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { formatElectionDates, getStatusBadge, getRemainingTime } from '../utils/electionHelpers';
import Button from '../components/common/Button';
import VotingForm from '../components/elections/VotingForm';
import ElectionResults from '../components/elections/ElectionResults';

const ElectionDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [election, setElection] = useState<Election | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchElection = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const response = await getElectionById(id);
        
        if (response.success && response.data) {
          setElection(response.data);
        } else {
          setError(response.error || 'Failed to fetch election details');
        }
      } catch (err) {
        setError('An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchElection();
  }, [id]);
  
  const handleVoteSuccess = () => {
    setHasVoted(true);
    // Refresh election data to show updated results
    if (id) {
      getElectionById(id).then(response => {
        if (response.success && response.data) {
          setElection(response.data);
        }
      });
    }
  };
  
  const renderElectionStatus = () => {
    if (!election) return null;
    
    let statusMessage = '';
    let statusIcon = null;
    
    switch (election.status) {
      case 'upcoming':
        statusMessage = 'This election has not started yet.';
        statusIcon = <AlertTriangle className="h-5 w-5 text-yellow-500" />;
        break;
      case 'active':
        statusMessage = `Voting is open. ${getRemainingTime(election.endDate)}`;
        break;
      case 'completed':
        statusMessage = 'This election has ended. Results are final.';
        break;
    }
    
    return (
      <div className="mb-6 bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center">
        {statusIcon && <span className="mr-2">{statusIcon}</span>}
        <span className="text-gray-700">{statusMessage}</span>
      </div>
    );
  };
  
  const renderContent = () => {
    if (!election) return null;
    
    // Show results if election is completed or user has voted
    if (election.status === 'completed' || hasVoted) {
      return (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {election.status === 'completed' ? 'Final Results' : 'Current Results'}
          </h3>
          <ElectionResults election={election} />
        </div>
      );
    }
    
    // Show voting form if election is active
    if (election.status === 'active') {
      return (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Cast Your Vote</h3>
          {isAuthenticated ? (
            <VotingForm election={election} onVoteSuccess={handleVoteSuccess} />
          ) : (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <p className="text-blue-700 mb-3">Please sign in to cast your vote</p>
              <Button
                variant="primary"
                onClick={() => navigate('/login', { state: { from: `/elections/${election.id}` } })}
              >
                Sign In to Vote
              </Button>
            </div>
          )}
        </div>
      );
    }
    
    // For upcoming elections
    return (
      <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
        <p className="text-yellow-700">
          This election has not started yet. Voting will be available once the election begins.
        </p>
      </div>
    );
  };
  
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }
  
  if (error || !election) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <p className="text-red-600 mb-2">Error loading election details</p>
          <p className="text-sm text-gray-600 mb-4">{error || 'Election not found'}</p>
          <Button variant="outline" onClick={() => navigate('/elections')}>
            Back to Elections
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <button
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
          onClick={() => navigate('/elections')}
        >
          <ChevronLeft size={16} className="mr-1" /> Back to Elections
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{election.title}</h1>
            {getStatusBadge(election.status)}
          </div>
          
          <p className="text-gray-700 mb-6">{election.description}</p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <CalendarDays size={18} className="mr-2 text-gray-500" />
              <span>{formatElectionDates(election.startDate, election.endDate)}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users size={18} className="mr-2 text-gray-500" />
              <span>{election.totalVotes} votes cast</span>
            </div>
          </div>
          
          {renderElectionStatus()}
          
          <div className="border-t border-gray-100 pt-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionDetailsPage;