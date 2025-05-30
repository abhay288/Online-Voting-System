import React, { InputHTMLAttributes, forwardRef, Ref } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef(
  ({ label, error, icon, className = '', ...props }: InputProps, ref: Ref<HTMLInputElement>) => {
    return (
      <div className="mb-4">
        {label && (
          <label 
            htmlFor={props.id} 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm 
              shadow-sm transition-colors
              focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
              disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-70
              ${icon ? 'pl-10' : ''}
              ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;