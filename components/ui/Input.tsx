
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, name, className, ...props }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-coffee-500 mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={`w-full px-4 py-2 border border-coffee-300 rounded-lg focus:ring-coffee-500 focus:border-coffee-500 bg-white transition-shadow duration-200 shadow-sm focus:shadow-md ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
