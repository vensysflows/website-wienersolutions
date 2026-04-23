import React from 'react';

const USPCard = ({ icon, title, description }) => {
  return (
    <div className="p-6 rounded-xl border bg-card shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

export default USPCard;