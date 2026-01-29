/**
 * Sidebar Component
 * Modern, responsive sidebar with role-based navigation
 * Features: Collapsible, mobile-friendly, smooth animations
 * Design: Clean, minimal with solid colors only
 */

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  DollarSign,
  BarChart3,
  Settings,
  ClipboardCheck,
  FileText,
  Calendar,
  Award,
  UserCircle,
  CreditCard,
  GraduationCap,
  X,
  Book,
  UserPlus,
  Link2,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Eye,
} from "lucide-react";

/**
 * Navigation Configuration by Role
 */
const NAVIGATION_CONFIG = {
  admin: [
    {
      section: "Main",
      items: [
        {
          key: "dashboard",
          label: "Dashboard",
          path: "/admin/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      section: "User Management",
      items: [
        {
          key: "users",
          label: "All Users",
          path: "/admin/users",
          icon: Users,
        },
        {
          key: "student-enroll",
          label: "Enroll Student",
          path: "/admin/students/enroll",
          icon: UserPlus,
        },
        {
          key: "parent-mapping",
          label: "Parent-Child Link",
          path: "/admin/parents/mapping",
          icon: Link2,
        },
        {
          key: "assignments",
          label: "Teacher Assign",
          path: "/admin/academics/teacher-assignments",
          icon: UserCircle,
        },
      ],
    },
    {
      section: "Academics",
      items: [
        {
          key: "classes",
          label: "Classes",
          path: "/admin/academics/classes",
          icon: BookOpen,
        },
        {
          key: "subjects",
          label: "Subjects",
          path: "/admin/academics/subjects",
          icon: Book,
        },
        {
          key: "timetable",
          label: "Timetable",
          path: "/admin/academics/timetable",
          icon: Calendar,
        },
        {
          key: "attendance",
          label: "Attendance",
          path: "/admin/attendance",
          icon: ClipboardCheck,
        },
      ],
    },
    {
      section: "Finance",
      items: [
        {
          key: "fees",
          label: "Fees & Finance",
          path: "/admin/fees",
          icon: DollarSign,
        },
      ],
    },
    {
      section: "Reports",
      items: [
        {
          key: "reports",
          label: "Analytics",
          path: "/admin/reports",
          icon: BarChart3,
        },
      ],
    },
    {
      section: "System",
      items: [
        {
          key: "settings",
          label: "Settings",
          path: "/admin/settings",
          icon: Settings,
        },
      ],
    },
  ],
  teacher: [
    {
      section: "Main",
      items: [
        {
          key: "dashboard",
          label: "Dashboard",
          path: "/teacher/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      section: "Attendance",
      items: [
        {
          key: "mark-attendance",
          label: "Mark Attendance",
          path: "/teacher/attendance/mark",
          icon: Pencil,
        },
        {
          key: "view-attendance",
          label: "View Records",
          path: "/teacher/attendance",
          icon: Eye,
        },
      ],
    },
    {
      section: "Academics",
      items: [
        {
          key: "classes",
          label: "My Classes",
          path: "/teacher/classes",
          icon: BookOpen,
        },
        {
          key: "students",
          label: "My Students",
          path: "/teacher/students",
          icon: Users,
        },
        {
          key: "assignments",
          label: "Assignments",
          path: "/teacher/assignments",
          icon: FileText,
        },
        {
          key: "schedule",
          label: "My Schedule",
          path: "/teacher/schedule",
          icon: Calendar,
        },
      ],
    },
  ],
  student: [
    {
      section: "Main",
      items: [
        {
          key: "dashboard",
          label: "Dashboard",
          path: "/student/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      section: "Academics",
      items: [
        {
          key: "classes",
          label: "My Classes",
          path: "/student/classes",
          icon: BookOpen,
        },
        {
          key: "attendance",
          label: "My Attendance",
          path: "/student/attendance",
          icon: ClipboardCheck,
        },
        {
          key: "assignments",
          label: "Assignments",
          path: "/student/assignments",
          icon: FileText,
        },
        {
          key: "results",
          label: "Results",
          path: "/student/results",
          icon: Award,
        },
        {
          key: "timetable",
          label: "Timetable",
          path: "/student/timetable",
          icon: Calendar,
        },
      ],
    },
    {
      section: "Finance",
      items: [
        {
          key: "fees",
          label: "Fee Status",
          path: "/student/fees",
          icon: CreditCard,
        },
      ],
    },
  ],
  parent: [
    {
      section: "Main",
      items: [
        {
          key: "dashboard",
          label: "Dashboard",
          path: "/parent/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      section: "Children",
      items: [
        {
          key: "children",
          label: "My Children",
          path: "/parent/children",
          icon: Users,
        },
        {
          key: "attendance",
          label: "Attendance",
          path: "/parent/attendance",
          icon: ClipboardCheck,
        },
        {
          key: "schedule",
          label: "Schedule",
          path: "/parent/child-schedule",
          icon: Calendar,
        },
        {
          key: "results",
          label: "Results",
          path: "/parent/results",
          icon: Award,
        },
      ],
    },
    {
      section: "Finance",
      items: [
        {
          key: "fees",
          label: "Fee Payments",
          path: "/parent/fees/status",
          icon: CreditCard,
        },
      ],
    },
  ],
};

/**
 * Role Theme Configuration - Solid colors only
 */
const ROLE_THEMES = {
  admin: {
    primary: "bg-slate-900",
    primaryHover: "hover:bg-slate-800",
    accent: "bg-slate-800",
    accentText: "text-slate-900",
    lightBg: "bg-slate-100",
    lightText: "text-slate-700",
    border: "border-slate-200",
  },
  teacher: {
    primary: "bg-blue-600",
    primaryHover: "hover:bg-blue-700",
    accent: "bg-blue-600",
    accentText: "text-blue-600",
    lightBg: "bg-blue-50",
    lightText: "text-blue-700",
    border: "border-blue-200",
  },
  student: {
    primary: "bg-emerald-600",
    primaryHover: "hover:bg-emerald-700",
    accent: "bg-emerald-600",
    accentText: "text-emerald-600",
    lightBg: "bg-emerald-50",
    lightText: "text-emerald-700",
    border: "border-emerald-200",
  },
  parent: {
    primary: "bg-violet-600",
    primaryHover: "hover:bg-violet-700",
    accent: "bg-violet-600",
    accentText: "text-violet-600",
    lightBg: "bg-violet-50",
    lightText: "text-violet-700",
    border: "border-violet-200",
  },
};

/**
 * Navigation Item Component
 */
const NavItem = ({ item, collapsed, theme, onNavigate }) => {
  const location = useLocation();
  const Icon = item.icon;
  
  const isActive = location.pathname === item.path || 
    (item.path.includes("?") && location.pathname === item.path.split("?")[0]);

  return (
    <NavLink
      to={item.path}
      onClick={onNavigate}
      className="group relative block">
      <div
        className={`
          flex items-center gap-3 px-3 py-2.5 rounded-lg
          transition-all duration-200
          ${
            isActive
              ? `${theme.lightBg} ${theme.lightText} font-medium`
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }
          ${collapsed ? "justify-center" : ""}
        `}>
        {/* Active Indicator */}
        {isActive && (
          <div
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full ${theme.accent}`}
          />
        )}

        {/* Icon */}
        <Icon
          size={20}
          strokeWidth={1.75}
          className="shrink-0"
        />

        {/* Label */}
        {!collapsed && (
          <span className="text-sm truncate">
            {item.label}
          </span>
        )}
      </div>

      {/* Tooltip for collapsed mode */}
      {collapsed && (
        <div
          className="
            absolute left-full ml-3 px-3 py-2 
            bg-slate-900 text-white text-sm font-medium 
            rounded-lg shadow-lg 
            opacity-0 invisible group-hover:opacity-100 group-hover:visible 
            transition-all duration-200 whitespace-nowrap z-50 
            pointer-events-none
          ">
          {item.label}
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-slate-900" />
        </div>
      )}
    </NavLink>
  );
};

/**
 * Navigation Section Component
 */
const NavSection = ({ section, collapsed, theme, onNavigate }) => {
  return (
    <div className="space-y-1">
      {/* Section Header */}
      {!collapsed && section.section && (
        <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {section.section}
        </div>
      )}

      {/* Section Items */}
      <div className="space-y-0.5">
        {section.items.map((item) => (
          <NavItem
            key={item.key}
            item={item}
            collapsed={collapsed}
            theme={theme}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Main Sidebar Component
 */
const Sidebar = ({ collapsed, mobileOpen, onClose, onToggle, userRole = "admin" }) => {
  const navigation = NAVIGATION_CONFIG[userRole] || NAVIGATION_CONFIG.admin;
  const theme = ROLE_THEMES[userRole] || ROLE_THEMES.admin;
  const navigate = useNavigate();

  // Get schedule route based on user role
  const getScheduleRoute = () => {
    const routes = {
      admin: "/admin/academics/timetable",
      teacher: "/teacher/schedule",
      student: "/student/timetable",
      parent: "/parent/child-schedule",
    };
    return routes[userRole] || "/";
  };

  const handleScheduleClick = () => {
    navigate(getScheduleRoute());
    if (onClose) onClose();
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`
          hidden lg:flex flex-col fixed top-0 left-0 h-full
          bg-white border-r border-slate-200
          transition-all duration-300 ease-out z-40
          ${collapsed ? "w-20" : "w-64"}
        `}>
        {/* Logo Section */}
        <div
          className={`
            flex items-center h-16 px-4 border-b border-slate-200
            ${collapsed ? "justify-center px-2" : "justify-between"}
          `}>
          <div className={`flex items-center ${collapsed ? "" : "gap-3"}`}>
            <div
              className={`
                flex items-center justify-center shrink-0 w-10 h-10 
                rounded-xl ${theme.primary}
                transition-transform duration-300
              `}>
              <GraduationCap size={22} strokeWidth={2} className="text-white" />
            </div>

            {!collapsed && (
              <div className="overflow-hidden">
                <div className="text-lg font-bold text-slate-900 tracking-tight">
                  SSMS
                </div>
                <div className="text-xs text-slate-500">
                  School Management
                </div>
              </div>
            )}
          </div>

          {/* Collapse Toggle - Desktop */}
          {!collapsed && onToggle && (
            <button
              onClick={onToggle}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Collapse sidebar">
              <ChevronLeft size={18} />
            </button>
          )}
        </div>

        {/* Expand button when collapsed */}
        {collapsed && onToggle && (
          <button
            onClick={onToggle}
            className="mx-auto mt-3 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Expand sidebar">
            <ChevronRight size={18} />
          </button>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-thin scrollbar-thumb-slate-300">
          {navigation.map((section, index) => (
            <NavSection
              key={index}
              section={section}
              collapsed={collapsed}
              theme={theme}
            />
          ))}
        </nav>

        {/* Quick Action Button */}
        <div className={`px-3 pb-3 ${collapsed ? "px-2" : ""}`}>
          <button
            onClick={handleScheduleClick}
            className={`
              w-full flex items-center justify-center gap-2 
              px-4 py-3 rounded-xl font-medium text-white 
              shadow-sm hover:shadow-md
              transition-all duration-200 active:scale-[0.98]
              ${theme.primary} ${theme.primaryHover}
            `}
            title="View Schedule">
            <Calendar size={18} strokeWidth={2} />
            {!collapsed && <span>View Schedule</span>}
          </button>
        </div>

        {/* Footer */}
        <div
          className={`
            px-4 py-3 border-t border-slate-200
            ${collapsed ? "text-center px-2" : ""}
          `}>
          <div className="text-xs text-slate-400">
            {collapsed ? "©" : `© ${new Date().getFullYear()} SSMS`}
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`
          lg:hidden fixed top-0 left-0 h-full w-72 bg-white z-50
          transform transition-transform duration-300 ease-out
          shadow-xl
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div
              className={`
                flex items-center justify-center w-10 h-10 
                rounded-xl ${theme.primary}
              `}>
              <GraduationCap size={22} strokeWidth={2} className="text-white" />
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900 tracking-tight">
                SSMS
              </div>
              <div className="text-xs text-slate-500">
                School Management
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
            aria-label="Close menu">
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {navigation.map((section, index) => (
            <NavSection
              key={index}
              section={section}
              collapsed={false}
              theme={theme}
              onNavigate={onClose}
            />
          ))}
        </nav>

        {/* Mobile Quick Action */}
        <div className="px-3 pb-3">
          <button
            onClick={handleScheduleClick}
            className={`
              w-full flex items-center justify-center gap-2 
              px-4 py-3 rounded-xl font-medium text-white 
              transition-all duration-200 active:scale-[0.98]
              ${theme.primary} ${theme.primaryHover}
            `}>
            <Calendar size={18} strokeWidth={2} />
            <span>View Schedule</span>
          </button>
        </div>

        {/* Mobile Footer */}
        <div className="px-4 py-3 border-t border-slate-200">
          <div className="text-xs text-slate-400">
            © {new Date().getFullYear()} SSMS - Smart School System
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
