type ProjectTag = "Freelance" | "Side Project" | "Internal";

export type ProjectVideo = {
  mp4: string;
  webm: string;
  poster: string;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  /** Static cover; also used for Open Graph. With a video, use its poster. */
  imageUrl: string;
  /** Optional muted looping clip shown in place of the image. */
  video?: ProjectVideo;
  /** Optional in-browser demo rendered on the project page. */
  playground?: "mystic";
  projectUrl?: string;
  isInternal?: boolean;
  tag: ProjectTag;
  details?: ProjectDetails;
};

type ProjectDetails = {
  role?: string;
  /** Three or four one-line takeaways, shown ahead of the full write-up. */
  highlights?: string[];
  techStack: {
    icon: string;
    name: string;
    url?: string;
  }[];
  detailedDescription: string;
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Riders Management System",
    description:
      "Freelanced an end-to-end web app for managing riders, analytics, dashboards, etc.",
    imageUrl: "/projects/portfolio-riders-poster.jpg",
    video: {
      mp4: "/projects/portfolio-riders.mp4",
      webm: "/projects/portfolio-riders.webm",
      poster: "/projects/portfolio-riders-poster.jpg",
    },
    projectUrl: "https://qa-web-admin.captainasadgroupofcompanies.com/",
    tag: "Freelance",
    details: {
      role: "Full Stack Developer",
      techStack: [
        { name: "Next.js", icon: "nextjs" },
        { name: "TypeScript", icon: "typescript" },
        { name: "React", icon: "react" },
        { name: "Tailwind", icon: "tailwind" },
        { name: "TanStack Query", icon: "tanstack" },
        { name: "Docker", icon: "docker" },
        { name: "C#", icon: "csharp" },
        { name: ".NET Core", icon: ".net" },
        {
          name: "Dapper",
          icon: "dapper",
          url: "https://api.nuget.org/v3-flatcontainer/dapper/2.1.66/icon",
        },
        {
          name: "SFTP",
          icon: "sftp",
          url: "/ftp.png",
        },
        { name: "Git", icon: "git" },
      ],
      highlights: [
        "One dashboard for riders, attendance, payroll, EMIs, fines and compliance.",
        "Workflow onboarding that updates a rider's status as each task is completed.",
        "Role-based access across multiple companies.",
        "Dockerized and running in production.",
      ],
      detailedDescription:
        "## Overview\n\nDesigned and built an end-to-end rider management platform for logistics and delivery teams operating at scale. The system brings together rider, company, vehicle, and workforce operations into a single unified interface. A centralized dashboard provides real-time visibility into rider statuses, attendance, payroll, order activity, pending EMIs, traffic fines, and compliance alerts, helping operations and management teams make faster, data-driven decisions.\n\n## Workflow & Automation\n\nCreated a structured, workflow-based onboarding system for riders, companies, vehicles, and documents. Each onboarding flow is broken down into clear tasks, with rider status automatically updated as steps are completed. This approach reduced manual follow-ups from HR and operations teams while ensuring onboarding data remained consistent and auditable. Rider states also change automatically based on onboarding progress, compliance requirements, and operational conditions.\n\n## HR, Finance & Operations\n\nBuilt integrated workforce and finance modules covering attendance tracking, leave management with approval flows, payroll processing, and rider classification (full-time and part-time). Financial operations include rider order tracking, salary deductions, advances, traffic fines, garage expenses, and car EMI management with clear breakdowns, tenure details, interest calculations, and monthly due summaries. Together, these features provide clear visibility into both rider-level and company-level financial health.\n\n## Security & Access Control\n\nImplemented a role-based access control (RBAC) system with fine-grained permissions for administrators, HR, finance, and operations users. Access to features, actions, and sensitive financial data is controlled based on user role and company context, enabling secure multi-company usage while minimizing the risk of unauthorized access.\n\n## Deployment & Scalability\n\nThe application is fully Dockerized and deployed in a production environment using environment-based configurations. It is designed to scale across multiple companies and growing rider bases while maintaining performance, reliability, and data integrity. The architecture allows new workflows, integrations, and operational features to be added over time without major restructuring.",
    },
  },
  {
    id: 2,
    title: "Auction Management System",
    description:
      "Internal platform to monitor and manage auctions, bids and offers in real time. I own it end to end.",
    imageUrl:
      "https://images.unsplash.com/photo-1631931021230-63b459676b7f?q=80&w=600&auto=format&fit=crop",
    tag: "Internal",
    details: {
      role: "Software Engineer I",
      techStack: [
        { name: "Azure", icon: "azure" },
        { name: "Python", icon: "python" },
        { name: "Flask", icon: "flask" },
        { name: "RabbitMQ", icon: "rabbitmq" },
        { name: "PostgreSQL", icon: "postgres" },
        { name: "Redis", icon: "redis" },
        { name: "Docker", icon: "docker" },
        { name: "Nginx", icon: "nginx" },
        { name: "Socket", icon: "socket" },
        {
          name: "Lens",
          icon: "lens",
          url: "https://docs.k8slens.dev/img/lenshq-icon.svg",
        },
        { name: "Sass", icon: "sass" },
        { name: "Javascript", icon: "javascript" },
        {
          name: "Handlebar Mustache",
          icon: "handlebars",
          url: "https://img.icons8.com/scribby/50/handlebar-mustache.png",
        },
        {
          name: "Ember.js",
          icon: "emberjs",
          url: "/emberjs.png",
        },
      ],
      highlights: [
        "Sole engineer running it since the original team left.",
        "Worked across the legacy system and the modernized one: design, build and technical decisions.",
        "Covers the auction lifecycle: bidders, events, scheduling, assets and live monitoring.",
        "Queues and background workers behind real-time updates.",
      ],
      detailedDescription:
        "## Overview\n\nThe Auction Management System is an internal, enterprise-grade platform used to manage and operate large-scale auctions. It covers the full auction lifecycle: bidder onboarding, event management, scheduling, asset processing and real-time monitoring. Operations teams use its dashboards and advanced filters to see active, upcoming and completed auctions at a glance.\n\n## Ownership\n\nThe original engineering team has since moved on, and I am now the engineer responsible for the platform. That means production support, new features, reliability and every technical decision that comes with them.\n\n## Legacy and Modernized\n\nI have worked in both the legacy application and the modernized one, across design, building and decision-making. Knowing how the old system behaves, and why it was built that way, is what makes changes to the new one safe.\n\n## Architecture\n\nA service-oriented system with message queues and background workers for asynchronous work such as asset processing, notifications and alerts. RabbitMQ, Redis and PostgreSQL handle messaging, caching and persistence, Dockerized services keep deployments consistent, and Azure supports scaling and operations. Role-based access control and bidder management keep access scoped by role.",
    },
  },
  {
    id: 3,
    title: "Live Auction Dashboard",
    description:
      "Minimal dashboard for stakeholders to monitor & manage auctions.",
    imageUrl:
      "https://images.unsplash.com/photo-1571327352610-1c5484ccc840?q=80&w=600&auto=format&fit=crop",
    tag: "Internal",
    details: {
      role: "Frontend Developer",
      techStack: [
        { name: "Next.js", icon: "nextjs" },
        { name: "Sass", icon: "sass" },
        { name: "Tanstack", icon: "tanstack" },
        {
          name: "Slickgrid",
          icon: "slickgrid",
          url: "https://img.icons8.com/parakeet/48/grid.png",
        },
        {
          name: "Zustand",
          icon: "zustand",
          url: "https://zustand-demo.pmnd.rs/logo192.png",
        },
        {
          name: "Socket",
          icon: "socket",
        },
        { name: "Docker", icon: "docker" },
        { name: "Git", icon: "git" },
      ],
      highlights: [
        "Built from scratch with one other engineer in a short window.",
        "An auction dashboard plus role-based access, kept deliberately small.",
        "Data-dense live tables on SlickGrid, state in Zustand, updates over sockets.",
      ],
      detailedDescription:
        "## Overview\n\nThe Live Auction Dashboard is a lightweight, focused application built to provide real-time visibility into ongoing and scheduled auctions without the complexity of the full Auction Management System. Instead of replicating the entire platform, this project concentrates on a minimal, performance-oriented dashboard experience with role-based access control, designed for internal stakeholders who need quick access to auction data.\n\n## Scope & Focus\n\nThe application primarily consists of an auction dashboard and RBAC, intentionally keeping the feature set small and efficient. It surfaces key auction information through structured tables and summaries, allowing users to monitor auctions using filters and status-based views. By limiting scope, the dashboard remains fast, easy to maintain, and quick to onboard new users.\n\n## Development & Collaboration\n\nThe dashboard was built from scratch by myself and one other engineer within a short development window. We handled the full frontend setup, architecture, state management, and UI implementation, making pragmatic decisions to balance speed of delivery with long-term maintainability. Close collaboration and rapid iteration were key to shipping the project on time.\n\n## Frontend Architecture & Performance\n\nImplemented the frontend using Next.js with a strong focus on performance and simplicity. TanStack was used for efficient data fetching and caching, while Zustand handled lightweight global state management. SlickGrid was integrated to support high-performance, data-dense tables suitable for auction data. The UI was styled using Sass to maintain a clean, minimal visual design aligned with internal tooling standards.\n\n## Deployment & Reliability\n\nThe application is containerized using Docker and deployed in a controlled internal environment. Despite its minimal scope, the system follows the same reliability and security standards as larger internal tools, making it suitable for production use and future extension if additional dashboard features are required.",
    },
  },
  {
    id: 4,
    title: "Mystic",
    description:
      "A small programming language with closures, implemented twice: in Java and in Python.",
    imageUrl: "/projects/mystic-playground-poster.jpg",
    video: {
      mp4: "/projects/mystic-playground.mp4",
      webm: "/projects/mystic-playground.webm",
      poster: "/projects/mystic-playground-poster.jpg",
    },
    projectUrl: "https://github.com/jagajith23/mystic",
    playground: "mystic",
    tag: "Side Project",
    details: {
      techStack: [
        { name: "Java", icon: "java" },
        { name: "Python", icon: "python" },
        { name: "Git", icon: "git" },
      ],
      highlights: [
        "A dynamically typed language with closures, written by hand.",
        "Scanner, recursive descent parser, resolver and a tree-walking interpreter.",
        "Implemented twice, in Java and Python, and checked against the same example programs in CI.",
      ],
      detailedDescription:
        "## Overview\n\nMystic is a small, dynamically typed programming language I built to understand how interpreters work. I started from the design in Crafting Interpreters and wrote the whole pipeline by hand, twice: once in Java and once in Python.\n\n## How it works\n\nSource code passes through a scanner, a recursive descent parser that builds a syntax tree, a resolver that binds each variable to its scope before the program runs, and a tree-walking interpreter. The resolver is what lets closures capture the right variable.\n\n## What I added\n\nOn top of the base design I added break and continue (checked before the program runs), a ternary operator, string and number concatenation, and a division-by-zero error. Both implementations run the same example programs in CI and must print identical output.",
    },
  },
  {
    id: 5,
    title: "Paprika Butchery",
    description:
      "Freelanced an order and invoice management app for a butchery supplying retail branches.",
    imageUrl: "/projects/paprika-butchery-poster.jpg",
    video: {
      mp4: "/projects/paprika-butchery.mp4",
      webm: "/projects/paprika-butchery.webm",
      poster: "/projects/paprika-butchery-poster.jpg",
    },
    projectUrl: "https://qa-butchery.captainasadgroupofcompanies.com",
    tag: "Freelance",
    details: {
      role: "Full Stack Developer",
      techStack: [
        { name: "Next.js", icon: "nextjs" },
        { name: "TypeScript", icon: "typescript" },
        { name: "React", icon: "react" },
        { name: "Tailwind", icon: "tailwind" },
        { name: "TanStack Query", icon: "tanstack" },
        { name: "C#", icon: "csharp" },
        { name: ".NET Core", icon: ".net" },
        {
          name: "Dapper",
          icon: "dapper",
          url: "https://api.nuget.org/v3-flatcontainer/dapper/2.1.66/icon",
        },
        { name: "MariaDB", icon: "mariadb" },
        { name: "Docker", icon: "docker" },
        { name: "Git", icon: "git" },
      ],
      highlights: [
        "Branch-wise orders turn into invoices through a simple Pending to Completed flow.",
        "Returns are capped to what is still returnable and show as negative rows in the ledger.",
        "Money is handled to three decimals, so totals always reconcile.",
        "Weekly and monthly reports export to Excel and PDF.",
      ],
      detailedDescription:
        "## Overview\n\nDesigned and built an order and invoice management system for a butchery that supplies companies and their retail branches. Staff raise branch-wise orders from a product catalogue, turn them into invoices, process returns and track operating expenses, while a dashboard summarises orders, companies, items and net revenue at a glance.\n\n## Orders & Invoicing\n\nOrders move through a deliberately simple state machine, Pending to Completed, and completing an order generates its invoice number. Each line carries SKU and supplier SKU, ordered versus received quantity, unit cost and a percentage discount. Money is handled to three decimals (KWD) with fixed rounding rules, so line totals, discounts and refunds always reconcile. Order numbers run in a sequence per branch, and any invoice prints as a clean A4 document or exports as a PDF.\n\n## Returns & Reporting\n\nReturns can only be raised against completed orders, are capped to the stock still returnable, and refund each line at its final per-unit cost. Every return is recorded as its own event and shown in the order ledger as negative rows, so the net total is always visible next to the original invoice. Weekly and monthly reports break sales down by branch with discounts and returns, and export to Excel, alongside an expenses ledger with Excel and PDF export.\n\n## Architecture & Security\n\nThe API is a .NET web service in four clean layers (Domain, Application, Infrastructure, API) using Dapper on MariaDB and FluentValidation for request rules. Authentication uses JWT with BCrypt-hashed passwords and role-based access for administrators, managers and staff. The front end is a Next.js (App Router) and TypeScript app: TanStack Query owns server state, React Hook Form with Zod handles forms, and Tailwind with Radix primitives keeps the dense, table-heavy screens consistent. Structured Serilog logging is shipped to a remote server for diagnostics.\n\n## Deployment\n\nThe API and database run in Docker containers, and the front end is configured per environment for QA and production, so releases can be promoted without code changes.",
    },
  },
  {
    id: 6,
    title: "Ignite",
    description: "A portal to submit, track and manage ideas for employees.",
    imageUrl:
      "https://images.unsplash.com/photo-1499796683658-b659bc751db1?q=80&w=600&auto=format&fit=crop",
    tag: "Internal",
    details: {
      role: "Full Stack Developer",
      techStack: [
        { name: "React", icon: "react" },
        { name: "Sass", icon: "sass" },
        { name: "Node.js", icon: "nodejs" },
        { name: "Express.js", icon: "express" },
        { name: "MongoDB", icon: "mongo" },
        { name: "Git", icon: "git" },
      ],
      highlights: [
        "Employees submit ideas, vote, and track them from submission to implementation.",
        "A role-based admin panel for moderators.",
        "Redesigned the MongoDB schema for normalization and query efficiency.",
      ],
      detailedDescription: `
        Developed an internal innovation portal called Ignite to democratize idea sharing across the organization.

        The platform enables employees to submit proposals, vote on features, and track ideas through their full lifecycle from submission to implementation. A role-based admin panel allows moderators to categorize ideas, manage statuses, and oversee engagement.

        As part of the project, I redesigned the MongoDB schema to improve data normalization, scalability, and query efficiency, ensuring the system could support growing participation and evolving feature requirements.
      `,
    },
  },
  // {
  //   id: 6,
  //   title: "Evnzon",
  //   description: "Freelanced an event booking platform powered by Flutter.",
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1530762312300-888baa333d74?q=80&w=600&auto=format&fit=crop",
  //   tag: "Freelance",
  //   details: {
  //     role: "Mobile Application Developer",
  //     techStack: [
  //       { name: "Flutter", icon: "flutter" },
  //       { name: "Dart", icon: "dart" },
  //     ],
  //     detailedDescription: `
  //       Built a cross-platform mobile application for discovering local events and connecting users with listed event agents.

  //       The app allows users to browse events, view agent profiles, and book calls directly with agents for inquiries and coordination. Implemented structured navigation, responsive layouts, and state management using Flutter Provider to ensure a smooth and consistent experience across both iOS and Android devices.
  //     `,
  //   },
  // },
];

export const DURATION = 1.2;
export const DELAY = 0.4;
export const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];
