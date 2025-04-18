'use client'
import React, { useState, useRef, useEffect } from 'react';

interface LazyLoadChartProps {
  children: React.ReactNode;
  placeholderHeight?: string; // e.g., '400px'
}

const LazyLoadChart: React.FC<LazyLoadChartProps> = ({ children, placeholderHeight = '400px' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When the placeholder comes into view, set isVisible to true
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Stop observing once visible
          }
        });
      },
      {
        rootMargin: '100px 0px', // Optional: Load 100px before it enters viewport
      }
    );

    if (placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (placeholderRef.current) {
        observer.unobserve(placeholderRef.current);
      }
    };
  }, []);

  return (
    <div ref={placeholderRef} style={{ minHeight: isVisible ? 'auto' : placeholderHeight }}>
      {isVisible ? children : <div className={`h-[${placeholderHeight}] animate-pulse bg-gray-100 rounded-lg w-full`} />}
    </div>
  );
};

export default LazyLoadChart;
