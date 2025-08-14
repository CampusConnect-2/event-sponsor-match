import { useState, type Dispatch, type SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function PostEvent() {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [packages, setPackages] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addTo = (setter: Dispatch<SetStateAction<string[]>>, value: string) => {
    if (!value) return;
    setter((arr) => (arr.includes(value) ? arr : [...arr, value]));
  };
  const removeAt = (setter: Dispatch<SetStateAction<string[]>>, idx: number) => {
    setter((arr) => arr.filter((_, i) => i !== idx));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const formData = new FormData(e.currentTarget);
    setLoading(true);

    try {
      const { error } = await supabase
        .from('events')
        .insert({
          user_id: user.id,
          title: formData.get('title') as string,
          description: formData.get('description') as string,
          event_date: formData.get('date') ? new Date(formData.get('date') as string).toISOString() : null,
          location: formData.get('location') as string,
          poster_url: formData.get('poster') as string,
          image_url: (formData.get('poster') as string) || '/lovable-uploads/30ef4415-0eb3-4520-8f19-60f070e8558c.png',
          packages,
          benefits,
          tags
        });

      if (error) throw error;

      toast({ 
        title: "Event created!", 
        description: "Your event has been published successfully." 
      });
      
      navigate('/discover');
    } catch (error) {
      console.error('Error creating event:', error);
      toast({ 
        title: "Error", 
        description: "Failed to create event. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto pt-8 pb-14">
      <h1 className="text-2xl font-semibold mb-4">Post an Event</h1>
      <form onSubmit={onSubmit} className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Input name="title" placeholder="Event title" required />
          <Textarea name="description" placeholder="Describe your event" required rows={6} />
          <div className="grid grid-cols-2 gap-3">
            <Input type="date" name="date" required />
            <Input type="number" name="audience" min={1} placeholder="Expected audience" required />
          </div>
          <Input name="location" placeholder="Location (City / Campus)" required />
          <Input name="poster" type="url" placeholder="Poster image URL (temporary)" />
        </div>

        <div className="space-y-6">
          <FieldList label="Sponsorship packages" items={packages} onAdd={(v) => addTo(setPackages, v)} onRemove={(i) => removeAt(setPackages, i)} />
          <FieldList label="Benefits for sponsors" items={benefits} onAdd={(v) => addTo(setBenefits, v)} onRemove={(i) => removeAt(setBenefits, i)} />
          <FieldList label="Tags (tech, cultural, sports, etc.)" items={tags} onAdd={(v) => addTo(setTags, v)} onRemove={(i) => removeAt(setTags, i)} />
          <Button type="submit" variant="hero" className="w-full" disabled={loading}>
            {loading ? "Creating Event..." : "Create Event"}
          </Button>
        </div>
      </form>
    </main>
  );
}

function FieldList({ label, items, onAdd, onRemove }: { label: string; items: string[]; onAdd: (v: string) => void; onRemove: (i: number) => void }) {
  const [val, setVal] = useState("");
  return (
    <div>
      <label className="mb-2 block text-sm text-muted-foreground">{label}</label>
      <div className="flex gap-2">
        <Input value={val} onChange={(e) => setVal(e.target.value)} placeholder="Add item" />
        <Button type="button" variant="secondary" onClick={() => { onAdd(val.trim()); setVal(""); }}>Add</Button>
      </div>
      <ul className="mt-3 space-y-2">
        {items.map((it, i) => (
          <li key={i} className="flex items-center justify-between rounded-md border px-3 py-2">
            <span className="text-sm">{it}</span>
            <Button type="button" size="sm" variant="ghost" onClick={() => onRemove(i)}>Remove</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
