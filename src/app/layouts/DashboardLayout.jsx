/**
 * DashboardLayout Component
 * Modern, responsive dashboard layout with collapsible sidebar
 * Provides consistent structure for all role-based dashboards
 */

import { useState, useEffect, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Layout } from "antd";
import DashboardHeader from "../../components/Header/DashboardHeader";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAuth } from "../../hooks/useAuth";

const { Content } = Layout;

/**
 * Breakpoints for responsive design
 */
const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
};

/**
 * DashboardLayout
 * Provides modern admin panel layout with:
 * - Collapsible sidebar
 * - Responsive design for all devices
 * - Smooth transitions
 * - Role-based navigation
 */
const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { userRole, userName } = useAuth();
  const location = useLocation();

  // Handle responsive behavior
  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    const mobile = width < BREAKPOINTS.mobile;
    setIsMobile(mobile);

    if (mobile) {
      setSidebarCollapsed(true);
    } else if (width < BREAKPOINTS.tablet) {
      setSidebarCollapsed(true);
    }
  }, []);

  // Initialize and listen for resize
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Toggle sidebar
  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setMobileMenuOpen((prev) => !prev);
    } else {
      setSidebarCollapsed((prev) => !prev);
    }
  }, [isMobile]);

  // Close mobile menu
  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Calculate content margin based on sidebar state
  const contentMargin = sidebarCollapsed ? "lg:ml-20" : "lg:ml-64";

  return (
    <Layout className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
        userRole={userRole}
      />

      {/* Main Content Area */}
      <Layout
        className={`
          transition-all duration-300 ease-out
          ${contentMargin}
        `}>
        {/* Header */}
        <DashboardHeader
          collapsed={sidebarCollapsed}
          onToggleSidebar={toggleSidebar}
          userName={userName}
          userRole={userRole}
        />

        {/* Content */}
        <Content
          className="
            p-4 md:p-6 lg:p-8
            bg-slate-50
            min-h-[calc(100vh-64px)] 
            mt-16
          ">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </Content>
      </Layout>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="
            fixed inset-0 bg-black/50 backdrop-blur-sm
            z-30 lg:hidden
            transition-opacity duration-300
          "
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </Layout>
  );
};

export default DashboardLayout;
