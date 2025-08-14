import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";
import { AuthGate } from "./components/auth/AuthGate";
import { RoleSetup } from "./components/auth/RoleSetup";
import Header from "./components/layout/Header";
import Index from "./pages/Index";
import Discover from "./pages/Discover";
import PostEvent from "./pages/PostEvent";
import Inbox from "./pages/Inbox";
import Profile from "./pages/Profile";
import EventDetails from "./pages/EventDetails";
import Auth from "./pages/Auth";
import Saved from "./pages/Saved";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showRoleSetup, setShowRoleSetup] = useState(false);

  useEffect(() => {
    const needsRoleSetup = localStorage.getItem('needs_role_setup');
    if (needsRoleSetup === 'true') {
      setShowRoleSetup(true);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/post" element={
                <AuthGate>
                  <PostEvent />
                </AuthGate>
              } />
              <Route path="/inbox" element={
                <AuthGate>
                  <Inbox />
                </AuthGate>
              } />
              <Route path="/profile" element={
                <AuthGate>
                  <Profile />
                </AuthGate>
              } />
              <Route path="/saved" element={
                <AuthGate>
                  <Saved />
                </AuthGate>
              } />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/auth" element={<Auth />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            
            {showRoleSetup && (
              <RoleSetup onComplete={() => setShowRoleSetup(false)} />
            )}
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
