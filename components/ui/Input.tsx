import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, name, className, error, ...props }) => {
  const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-coffee-300 focus:border-coffee-500 focus:ring-coffee-500';

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-coffee-500 mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={`w-full px-4 py-2 border rounded-lg bg-white transition-shadow duration-200 shadow-sm focus:shadow-md ${errorClasses} ${className}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        {...props}
      />
      {error && <p id={`${name}-error`} className="mt-1 text-sm text-red-600" role="alert">{error}</p>}
    </div>
  );
};

export default Input;