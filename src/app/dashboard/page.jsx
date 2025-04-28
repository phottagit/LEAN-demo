"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageTimestamp, setImageTimestamp] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imagePaths, setImagePaths] = useState(null);
  const [checkingPaths, setCheckingPaths] = useState(false);

  // Handle authentication in useEffect
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  // Check image paths on initial load
  useEffect(() => {
    checkImagePaths();
  }, []);

  const checkImagePaths = async () => {
    setCheckingPaths(true);
    try {
      const response = await fetch(`/api/check-image-paths?filename=DailyKPIs.jpg`);
      if (response.ok) {
        const data = await response.json();
        setImagePaths(data);
        
        // If neither image exists, keep the error state
        if (!data.standardImageExists && !data.uploadsImageExists) {
          setImageError(true);
        }
      }
    } catch (error) {
      console.error('Error checking image paths:', error);
    } finally {
      setCheckingPaths(false);
    }
  };

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
    setImageError(false);
    setImageTimestamp(Date.now());
    setRefreshKey(prev => prev + 1);
    
    // Use the browser's Image constructor, not Next.js Image component
    const img = new window.Image();
    img.onload = () => {
      setIsLoading(false);
      setImageError(false);
    };
    img.onerror = () => {
      // Try the fallback image
      const fallbackImg = new window.Image();
      fallbackImg.onload = () => {
        setIsLoading(false);
        setImageError(false);
      };
      fallbackImg.onerror = () => {
        setIsLoading(false);
        setImageError(true);
        // Check paths again to see what's available
        checkImagePaths();
      };
      fallbackImg.src = `/DailyKPIs.jpg?v=${Date.now()}`;
    };
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
      
      {imageError ? (
        <div className="text-white text-center p-6">
          <h2 className="text-2xl mb-4">No image available</h2>
          <p className="mb-4">Please upload an image using the button below.</p>
          
          {imagePaths && (
            <div className="text-sm text-gray-400 mt-4 text-left">
              <p>Public directory exists: {imagePaths.publicDirExists ? 'Yes' : 'No'}</p>
              <p>Uploads directory exists: {imagePaths.uploadsDirExists ? 'Yes' : 'No'}</p>
              <p>Files in uploads: {imagePaths.uploadFiles.length > 0 ? 
                imagePaths.uploadFiles.join(', ') : 'None'}</p>
            </div>
          )}
        </div>
      ) : (
        <img
          key={refreshKey}
          src={`/uploads/DailyKPIs_${imageTimestamp}.jpg?v=${refreshKey}`}
          alt="Daily KPIs"
          className="w-full h-full object-contain"
          onClick={enterFullscreen}
          onError={(e) => {
            // Fallback to the standard filename if the timestamped version fails
            e.target.src = `/DailyKPIs.jpg?v=${refreshKey}`;
            e.target.onerror = () => {
              setImageError(true);
              checkImagePaths();
            };
          }}
        />
      )}

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
                  setImageError(false);
                  refreshImage(); // Refresh image after successful upload
                  checkImagePaths(); // Check paths after upload
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
        className="absolute bottom-4 right-4 bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-40 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
        </svg>
      </button>
    </div>
  );
}

export default DashboardPage;
