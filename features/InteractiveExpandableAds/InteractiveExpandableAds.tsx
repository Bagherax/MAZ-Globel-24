import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ad, InteractiveExpandableAdsProps } from "./types";

const sizeClasses = {
  small: "h-32 w-36",
  medium: "h-48 w-52",
  large: "h-64 w-64",
};

const InteractiveExpandableAds: React.FC<InteractiveExpandableAdsProps> = ({ ads }) => {
  const [expandedAdId, setExpandedAdId] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setExpandedAdId(expandedAdId === id ? null : id);
  };

  return (
    <div className="flex flex-wrap gap-4 justify-start">
      {ads.map((ad) => (
        <div key={ad.id} className="flex flex-col">
          {/* Ad Window */}
          <div
            onClick={() => handleClick(ad.id)}
            className={`cursor-pointer bg-maz-surface rounded-lg shadow-md overflow-hidden relative flex items-center justify-center ${sizeClasses[ad.size]}`}
          >
            {ad.image && (
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute p-2 bg-maz-surface bg-opacity-70 text-sm font-semibold text-maz-text">
              {ad.title}
            </div>
          </div>

          {/* Expanded content with animation */}
          <AnimatePresence>
            {expandedAdId === ad.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-maz-surface rounded-lg shadow p-4 mt-2 w-full max-w-[400px] overflow-hidden text-maz-text"
              >
                <h4 className="font-semibold mb-2">{ad.title}</h4>
                <p className="text-sm mb-2 text-maz-text-secondary">{ad.description}</p>
                {ad.actions && (
                  <div className="flex gap-2 mt-2">
                    {ad.actions.map((action, idx) => (
                      <button
                        key={idx}
                        className="bg-maz-primary text-white px-3 py-1 rounded hover:opacity-90 text-sm"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default InteractiveExpandableAds;
