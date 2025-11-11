import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { label: "Shirts", path: "/admin/shirts" },
    { label: "Pants", path: "/admin/pants" },
  ];

  return (
    <aside className="w-64 bg-primary text-white p-6 flex flex-col">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                location.pathname.includes(item.path) ? "bg-white/20" : ""
              }`}
            >
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
