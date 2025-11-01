import React from 'react';
import { AiSuggestion } from '../types';

interface AiCardProps {
  data: AiSuggestion;
  isActive: boolean;
  onClick: () => void;
}

const AiCard: React.FC<AiCardProps> = ({ data, isActive, onClick }) => {
  return (
    <div 
      className="bg-maz-surface rounded-lg shadow-sm cursor-pointer p-4 border-l-4 border-maz-secondary transition-all duration-500 ease-in-out"
      onClick={onClick}
    >
      <div className="flex items-start">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-maz-secondary mr-3 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <div>
          <h3 className="font-semibold text-maz-text">{data.title}</h3>
          <p className="text-xs text-maz-text-secondary italic mt-1">{data.reason}</p>
        </div>
      </div>
      
      {/* Expanded Content */}
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isActive ? 'max-h-96 mt-4' : 'max-h-0'}`}>
        <p className="text-sm text-maz-text-secondary">{data.description}</p>
        <button className="mt-4 text-sm font-semibold text-maz-primary hover:underline">Explore Now</button>
      </div>
    </div>
  );
};

export default AiCard;
