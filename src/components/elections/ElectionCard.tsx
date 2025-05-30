import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Users, Clock } from 'lucide-react';
import { Election } from '../../types';
import Card, { CardContent, CardFooter } from '../common/Card';
import Button from '../common/Button';
import { formatElectionDates, getStatusBadge, getRemainingTime } from '../../utils/electionHelpers';

interface ElectionCardProps {
  election: Election;
}

const ElectionCard: React.FC<ElectionCardProps> = ({ election }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/elections/${election.id}`);
  };
  
  return (
    <Card hover onClick={handleClick} className="h-full">
      <CardContent>
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">{election.title}</h2>
          {getStatusBadge(election.status)}
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{election.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <CalendarDays size={16} className="text-gray-500 mr-2" />
            <span className="text-gray-700">{formatElectionDates(election.startDate, election.endDate)}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Users size={16} className="text-gray-500 mr-2" />
            <span className="text-gray-700">{election.totalVotes} votes</span>
          </div>
          
          {election.status === 'active' && (
            <div className="flex items-center text-sm">
              <Clock size={16} className="text-gray-500 mr-2" />
              <span className="text-gray-700">{getRemainingTime(election.endDate)}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center">
        <Button
          size="sm"
          variant={election.status === 'active' ? 'primary' : 'outline'}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/elections/${election.id}`);
          }}
        >
          {election.status === 'active' 
            ? 'Vote Now' 
            : election.status === 'completed' 
              ? 'View Results' 
              : 'View Details'}
        </Button>
        
        <span className="text-xs text-gray-500">
          {election.options.length} option{election.options.length !== 1 ? 's' : ''}
        </span>
      </CardFooter>
    </Card>
  );
};

export default ElectionCard;