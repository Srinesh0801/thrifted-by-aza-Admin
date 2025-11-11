// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { CartProvider } from "@/contexts/CartContext";
// // import Navbar from "@/components/customer/Navbar";
// import AdminLayout from "@/components/admin/AdminLayout";

// // // Customer Pages
// // import Home from "./pages/customer/Home";
// // import Products from "./pages/customer/Products";
// // import ProductDetail from "./pages/customer/ProductDetail";
// // import Cart from "./pages/customer/Cart";

// // Admin Pages
// import AdminLogin from "./pages/admin/AdminLogin";
// import Dashboard from "./pages/admin/Dashboard";
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <CartProvider>
//         <Toaster />
//         <Sonner />
//         <BrowserRouter>
//           <Routes>
//             {/* Customer Routes
//             <Route path="/" element={<><Navbar /><Home /></>} />
//             <Route path="/products" element={<><Navbar /><Products /></>} />
//             <Route path="/product/:id" element={<><Navbar /><ProductDetail /></>} />
//             <Route path="/cart" element={<><Navbar /><Cart /></>} /> */}
            
//             {/* Admin Routes */}
//             <Route path="/admin/AdminLogin" element={<AdminLogin />} />
//             <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
//             <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
            
//             {/* 404 */}
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </BrowserRouter>
//       </CartProvider>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Shirts from "./pages/Shirts";
import StripedShirts from "./pages/StripedShirts";

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Redirect /admin → login */}
        <Route path="/admin" element={<Navigate to="/admin/login" />} />

       <Route path="/shirts" element={<Shirts />} />
  <Route path="/shirts/striped" element={<StripedShirts />} />

        {/* Catch-all fallback */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;




