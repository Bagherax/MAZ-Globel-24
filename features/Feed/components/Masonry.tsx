import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { FeedItem, Ad, PaidAd } from '../types';
import './Masonry.css';

const useColumns = (adSize: 'small' | 'medium' | 'large') => {
  const getCols = () => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
    if (adSize === 'large') {
      return width >= 768 ? 2 : 1;
    }
    if (adSize === 'small') {
      if (width >= 1280) return 5;
      if (width >= 1024) return 4;
      if (width >= 768) return 3;
      return 2;
    }
    // medium (default)
    if (width >= 1024) return 3;
    if (width >= 768) return 2;
    return 1;
  };

  const [cols, setCols] = useState(getCols);

  useLayoutEffect(() => {
    const handler = () => setCols(getCols());
    window.addEventListener('resize', handler);
    handler(); 
    return () => window.removeEventListener('resize', handler);
  }, [adSize]);

  return cols;
};


// Helper to preload an image and get its dimensions. It resolves with dimensions on success
// or with null on failure, preventing Promise.all from rejecting.
const preloadImage = (src: string): Promise<{ width: number, height: number } | null> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => {
      console.warn(`Failed to load image for masonry layout: ${src}`);
      resolve(null); // Resolve with null on error instead of rejecting
    };
  });
};

interface MasonryProps {
  items: FeedItem[];
  adSize: 'small' | 'medium' | 'large';
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  adSize,
  ease = 'power3.out',
  duration = 0.5,
  stagger = 0.05,
  animateFrom = 'center',
  scaleOnHover = true,
  hoverScale = 1.05,
  blurToFocus = true,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [gridHeight, setGridHeight] = useState(0);
  const [imageDimensions, setImageDimensions] = useState<{width: number; height: number}[]>([]);
  
  const numColumns = useColumns(adSize);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, items.length);
  }, [items]);
  
  useEffect(() => {
    if (!items || items.length === 0) return;

    const preload = async () => {
        const settledPromises = await Promise.all(
            items.map(item => preloadImage((item.data as Ad | PaidAd).imageUrl))
        );
      
        // Use a default 1:1 aspect ratio for any images that failed to load
        const DEFAULT_DIMENSIONS = { width: 1, height: 1.25 }; 
        
        const dims = settledPromises.map(dim => dim || DEFAULT_DIMENSIONS);
        setImageDimensions(dims);
    };
    
    preload();
  }, [items]);

  useLayoutEffect(() => {
    if (imageDimensions.length !== items.length) return;

    const grid = gridRef.current;
    if (!grid || numColumns === 0) return;

    const gridWidth = grid.offsetWidth;
    const columnWidth = gridWidth / numColumns;
    const columnHeights = Array(numColumns).fill(0);

    itemRefs.current.forEach((itemEl, i) => {
      if (!itemEl) return;
      
      const { width: naturalWidth, height: naturalHeight } = imageDimensions[i];
      const aspectRatio = naturalHeight / naturalWidth;
      const itemHeight = columnWidth * aspectRatio;

      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      const x = shortestColumnIndex * columnWidth;
      const y = columnHeights[shortestColumnIndex];

      columnHeights[shortestColumnIndex] += itemHeight + 16; // 1rem gap

      let fromVars: gsap.TweenVars = { opacity: 0 };
      const animateDistance = 50;

      switch(animateFrom) {
        case 'bottom': fromVars.y = y + animateDistance; break;
        case 'top': fromVars.y = y - animateDistance; break;
        case 'left': fromVars.x = x - animateDistance; break;
        case 'right': fromVars.x = x + animateDistance; break;
        case 'center': fromVars.scale = 0.5; break;
      }

      gsap.fromTo(
        itemEl,
        fromVars,
        {
          x,
          y,
          width: columnWidth,
          height: itemHeight,
          opacity: 1,
          scale: 1,
          duration,
          ease,
          delay: i * stagger,
        }
      );
    });
    
    setGridHeight(Math.max(...columnHeights));

  }, [numColumns, imageDimensions, items, duration, ease, stagger, animateFrom]);
  
  const handleMouseEnter = (el: HTMLDivElement | null) => {
    if (!el) return;
    if (scaleOnHover) {
        gsap.to(el, { scale: hoverScale, duration: 0.3, ease: 'power2.out', zIndex: 10 });
    }
    if (blurToFocus) {
        itemRefs.current.forEach(item => {
            if (item && item !== el) {
                gsap.to(item, { filter: 'blur(4px) saturate(0.8)', scale: 0.98, duration: 0.3 });
            }
        });
    }
  };

  const handleMouseLeave = (el: HTMLDivElement | null) => {
    if (!el) return;
    if (scaleOnHover) {
        gsap.to(el, { scale: 1, duration: 0.3, ease: 'power2.out', zIndex: 1 });
    }
    if (blurToFocus) {
        itemRefs.current.forEach(item => {
            if (item) {
                gsap.to(item, { filter: 'blur(0px) saturate(1)', scale: 1, duration: 0.3 });
            }
        });
    }
  };


  return (
    <div ref={gridRef} className="list" style={{ height: gridHeight > 0 ? gridHeight : 'auto' }}>
      {items.map((item, i) => (
        <div
          key={item.id}
          className="item-wrapper"
          ref={el => (itemRefs.current[i] = el)}
          onMouseEnter={() => handleMouseEnter(itemRefs.current[i])}
          onMouseLeave={() => handleMouseLeave(itemRefs.current[i])}
        >
          <div
            className="item-img"
            style={{ backgroundImage: `url(${(item.data as Ad | PaidAd).imageUrl})` }}
          />
        </div>
      ))}
    </div>
  );
};

export default Masonry;
