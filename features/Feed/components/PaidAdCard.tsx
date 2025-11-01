import React from 'react';
import { PaidAd } from '../types';

interface PaidAdCardProps {
  data: PaidAd;
  isActive: boolean;
  onClick: () => void;
}

const PaidAdCard: React.FC<PaidAdCardProps> = ({ data, isActive, onClick }) => {
  return (
    <div 
      className={`relative bg-maz-surface rounded-lg overflow-hidden shadow-md cursor-pointer transition-all duration-500 ease-in-out transform hover:shadow-xl paid-ad-glow ${isActive ? 'ad-card-active' : 'hover:scale-105'}`}
      onClick={onClick}
    >
       <div className="absolute top-2 right-2 bg-maz-secondary text-white text-xs font-bold px-2 py-1 rounded-full z-10">
        Sponsored
      </div>
      <img src={data.imageUrl} alt={data.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-maz-text truncate">{data.title}</h3>
        <p className="text-maz-primary font-bold mt-1">${data.price}</p>
        <div className="flex items-center mt-3">
          <img src={data.user.avatarUrl} alt={data.user.name} className="w-6 h-6 rounded-full mr-2" />
          <span className="text-sm text-maz-text-secondary">{data.user.name}</span>
        </div>
      </div>
      
      {/* Expanded Content */}
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isActive ? 'max-h-96' : 'max-h-0'}`}>
        <div className="p-4 pt-0">
          <hr className="mb-4 border-gray-200" />
          <p className="text-sm text-maz-text-secondary mb-4">This is a promoted item. Clicking this would be tracked for analytics. More details about the product would appear here.</p>
          <button className="w-full bg-maz-secondary text-white py-2 rounded-lg font-semibold hover:bg-opacity-90">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default PaidAdCard;
