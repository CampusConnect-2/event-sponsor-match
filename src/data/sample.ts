import { Event } from "@/components/cards/EventCard";

export const sampleEvents: Event[] = [
  {
    id: "hack-001",
    title: "TechFest Hackathon 2025",
    description: "48-hour campus hackathon focusing on AI for social good.",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    audienceSize: 600,
    packages: ["Title Sponsor", "Gold", "Silver"],
    benefits: ["Logo on stage", "Booth space", "Keynote mention"],
    tags: ["tech", "hackathon", "ai"],
    location: "Boston, MA",
    poster: "/placeholder.svg",
    organiser: { name: "Priya Sharma", college: "MIT", verified: true },
  },
  {
    id: "cultural-101",
    title: "Spring Cultural Carnival",
    description: "Celebrate diversity with performances, food stalls, and workshops.",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60).toISOString(),
    audienceSize: 1200,
    packages: ["Presenting Sponsor", "Community Partner"],
    benefits: ["Stage branding", "Social shoutouts", "VIP passes"],
    tags: ["cultural", "festival"],
    location: "Austin, TX",
    poster: "/placeholder.svg",
    organiser: { name: "Diego Lopez", college: "UT Austin", verified: true },
  },
  {
    id: "sports-050",
    title: "Inter-College Sports Meet",
    description: "Three-day sports tournament featuring track, basketball, and soccer.",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 80).toISOString(),
    audienceSize: 2000,
    packages: ["Platinum", "Gold", "Silver"],
    benefits: ["Jersey branding", "On-field banners", "Award ceremony mention"],
    tags: ["sports", "tournament"],
    location: "Palo Alto, CA",
    poster: "/placeholder.svg",
    organiser: { name: "Ava Chen", college: "Stanford University", verified: true },
  },
];

export const sampleSponsors = [
  { id: "s-1", name: "TechNova", domain: "technova.com" },
  { id: "s-2", name: "FreshFizz", domain: "freshfizz.co" },
];

export const sampleRequests = {
  received: [
    { id: "r1", eventId: "hack-001", status: "pending", message: "We'd love to support with cloud credits and mentors." },
    { id: "r2", eventId: "cultural-101", status: "accepted", message: "Community partnership with merchandise giveaways." },
  ],
  sent: [
    { id: "r3", eventId: "sports-050", status: "pending", message: "Branding on jerseys and field banners interest." },
  ],
};
