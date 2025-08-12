import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Auth() {
  const [email, setEmail] = useState("");

  return (
    <main className="container mx-auto pt-8 pb-14 max-w-md">
      <h1 className="text-2xl font-semibold mb-2">Sign in</h1>
      <p className="text-sm text-muted-foreground mb-6">Email + OTP via Supabase. Connect Supabase to enable authentication.</p>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Button type="submit" disabled variant="hero" className="w-full">Send OTP (disabled)</Button>
      </form>
      <div className="text-xs text-muted-foreground mt-4">Note: Once connected, we'll send a magic link/OTP to your email and complete sign-in.</div>
    </main>
  );
}
