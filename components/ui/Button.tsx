
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, className, fullWidth, ...props }) => {
  const widthClass = fullWidth ? 'w-full' : '';
  return (
    <button
      className={`bg-coffee-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-coffee-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coffee-500 transition-colors duration-300 disabled:bg-coffee-500 disabled:cursor-not-allowed ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
