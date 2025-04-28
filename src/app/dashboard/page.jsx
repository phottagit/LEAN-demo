"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Handle authentication in useEffect instead of conditional rendering
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  const enterFullscreen = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(err => {
        // Don't log this as an error since it's expected in some cases
        console.info("Fullscreen not available:", err.message);
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
      // Remove automatic fullscreen trigger on mouse move
      // This was causing the permissions error
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    // document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      // window.removeEventListener('mousemove', handleMouseMove);
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
      <img
        key={refreshKey}
        src={`/DailyKPIs.jpg?v=${refreshKey}`}
        alt="Daily KPIs"
        className="w-full h-full object-contain"
        onClick={enterFullscreen}
      />

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
                
                const result = await response.json();
                
                if (response.ok) {
                  console.log('Upload successful:', result);
                  refreshImage(); // Refresh image after successful upload
                } else {
                  console.error('Upload failed:', result.error);
                  alert('Failed to upload image: ' + (result.error || 'Unknown error'));
                }
              } catch (error) {
                console.error('Error uploading image:', error);
                alert('Error uploading image. Please try again.');
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
