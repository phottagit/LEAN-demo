"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
// import Image from 'next/image';

function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageTimestamp, setImageTimestamp] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(false);

  // Handle authentication in useEffect
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

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
      refreshImage();
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Function to refresh the image with cache-busting
  const refreshImage = () => {
    setIsLoading(true);
    setImageTimestamp(Date.now());
    setRefreshKey(prev => prev + 1);
    
    // Use the browser's Image constructor, not Next.js Image component
    const img = new window.Image();
    img.onload = () => setIsLoading(false);
    img.onerror = () => setIsLoading(false);
    img.src = `/uploads/DailyKPIs_${imageTimestamp}.jpg?v=${Date.now()}`;
    
    // Fallback if the timestamped version doesn't exist
    setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 3000);
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

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-black">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="text-white">Loading new image...</div>
        </div>
      )}
      
      <img
        key={refreshKey}
        src={`/uploads/DailyKPIs_${imageTimestamp}.jpg?v=${refreshKey}`}
        alt="Daily KPIs"
        className="w-full h-full object-contain"
        onClick={enterFullscreen}
        onError={(e) => {
          // Fallback to the standard filename if the timestamped version fails
          e.target.src = `/DailyKPIs.jpg?v=${refreshKey}`;
        }}
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
              setIsLoading(true);
              const formData = new FormData();
              formData.append('image', file);
              
              try {
                const response = await fetch('/api/upload-image', {
                  method: 'POST',
                  body: formData,
                });
                
                if (response.ok) {
                  const data = await response.json();
                  if (data.timestamp) {
                    setImageTimestamp(data.timestamp);
                  }
                  refreshImage(); // Refresh image after successful upload
                } else {
                  console.error('Failed to upload image');
                  setIsLoading(false);
                }
              } catch (error) {
                console.error('Error uploading image:', error);
                setIsLoading(false);
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
