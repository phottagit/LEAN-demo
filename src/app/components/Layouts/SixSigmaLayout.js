"use client";

import React, { useEffect, useState } from "react";
import QCCSidebar from "components/Sidebars/QCCSidebar";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

export default function SixSigmaLayout({ children }) {
  const { data: session } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile and set sidebar initial state
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) setIsCollapsed(true);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* <Navbar session={session} /> */}

      <div className="flex flex-1">
        <QCCSidebar
          isCollapsed={isCollapsed}
          isMobile={isMobile}
          toggleSidebar={toggleSidebar}
          title="Six Sigma"
        />

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