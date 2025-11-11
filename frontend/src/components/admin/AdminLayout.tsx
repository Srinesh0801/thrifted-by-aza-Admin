import { ReactNode, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import logo from '@/assets/logo.jpg';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Package, label: 'Products', path: '/admin/products' },
    { icon: ShoppingBag, label: 'Orders', path: '/admin/orders' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-primary-foreground p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <img src={logo} alt="Logo" className="h-12 w-12 rounded" />
          <div>
            <h2 className="font-serif font-bold text-xl">Thrifted by AZA</h2>
            <p className="text-xs opacity-80">Admin Panel</p>
          </div>
        </div>
        
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant="ghost"
                className={`w-full justify-start text-primary-foreground hover:bg-primary-foreground/10 ${
                  location.pathname === item.path ? 'bg-primary-foreground/20' : ''
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
