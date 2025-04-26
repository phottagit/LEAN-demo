"use client";

import React, { useEffect, useState } from 'react';

function DashboardPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const enterFullscreen = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(err => {
        console.warn("Fullscreen request failed", err);
      });
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen();
    }
    setIsFullscreen(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey(prev => prev + 1);
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Function to refresh the image with cache-busting
  const refreshImage = () => {
    setRefreshKey(Date.now()); // Use timestamp for cache busting
  };

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
    <div className="relative w-screen h-screen flex items-center justify-center bg-black">
      <img
        key={refreshKey}
        src={`/DailyKPIs.jpg?v=${refreshKey}`}
        alt="Daily KPIs"
        className="w-full h-full object-contain"
        onClick={enterFullscreen}
      />

      {/* ปุ่มแบบมีรูป */}
      <button
        onClick={() => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';
          input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
              const formData = new FormData();
              formData.append('image', file);
              
              try {
                const response = await fetch('/api/upload-image', {
                  method: 'POST',
                  body: formData,
                });
                
                if (response.ok) {
                  refreshImage(); // Refresh image after successful upload
                } else {
                  console.error('Failed to upload image');
                }
              } catch (error) {
                console.error('Error uploading image:', error);
              }
            }
          };
          input.click();
        }}
        className="absolute bottom-4 right-4 bg-transparent p-2 rounded-full hover:bg-white transition"
      >
        <img 
          src="/refresh-icon.svg" 
          alt="Refresh" 
          className="w-8 h-8" 
        />
      </button>
    </div>
  );
}

export default DashboardPage;
