"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  LayoutDashboard,
  FileText,
  BarChart3,
  Settings,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SixSigmaSidebar({ isCollapsed, isMobile, toggleSidebar }) {
  const pathname = usePathname();
  const scrollRef = useRef(null);

  useEffect(() => {
    const savedScroll = sessionStorage.getItem("sixSigmaSidebarScroll");
    if (scrollRef.current && savedScroll) {
      scrollRef.current.scrollTop = parseInt(savedScroll, 10);
    }

    return () => {
      if (scrollRef.current) {
        sessionStorage.setItem("sixSigmaSidebarScroll", scrollRef.current.scrollTop.toString());
      }
    };
  }, [pathname]);

  return (
    <div className="relative">
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md md:hidden"
        >
          <Menu size={24} />
        </button>
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen transition-all duration-300 bg-white border-r border-gray-200",
          isCollapsed ? "w-16" : "w-64",
          isMobile && isCollapsed && "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div
            className={cn(
              "flex items-center justify-between p-4 border-b",
              isCollapsed && "justify-center"
            )}
          >
            {!isCollapsed && <h2 className="text-xl font-semibold">Six Sigma</h2>}
            <button
              onClick={toggleSidebar}
              className={cn(
                "p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200",
                isCollapsed && "rotate-180"
              )}
            >
              <ChevronLeft size={20} />
            </button>
          </div>

          <div className="flex-1 py-4 overflow-y-auto" ref={scrollRef}>
            <nav className="space-y-1 px-2">
              <SidebarItem
                icon={<LayoutDashboard size={20} />}
                title="Dashboard"
                href="/sixsigma/dashboard"
                isActive={pathname === "/sixsigma/dashboard"}
                isCollapsed={isCollapsed}
              />
              <SidebarItem
                icon={<FileText size={20} />}
                title="Projects"
                href="/sixsigma/projects"
                isActive={pathname.startsWith("/sixsigma/projects")}
                isCollapsed={isCollapsed}
              />
              <SidebarItem
                icon={<BarChart3 size={20} />}
                title="DMAIC Analysis"
                href="/sixsigma/dmaic"
                isActive={pathname === "/sixsigma/dmaic"}
                isCollapsed={isCollapsed}
              />
              <SidebarItem
                icon={<Settings size={20} />}
                title="Tools & Templates"
                href="/sixsigma/tools"
                isActive={pathname === "/sixsigma/tools"}
                isCollapsed={isCollapsed}
              />
            </nav>
          </div>
        </div>
      </aside>

      {isMobile && !isCollapsed && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}

function SidebarItem({ icon, title, href, isActive, isCollapsed }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors",
        isActive ? "bg-gray-100 text-blue-600" : "text-gray-700",
        isCollapsed ? "justify-center" : ""
      )}
    >
      <div>{icon}</div>
      {!isCollapsed && <span>{title}</span>}
    </Link>
  );
}
