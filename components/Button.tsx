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
  const baseStyles = "px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-center inline-flex items-center justify-center";
  
  const variants = {
    primary: "bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white shadow-xl shadow-brand-primary/20 focus:ring-[#2563EB]",
    secondary: "bg-[#0F172A] hover:bg-slate-800 active:bg-black text-white shadow-lg focus:ring-[#0F172A]",
    outline: "border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white focus:ring-[#2563EB]"
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