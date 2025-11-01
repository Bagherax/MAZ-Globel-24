import React from 'react';
import { Auction } from '../types';

interface AuctionCardProps {
  data: Auction;
  isActive: boolean;
  onClick: () => void;
}

const AuctionCard: React.FC<AuctionCardProps> = ({ data, isActive, onClick }) => {
  return (
    <div 
      className={`relative bg-cover bg-center rounded-lg shadow-sm cursor-pointer overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105 ${isActive ? 'auction-card-active' : ''}`}
      style={{ backgroundImage: `url(${data.imageUrl})` }}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
      <div className="relative p-4 text-white flex flex-col justify-end h-full min-h-[180px]">
        <span className="text-xs font-bold uppercase">Auction</span>
        <h3 className="font-semibold text-lg truncate">{data.itemName}</h3>
      </div>

      {/* Expanded Content - shown when active */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="text-center text-white p-4">
            <p className="text-sm">Current Bid</p>
            <p className="text-4xl font-bold">${data.currentBid}</p>
            <p className="text-sm mt-2">Time Left: {data.timeLeft}</p>
            <button className="mt-4 bg-maz-secondary text-white py-2 px-6 rounded-lg font-semibold hover:bg-opacity-90">
              Place Bid
            </button>
          </div>
      </div>
    </div>
  );
};

export default AuctionCard;
