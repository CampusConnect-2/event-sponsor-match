import { useParams, Link, useNavigate } from "react-router-dom";
import { sampleEvents } from "@/data/sample";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const e = sampleEvents.find((x) => x.id === id);

  if (!e) return <main className="container mx-auto pt-8 pb-14">Event not found</main>;

  return (
    <main className="container mx-auto pt-8 pb-14">
      <article className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {e.poster && (
            <img src={e.poster} alt={`${e.title} poster`} className="w-full h-auto rounded-lg border" />
          )}
          <h1 className="text-3xl font-bold">{e.title}</h1>
          <p className="text-muted-foreground">{e.description}</p>
          <div className="flex flex-wrap gap-2">
            {e.tags.map((t) => (
              <Badge key={t} variant="secondary">{t}</Badge>
            ))}
            {e.organiser.verified && <Badge>Verified</Badge>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Info label="Date" value={new Date(e.date).toLocaleDateString()} />
            <Info label="Location" value={e.location} />
            <Info label="Audience" value={`${e.audienceSize.toLocaleString()} expected`} />
          </div>

          <section>
            <h2 className="font-semibold mb-2">Sponsorship packages</h2>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {e.packages.map((p, i) => (<li key={i}>{p}</li>))}
            </ul>
          </section>

          <section>
            <h2 className="font-semibold mb-2">Benefits for sponsors</h2>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {e.benefits.map((p, i) => (<li key={i}>{p}</li>))}
            </ul>
          </section>
        </div>

        <aside className="md:col-span-1 space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-1">Organiser</h3>
            <p className="text-sm">{e.organiser.name} • {e.organiser.college}</p>
          </div>
          <div className="rounded-lg border p-4 space-y-3">
            <Button className="w-full" onClick={() => {
              const authed = localStorage.getItem("cc_authed") === "true";
              if (!authed) {
                navigate("/auth");
                return;
              }
              toast({ title: "Interest sent (demo)", description: "Connect Supabase to enable messaging" });
            }}>Send Interest</Button>
            <Button asChild variant="outline" className="w-full"><Link to="/discover">Back to Discover</Link></Button>
          </div>
        </aside>
      </article>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}
