'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/app/components/Sidebar';

export default function QCCLayoutPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  // Detect mobile screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex">
      <Sidebar
        isCollapsed={isCollapsed}
        isMobile={isMobile}
        toggleSidebar={toggleSidebar}
        title="QCC Dashboard"
      />

      <main
        className={`flex-1 transition-all duration-300 ${
          isCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Welcome to QCC Dashboard</h1>
          <p>This is your main content area.</p>
        </div>
      </main>
    </div>
  );
}
