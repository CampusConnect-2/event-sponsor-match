import heroImage from "@/assets/hero-campusconnect.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail, ShieldCheck, SlidersHorizontal, Bookmark } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <section className="container mx-auto pt-14 md:pt-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight -tracking-[0.015em] leading-tight">
              CampusConnect — Big Ideas meet Bigger Backers
            </h1>
            <p className="text-lg text-muted-foreground">
              Bridging students and sponsors to power the next big campus experience.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/discover"><Button variant="hero" size="lg">Discover Events</Button></Link>
              <Link to="/post"><Button variant="outline" size="lg">Post an Event</Button></Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <div className="group rounded-lg border bg-card/50 backdrop-blur px-4 py-3 shadow-md hover:shadow-lg transition hover:border-primary/40 hover:-translate-y-0.5 flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground transition group-hover:text-primary" aria-hidden />
                <div className="text-sm md:text-base font-medium">Email + OTP sign-in (connect Supabase to enable)</div>
              </div>
              <div className="group rounded-lg border bg-card/50 backdrop-blur px-4 py-3 shadow-md hover:shadow-lg transition hover:border-primary/40 hover:-translate-y-0.5 flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-muted-foreground transition group-hover:text-primary" aria-hidden />
                <div className="text-sm md:text-base font-medium">Verified badges for .edu and company domains</div>
              </div>
              <div className="group rounded-lg border bg-card/50 backdrop-blur px-4 py-3 shadow-md hover:shadow-lg transition hover:border-primary/40 hover:-translate-y-0.5 flex items-start gap-3">
                <SlidersHorizontal className="h-5 w-5 text-muted-foreground transition group-hover:text-primary" aria-hidden />
                <div className="text-sm md:text-base font-medium">Smart filters</div>
              </div>
              <div className="group rounded-lg border bg-card/50 backdrop-blur px-4 py-3 shadow-md hover:shadow-lg transition hover:border-primary/40 hover:-translate-y-0.5 flex items-start gap-3">
                <Bookmark className="h-5 w-5 text-muted-foreground transition group-hover:text-primary" aria-hidden />
                <div className="text-sm md:text-base font-medium">Interest requests & bookmarks</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img src="/lovable-uploads/30ef4415-0eb3-4520-8f19-60f070e8558c.png" alt="Students and sponsors discussing opportunities at a campus event." className="w-full h-auto rounded-xl shadow-brand-lg" />
            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-border/60" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
