import { NavLink, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bookmark } from "lucide-react";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "px-3 py-2 text-sm rounded-md transition-colors",
    isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/60"
  );

export default function Header() {
  const location = useLocation();
  const isPost = location.pathname === "/post";

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-gradient-brand" aria-hidden />
          <span className="font-semibold text-lg tracking-tight text-gradient-brand">CampusConnect</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/discover" className={navLinkClass}>
            Discover
          </NavLink>
          <NavLink to="/inbox" className={navLinkClass}>
            Inbox
          </NavLink>
          <NavLink to="/profile" className={navLinkClass}>
            Profile
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <NavLink to="/saved" className={({ isActive }) => cn("hidden md:inline-flex", isActive && "text-primary") } aria-label="Saved events">
            <Bookmark className="h-5 w-5" />
          </NavLink>
          <NavLink to="/post">
            <Button variant={isPost ? "default" : "hero"}>Post Event</Button>
          </NavLink>
          <NavLink to="/auth">
            <Button variant="outline">Sign in</Button>
          </NavLink>
        </div>
      </div>
    </header>
  );
}
