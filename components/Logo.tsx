import React from 'react';

interface LogoProps {
  light?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ light = false, className = "h-12 w-auto" }) => {
  // Brand Colors based on provided image
  const blueStar = '#2563EB';
  const purpleStar = '#9366F1'; // Slightly more vibrant purple
  const textColor = light ? '#FFFFFF' : '#2D2D2D';

  return (
    <svg 
      viewBox="0 0 500 160" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Stars Group */}
      <g>
        {/* Main Blue Star - Larger, on the left */}
        <path 
          d="M70 20 Q75 75 130 80 Q75 85 70 140 Q65 85 10 80 Q65 75 70 20 Z" 
          fill={blueStar}
        />
        {/* Accent Purple Star - Smaller, top right of blue star */}
        <path 
          d="M130 15 Q135 45 165 50 Q135 55 130 85 Q125 55 95 50 Q125 45 130 15 Z" 
          fill={purpleStar}
        />
      </g>
      
      {/* Text Group - Stacked and Bold Uppercase */}
      <g>
        <text 
          x="185" 
          y="70" 
          fontFamily="Inter, system-ui, sans-serif" 
          fontWeight="800" 
          fontSize="52" 
          fill={textColor}
          letterSpacing="-0.02em"
        >
          OPTISCALE
        </text>
        <text 
          x="185" 
          y="125" 
          fontFamily="Inter, system-ui, sans-serif" 
          fontWeight="800" 
          fontSize="52" 
          fill={textColor}
          letterSpacing="-0.02em"
        >
          DIGITAL
        </text>
      </g>
    </svg>
  );
};