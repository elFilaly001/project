import React from 'react';

interface PricingCardProps {
  title: string;
  features: string[];
  description: string;
  price: string;
  highlightColor: string; // e.g. 'from-pink-400 to-purple-300'
}

export default function PricingCard({ title, features, description, price, highlightColor }: PricingCardProps) {
  return (
    <div className={`relative rounded-3xl shadow-lg border-0 p-0 flex flex-col items-center justify-center bg-gradient-to-r ${highlightColor} h-[650px]`}>
      {/* Title box */}
      <div className={`absolute -top-8 left-1/2 -translate-x-1/2 w-[90%] rounded-2xl p-3 bg-gradient-to-r ${highlightColor} shadow-lg z-10`}>
        <div className="bg-white rounded-xl px-6 py-3 flex items-center justify-center">
          <h3 className="text-xl font-bold text-pink-500 text-center">{title}</h3>
        </div>
      </div>
      {/* Features list */}
      <div className="w-full flex flex-col items-center justify-center pt-20 pb-12 px-8">
        <ul className="w-full space-y-1 text-lg font-normal text-white">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <span className="text-2xl leading-none">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Description & Price box */}
      <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] rounded-2xl p-3 bg-gradient-to-r ${highlightColor} shadow-lg z-10`}>
        <div className="bg-white rounded-xl px-6 py-4 flex flex-col items-center justify-center">
          <div className="text-base font-bold text-pink-500 text-center mb-2">{description}</div>
          <div className="text-base font-bold text-pink-500 text-center">{price}</div>
        </div>
      </div>
    </div>
  );
}
