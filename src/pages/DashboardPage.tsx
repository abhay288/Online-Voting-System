import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Calendar, Vote } from 'lucide-react';
import { Election, Vote as VoteType } from '../types';
import { getElections, getUserVotes } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import Card, { CardContent, CardHeader } from '../components/common/Card';
import ElectionCard from '../components/elections/ElectionCard';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [activeElections, setActiveElections] = useState<Election[]>([]);
  const [upcomingElections, setUpcomingElections] = useState<Election[]>([]);
  const [recentVotes, setRecentVotes] = useState<VoteType[]>([]);
  const [votingStats, setVotingStats] = useState({
    totalVotes: 0,
    completedElections: 0,
    activeElections: 0,
  });
  
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      setIsLoading(true);
      
      try {
        // Fetch elections
        const electionsResponse = await getElections();
        
        if (electionsResponse.success && electionsResponse.data) {
          const active = electionsResponse.data.filter(e => e.status === 'active');
          const upcoming = electionsResponse.data.filter(e => e.status === 'upcoming');
          
          setActiveElections(active);
          setUpcomingElections(upcoming);
          setVotingStats(prev => ({
            ...prev,
            activeElections: active.length,
            completedElections: electionsResponse.data.filter(e => e.status === 'completed').length
          }));
        }
        
        // Fetch user votes
        const votesResponse = await getUserVotes(user.id);
        
        if (votesResponse.success && votesResponse.data) {
          setRecentVotes(votesResponse.data);
          setVotingStats(prev => ({
            ...prev,
            totalVotes: votesResponse.data.length
          }));
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [user]);
  
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-lg text-gray-600">
          Welcome back, {user?.username || 'User'}
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <Vote className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Votes Cast</p>
              <p className="text-2xl font-bold text-gray-900">{votingStats.totalVotes}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 mr-4">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Elections</p>
              <p className="text-2xl font-bold text-gray-900">{votingStats.activeElections}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 mr-4">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Completed Elections</p>
              <p className="text-2xl font-bold text-gray-900">{votingStats.completedElections}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Active Elections */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Active Elections</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/elections')}
          >
            View All
          </Button>
        </div>
        
        {activeElections.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-600 mb-4">There are no active elections at the moment.</p>
              <Button
                variant="primary"
                onClick={() => navigate('/elections')}
              >
                Browse All Elections
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeElections.slice(0, 3).map(election => (
              <ElectionCard key={election.id} election={election} />
            ))}
          </div>
        )}
      </div>
      
      {/* Upcoming Elections */}
      {upcomingElections.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Elections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingElections.slice(0, 3).map(election => (
              <ElectionCard key={election.id} election={election} />
            ))}
          </div>
        </div>
      )}
      
      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Recent Activity</h2>
        
        <Card>
          {recentVotes.length === 0 ? (
            <CardContent className="text-center py-8">
              <p className="text-gray-600">You haven't cast any votes yet.</p>
            </CardContent>
          ) : (
            <>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Election
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentVotes.map(vote => {
                    const election = [...activeElections, ...upcomingElections].find(e => e.id === vote.electionId);
                    if (!election) return null;
                    
                    return (
                      <tr key={vote.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{election.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(vote.timestamp).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/elections/${election.id}`)}
                          >
                            View Results
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;