import heroImage from "@/assets/hero-campusconnect.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <section className="container mx-auto pt-14 md:pt-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              CampusConnect — Big Ideas meet Bigger Backers
            </h1>
            <p className="text-lg text-muted-foreground">
              Bridging students and sponsors to power the next big campus experience.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/discover"><Button variant="hero" size="lg">Discover Events</Button></Link>
              <Link to="/post"><Button variant="outline" size="lg">Post an Event</Button></Link>
            </div>
            <ul className="text-sm text-muted-foreground grid gap-2">
              <li>• Email + OTP sign-in (connect Supabase to enable)</li>
              <li>• Verified badges for .edu and company domains</li>
              <li>• Smart filters, interest requests, and bookmarks</li>
            </ul>
          </div>
          <div className="relative">
            <img src={heroImage} alt="Students collaborating with sponsors at a campus event" className="w-full h-auto rounded-xl shadow-brand-lg" />
            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-border/60" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
