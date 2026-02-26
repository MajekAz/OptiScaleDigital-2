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
  const baseStyles = "rounded-[12px] font-semibold text-base transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-center inline-flex items-center justify-center";
  
  const variants = {
    primary: "bg-brand-accent hover:bg-emerald-600 text-white py-[14px] px-[28px] hover:-translate-y-[3px] shadow-lg shadow-brand-accent/20 focus:ring-brand-accent",
    secondary: "bg-brand-navy hover:bg-slate-800 active:bg-black text-white px-8 py-4 shadow-lg focus:ring-brand-navy",
    outline: "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white px-8 py-4 focus:ring-brand-primary"
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