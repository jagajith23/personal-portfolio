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
    isInternal: true,
    tag: "Internal",
    details: {
      role: "Lead Frontend Engineer",
      techStack: [
        { name: "React", icon: "react" },
        { name: "Redux Toolkit", icon: "redux" },
        { name: "SignalR", icon: "signalr" },
        { name: "Material UI", icon: "materialui" },
        { name: "Azure", icon: "azure" },
      ],
      detailedDescription:
        "Built a high-performance internal tool for managing live vehicle auctions. Implemented bi-directional communication using SignalR to ensure bid updates and offer statuses were reflected instantly across all connected clients without page reloads. The system handles concurrent connections from hundreds of dealers while maintaining data consistency and low latency.",
    },
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
    details: {
      role: "Frontend Developer",
      techStack: [
        { name: "Next.js", icon: "nextjs" },
        { name: "Tremor", icon: "tremor" },
        { name: "Tailwind", icon: "tailwind" },
        { name: "Supabase", icon: "supabase" },
      ],
      detailedDescription:
        "Created a clean, data-centric dashboard specifically for executive stakeholders to view high-level auction metrics. Focused heavily on UX/UI minimalism to present complex financial data—such as total volume, active bids, and revenue forecasts—in an easily digestible format using interactive charts and summary cards.",
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
      role: "Language Creator",
      techStack: [
        { name: "Java", icon: "java" },
        { name: "Python", icon: "python" },
        { name: "ANTLR", icon: "antlr" },
        { name: "Git", icon: "git" },
      ],
      detailedDescription:
        "An educational exploration into compiler design and interpreter logic. 'Mystic' features a custom-built tokenizer and recursive descent parser. It supports variable declaration, control flow loops, and function definitions. The project involved bridging logic between a Java-based backend interpreter and a Python-based shell interface.",
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
        { name: "Vue.js", icon: "vue" },
        { name: "Node.js", icon: "nodejs" },
        { name: "Express", icon: "express" },
        { name: "MongoDB", icon: "mongodb" },
      ],
      detailedDescription:
        "Developed an internal innovation portal ('Ignite') to democratize idea sharing within the company. The platform allows employees to submit proposals, vote on features, and track the lifecycle of an idea from submission to implementation. Includes a robust admin panel for categorization and status updates, fostering a culture of continuous improvement.",
    },
  },
  {
    id: 6,
    title: "Evnzon",
    description: "Freelanced an event booking platform powered by Flutter.",
    imageUrl:
      "https://images.unsplash.com/photo-1530762312300-888baa333d74?q=80&w=600&auto=format&fit=crop",
    tag: "Freelance",
    details: {
      role: "Mobile Application Developer",
      techStack: [
        { name: "Flutter", icon: "flutter" },
        { name: "Dart", icon: "dart" },
        { name: "Firebase", icon: "firebase" },
        { name: "Stripe API", icon: "stripe" },
      ],
      detailedDescription:
        "Built a cross-platform mobile application for discovering and booking local events. The app features a seamless ticket purchasing flow integrated with Stripe, dynamic QR code generation for check-ins, and real-time push notifications for event updates. Utilized Flutter Provider for state management to ensure smooth performance across both iOS and Android devices.",
    },
  },
];
