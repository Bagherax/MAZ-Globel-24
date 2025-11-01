import React from 'react';
import { LiveTrade } from '../types';

interface TradeCardProps {
  data: LiveTrade;
  isActive: boolean;
  onClick: () => void;
}

const TradeCard: React.FC<TradeCardProps> = ({ data, isActive, onClick }) => {
  return (
    <div 
      className="relative bg-maz-surface rounded-lg shadow-sm cursor-pointer p-4 overflow-hidden"
      onClick={onClick}
    >
      <div className="flex items-center mb-2">
        <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
        <span className="text-xs font-bold uppercase text-red-500">Live Trade</span>
      </div>
      <h3 className="font-semibold text-maz-text truncate">{data.itemName}</h3>
      <p className="text-maz-primary font-bold text-lg">${data.price}</p>
      <p className="text-xs text-maz-text-secondary mt-2">{data.timestamp}</p>
      
      {/* Slide Up Overlay */}
      <div className={`absolute inset-0 bg-maz-primary bg-opacity-95 p-4 flex flex-col justify-center items-center text-white transition-transform duration-500 ease-in-out ${isActive ? 'translate-y-0' : 'translate-y-full'}`}>
        <h4 className="text-xl font-bold mb-2">Trade Completed!</h4>
        <div className="text-center">
            <p><span className="font-semibold">{data.buyer}</span> bought from</p>
            <p><span className="font-semibold">{data.seller}</span></p>
        </div>
        <p className="mt-4 text-2xl font-bold">${data.price}</p>
      </div>
    </div>
  );
};

export default TradeCard;
