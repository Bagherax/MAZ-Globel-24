import React from 'react';
import { Ad } from '../types';

interface AdCardProps {
  data: Ad;
  isActive: boolean;
  onClick: () => void;
}

const AdCard: React.FC<AdCardProps> = ({ data, isActive, onClick }) => {
  return (
    <div 
      className={`bg-maz-surface rounded-lg overflow-hidden shadow-sm cursor-pointer transition-all duration-500 ease-in-out transform hover:shadow-lg ${isActive ? 'ad-card-active' : 'hover:scale-105'}`}
      onClick={onClick}
    >
      <img src={data.imageUrl} alt={data.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-maz-text truncate">{data.title}</h3>
        <p className="text-maz-primary font-bold mt-1">${data.price}</p>
        <div className="flex items-center mt-3">
          <img src={data.user.avatarUrl} alt={data.user.name} className="w-6 h-6 rounded-full mr-2" />
          <span className="text-sm text-maz-text-secondary">{data.user.name}</span>
        </div>
      </div>
      
      {/* Expanded Content - shown when active */}
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isActive ? 'max-h-96' : 'max-h-0'}`}>
        <div className="p-4 pt-0">
          <hr className="mb-4 border-gray-200" />
          <p className="text-sm text-maz-text-secondary mb-4">This is a product preview. More details would be shown here, such as a full description, specifications, and seller information.</p>
          <button className="w-full bg-maz-primary text-white py-2 rounded-lg font-semibold hover:bg-opacity-90">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
