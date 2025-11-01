import React, { useState, useEffect } from 'react';
import TradingFeed from './features/TradingFeed/TradingFeed';
import AiChat from './features/AiChat/AiChat';
import AdGallery from './features/AdGallery/AdGallery';
import FeedContainer from './features/Feed/FeedContainer';
import FloatingNav from './features/FloatingNav/FloatingNav';

const App: React.FC = () => {
  const [isTradingFeedVisible, setIsTradingFeedVisible] = useState(false);
  const [adSize, setAdSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [sortOption, setSortOption] = useState<string>('popular');
  const [theme, setTheme] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') as 'light' | 'dark' || 'light'
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const toggleTradingFeed = () => {
    setIsTradingFeedVisible(!isTradingFeedVisible);
  };
  
  const handleAdSizeChange = (size: 'small' | 'medium' | 'large') => {
    setAdSize(size);
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  return (
    <>
      <div className="min-h-screen bg-maz-bg font-sans flex flex-col items-center p-4 sm:p-6 md:p-8 relative pt-24">
        {/* Fixed Top Header */}
        <header className="fixed top-0 left-0 right-0 w-full z-40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 flex justify-center items-center h-20">
              <AiChat />
          </div>
        </header>
        
        {/* AdGallery now has margin-top to maintain spacing after FloatingNav was made fixed */}
        <div className="mt-10">
          <AdGallery />
        </div>
        
        <main className="w-full max-w-6xl">
          <FeedContainer adSize={adSize} sortOption={sortOption} />
        </main>

        <footer className="w-full max-w-6xl mt-8 text-center text-xs text-gray-500">
          <p>&copy; 2024 MAZDADY. All rights reserved. User data is stored on-device.</p>
        </footer>
      </div>

      {/* FloatingNav now handles the trading feed toggle */}
      <FloatingNav 
        onTradingClick={toggleTradingFeed} 
        onAdSizeChange={handleAdSizeChange}
        onThemeToggle={toggleTheme}
        onSortChange={handleSortChange}
      />
      
      {/* Trading Feed Overlay */}
      {isTradingFeedVisible && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 z-40 flex items-center justify-center p-4 animate-fade-in"
          onClick={toggleTradingFeed}
        >
          <div 
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={toggleTradingFeed}
              className="absolute -top-4 -right-4 bg-maz-surface text-maz-text rounded-full p-2 z-10 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close Trading Feed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <TradingFeed />
          </div>
          <style>{`
            @keyframes fade-in {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .animate-fade-in {
              animation: fade-in 0.3s ease-out forwards;
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default App;