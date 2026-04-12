import { NextResponse } from "next/server";

const tracks = [
  { title: "Let Her Go", artist: "Passenger" },
  { title: "Iris", artist: "Goo Goo Dolls" },
  { title: "Love Me Again", artist: "John Newman" },
  { title: "Line Without a Hook", artist: "Ricky Montgomery" },
  { title: "Love Me Not", artist: "Ravyn Lenae" },
  { title: "Let Down", artist: "Radiohead" },
  { title: "Atlantis", artist: "Seafret" },
  { title: "Golden Brown", artist: "The Stranglers" },
  { title: "A Thousand Years", artist: "Christina Perri" },
  { title: "The Night We Met", artist: "Lord Huron" },
  { title: "Heat Waves", artist: "Glass Animals" },
  { title: "End of Beginning", artist: "Djo" },
  { title: "Talking to the Moon", artist: "Bruno Mars" },
  { title: "Those Eyes", artist: "New West" },
  { title: "Middle of the Night", artist: "Elley Duhé" },
  { title: "Riptide", artist: "Vance Joy" },
  { title: "Only Love Can Hurt Like This", artist: "Paloma Faith" },
  { title: "I Want It That Way", artist: "Backstreet Boys" },
  { title: "Safe and Sound", artist: "Taylor Swift" },
  { title: "My Way", artist: "Frank Sinatra" },
  { title: "Driver's License", artist: "Olivia Rodrigo" },
  { title: "Paradise", artist: "Coldplay" },
  { title: "Where Is My Mind?", artist: "Pixies" },
  { title: "Can't Help Falling in Love", artist: "Elvis Presley" },
  { title: "The Winner Takes It All", artist: "ABBA" },
  { title: "Forever", artist: "Chris Brown" },
].map((track) => ({
  ...track,
  searchQuery: `${track.artist} ${track.title}`,
}));

export async function GET() {
  return NextResponse.json({ tracks });
}
