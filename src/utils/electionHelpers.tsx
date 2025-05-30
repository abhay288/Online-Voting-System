import React from 'react';
import { format, formatDistance, parseISO } from 'date-fns';

export const formatElectionDates = (startDate: string, endDate: string): string => {
  const start = parseISO(startDate);
  const end = parseISO(endDate);
  
  return `${format(start, 'MMM d, yyyy')} - ${format(end, 'MMM d, yyyy')}`;
};

export const getRemainingTime = (endDate: string): string => {
  const end = parseISO(endDate);
  const now = new Date();
  
  if (end < now) {
    return 'Ended';
  }
  
  return `${formatDistance(end, now)} remaining`;
};

export const getStatusBadge = (status: 'upcoming' | 'active' | 'completed'): JSX.Element => {
  const badgeClasses = {
    upcoming: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    active: 'bg-green-100 text-green-800 border-green-200',
    completed: 'bg-gray-100 text-gray-800 border-gray-200',
  };
  
  return (
    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${badgeClasses[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export const canVote = (userId: string | undefined, election: { status: string; votes?: any[] }): boolean => {
  if (!userId || election.status !== 'active') {
    return false;
  }
  
  // Check if user has already voted
  if (election.votes && election.votes.some(v => v.userId === userId)) {
    return false;
  }
  
  return true;
};

export const calculatePercentage = (count: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((count / total) * 100);
};