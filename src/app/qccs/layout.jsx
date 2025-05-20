"use client";

import { useState, useEffect } from "react";
import QCCSidebar from "../components/Sidebars/QCCSidebar";
import Footer from "../components/Footer";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function QCCLayout({ children }) {

  const { data: session, status } = useSession();
  const router = useRouter();

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

  // 6. Authentication effect
        useEffect(() => {
          if (status === "unauthenticated") {
            router.replace("/dashboard");
          }
        }, [status, router]);

  return (

    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <QCCSidebar
          isCollapsed={isCollapsed}
          isMobile={isMobile}
          toggleSidebar={toggleSidebar}
        />
        <main className={`flex-1 transition-all duration-300 ${isCollapsed ? "ml-16" : "ml-64"} p-6`}>
          {children}
        </main>
      </div>
    <Footer />
    </div>
  );
}