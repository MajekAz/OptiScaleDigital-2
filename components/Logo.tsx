import React from 'react';

interface LogoProps {
  light?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ light = false, className = "h-10 w-auto" }) => {
  // Brand Colors based on provided SVG
  const blueStar = '#2563EB';
  const purpleStar = '#8B5CF6';
  const textColor = light ? '#FFFFFF' : '#1E293B';
  const subTextColor = light ? '#CBD5E1' : '#64748B';

  return (
    <svg 
      viewBox="0 0 480 150" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g style={{ transformOrigin: '80px 70px' }}>
        {/* Main Blue Star */}
        <path 
          d="M70 30 Q90 70 130 75 Q90 80 70 120 Q50 80 10 75 Q50 70 70 30 Z" 
          fill={blueStar}
        />
        {/* Accent Purple Star */}
        <path 
          d="M120 20 Q130 40 150 45 Q130 50 120 70 Q110 50 90 45 Q110 40 120 20 Z" 
          fill={purpleStar} 
          fillOpacity="0.9"
        />
      </g>
      
      {/* OptiScale Text - Increased Size */}
      <text 
        x="170" 
        y="80" 
        fontFamily="Arial, sans-serif" 
        fontWeight="900" 
        fontSize="38" 
        fill={textColor}
      >
        OptiScale
      </text>
      
      {/* DIGITAL LTD Subtext - Increased Size */}
      <text 
        x="172" 
        y="112" 
        fontFamily="Arial, sans-serif" 
        fontSize="18" 
        fill={subTextColor} 
        letterSpacing="3"
      >
        DIGITAL LTD
      </text>
    </svg>
  );
};