import React from 'react';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    safe: { color: 'green', label: 'Safe' },
    warning: { color: 'amber', label: 'Warning' },
    critical: { color: 'red', label: 'Critical' },
    watch: { color: 'amber', label: 'Watch' }
  };

  const config = statusConfig[status.toLowerCase()] || { color: 'muted', label: status };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-${config.color}/20 text-${config.color}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;