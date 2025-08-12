import { useMemo, useState } from "react";
import { EventCard, type Event } from "@/components/cards/EventCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sampleEvents } from "@/data/sample";
import { useSavedEvents } from "@/hooks/useSavedEvents";

const ALL_TAGS = Array.from(new Set(sampleEvents.flatMap((e) => e.tags))).sort();

export default function Discover() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [minAudience, setMinAudience] = useState<number>(0);
  const { savedIds, toggleSaved } = useSavedEvents();

  const results = useMemo(() => {
    return sampleEvents.filter((e) => {
      const matchesQuery = !query || e.title.toLowerCase().includes(query.toLowerCase());
      const matchesLoc = !location || e.location.toLowerCase().includes(location.toLowerCase());
      const matchesTags = selectedTags.length === 0 || selectedTags.every((t) => e.tags.includes(t));
      const matchesAudience = e.audienceSize >= minAudience;
      return matchesQuery && matchesLoc && matchesTags && matchesAudience;
    });
  }, [query, location, selectedTags, minAudience]);

  return (
    <main className="container mx-auto pt-8 pb-14">
      <h1 className="sr-only">Discover Campus Events</h1>

      <section aria-label="Filters" className="mb-14 rounded-lg border bg-card p-4">
        <div className="grid md:grid-cols-4 gap-4">
          <Input placeholder="Search events" value={query} onChange={(e) => setQuery(e.target.value)} />
          <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          <Input type="number" min={0} placeholder="Min audience" value={minAudience} onChange={(e) => setMinAudience(parseInt(e.target.value || "0"))} />
          <div className="flex flex-wrap gap-2">
            {ALL_TAGS.map((t) => {
              const active = selectedTags.includes(t);
              return (
                <Button
                  key={t}
                  size="sm"
                  variant={active ? "default" : "secondary"}
                  onClick={() => setSelectedTags((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]))}
                >
                  {t}
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-label="Events" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((e) => (
          <EventCard key={e.id} e={e} onSave={toggleSaved} saved={savedIds.includes(e.id)} />
        ))}
        {results.length === 0 && (
          <div className="col-span-full rounded-lg border p-8 text-center text-muted-foreground">No events match your filters.</div>
        )}
      </section>
    </main>
  );
}
