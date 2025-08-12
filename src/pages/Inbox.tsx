import { useMemo, useState } from "react";
import { sampleEvents, sampleRequests } from "@/data/sample";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Inbox() {
  const [tab, setTab] = useState<"received" | "sent">("received");
  const items = useMemo(() => (tab === "received" ? sampleRequests.received : sampleRequests.sent), [tab]);

  return (
    <main className="container mx-auto pt-8 pb-14">
      <h1 className="text-2xl font-semibold mb-4">Inbox</h1>
      <div className="mb-6 flex gap-2">
        <Button variant={tab === "received" ? "default" : "secondary"} onClick={() => setTab("received")}>Received</Button>
        <Button variant={tab === "sent" ? "default" : "secondary"} onClick={() => setTab("sent")}>Sent</Button>
      </div>

      <ul className="space-y-3">
        {items.map((it) => {
          const event = sampleEvents.find((e) => e.id === it.eventId)!;
          return (
            <li key={it.id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{event.title}</h3>
                    <Badge variant="secondary">{it.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{it.message}</p>
                </div>
                <div className="flex gap-2">
                  {tab === "received" ? (
                    <>
                      <Button variant="secondary">Accept</Button>
                      <Button variant="outline">Decline</Button>
                    </>
                  ) : (
                    <Button variant="outline">View</Button>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
