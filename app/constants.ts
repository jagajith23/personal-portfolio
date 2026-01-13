import { Nextjs } from "@ridemountainpig/svgl-react";

type ProjectTag = "Freelance" | "Side Project" | "Internal";

export type Project = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl?: string;
  isInternal?: boolean;
  tag: ProjectTag;
  details?: ProjectDetails;
};

type ProjectDetails = {
  role?: string;
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
      "Freelanced a end-to-end web app for managing riders, analytics, dashboards, etc.",
    imageUrl:
      "https://images.unsplash.com/photo-1765211003001-b9eb5cbfe1f3?q=80&w=600&auto=format&fit=crop",
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
      detailedDescription:
        "## Overview\n\nDesigned and built an end-to-end rider management platform for logistics and delivery teams operating at scale. The system brings together rider, company, vehicle, and workforce operations into a single unified interface. A centralized dashboard provides real-time visibility into rider statuses, attendance, payroll, order activity, pending EMIs, traffic fines, and compliance alerts, helping operations and management teams make faster, data-driven decisions.\n\n## Workflow & Automation\n\nCreated a structured, workflow-based onboarding system for riders, companies, vehicles, and documents. Each onboarding flow is broken down into clear tasks, with rider status automatically updated as steps are completed. This approach reduced manual follow-ups from HR and operations teams while ensuring onboarding data remained consistent and auditable. Rider states also change automatically based on onboarding progress, compliance requirements, and operational conditions.\n\n## HR, Finance & Operations\n\nBuilt integrated workforce and finance modules covering attendance tracking, leave management with approval flows, payroll processing, and rider classification (full-time and part-time). Financial operations include rider order tracking, salary deductions, advances, traffic fines, garage expenses, and car EMI management with clear breakdowns, tenure details, interest calculations, and monthly due summaries. Together, these features provide clear visibility into both rider-level and company-level financial health.\n\n## Security & Access Control\n\nImplemented a role-based access control (RBAC) system with fine-grained permissions for administrators, HR, finance, and operations users. Access to features, actions, and sensitive financial data is controlled based on user role and company context, enabling secure multi-company usage while minimizing the risk of unauthorized access.\n\n## Deployment & Scalability\n\nThe application is fully Dockerized and deployed in a production environment using environment-based configurations. It is designed to scale across multiple companies and growing rider bases while maintaining performance, reliability, and data integrity. The architecture allows new workflows, integrations, and operational features to be added over time without major restructuring.",
    },
  },
  {
    id: 2,
    title: "Auction Management System",
    description:
      "Auction Management System to monitor, manage, track auction, bids and offers in real-time.",
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
      detailedDescription:
        "## Overview\n\nThe Auction Management System is an internal, enterprise-grade platform used to manage and operate large-scale auctions. It supports the complete auction lifecycle including bidder onboarding, event management, auction scheduling, asset processing, and real-time monitoring. The platform provides operational teams with dashboards to view and manage auctions using advanced filters, enabling clear visibility into active, upcoming, and completed auctions.\n\n## Core Features\n\nThe system includes role-based access control (RBAC), user management, and bidder management to ensure secure and controlled access across different user roles. Auction events can be configured and scheduled with associated assets and bidders, while administrators can monitor auction progress through dashboards, send messages, trigger alerts, and notify users about important auction updates or state changes.\n\n## Responsibilities & Team Contribution\n\nAs a Software Engineer I, I work as part of a larger engineering team responsible for building and maintaining the platform. My role focuses on troubleshooting production issues, maintaining existing services, and implementing new features and enhancements across the system. I actively collaborate with backend, frontend, and infrastructure teams to ensure reliability and smooth day-to-day operation of auction workflows.\n\n## Asset & Offer Processing Improvements\n\nA key contribution was refactoring the asset and offer processing flow by migrating it from an SFTP-based, scheduled task model to an event-driven architecture using Azure Service Bus. This change eliminated delays caused by batch-based processing and enabled faster, more reliable handling of assets and offers as events occur. The improvement significantly reduced processing latency and improved overall system responsiveness during active auctions.\n\n## Architecture, Messaging & Reliability\n\nThe system uses a service-oriented architecture with message queues and background workers to handle asynchronous workloads such as asset processing, notifications, and alerts. Technologies like RabbitMQ, Redis, and PostgreSQL are used to ensure reliable messaging, caching, and data persistence. Dockerized services allow consistent deployments across environments, while Azure infrastructure supports scalability and operational stability.\n\n## Ongoing Development\n\nThis is an actively evolving system, and I continue to contribute by improving service performance, fixing edge cases, enhancing reliability, and adding new features as business requirements evolve. The work involves balancing stability with continuous delivery in a production environment that supports real-time auction operations.",
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
      detailedDescription:
        "## Overview\n\nThe Live Auction Dashboard is a lightweight, focused application built to provide real-time visibility into ongoing and scheduled auctions without the complexity of the full Auction Management System. Instead of replicating the entire platform, this project concentrates on a minimal, performance-oriented dashboard experience with role-based access control, designed for internal stakeholders who need quick access to auction data.\n\n## Scope & Focus\n\nThe application primarily consists of an auction dashboard and RBAC, intentionally keeping the feature set small and efficient. It surfaces key auction information through structured tables and summaries, allowing users to monitor auctions using filters and status-based views. By limiting scope, the dashboard remains fast, easy to maintain, and quick to onboard new users.\n\n## Development & Collaboration\n\nThe dashboard was built from scratch by myself and one other engineer within a short development window. We handled the full frontend setup, architecture, state management, and UI implementation, making pragmatic decisions to balance speed of delivery with long-term maintainability. Close collaboration and rapid iteration were key to shipping the project on time.\n\n## Frontend Architecture & Performance\n\nImplemented the frontend using Next.js with a strong focus on performance and simplicity. TanStack was used for efficient data fetching and caching, while Zustand handled lightweight global state management. SlickGrid was integrated to support high-performance, data-dense tables suitable for auction data. The UI was styled using Sass to maintain a clean, minimal visual design aligned with internal tooling standards.\n\n## Deployment & Reliability\n\nThe application is containerized using Docker and deployed in a controlled internal environment. Despite its minimal scope, the system follows the same reliability and security standards as larger internal tools, making it suitable for production use and future extension if additional dashboard features are required.",
    },
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
    details: {
      techStack: [
        { name: "Java", icon: "java" },
        { name: "Python", icon: "python" },
        { name: "Git", icon: "git" },
      ],
      detailedDescription: `
        Mystic is a custom programming language designed to explore compiler and interpreter internals.

        The language is implemented using a hand-written tokenizer and recursive descent parser that constructs an Abstract Syntax Tree (AST) for evaluation. Current features include variable declarations, conditional logic, looping constructs, and user-defined functions with scoped environments.

        The interpreter is implemented in Java, while a Python-based shell provides an interactive execution layer. Developing Mystic provided deep insight into parsing theory, AST evaluation, function call stacks, scope resolution, and execution flow across language boundaries.
      `,
    },
  },
  {
    id: 5,
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

export const hoverColors = [
  "text-purple-400",
  "text-emerald-400",
  "text-pink-400",
  "text-blue-400",
  "text-indigo-400",
  "text-cyan-400",
  "text-amber-400",
  "text-rose-400",
];
