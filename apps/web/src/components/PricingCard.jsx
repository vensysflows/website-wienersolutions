import React from 'react';
import { Button } from '@/components/ui/button';

const PricingCard = ({ title, price, description, ctaText, ctaLink }) => {
  return (
    <div className="p-8 rounded-xl border bg-card shadow-lg hover:shadow-2xl transition-all duration-300">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold text-primary">{price}</span>
      </div>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        {description}
      </p>
      <a href={ctaLink}>
        <Button className="w-full" variant="outline">
          {ctaText}
        </Button>
      </a>
    </div>
  );
};

export default PricingCard;