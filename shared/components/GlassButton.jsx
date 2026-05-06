import React from 'react';

const GlassButton = ({ variant = 'ghost', children, onClick, className = '', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-all duration-150 h-9';
  const variantClasses = {
    primary: 'bg-green text-text hover:bg-green/90',
    ghost: 'glass-1 glass-border text-text hover:glass-2'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default GlassButton;