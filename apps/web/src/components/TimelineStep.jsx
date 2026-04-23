import React from 'react';

const TimelineStep = ({ stepNumber, title, description, icon, details }) => {
  return (
    <div className="relative flex flex-col items-center text-center group">
      <div className="w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:bg-primary transition-all duration-300 z-10">
        <div className="text-2xl group-hover:scale-110 transition-transform">{icon}</div>
      </div>
      
      <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 w-full h-full flex flex-col">
        <div className="text-sm font-bold text-primary mb-2">Schritt {stepNumber}</div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
          {description}
        </p>
        {details && (
          <div className="mt-4 pt-4 border-t border-border/50">
            <p className="text-xs font-medium text-muted-foreground italic">
              {details}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineStep;