import React from 'react';
import { Star } from 'lucide-react';

const TestimonialCard = ({ name, company, quote, image, stars = 5 }) => {
  return (
    <div className="glass-card p-8 rounded-2xl flex flex-col h-full relative group">
      {/* Subtle background glow on hover */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
      
      <div className="relative z-10 flex-grow flex flex-col">
        <div className="flex items-center gap-1 mb-6">
          {[...Array(stars)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-primary text-primary" />
          ))}
        </div>
        
        <blockquote className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-8 flex-grow">
          "{quote}"
        </blockquote>
        
        <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/10">
          <img 
            src={image} 
            alt={name} 
            className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
          />
          <div>
            <div className="font-bold text-foreground">{name}</div>
            <div className="text-sm text-muted-foreground">{company}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;