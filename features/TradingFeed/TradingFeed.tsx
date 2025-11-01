import React from 'react';

const TradingFeed: React.FC = () => {
  const tradingFeedCSS = `
    .trading-feed-container {
      background-color: #ffffff;
      padding: 20px;
      border-radius: 12px;
      font-family: 'Inter', sans-serif;
      color: #111827;
      border: 1px solid #e5e7eb;
      width: 100%;
      max-width: 600px;
      margin: 20px auto;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .trading-feed-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
    }

    .trading-feed-title {
      font-size: 1.25rem;
      font-weight: 600;
      display: flex;
      align-items: center;
    }

    .live-indicator {
      width: 10px;
      height: 10px;
      background-color: #ff3b30;
      border-radius: 50%;
      margin-right: 10px;
      animation: pulse 1.5s infinite;
    }

    .trading-feed-info {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .chart-container {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      height: 150px;
      padding: 0 10px;
    }

    .chart-bar {
      width: 12px;
      background: linear-gradient(to top, #3B82F6, #6D28D9);
      border-radius: 4px;
      animation: wave 2s infinite ease-in-out;
    }

    .chart-bar.red {
      background: linear-gradient(to top, #ff3b30, #ff453a);
    }

    /* Unique animation delays for each bar */
    .chart-bar:nth-child(1) { animation-delay: 0s; }
    .chart-bar:nth-child(2) { animation-delay: 0.1s; }
    .chart-bar:nth-child(3) { animation-delay: 0.2s; }
    .chart-bar:nth-child(4) { animation-delay: 0.3s; }
    .chart-bar:nth-child(5) { animation-delay: 0.4s; }
    .chart-bar:nth-child(6) { animation-delay: 0.5s; }
    .chart-bar:nth-child(7) { animation-delay: 0.6s; }
    .chart-bar:nth-child(8) { animation-delay: 0.7s; }
    .chart-bar:nth-child(9) { animation-delay: 0.8s; }
    .chart-bar:nth-child(10) { animation-delay: 0.9s; }
    .chart-bar:nth-child(11) { animation-delay: 1.0s; }
    .chart-bar:nth-child(12) { animation-delay: 1.1s; }
    .chart-bar:nth-child(13) { animation-delay: 1.2s; }
    .chart-bar:nth-child(14) { animation-delay: 1.3s; }
    .chart-bar:nth-child(15) { animation-delay: 1.4s; }

    @keyframes pulse {
      0% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(255, 59, 48, 0.7); }
      70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(255, 59, 48, 0); }
      100% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(255, 59, 48, 0); }
    }

    @keyframes wave {
      0%, 100% { height: 10%; }
      50% { height: 100%; }
    }
  `;

  return (
    <>
      <style>{tradingFeedCSS}</style>
      <div className="trading-feed-container">
          <div className="trading-feed-header">
              <div className="trading-feed-title">
                  <div className="live-indicator"></div>
                  Live Trading Feed
              </div>
              <div className="trading-feed-info">Volume: 24,1M MAZ</div>
          </div>
          <div className="chart-container">
              <div className="chart-bar"></div>
              <div className="chart-bar red"></div>
              <div className="chart-bar"></div>
              <div className="chart-bar"></div>
              <div className="chart-bar red"></div>
              <div className="chart-bar"></div>
              <div className="chart-bar red"></div>
              <div className="chart-bar"></div>
              <div className="chart-bar"></div>
              <div className="chart-bar red"></div>
              <div className="chart-bar"></div>
              <div className="chart-bar"></div>
              <div className="chart-bar red"></div>
              <div className="chart-bar"></div>
              <div className="chart-bar"></div>
          </div>
      </div>
    </>
  );
};

export default TradingFeed;