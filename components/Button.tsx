import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "px-8 py-4 rounded-xl font-bold text-body transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-brand-blue hover:bg-blue-600 text-white shadow-xl shadow-brand-blue/20 focus:ring-brand-blue",
    secondary: "bg-brand-navy hover:bg-brand-dark text-white shadow-lg focus:ring-brand-navy",
    outline: "border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white focus:ring-brand-blue"
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};