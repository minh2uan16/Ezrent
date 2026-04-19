import {
  Outlet,
  Link,
  useLocation,
  useNavigate,
} from "react-router";
import {
  Home,
  Building2,
  Users,
  Wrench,
  Settings,
  LogOut,
} from "lucide-react";

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/dashboard", icon: Home, label: "Dashboard" },
    { path: "/rooms", icon: Building2, label: "Rooms" },
    { path: "/tenants", icon: Users, label: "Tenants" },
    {
      path: "/maintenance",
      icon: Wrench,
      label: "Maintenance",
    },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-[#F9FAFB]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Building2 className="w-6 h-6 text-[#2563EB]" />
          <span className="ml-2 font-semibold text-[#111827]">
            FunHome
          </span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              location.pathname.startsWith(item.path + "/");
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-[#EFF6FF] text-[#2563EB]"
                    : "text-[#6B7280] hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="ml-3">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-[#6B7280] hover:bg-gray-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-[#111827]">
            {navItems.find((item) =>
              location.pathname.startsWith(item.path),
            )?.label || "Dashboard"}
          </h1>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-medium text-[#111827]">
              Admin
              </div>
              <div className="text-xs text-[#6B7280]">
                admin@funhome.com
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#2563EB] flex items-center justify-center text-white font-medium">
              Ad
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}