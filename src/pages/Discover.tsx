import { useMemo, useState, useEffect } from "react";
import { EventCard, type Event } from "@/components/cards/EventCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export default function Discover() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [minAudience, setMinAudience] = useState<number>(0);
  const [events, setEvents] = useState<Event[]>([]);
  const [savedEvents, setSavedEvents] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchEvents();
    if (user) {
      fetchSavedEvents();
    }
  }, [user]);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const formattedEvents: Event[] = (data || []).map(event => ({
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
      }));
      
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      // Fallback to sample data for demo
      setEvents([
        {
          id: '1',
          title: 'Tech Innovation Summit',
          description: 'Showcasing cutting-edge technology and innovation from students',
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          audienceSize: 250,
          packages: ['Gold', 'Silver', 'Bronze'],
          benefits: ['Logo placement', 'Speaking opportunity', 'Networking session'],
          tags: ['technology', 'innovation', 'networking'],
          location: 'Main Campus Auditorium',
          poster: '/lovable-uploads/30ef4415-0eb3-4520-8f19-60f070e8558c.png',
          organiser: {
            name: 'Tech Club',
            college: 'Engineering Department',
            verified: true
          }
        },
        {
          id: '2', 
          title: 'Sustainability Fair',
          description: 'Promoting environmental awareness and sustainable practices on campus',
          date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          audienceSize: 180,
          packages: ['Platinum', 'Gold'],
          benefits: ['Brand visibility', 'Product demos', 'Lead generation'],
          tags: ['sustainability', 'environment', 'awareness'],
          location: 'Student Center Plaza',
          poster: '/lovable-uploads/30ef4415-0eb3-4520-8f19-60f070e8558c.png',
          organiser: {
            name: 'Green Initiative',
            college: 'Environmental Studies',
            verified: true
          }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedEvents = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('event_id')
        .eq('user_id', user.id);

      if (error) throw error;
      setSavedEvents(data?.map(b => b.event_id) || []);
    } catch (error) {
      console.error('Error fetching saved events:', error);
    }
  };

  const toggleSaved = async (eventId: string) => {
    if (!user) return;

    const isSaved = savedEvents.includes(eventId);
    
    try {
      if (isSaved) {
        const { error } = await supabase
          .from('bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('event_id', eventId);
        
        if (error) throw error;
        setSavedEvents(prev => prev.filter(id => id !== eventId));
      } else {
        const { error } = await supabase
          .from('bookmarks')
          .insert({ user_id: user.id, event_id: eventId });
        
        if (error) throw error;
        setSavedEvents(prev => [...prev, eventId]);
      }
    } catch (error) {
      console.error('Error toggling saved event:', error);
    }
  };

  const allTags = Array.from(new Set(events.flatMap((e) => e.tags))).sort();

  const results = useMemo(() => {
    return events.filter((e) => {
      const matchesQuery = !query || e.title.toLowerCase().includes(query.toLowerCase());
      const matchesLoc = !location || e.location.toLowerCase().includes(location.toLowerCase());
      const matchesTags = selectedTags.length === 0 || selectedTags.every((t) => e.tags.includes(t));
      const matchesAudience = e.audienceSize >= minAudience;
      return matchesQuery && matchesLoc && matchesTags && matchesAudience;
    });
  }, [events, query, location, selectedTags, minAudience]);

  if (loading) {
    return (
      <main className="container mx-auto pt-8 pb-14">
        <h1 className="sr-only">Discover Campus Events</h1>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto pt-8 pb-14">
      <h1 className="sr-only">Discover Campus Events</h1>

      <section aria-label="Filters" className="mb-14 rounded-lg border bg-card p-4">
        <div className="grid md:grid-cols-4 gap-4">
          <Input placeholder="Search events" value={query} onChange={(e) => setQuery(e.target.value)} />
          <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          <Input type="number" min={0} placeholder="Min audience" value={minAudience} onChange={(e) => setMinAudience(parseInt(e.target.value || "0"))} />
          <div className="flex flex-wrap gap-2">
            {allTags.map((t) => {
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
          <EventCard key={e.id} e={e} onSave={toggleSaved} saved={savedEvents.includes(e.id)} />
        ))}
        {results.length === 0 && (
          <div className="col-span-full rounded-lg border p-8 text-center text-muted-foreground">
            {events.length === 0 ? 'No events available yet. Be the first to post an event!' : 'No events match your filters.'}
          </div>
        )}
      </section>
    </main>
  );
}
