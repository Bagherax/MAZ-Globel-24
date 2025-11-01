import React from 'react';
import { ads } from './ads';

const AdGallery: React.FC = () => {
  // Duplicate ads for seamless loop
  const adItems = [...ads, ...ads];

  // Dynamically calculate the duration based on the number of items
  // to maintain a somewhat consistent speed.
  // A simple heuristic: 5 seconds per item.
  const animationDuration = ads.length * 5;

  const adGalleryCSS = `
    .ad-gallery-wrapper {
        width: 100vw;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 5rem; /* Space for the h-20 header */
        margin-bottom: 1.5rem; /* Space between gallery and main content */
        mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    }
    .ad-gallery-container {
        display: flex;
        width: 100%;
        height: 100%;
        overflow: hidden; /* Hide scrollbar, content will be moved by animation */
    }
    
    .ad-gallery-container:hover .ad-gallery-scroller {
        animation-play-state: paused;
    }

    .ad-gallery-scroller {
        display: flex;
        flex-wrap: nowrap;
        animation: scroll ${animationDuration}s linear infinite;
        align-items: flex-end; /* Align items to the bottom */
    }

    @keyframes scroll {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
    }

    .ad-item {
        flex: 0 0 auto;
        padding: 0 0.5rem; /* Add some spacing between items */
        position: relative;
        transition: transform 0.3s ease;
        display: flex;
    }
    .ad-item:hover {
        transform: scale(1.05);
        z-index: 10;
    }
    .ad-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        pointer-events: none;
        border-radius: 8px;
    }
    
    /* Three ad sizes with distinct height/width */
    .ad-item.small { width: 30vw; height: 20vh; }
    .ad-item.medium { width: 45vw; height: 25vh; }
    .ad-item.large { width: 60vw; height: 30vh; }
    
    @media (max-width: 1024px) {
        .ad-item.small { width: 40vw; height: 22vh; }
        .ad-item.medium { width: 55vw; height: 28vh; }
        .ad-item.large { width: 70vw; height: 32vh; }
    }
    @media (max-width: 768px) {
        .ad-item.small { width: 60vw; height: 25vh; }
        .ad-item.medium { width: 75vw; height: 30vh; }
        .ad-item.large { width: 90vw; height: 35vh; }
    }
  `;

  return (
    <>
      <style>{adGalleryCSS}</style>
      <div className="ad-gallery-wrapper">
        <div className="ad-gallery-container">
          <div className="ad-gallery-scroller">
            {adItems.map((ad, index) => (
              <a
                key={`${ad.id}-${index}`}
                href={ad.link}
                target={ad.type === 'external' ? '_blank' : '_self'}
                rel={ad.type === 'external' ? 'noopener noreferrer' : ''}
                className={`ad-item ${ad.size}`}
              >
                <img src={ad.imageUrl} alt={ad.alt} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdGallery;