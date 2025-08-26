import React from 'react';

export const QuarkLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    {/* Orbits */}
    <ellipse cx="100" cy="100" rx="90" ry="40" stroke="url(#grad1)" strokeWidth="10" />
    <ellipse cx="100" cy="100" rx="90" ry="40" transform="rotate(60 100 100)" stroke="url(#grad1)" strokeWidth="10" />
    <ellipse cx="100" cy="100" rx="90" ry="40" transform="rotate(120 100 100)" stroke="url(#grad1)" strokeWidth="10" />
    {/* Nucleus */}
    <circle cx="100" cy="100" r="25" fill="url(#grad1)" />
  </svg>
);