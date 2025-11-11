// import { useNavigate } from 'react-router-dom';
// import { Package, ShoppingBag, TrendingUp, Users, LogOut } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { toast } from 'sonner';

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('adminToken');
//     localStorage.removeItem('adminUser');
//     toast.success('Logged out successfully');
//     navigate('/admin/login');
//   };

//   const stats = [
//     { title: 'Total Products', value: '24', icon: Package, color: 'text-blue-600' },
//     { title: 'Total Orders', value: '48', icon: ShoppingBag, color: 'text-green-600' },
//     { title: 'Revenue', value: '₹45,280', icon: TrendingUp, color: 'text-purple-600' },
//     { title: 'Customers', value: '156', icon: Users, color: 'text-orange-600' },
//   ];

//   return (
//     <div>
//       {/* Header with Sign Out */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">Dashboard Overview</h1>
//         <Button
//           variant="destructive"
//           size="sm"
//           className="flex items-center"
//           onClick={handleLogout}
//         >
//           <LogOut className="h-4 w-4 mr-2" />
//           Sign Out
//         </Button>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {stats.map((stat) => {
//           const Icon = stat.icon;
//           return (
//             <Card key={stat.title}>
//               <CardHeader className="flex flex-row items-center justify-between pb-2">
//                 <CardTitle className="text-sm font-medium text-muted-foreground">
//                   {stat.title}
//                 </CardTitle>
//                 <Icon className={`h-5 w-5 ${stat.color}`} />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-3xl font-bold">{stat.value}</div>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>

//       {/* Recent Orders & Low Stock */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Orders</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="flex justify-between items-center border-b pb-3">
//                   <div>
//                     <p className="font-semibold">Order #{1000 + i}</p>
//                     <p className="text-sm text-muted-foreground">2 items</p>
//                   </div>
//                   <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
//                     Pending
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Low Stock Items</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="flex justify-between items-center border-b pb-3">
//                   <div>
//                     <p className="font-semibold">Product Name {i}</p>
//                     <p className="text-sm text-muted-foreground">Category</p>
//                   </div>
//                   <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
//                     {i + 1} left
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const sections = [
    { label: "Shirts", path: "/shirts" },
    { label: "Pants", path: "/pants" },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleLogout}
          className="flex items-center"
        >
          <LogOut className="h-4 w-4 mr-2" /> Sign Out
        </Button>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <Card
            key={section.label}
            onClick={() => navigate(section.path)}
            className="cursor-pointer hover:shadow-lg"
          >
            <CardHeader>
              <CardTitle className="text-xl">{section.label}</CardTitle>
            </CardHeader>
            <CardContent>
              Manage all {section.label.toLowerCase()} and their subcategories
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
