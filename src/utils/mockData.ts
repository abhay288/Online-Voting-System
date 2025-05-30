import { User, Election, Vote } from '../types';
import { format, addDays, subDays } from 'date-fns';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    username: 'voter1',
    email: 'voter1@example.com',
    role: 'voter',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    username: 'voter2',
    email: 'voter2@example.com',
    role: 'voter',
    createdAt: new Date().toISOString(),
  },
];

// Mock Elections
export const elections: Election[] = [
  {
    id: '1',
    title: 'Board of Directors Election 2025',
    description: 'Vote for the new board members who will serve for the next two years.',
    startDate: format(subDays(new Date(), 2), 'yyyy-MM-dd\'T\'HH:mm:ss'),
    endDate: format(addDays(new Date(), 5), 'yyyy-MM-dd\'T\'HH:mm:ss'),
    status: 'active',
    createdBy: '1',
    createdAt: format(subDays(new Date(), 10), 'yyyy-MM-dd\'T\'HH:mm:ss'),
    options: [
      { id: '101', text: 'Jane Smith', votes: 24 },
      { id: '102', text: 'John Doe', votes: 18 },
      { id: '103', text: 'Alice Johnson', votes: 32 },
    ],
    totalVotes: 74,
  },
  {
    id: '2',
    title: 'Annual Budget Approval',
    description: 'Cast your vote on the proposed budget for the upcoming fiscal year.',
    startDate: format(addDays(new Date(), 2), 'yyyy-MM-dd\'T\'HH:mm:ss'),
    endDate: format(addDays(new Date(), 10), 'yyyy-MM-dd\'T\'HH:mm:ss'),
    status: 'upcoming',
    createdBy: '1',
    createdAt: format(subDays(new Date(), 5), 'yyyy-MM-dd\'T\'HH:mm:ss'),
    options: [
      { id: '201', text: 'Approve', votes: 0 },
      { id: '202', text: 'Reject', votes: 0 },
      { id: '203', text: 'Abstain', votes: 0 },
    ],
    totalVotes: 0,
  },
  {
    id: '3',
    title: 'Company Name Change Proposal',
    description: 'Vote on whether to adopt the proposed new company name.',
    startDate: format(subDays(new Date(), 15), 'yyyy-MM-dd\'T\'HH:mm:ss'),
    endDate: format(subDays(new Date(), 1), 'yyyy-MM-dd\'T\'HH:mm:ss'),
    status: 'completed',
    createdBy: '1',
    createdAt: format(subDays(new Date(), 20), 'yyyy-MM-dd\'T\'HH:mm:ss'),
    options: [
      { id: '301', text: 'Yes - Change the name', votes: 45 },
      { id: '302', text: 'No - Keep current name', votes: 65 },
    ],
    totalVotes: 110,
  },
];

// Mock Votes
export const votes: Vote[] = [
  {
    id: '1001',
    userId: '2',
    electionId: '1',
    optionId: '103',
    timestamp: format(subDays(new Date(), 1), 'yyyy-MM-dd\'T\'HH:mm:ss'),
  },
  {
    id: '1002',
    userId: '3',
    electionId: '3',
    optionId: '302',
    timestamp: format(subDays(new Date(), 5), 'yyyy-MM-dd\'T\'HH:mm:ss'),
  },
];