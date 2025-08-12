import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/post" element={<RequireAuth><PostEvent /></RequireAuth>} />
          <Route path="/inbox" element={<RequireAuth><Inbox /></RequireAuth>} />
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/auth" element={<Auth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

function RequireAuth({ children }: { children: React.ReactNode }) {
  const isAuthed = typeof window !== 'undefined' && localStorage.getItem("cc_authed") === "true";
  return isAuthed ? <>{children}</> : <AuthRedirect />;
}

function AuthRedirect() {
  return (
    <Routes>
      <Route path="*" element={<Auth />} />
    </Routes>
  );
}

export default App;
