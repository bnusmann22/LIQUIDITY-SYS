import React from 'react';

const GlassCard = ({ title, subtitle, action, children, className = '' }) => {
  return (
    <div className={`glass-1 glass-border rounded-glass p-6 ${className} hover:glass-2`}>
      {(title || subtitle || action) && (
        <div className="flex items-center justify-between mb-4">
          <div>
            {title && <h3 className="text-lg font-semibold text-text">{title}</h3>}
            {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default GlassCard;