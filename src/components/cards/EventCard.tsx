import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark } from "lucide-react";

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

  return (
    <article className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow transition hover:shadow-lg">
      {e.poster && (
        <img
          src={e.poster}
          alt={`${e.title} event poster at ${e.organiser.college ?? e.location}`}
          loading="lazy"
          className="h-40 w-full object-cover"
        />
      )}

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
