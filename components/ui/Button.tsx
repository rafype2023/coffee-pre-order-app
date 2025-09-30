import React from 'react';
import Spinner from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, className, fullWidth, loading, ...props }) => {
  const widthClass = fullWidth ? 'w-full' : '';
  return (
    <button
      className={`flex items-center justify-center bg-coffee-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-coffee-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-500 transition-colors duration-300 disabled:bg-coffee-500 disabled:cursor-not-allowed ${widthClass} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Spinner />}
      <span className={loading ? 'ml-2' : ''}>{children}</span>
    </button>
  );
};

export default Button;