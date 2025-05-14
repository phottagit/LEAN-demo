"use client";

import { useState, useEffect } from "react";
import QCCSidebar from "../components/QCCSidebar";
import Footer from "../components/Footer";

export default function QCCLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsCollapsed(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="">
    <div className="flex min-h-screen">
      <QCCSidebar
        isCollapsed={isCollapsed}
        isMobile={isMobile}
        toggleSidebar={toggleSidebar}
      />
      <main className={`flex-1 transition-all duration-300 ${isCollapsed ? "ml-16" : "ml-64"} p-4`}>
        {children}
      </main>
    </div>
    <Footer />
    </div>
  );
}