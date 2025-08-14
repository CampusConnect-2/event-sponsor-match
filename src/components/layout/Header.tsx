import { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bookmark, Handshake, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { AuthGate } from "@/components/auth/AuthGate";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "relative px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent/15",
    isActive
      ? "text-primary drop-shadow-[0_0_8px_hsl(var(--brand-start)/0.35)] after:content-[''] after:absolute after:left-3 after:right-3 after:-bottom-1 after:h-0.5 after:bg-primary after:rounded-full"
      : "hover:text-foreground/90"
  );

export default function Header() {
  const location = useLocation();
  const isPost = location.pathname === "/post";
  const { isAuthenticated, user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleProtectedAction = (action: () => void) => {
    if (isAuthenticated) {
      action();
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Handshake className="h-7 w-7" aria-hidden />
            <span className="font-semibold text-lg tracking-tight">CampusConnect</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/discover" className={navLinkClass}>
              Discover
            </NavLink>
            {isAuthenticated && (
              <>
                <NavLink to="/inbox" className={navLinkClass}>
                  Inbox
                </NavLink>
                <NavLink to="/profile" className={navLinkClass}>
                  Profile
                </NavLink>
              </>
            )}
          </nav>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleProtectedAction(() => {})}
              className={cn("hidden md:inline-flex", "text-muted-foreground hover:text-foreground")} 
              aria-label="Saved events"
            >
              <Bookmark className="h-5 w-5" />
            </button>
            
            <Button 
              variant={isPost ? "default" : "hero"}
              onClick={() => handleProtectedAction(() => window.location.href = '/post')}
            >
              Post Event
            </Button>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/saved" className="flex items-center gap-2">
                      <Bookmark className="h-4 w-4" />
                      Saved Events
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <NavLink to="/auth">
                <Button variant="outline">Sign in</Button>
              </NavLink>
            )}
          </div>
        </div>
      </header>

      <AuthGate 
        showModal={showAuthModal} 
        onModalClose={() => setShowAuthModal(false)}
      >
        <div />
      </AuthGate>
    </>
  );
}
