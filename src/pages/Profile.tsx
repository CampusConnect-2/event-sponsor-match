import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Profile() {
  const [role, setRole] = useState<"student" | "sponsor">("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [location, setLocation] = useState("");
  const [linkedin, setLinkedin] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("cc_profile");
    if (raw) {
      try {
        const p = JSON.parse(raw);
        setRole(p.role ?? "student");
        setName(p.name ?? "");
        setEmail(p.email ?? "");
        setOrg(p.org ?? "");
        setLocation(p.location ?? "");
        setLinkedin(p.linkedin ?? "");
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cc_profile", JSON.stringify({ role, name, email, org, location, linkedin }));
  }, [role, name, email, org, location, linkedin]);

  const verified = useMemo(() => {
    const domain = email.split("@")[1] || "";
    if (!domain) return false;
    if (role === "student") return /\.edu$/i.test(domain);
    if (role === "sponsor") return org && domain.toLowerCase().includes(org.replace(/\s+/g, "").toLowerCase());
    return false;
  }, [email, role, org]);

  return (
    <main className="container mx-auto pt-8 pb-14">
      <h1 className="text-2xl font-semibold mb-4">Your Profile</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button variant={role === "student" ? "default" : "secondary"} onClick={() => setRole("student")}>Student</Button>
            <Button variant={role === "sponsor" ? "default" : "secondary"} onClick={() => setRole("sponsor")}>Sponsor</Button>
          </div>
          <Input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder={role === "student" ? "College / University" : "Company"} value={org} onChange={(e) => setOrg(e.target.value)} />
          <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          <Input type="url" placeholder="LinkedIn URL" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
        </div>

        <aside className="rounded-lg border p-4 space-y-3">
          <h2 className="font-medium">Verification</h2>
          <p className="text-sm text-muted-foreground">{role === "student" ? "Students are verified if their email ends with .edu" : "Sponsors are verified if email domain matches company name"}.</p>
          <div className="flex items-center gap-2">
            <Badge variant={verified ? "default" : "secondary"}>{verified ? "Verified" : "Not verified"}</Badge>
            <span className="text-sm text-muted-foreground">{verified ? "Your profile shows a verified badge" : "Update your email or company to verify"}</span>
          </div>
          <div className="text-sm text-muted-foreground">Authentication is disabled. Connect Supabase to enable OTP login.</div>
        </aside>
      </div>
    </main>
  );
}
