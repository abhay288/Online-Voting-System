export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'voter';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Election {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'completed';
  createdBy: string;
  createdAt: string;
  options: ElectionOption[];
  totalVotes: number;
}

export interface ElectionOption {
  id: string;
  text: string;
  votes: number;
}

export interface Vote {
  id: string;
  userId: string;
  electionId: string;
  optionId: string;
  timestamp: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}