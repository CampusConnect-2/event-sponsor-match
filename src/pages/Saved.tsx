import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { EventCard, type Event } from "@/components/cards/EventCard";
import { useAuth } from "@/hooks/useAuth";

export default function Saved() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchSavedEvents();
    }
  }, [user]);

  const fetchSavedEvents = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('bookmarks')
        .select(`
          event_id,
          events (*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      
      const savedEvents = data?.map(bookmark => {
        const event = bookmark.events;
        return {
          id: event.id,
          title: event.title,
          description: event.description || '',
          date: event.event_date || new Date().toISOString(),
          audienceSize: 100, // Default value
          packages: event.packages || [],
          benefits: event.benefits || [],
          tags: event.tags || [],
          location: event.location || '',
          poster: event.image_url,
          organiser: {
            name: 'Event Organizer',
            college: 'Campus',
            verified: true
          }
        } as Event;
      }).filter(Boolean) || [];
      
      setEvents(savedEvents);
    } catch (error) {
      console.error('Error fetching saved events:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSaved = async (eventId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('user_id', user.id)
        .eq('event_id', eventId);
      
      if (error) throw error;
      setEvents(prev => prev.filter(e => e.id !== eventId));
    } catch (error) {
      console.error('Error removing saved event:', error);
    }
  };

  if (loading) {
    return (
      <main className="container mx-auto pt-8 pb-14">
        <h1 className="text-2xl font-semibold mb-4">Saved Events</h1>
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </main>
    );
  }

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
