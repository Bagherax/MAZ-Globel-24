import React from 'react';
import { FeedItem } from '../types';
import AdCard from './AdCard';
import PaidAdCard from './PaidAdCard';
import TradeCard from './TradeCard';
import AuctionCard from './AuctionCard';
import AiCard from './AiCard';

interface FeedCardProps {
  item: FeedItem;
  isActive: boolean;
  onClick: () => void;
}

const FeedCard: React.FC<FeedCardProps> = ({ item, isActive, onClick }) => {
  const { type, data } = item;

  const renderCard = () => {
    switch (type) {
      case 'ad':
        return <AdCard data={data} isActive={isActive} onClick={onClick} />;
      case 'paid':
        return <PaidAdCard data={data} isActive={isActive} onClick={onClick} />;
      case 'trade':
        return <TradeCard data={data} isActive={isActive} onClick={onClick} />;
      case 'auction':
        return <AuctionCard data={data} isActive={isActive} onClick={onClick} />;
      case 'ai':
        return <AiCard data={data} isActive={isActive} onClick={onClick} />;
      default:
        return null;
    }
  };

  return <div className="w-full h-fit">{renderCard()}</div>;
};

export default FeedCard;
