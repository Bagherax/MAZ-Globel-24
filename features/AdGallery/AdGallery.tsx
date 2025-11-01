import React, { useRef, useState, useEffect, TouchEvent } from 'react';
import { ads } from './ads';

const AdGallery: React.FC = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  // Duplicate ads for seamless loop
  const adItems = [...ads, ...ads];

  const stopAutoScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  const startAutoScroll = () => {
    stopAutoScroll(); // Ensure no multiple intervals are running
    scrollIntervalRef.current = window.setInterval(() => {
      if (galleryRef.current) {
        const { scrollLeft, scrollWidth } = galleryRef.current;
        // At the end of the first set, seamlessly jump to the beginning
        if (scrollLeft >= scrollWidth / 2) {
          galleryRef.current.scrollLeft = 0;
        } else {
          galleryRef.current.scrollLeft += 1;
        }
      }
    }, 25); // Controls scroll speed, lower is faster
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);
  
  // Mouse Events
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    stopAutoScroll();
    setIsDragging(true);
    setHasDragged(false);
    if (!galleryRef.current) return;
    setStartX(e.pageX - galleryRef.current.offsetLeft);
    setScrollLeft(galleryRef.current.scrollLeft);
    galleryRef.current.classList.add('grabbing');
  };

  const handleMouseLeave = () => {
    if (!isDragging) return;
    setIsDragging(false);
    galleryRef.current?.classList.remove('grabbing');
    startAutoScroll();
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    galleryRef.current?.classList.remove('grabbing');
    startAutoScroll();
    setTimeout(() => setHasDragged(false), 50);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !galleryRef.current) return;
    e.preventDefault();
    const x = e.pageX - galleryRef.current.offsetLeft;
    const walk = (x - startX);
    galleryRef.current.scrollLeft = scrollLeft - walk;
    if (Math.abs(walk) > 10) {
        setHasDragged(true);
    }
  };
  
  // Touch Events
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    stopAutoScroll();
    setIsDragging(true);
    setHasDragged(false);
    if (!galleryRef.current) return;
    setStartX(e.touches[0].pageX - galleryRef.current.offsetLeft);
    setScrollLeft(galleryRef.current.scrollLeft);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    startAutoScroll();
    setTimeout(() => setHasDragged(false), 50);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !galleryRef.current) return;
    const x = e.touches[0].pageX - galleryRef.current.offsetLeft;
    const walk = (x - startX);
    galleryRef.current.scrollLeft = scrollLeft - walk;
    if (Math.abs(walk) > 10) {
        setHasDragged(true);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (hasDragged) {
      e.preventDefault();
    }
  };

  const adGalleryCSS = `
    .ad-gallery-wrapper {
        width: 100vw;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        height: 38vh;
        margin-bottom: 1.5rem; /* Space between gallery and main content */
    }
    .ad-gallery-container {
        display: flex;
        width: 100%;
        height: 100%;
        overflow-x: scroll;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE and Edge */
        -webkit-overflow-scrolling: touch;
        cursor: grab;
        user-select: none;
    }
    .ad-gallery-container::-webkit-scrollbar {
        display: none; /* Chrome, Safari, and Opera */
    }
    .ad-gallery-container.grabbing {
        cursor: grabbing;
    }
    .ad-gallery-scroller {
        display: flex;
        flex-wrap: nowrap;
    }
    .ad-item {
        flex: 0 0 auto;
        width: 33.33vw; /* Show 3 items on a standard desktop view */
        height: 100%;
        padding: 0;
        position: relative;
    }
    .ad-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        pointer-events: none;
    }
    @media (max-width: 1024px) {
        .ad-item {
            width: 50vw; /* Show 2 items on tablets */
        }
    }
    @media (max-width: 768px) {
        .ad-item {
            width: 80vw; /* Show ~1.25 items on mobile, encourages swiping */
        }
    }
  `;

  return (
    <>
      <style>{adGalleryCSS}</style>
      <div className="ad-gallery-wrapper">
        <div
          className="ad-gallery-container"
          ref={galleryRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
        >
          <div className="ad-gallery-scroller">
            {adItems.map((ad, index) => (
              <a
                key={`${ad.id}-${index}`}
                href={ad.link}
                target={ad.type === 'external' ? '_blank' : '_self'}
                rel={ad.type === 'external' ? 'noopener noreferrer' : ''}
                className="ad-item"
                onClick={handleClick}
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
