type ProjectTag = "Freelance" | "Side Project" | "Internal";

type Project = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl?: string;
  isInternal?: boolean;
  tag: ProjectTag;
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Riders Management System",
    description:
      "Freelanced a end-to-end web app for managing riders, analytics, dashboards, etc.",
    imageUrl:
      "https://images.unsplash.com/photo-1765211003001-b9eb5cbfe1f3?q=80&w=600&auto=format&fit=crop",
    projectUrl: "https://qa-web-admin.captainasadgroupofcompanies.com/",
    tag: "Freelance",
  },
  {
    id: 2,
    title: "Apollo",
    description:
      "Auction Management System to monitor, manage, track auction, bids and offers in real-time.",
    imageUrl:
      "https://images.unsplash.com/photo-1631931021230-63b459676b7f?q=80&w=600&auto=format&fit=crop",
    isInternal: true,
    tag: "Internal",
  },
  {
    id: 3,
    title: "Live Auction Dashboard",
    description:
      "Minimal dashboard for stakeholders to monitor & manage auctions.",
    imageUrl:
      "https://images.unsplash.com/photo-1571327352610-1c5484ccc840?q=80&w=600&auto=format&fit=crop",
    isInternal: true,
    tag: "Internal",
  },
  {
    id: 4,
    title: "Mystic",
    description:
      "A programming language in Java and Python, including tokenizer, parser, etc.",
    imageUrl:
      "https://images.unsplash.com/photo-1767257147725-89011434e351?q=80&w=600&auto=format&fit=crop",
    projectUrl: "https://github.com/jagajith23/mystic",
    tag: "Side Project",
  },
  {
    id: 5,
    title: "Ignite",
    description: "A portal to submit, track and manage ideas for employees.",
    imageUrl:
      "https://images.unsplash.com/photo-1499796683658-b659bc751db1?q=80&w=600&auto=format&fit=crop",
    // projectUrl: "https://qa-web-admin.captainasadgroupofcompanies.com/",
    tag: "Internal",
  },
  {
    id: 6,
    title: "Evnzon",
    description: "Freelanced an event booking platform powered by Flutter.",
    imageUrl:
      "https://images.unsplash.com/photo-1530762312300-888baa333d74?q=80&w=600&auto=format&fit=crop",
    // projectUrl: "https://example.com/project-one",
    tag: "Freelance",
  },
  //   {
  //     id: 6,
  //     title: "Project Two",
  //     description: "A brief description of Project Two.",
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1767257147725-89011434e351?q=80&w=600&auto=format&fit=crop",
  //     projectUrl: "https://example.com/project-one",
  //   },
];
