"use client";

import React, { useEffect, useState } from 'react';
import Sidebar from './SixSigmaSidebar';
import Footer from './Footer';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';

export default function SixSigmaLayout({ children }) {
  const { data: session } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile and set initial sidebar state
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(true);
      }
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener("resize", checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Toggle sidebar function to pass to Sidebar component
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* <Navbar session={session} /> */}
      
      <div className="flex flex-1">
        <Sidebar isCollapsed={isCollapsed} isMobile={isMobile} toggleSidebar={toggleSidebar} />
        
        <main 
          className={cn(
            "flex-1 p-6 transition-all duration-300",
            isCollapsed ? "ml-16" : "ml-64",
            isMobile && isCollapsed && "ml-0"
          )}
        >
          {children}
        </main>
      </div>
      
      <Footer />
    </div>
  );
}