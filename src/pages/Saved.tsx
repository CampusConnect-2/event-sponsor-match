import { useSavedEvents } from "@/hooks/useSavedEvents";
import { sampleEvents } from "@/data/sample";
import { EventCard } from "@/components/cards/EventCard";

export default function Saved() {
  const { savedIds, toggleSaved } = useSavedEvents();
  const events = sampleEvents.filter((e) => savedIds.includes(e.id));

  return (
    <main className="container mx-auto pt-8 pb-14">
      <h1 className="text-2xl font-semibold mb-4">Saved Events</h1>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((e) => (
          <EventCard key={e.id} e={e} onSave={toggleSaved} saved={true} />
        ))}
        {events.length === 0 && (
          <div className="col-span-full rounded-lg border p-8 text-center text-muted-foreground">No saved events yet.</div>
        )}
      </section>
    </main>
  );
}
