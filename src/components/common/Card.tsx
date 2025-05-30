import React, { ReactNode } from 'react';

interface CardProps {
  className?: string;
  children: ReactNode;
  hover?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ 
  className = '', 
  children, 
  hover = false,
  onClick
}) => {
  const baseClasses = "bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100";
  const hoverClasses = hover ? "transition-transform duration-200 hover:shadow-md hover:-translate-y-1 cursor-pointer" : "";
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ className?: string; children: ReactNode }> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={`px-6 py-4 border-b border-gray-100 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<{ className?: string; children: ReactNode }> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<{ className?: string; children: ReactNode }> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={`px-6 py-3 bg-gray-50 ${className}`}>
      {children}
    </div>
  );
};

export default Card;