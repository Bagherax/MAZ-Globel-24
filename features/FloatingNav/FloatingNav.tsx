import React, { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

interface FloatingNavProps {
  onTradingClick: () => void;
  onChatClick: () => void;
  onAdSizeChange: (size: 'small' | 'medium' | 'large') => void;
  onThemeToggle: () => void;
  onSortChange: (option: string) => void;
}

const mainTools = [
  { id: "adsize", label: "Ad Size", panel: 'adsize', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg> },
  { id: "daynight", label: "Day/Night", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg> },
  { id: "sortby", label: "Sort By", panel: 'sortby', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" /></svg> },
  { id: "category", label: "Category", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
  { id: "favorite", label: "Favorite", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg> },
  { id: "archive", label: "Msg Archive", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg> }
];

const adSizeTools: {id: 'large' | 'medium' | 'small', label: string, icon: React.ReactNode}[] = [
  { id: "large", label: "Large", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75h16.5v16.5H3.75z" /></svg> },
  { id: "medium", label: "Medium", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75h6v6h-6zm9 0h6v6h-6zm-9 9h6v6h-6zm9 0h6v6h-6z" /></svg> },
  { id: "small", label: "Small", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75h4.5v4.5h-4.5zm6 0h4.5v4.5h-4.5zm6 0h4.5v4.5h-4.5zm-12 6h4.5v4.5h-4.5zm6 0h4.5v4.5h-4.5zm6 0h4.5v4.5h-4.5zm-12 6h4.5v4.5h-4.5zm6 0h4.5v4.5h-4.5zm6 0h4.5v4.5h-4.5z" /></svg> },
];

const sortTools: {id: string, label: string, icon: React.ReactNode}[] = [
    { id: "price_asc", label: "Price: Low to High", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" /></svg> },
    { id: "price_desc", label: "Price: High to Low", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25 1.5L17.25 21m0 0L21 17.25M17.25 21V9" /></svg> },
    { id: "newest", label: "Newest Arrivals", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 22.5l-.648-1.938a3.375 3.375 0 00-2.694-2.694L11.25 18l1.938-.648a3.375 3.375 0 002.694-2.694L16.25 13.5l.648 1.938a3.375 3.375 0 002.694 2.694L21.75 18l-1.938.648a3.375 3.375 0 00-2.694 2.694z" /></svg> },
    { id: "popular", label: "Most Popular", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg> },
];

const addAdsTools: {id: string, label: string, icon: React.ReactNode}[] = [
  { id: "free", label: "Add Free Ads", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.53a18.285 18.285 0 005.154-2.257c1.066-1.066.975-2.84-.282-3.882L9.568 3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" /></svg> },
  { id: "paid", label: "Add Paid Ads", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c.171.128.373.189.57.189h1.104c.197 0 .399-.06.57-.189l.879-.659M12 12a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.344A4.5 4.5 0 005.656 12A4.5 4.5 0 0012 17.656A4.5 4.5 0 0018.344 12A4.5 4.5 0 0012 6.344z" /></svg> },
  { id: "social", label: "Social Booster", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84m.246-5.84a14.927 14.927 0 015.841 2.58m5.841 2.58L15.59 14.37M9.63 8.41L8.41 9.63m.246-5.841A14.927 14.927 0 008.41 9.63m-5.841-.246a14.927 14.927 0 00-2.58 5.84m-2.58 5.841a14.927 14.927 0 005.84 2.58m0 0a14.928 14.928 0 005.841 2.58m-5.841-2.58a14.926 14.926 0 00-5.84-2.58m2.58-5.84A14.927 14.927 0 018.41 9.63m2.58 5.84a6 6 0 01-5.84-7.38m0 0a6 6 0 017.38-5.84m-7.38 5.84a6 6 0 005.84 7.38" /></svg> },
];


const FloatingNav: React.FC<FloatingNavProps> = ({ onTradingClick, onChatClick, onAdSizeChange, onThemeToggle, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAddAdsOpen, setIsAddAdsOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<'main' | 'adsize' | 'sortby'>('main');
  const settingsPanelContainerRef = useRef<HTMLDivElement>(null);
  const addAdsPanelContainerRef = useRef<HTMLDivElement>(null);

  const buttonClasses = "relative w-16 h-16 bg-[#3b82f6] text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 transform hover:scale-110 hover:bg-[#2563eb]";
  const iconClasses = "w-8 h-8";

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOpen) {
      setIsSettingsOpen(false);
      setIsAddAdsOpen(false);
      setActivePanel('main');
    }
    setIsOpen(!isOpen);
  };
  
  const handleTradingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onTradingClick();
    setIsOpen(false); // Close menu after action
  };
  
  const handleChatClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onChatClick();
    setIsOpen(false); // Close menu after action
  };

  const toggleSettingsMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isSettingsOpen) {
      // Open this panel, close the other
      setIsAddAdsOpen(false);
      setActivePanel('main');
      setIsSettingsOpen(true);
    } else {
      // It's already open, either go back or close it
      if (activePanel !== 'main') {
        changePanel('main');
      } else {
        setIsSettingsOpen(false);
      }
    }
  };
  
  const toggleAddAdsMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAddAdsOpen) {
      // Open this panel, close the other
      setIsSettingsOpen(false);
      setActivePanel('main');
    }
    setIsAddAdsOpen(prev => !prev);
  };

  const changePanel = (targetPanel: 'main' | 'adsize' | 'sortby' | null) => {
    const buttons = settingsPanelContainerRef.current?.children;
    if (buttons) {
      gsap.to(buttons, {
        y: 10,
        opacity: 0,
        stagger: 0.04,
        duration: 0.2,
        onComplete: () => {
          if (targetPanel) {
            setActivePanel(targetPanel);
          } else {
            setIsSettingsOpen(false);
            setTimeout(() => setActivePanel('main'), 300); // Reset after close animation
          }
        },
      });
    } else { // Fallback for no animation
      if (targetPanel) {
        setActivePanel(targetPanel);
      } else {
        setIsSettingsOpen(false);
        setActivePanel('main');
      }
    }
  };

  const handleToolClick = (e: React.MouseEvent, toolId: string, panel: string | undefined) => {
    e.stopPropagation();
    if (panel) {
        changePanel(panel as 'adsize' | 'sortby');
    } else if (toolId === 'daynight') {
        onThemeToggle();
        setIsSettingsOpen(false);
        setTimeout(() => setActivePanel('main'), 300);
    }
    // Handle other tools without panels here if needed
  };

  const handleAdSizeClick = (e: React.MouseEvent, size: 'small' | 'medium' | 'large') => {
    e.stopPropagation();
    onAdSizeChange(size);
    setIsSettingsOpen(false);
    setTimeout(() => setActivePanel('main'), 300);
  };

  const handleSortClick = (e: React.MouseEvent, option: string) => {
    e.stopPropagation();
    onSortChange(option);
    setIsSettingsOpen(false);
    setTimeout(() => setActivePanel('main'), 300);
  };
  
  const handleAddAdClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Placeholder for action
    setIsAddAdsOpen(false);
  }

  useLayoutEffect(() => {
    if (isSettingsOpen) {
      const buttons = settingsPanelContainerRef.current?.children;
      if (buttons) {
        gsap.fromTo(
          buttons,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: { each: 0.05, from: 'start' },
            duration: 0.3,
            ease: 'power3.out',
          }
        );
      }
    }
  }, [isSettingsOpen, activePanel]);
  
  useLayoutEffect(() => {
    if (isAddAdsOpen) {
      const buttons = addAdsPanelContainerRef.current?.children;
      if (buttons) {
        gsap.fromTo(
          buttons,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: { each: 0.05, from: 'start' },
            duration: 0.3,
            ease: 'power3.out',
          }
        );
      }
    }
  }, [isAddAdsOpen]);
  
  const backButtonIcon = <svg className={iconClasses} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg>;
  
  const mainVerticalMenuVisible = isOpen && !isSettingsOpen && !isAddAdsOpen;

  const addAdsContainerClass =
    isOpen && !isSettingsOpen
      ? `opacity-100 ${isAddAdsOpen ? "-translate-y-[5rem]" : "-translate-y-[15rem]"}`
      : "opacity-0 translate-y-0 pointer-events-none";
      
  const settingsContainerClass =
    isOpen && !isAddAdsOpen
      ? `opacity-100 -translate-y-[5rem]`
      : "opacity-0 translate-y-0 pointer-events-none";

  return (
    <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
      <div className="relative flex items-center justify-center">
        {/* Central "+" Button */}
        <button
          onClick={toggleMenu}
          className={`${buttonClasses} z-50`}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <svg
            className={`${iconClasses} transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-45' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>

        {/* --- VERTICAL MENU ITEMS --- */}

        {/* Profile (Topmost) */}
        <a href="#" aria-label="Profile" className={`absolute transform left-1/2 -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] delay-[250ms] ${mainVerticalMenuVisible ? 'opacity-100 -translate-y-[25rem]' : 'opacity-0 translate-y-0 pointer-events-none'}`}>
          <div className={buttonClasses}>
            <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </a>

        {/* Chat */}
        <button onClick={handleChatClick} aria-label="Chat" className={`absolute transform left-1/2 -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] delay-[200ms] ${mainVerticalMenuVisible ? 'opacity-100 -translate-y-[20rem]' : 'opacity-0 translate-y-0 pointer-events-none'}`}>
          <div className={buttonClasses}>
            <svg className={iconClasses} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        </button>

        {/* Add Ads Group */}
        <div className={`absolute transform left-1/2 -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] delay-[150ms] ${addAdsContainerClass}`}>
           <div className="relative" onClick={toggleAddAdsMenu} aria-label="Add Ads">
              <div ref={addAdsPanelContainerRef} className={`absolute bottom-full mb-4 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 transition-opacity duration-300 ${isAddAdsOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                {addAdsTools.map((tool) => (
                  <button key={tool.id} className={buttonClasses} onClick={handleAddAdClick} title={tool.label}>
                    <div className={iconClasses}>{tool.icon}</div>
                  </button>
                ))}
                <button className={buttonClasses + " bg-gray-500 hover:bg-gray-600"} onClick={(e) => { e.stopPropagation(); setIsAddAdsOpen(false); }} title="Back">
                  {backButtonIcon}
                </button>
              </div>
              <div className={buttonClasses}>
                <svg className={`${iconClasses} transition-transform duration-300 ${isAddAdsOpen ? 'rotate-90' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
           </div>
        </div>

        {/* Trading */}
        <a href="#" onClick={handleTradingClick} aria-label="Trading" className={`absolute transform left-1/2 -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] delay-[100ms] ${mainVerticalMenuVisible ? 'opacity-100 -translate-y-[10rem]' : 'opacity-0 translate-y-0 pointer-events-none'}`}>
          <div className={buttonClasses}>
            <svg className={iconClasses} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </a>

        {/* Settings Group */}
        <div className={`absolute transform left-1/2 -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] delay-[50ms] ${settingsContainerClass}`}>
           <div className="relative" onClick={toggleSettingsMenu} aria-label="Settings">
            <div
              ref={settingsPanelContainerRef}
              className={`absolute bottom-full mb-4 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 transition-opacity duration-300 ${isSettingsOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              {activePanel === 'main' && (
                <>
                  {mainTools.map((tool) => (
                    <div key={tool.id} title={tool.label}>
                      <button className={buttonClasses} onClick={(e) => handleToolClick(e, tool.id, tool.panel)}>
                        <div className={iconClasses}>{tool.icon}</div>
                      </button>
                    </div>
                  ))}
                   <button className={buttonClasses + " bg-gray-500 hover:bg-gray-600"} onClick={(e) => { e.stopPropagation(); changePanel(null); }} title="Back">
                     {backButtonIcon}
                   </button>
                </>
              )}
              
              {activePanel === 'adsize' && (
                <>
                  {adSizeTools.map((tool) => (
                     <button key={tool.id} className={buttonClasses} onClick={(e) => handleAdSizeClick(e, tool.id)} title={tool.label}>
                        <div className={iconClasses}>{tool.icon}</div>
                     </button>
                  ))}
                   <button className={buttonClasses + " bg-gray-500 hover:bg-gray-600"} onClick={(e) => { e.stopPropagation(); changePanel('main'); }} title="Back">
                      {backButtonIcon}
                   </button>
                </>
              )}

              {activePanel === 'sortby' && (
                <>
                  {sortTools.map((tool) => (
                     <button key={tool.id} className={buttonClasses} onClick={(e) => handleSortClick(e, tool.id)} title={tool.label}>
                        <div className={iconClasses}>{tool.icon}</div>
                     </button>
                  ))}
                   <button className={buttonClasses + " bg-gray-500 hover:bg-gray-600"} onClick={(e) => { e.stopPropagation(); changePanel('main'); }} title="Back">
                      {backButtonIcon}
                   </button>
                </>
              )}
            </div>

            <div className={buttonClasses}>
              <svg className={`${iconClasses} transition-transform duration-300 ${isSettingsOpen ? 'rotate-90' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default FloatingNav;