import { Election, ElectionOption, User, Vote, ApiResponse } from '../types';
import { users, elections, votes } from '../utils/mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Auth API
export const login = async (email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> => {
  await delay(800);
  
  const user = users.find(u => u.email === email);
  
  if (!user || password !== 'password') {
    return { success: false, error: 'Invalid credentials' };
  }
  
  // Generate a mock JWT token
  const token = `mock_jwt_token_for_${user.id}_${Date.now()}`;
  
  return {
    success: true,
    data: { user, token }
  };
};

export const register = async (username: string, email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> => {
  await delay(1000);
  
  if (users.some(u => u.email === email)) {
    return { success: false, error: 'Email already exists' };
  }
  
  const newUser: User = {
    id: `${users.length + 1}`,
    username,
    email,
    role: 'voter', // Default role
    createdAt: new Date().toISOString(),
  };
  
  users.push(newUser);
  
  const token = `mock_jwt_token_for_${newUser.id}_${Date.now()}`;
  
  return {
    success: true,
    data: { user: newUser, token }
  };
};

// Elections API
export const getElections = async (): Promise<ApiResponse<Election[]>> => {
  await delay(500);
  return { success: true, data: elections };
};

export const getElectionById = async (id: string): Promise<ApiResponse<Election>> => {
  await delay(300);
  const election = elections.find(e => e.id === id);
  
  if (!election) {
    return { success: false, error: 'Election not found' };
  }
  
  return { success: true, data: election };
};

export const createElection = async (
  electionData: Omit<Election, 'id' | 'createdAt' | 'totalVotes'>
): Promise<ApiResponse<Election>> => {
  await delay(1000);
  
  const newElection: Election = {
    ...electionData,
    id: `${elections.length + 1}`,
    createdAt: new Date().toISOString(),
    totalVotes: 0,
  };
  
  elections.push(newElection);
  
  return { success: true, data: newElection };
};

export const updateElection = async (
  id: string,
  updates: Partial<Omit<Election, 'id' | 'createdAt' | 'createdBy'>>
): Promise<ApiResponse<Election>> => {
  await delay(800);
  
  const index = elections.findIndex(e => e.id === id);
  
  if (index === -1) {
    return { success: false, error: 'Election not found' };
  }
  
  elections[index] = { ...elections[index], ...updates };
  
  return { success: true, data: elections[index] };
};

export const deleteElection = async (id: string): Promise<ApiResponse<void>> => {
  await delay(700);
  
  const index = elections.findIndex(e => e.id === id);
  
  if (index === -1) {
    return { success: false, error: 'Election not found' };
  }
  
  elections.splice(index, 1);
  
  return { success: true };
};

// Votes API
export const castVote = async (userId: string, electionId: string, optionId: string): Promise<ApiResponse<Vote>> => {
  await delay(1000);
  
  // Check if user has already voted in this election
  if (votes.some(v => v.userId === userId && v.electionId === electionId)) {
    return { success: false, error: 'You have already voted in this election' };
  }
  
  // Check if election exists and is active
  const election = elections.find(e => e.id === electionId);
  if (!election) {
    return { success: false, error: 'Election not found' };
  }
  
  if (election.status !== 'active') {
    return { success: false, error: `Cannot vote in ${election.status} election` };
  }
  
  // Check if option exists
  const option = election.options.find(o => o.id === optionId);
  if (!option) {
    return { success: false, error: 'Invalid option' };
  }
  
  // Create vote
  const newVote: Vote = {
    id: `${votes.length + 1000}`,
    userId,
    electionId,
    optionId,
    timestamp: new Date().toISOString(),
  };
  
  // Update vote count
  option.votes += 1;
  election.totalVotes += 1;
  
  votes.push(newVote);
  
  return { success: true, data: newVote };
};

export const getUserVotes = async (userId: string): Promise<ApiResponse<Vote[]>> => {
  await delay(500);
  
  const userVotes = votes.filter(v => v.userId === userId);
  
  return { success: true, data: userVotes };
};