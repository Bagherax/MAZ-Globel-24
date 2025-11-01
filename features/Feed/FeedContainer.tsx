import React, { useState, useEffect } from 'react';
import useFeedComposer from './hooks/useFeedComposer';
import FeedCard from './components/FeedCard';
import Masonry from './components/Masonry';
import { FeedItem, FeedItemData } from './types';

interface FeedContainerProps {
  adSize: 'small' | 'medium' | 'large';
  sortOption: string;
}

const FeedContainer: React.FC<FeedContainerProps> = ({ adSize, sortOption }) => {
  const { feedItems, isLoading } = useFeedComposer();
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [sortedFeedItems, setSortedFeedItems] = useState<FeedItem[]>([]);

  useEffect(() => {
    if (isLoading || !feedItems) return;

    let items = [...feedItems];
    
    const getPrice = (itemData: FeedItemData, sortOrder: 'asc' | 'desc'): number => {
      let priceStr: string | undefined;
      if ('price' in itemData && typeof itemData.price === 'string') {
        priceStr = itemData.price;
      } else if ('currentBid' in itemData && typeof itemData.currentBid === 'string') {
        priceStr = itemData.currentBid;
      }

      if (priceStr) {
        const price = parseFloat(priceStr);
        if (!isNaN(price)) return price;
      }

      // For items without a price, put them at the end of the list
      return sortOrder === 'asc' ? Infinity : -1;
    };

    switch (sortOption) {
      case 'price_asc':
        items.sort((a, b) => getPrice(a.data, 'asc') - getPrice(b.data, 'asc'));
        break;
      case 'price_desc':
        items.sort((a, b) => getPrice(b.data, 'desc') - getPrice(a.data, 'desc'));
        break;
      case 'newest':
        // Simulate newest by sorting by ID string descending
        items.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'popular':
      default:
        // 'popular' is the default shuffle from the hook, so just use the original
        items = [...feedItems];
        break;
    }
    setSortedFeedItems(items);
  }, [feedItems, sortOption, isLoading]);


  const handleCardClick = (id: string) => {
    setActiveCardId(prevId => (prevId === id ? null : id));
  };

  const feedCSS = `
    .feed-grid {
      column-count: 1;
      column-gap: 1rem;
    }
    
    .ad-size-wrapper.ad-size-large .feed-grid { column-count: 2; }
    @media (max-width: 768px) {
      .ad-size-wrapper.ad-size-large .feed-grid { column-count: 1; }
    }
    
    .ad-size-wrapper.ad-size-medium .feed-grid { column-count: 3; }
    @media (max-width: 1024px) {
      .ad-size-wrapper.ad-size-medium .feed-grid { column-count: 2; }
    }
    @media (max-width: 768px) {
      .ad-size-wrapper.ad-size-medium .feed-grid { column-count: 1; }
    }
    
    .ad-size-wrapper.ad-size-small .feed-grid { column-count: 4; }
     @media (max-width: 1024px) {
      .ad-size-wrapper.ad-size-small .feed-grid { column-count: 3; }
    }
    @media (max-width: 768px) {
      .ad-size-wrapper.ad-size-small .feed-grid { column-count: 2; }
    }

    .feed-grid > * {
      break-inside: avoid;
      margin-bottom: 1rem;
    }
    
    /* Active Card Glassmorphic Styles */
    .ad-card-active, .auction-card-active {
        transform: scale(1.05);
        background: rgba(229, 231, 235, 0.6); /* Light blue-gray tint */
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
    }

    .auction-card-active .relative.p-4 {
        opacity: 0; /* Hide base content to show expanded */
    }

    @keyframes paid-ad-glow-anim {
        0%, 100% { box-shadow: 0 0 5px rgba(109, 40, 217, 0), 0 0 10px rgba(109, 40, 217, 0); }
        50% { box-shadow: 0 0 15px rgba(109, 40, 217, 0.5), 0 0 25px rgba(59, 130, 246, 0.3); }
    }
    .paid-ad-glow {
        animation: paid-ad-glow-anim 4s ease-in-out infinite;
    }
  `;

  if (isLoading) {
    return <div className="text-center text-maz-text-secondary py-10">Loading Feed...</div>;
  }
  
  const adItems = sortedFeedItems.filter(item => item.type === 'ad' || item.type === 'paid');
  const otherItems = sortedFeedItems.filter(item => item.type !== 'ad' && item.type !== 'paid');

  return (
    <div className={`ad-size-wrapper ad-size-${adSize}`}>
      <style>{feedCSS}</style>
      
      {otherItems.length > 0 && (
        <div className="feed-grid">
          {otherItems.map(item => (
            <FeedCard
              key={item.id}
              item={item}
              isActive={activeCardId === item.id}
              onClick={() => handleCardClick(item.id)}
            />
          ))}
        </div>
      )}
      
      {adItems.length > 0 && (
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-maz-text mb-4">Latest Listings</h2>
            <Masonry
                items={adItems}
                adSize={adSize}
                ease="power3.out"
                duration={0.75}
                stagger={0.06}
                animateFrom="bottom"
                scaleOnHover={true}
                hoverScale={1.03}
                blurToFocus={true}
                colorShiftOnHover={false}
            />
        </div>
      )}
    </div>
  );
};

export default FeedContainer;