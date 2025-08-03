import React from 'react';

const Badge = ({ children }) => {
  return (
    <span className='bg-badge py-2 px-2 rounded flex items-center gap-1 text-gray-200'>
      {children}
    </span>
  );
};

export default Badge;
