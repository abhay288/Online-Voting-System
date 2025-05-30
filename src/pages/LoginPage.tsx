import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import { VoteIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex items-center justify-center">
          <VoteIcon className="h-12 w-12 text-blue-600" />
        </Link>
        <h2 className="mt-3 text-center text-3xl font-bold text-gray-900">
          Sign in to VoteHub
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;