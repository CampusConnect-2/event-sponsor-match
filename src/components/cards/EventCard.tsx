import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark } from "lucide-react";
import heroFallback from "@/assets/hero-campusconnect.jpg";

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string; // ISO
  audienceSize: number;
  packages: string[];
  benefits: string[];
  tags: string[];
  location: string;
  poster?: string;
  organiser: {
    name: string;
    college: string;
    verified: boolean;
  };
};

export function EventCard({ e, onSave, saved }: { e: Event; onSave?: (id: string) => void; saved?: boolean }) {
  const d = new Date(e.date);
  const dateFmt = d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  const sponsorLounge = "/lovable-uploads/30ef4415-0eb3-4520-8f19-60f070e8558c.png";
  const posterSrc = e.poster ?? sponsorLounge;

  return (
    <article className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-md transition hover:-translate-y-0.5 hover:shadow-lg hover:border-primary/40">
      <img
        src={posterSrc}
        alt={`${e.title} poster`}
        loading="lazy"
        className="w-full aspect-[16/9] object-cover"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = heroFallback;
        }}
      />

      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <time className="text-xs text-muted-foreground" dateTime={e.date}>
            {dateFmt}
          </time>
          {onSave && (
            <button
              onClick={() => onSave(e.id)}
              className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs border hover:bg-accent"
              aria-label={saved ? "Remove bookmark" : "Save event"}
            >
              <Bookmark className="h-4 w-4" fill={saved ? "currentColor" : "none"} />
              {saved ? "Saved" : "Save"}
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold leading-tight line-clamp-2">
            <Link to={`/events/${e.id}`} className="hover:underline">
              {e.title}
            </Link>
          </h3>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{e.description}</p>

        <div className="flex flex-wrap gap-2">
          {e.tags.slice(0, 3).map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
          {e.organiser.verified && <Badge>Verified</Badge>}
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-muted-foreground">{e.location} • {e.audienceSize.toLocaleString()} expected</span>
          <Button asChild size="sm" variant="secondary">
            <Link to={`/events/${e.id}`}>View</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
