"use client";

import React, { useEffect, useState } from 'react';

function DashboardPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Function to immediately enter fullscreen
  const enterFullscreen = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(err => {
        console.warn("Fullscreen request failed", err);
      });
    } else if (el.webkitRequestFullscreen) { /* Safari */
      el.webkitRequestFullscreen();
    } else if (el.msRequestFullscreen) { /* IE11 */
      el.msRequestFullscreen();
    }
    setIsFullscreen(true);
  };

  useEffect(() => {
    // Refresh image every 10 minutes
    const interval = setInterval(() => {
      setRefreshKey(prev => prev + 1);
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientY < 10) {
        if (!document.fullscreenElement) {
          enterFullscreen();
        }
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black">
      <img key={refreshKey} src="/DailyKPIs.jpg" alt="Daily KPIs"
        className="w-full h-full object-contain"
        onClick={enterFullscreen} 
      />
    </div>
  );
}

export default DashboardPage;
