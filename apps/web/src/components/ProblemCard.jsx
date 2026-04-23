import React from 'react';

const ProblemCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="p-6 rounded-2xl border border-white/5 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-xl hover:bg-card/80 transition-all duration-300 hover:-translate-y-1 group">
      <div className="mb-5 bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-foreground/90">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

export default ProblemCard;