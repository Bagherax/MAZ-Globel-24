import { useState, useEffect } from 'react';
import { FeedItem, Ad, PaidAd, LiveTrade, Auction, AiSuggestion } from '../types';

const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

// Helper to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const useFeedComposer = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const composeFeed = async () => {
    setIsLoading(true);
    try {
      // Fetch data from all sources in parallel
      const [
        adsRes,
        paidAdsRes,
        liveTradesRes,
        auctionsRes,
        aiFeedRes
      ] = await Promise.all([
        fetch('/features/Feed/data/masonryAds.json'),
        fetch('/features/Feed/data/paidAds.json'),
        fetch('/features/Feed/data/liveTrades.json'),
        fetch('/features/Feed/data/auctions.json'),
        fetch('/features/Feed/data/aiFeed.json'),
      ]);
      
      const ads: Ad[] = await adsRes.json();
      const paidAds: PaidAd[] = await paidAdsRes.json();
      const liveTrades: LiveTrade[] = await liveTradesRes.json();
      const auctions: Auction[] = await auctionsRes.json();
      const aiSuggestions: AiSuggestion[] = await aiFeedRes.json();

      // Weight ratios
      // For a ~20 item feed:
      // Normal Ads = 60% (12)
      // Paid Ads = 10% (2)
      // Live Trades = 15% (3)
      // Auctions = 10% (2)
      // AI Suggestions = 5% (1)

      const composed: FeedItem[] = [
        ...ads.slice(0, 12).map((item): FeedItem => ({ id: item.id, type: 'ad', data: item })),
        ...paidAds.slice(0, 2).map((item): FeedItem => ({ id: item.id, type: 'paid', data: item })),
        ...liveTrades.slice(0, 3).map((item): FeedItem => ({ id: item.id, type: 'trade', data: item })),
        ...auctions.slice(0, 2).map((item): FeedItem => ({ id: item.id, type: 'auction', data: item })),
        ...aiSuggestions.slice(0, 1).map((item): FeedItem => ({ id: item.id, type: 'ai', data: item })),
      ];
      
      setFeedItems(shuffleArray(composed));
    } catch (error) {
      console.error("Failed to compose feed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    composeFeed(); // Initial composition
    
    const intervalId = setInterval(composeFeed, REFRESH_INTERVAL);
    
    return () => clearInterval(intervalId);
  }, []);

  return { feedItems, isLoading };
};

export default useFeedComposer;
