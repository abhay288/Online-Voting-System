import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2, PlusCircle, AlertTriangle } from 'lucide-react';
import { Election } from '../../types';
import { getElections, deleteElection } from '../../services/api';
import Button from '../common/Button';
import { formatElectionDates, getStatusBadge } from '../../utils/electionHelpers';

const ElectionManagement: React.FC = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteElectionId, setDeleteElectionId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchElections = async () => {
      try {
        setIsLoading(true);
        const response = await getElections();
        
        if (response.success && response.data) {
          setElections(response.data);
        } else {
          setError(response.error || 'Failed to fetch elections');
        }
      } catch (err) {
        setError('An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchElections();
  }, []);
  
  const handleCreateElection = () => {
    navigate('/admin/create-election');
  };
  
  const handleEditElection = (id: string) => {
    navigate(`/admin/edit-election/${id}`);
  };
  
  const confirmDelete = (id: string) => {
    setDeleteElectionId(id);
  };
  
  const cancelDelete = () => {
    setDeleteElectionId(null);
  };
  
  const handleDeleteElection = async () => {
    if (!deleteElectionId) return;
    
    try {
      setIsDeleting(true);
      const response = await deleteElection(deleteElectionId);
      
      if (response.success) {
        setElections(prev => prev.filter(election => election.id !== deleteElectionId));
        setDeleteElectionId(null);
      } else {
        setError(response.error || 'Failed to delete election');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsDeleting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center p-6 bg-red-50 rounded-lg">
        <p className="text-red-600 mb-2">Error loading elections</p>
        <p className="text-sm text-gray-600">{error}</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Manage Elections</h2>
        <Button
          variant="primary"
          size="sm"
          icon={<PlusCircle size={16} />}
          onClick={handleCreateElection}
        >
          Create Election
        </Button>
      </div>
      
      {elections.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-2">No elections found</p>
          <p className="text-sm text-gray-500 mb-4">
            Get started by creating your first election
          </p>
          <Button
            variant="primary"
            icon={<PlusCircle size={16} />}
            onClick={handleCreateElection}
          >
            Create Election
          </Button>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Votes
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {elections.map((election) => (
                <tr key={election.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{election.title}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{election.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{formatElectionDates(election.startDate, election.endDate)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(election.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {election.totalVotes} votes
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEditElection(election.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => confirmDelete(election.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {deleteElectionId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">Delete Election</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Are you sure you want to delete this election? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={cancelDelete}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleDeleteElection}
                isLoading={isDeleting}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ElectionManagement;