import { use } from "react";

const Page = ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = use(params);
  return <div className="min-h-screen bg-black font-aoboshi"></div>;
};

export default Page;

// "use client";

// import { motion, useScroll, useTransform, Variants } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import { useParams, useRouter } from "next/navigation"; // Use 'next/router' if using Pages directory
// import { useEffect, useRef } from "react";

// // --- Types & Data (Ideally move this to a shared lib/data.ts) ---

// type ProjectTag = "Freelance" | "Side Project" | "Internal";

// type ProjectDetail = {
//   id: number;
//   title: string;
//   tag: ProjectTag;
//   description: string;
//   imageUrl: string;
//   projectUrl?: string;
//   role: string;
//   year: string;
//   stack: string[];
//   challenge: string;
//   solution: string;
// };

// // Extended data to populate the detail view
// const PROJECTS_DATA: ProjectDetail[] = [
//   {
//     id: 1,
//     title: "Riders Management System",
//     tag: "Freelance",
//     description:
//       "A comprehensive web app for managing riders, analytics, and dashboards.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1765211003001-b9eb5cbfe1f3?q=80&w=1200&auto=format&fit=crop",
//     projectUrl: "https://qa-web-admin.captainasadgroupofcompanies.com/",
//     role: "Full Stack Developer",
//     year: "2024",
//     stack: ["Next.js", "Supabase", "Tailwind", "Recharts"],
//     challenge:
//       "The client needed a way to track hundreds of riders in real-time while maintaining a history of their deliveries and performance metrics. The existing excel-based system was prone to errors and lacked visual insights.",
//     solution:
//       "I built a role-based dashboard that aggregates rider data. The system features real-time geolocation tracking, automated performance reports, and a dark-mode friendly interface for dispatchers working night shifts.",
//   },
//   {
//     id: 2,
//     title: "Apollo",
//     tag: "Internal",
//     description:
//       "Advanced Dashboard to monitor, manage, track auction and bids in real-time.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1631931021230-63b459676b7f?q=80&w=1200&auto=format&fit=crop",
//     role: "Frontend Lead",
//     year: "2023",
//     stack: ["React", "WebSockets", "D3.js", "Redux"],
//     challenge:
//       "Latency was the enemy. Stakeholders needed to see bid updates within milliseconds of them happening on the server to make split-second decisions.",
//     solution:
//       "We implemented a custom WebSocket layer optimized for high-frequency updates, decoupled the UI rendering from the data stream using web workers, and created a high-contrast visual language for rapid data scanning.",
//   },
//   // ... Add other projects here with the same structure
//   {
//     id: 3,
//     title: "Live Auction Dashboard",
//     tag: "Internal",
//     description: "Dashboard for stakeholders to monitor & manage auctions.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1571327352610-1c5484ccc840?q=80&w=1200&auto=format&fit=crop",
//     role: "Frontend Developer",
//     year: "2023",
//     stack: ["Vue.js", "Firebase", "SCSS"],
//     challenge:
//       "Visualizing complex auction states without overwhelming the user.",
//     solution:
//       "Created a modular widget system allowing users to customize their view based on the specific auction types they were monitoring.",
//   },
//   {
//     id: 4,
//     title: "Mystic",
//     tag: "Side Project",
//     description: "A programming language in Java and Python.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1767257147725-89011434e351?q=80&w=1200&auto=format&fit=crop",
//     projectUrl: "https://github.com/jagajith23/mystic",
//     role: "Sole Creator",
//     year: "2022",
//     stack: ["Java", "Python", "ANTLR", "LLVM"],
//     challenge:
//       "Understanding the intricacies of compiler design, specifically tokenization and abstract syntax tree generation.",
//     solution:
//       "Built a lexer and parser from scratch. Mystic supports basic arithmetic, variable declaration, and loops, compiling down to a custom bytecode.",
//   },
// ];

// // --- Animation Variants ---

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: 0.2,
//     },
//   },
// };

// const itemVariants: Variants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       duration: 0.5,
//       ease: [0.33, 1, 0.68, 1],
//     },
//   },
// };

// // --- Main Page Component ---

// export default function ProjectDetail() {
//   const params = useParams();
//   const router = useRouter();

//   // Handle case where id might not be present immediately
//   const id = params?.id ? Number(params.id) : null;
//   const project = PROJECTS_DATA.find((p) => p.id === id);

//   // Scroll parallax effect for the hero image
//   const { scrollYProgress } = useScroll();
//   const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
//   const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

//   // Scroll to top on mount
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   if (!project) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center text-zinc-400">
//         <p>Loading project or project not found...</p>
//       </div>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-black text-zinc-100 selection:bg-zinc-800 selection:text-white pb-32 font-aoboshi">
//       {/* Navigation / Back Button */}
//       <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 pointer-events-none">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <Link
//             href="/"
//             className="pointer-events-auto group flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-300 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 hover:border-white/10"
//           >
//             <svg
//               width="16"
//               height="16"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="group-hover:-translate-x-1 transition-transform duration-300"
//             >
//               <path d="M19 12H5" />
//               <path d="M12 19l-7-7 7-7" />
//             </svg>
//             Back to projects
//           </Link>

//           {/* Optional: Visit Project Button Top Right */}
//           {project.projectUrl && (
//             <a
//               href={project.projectUrl}
//               target="_blank"
//               rel="noreferrer"
//               className="pointer-events-auto hidden md:flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-300 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 hover:border-white/10"
//             >
//               Visit Live
//               <svg
//                 width="14"
//                 height="14"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M7 17L17 7" />
//                 <path d="M7 7h10v10" />
//               </svg>
//             </a>
//           )}
//         </div>
//       </nav>

//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-40"
//       >
//         {/* Header Section */}
//         <div className="max-w-4xl">
//           <motion.div
//             variants={itemVariants}
//             className="flex items-center gap-4 mb-6"
//           >
//             <span
//               className={`
//                 rounded-full py-1 px-3 text-sm font-medium tracking-wide
//                 ${
//                   project.tag === "Freelance"
//                     ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
//                     : project.tag === "Internal"
//                     ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
//                     : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
//                 }
//               `}
//             >
//               {project.tag}
//             </span>
//             <span className="text-zinc-500 text-sm">{project.year}</span>
//           </motion.div>

//           <motion.h1
//             variants={itemVariants}
//             className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-b from-zinc-100 via-zinc-200 to-zinc-600 mb-8 leading-tight font-wind-song"
//           >
//             {project.title}
//           </motion.h1>

//           <motion.p
//             variants={itemVariants}
//             className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl"
//           >
//             {project.description}
//           </motion.p>
//         </div>

//         {/* Hero Image */}
//         <motion.div
//           variants={itemVariants}
//           className="mt-16 relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden border border-white/5"
//         >
//           <motion.div style={{ scale, opacity }} className="w-full h-full">
//             <Image
//               src={project.imageUrl}
//               alt={project.title}
//               fill
//               className="object-cover"
//               priority
//             />
//           </motion.div>

//           {/* Gradient Overlay for better blend */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
//         </motion.div>

//         {/* Content Grid */}
//         <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
//           {/* Sidebar: Details & Stack */}
//           <motion.aside
//             variants={itemVariants}
//             className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-12"
//           >
//             <div>
//               <h3 className="text-sm font-semibold text-zinc-100 uppercase tracking-wider mb-4">
//                 Role
//               </h3>
//               <p className="text-zinc-400">{project.role}</p>
//             </div>

//             <div>
//               <h3 className="text-sm font-semibold text-zinc-100 uppercase tracking-wider mb-4">
//                 Tech Stack
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {project.stack?.map((tech) => (
//                   <span
//                     key={tech}
//                     className="px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-300"
//                   >
//                     {tech}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {project.projectUrl && (
//               <div className="pt-4 border-t border-zinc-900">
//                 <a
//                   href={project.projectUrl}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="group inline-flex items-center gap-2 text-zinc-100 hover:text-zinc-300 transition-colors"
//                 >
//                   <span className="font-medium">Open Project</span>
//                   <svg
//                     width="18"
//                     height="18"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
//                   >
//                     <path d="M7 17L17 7" />
//                     <path d="M7 7h10v10" />
//                   </svg>
//                 </a>
//               </div>
//             )}
//           </motion.aside>

//           {/* Main Content: Story */}
//           <motion.div
//             variants={itemVariants}
//             className="lg:col-span-8 space-y-16"
//           >
//             <section>
//               <h2 className="text-2xl font-bold text-zinc-100 mb-4">
//                 The Challenge
//               </h2>
//               <p className="text-zinc-400 leading-8 text-lg">
//                 {project.challenge || "Description coming soon..."}
//               </p>
//             </section>

//             <section>
//               <h2 className="text-2xl font-bold text-zinc-100 mb-4">
//                 The Approach
//               </h2>
//               <p className="text-zinc-400 leading-8 text-lg">
//                 {project.solution || "Description coming soon..."}
//               </p>
//             </section>

//             {/* Optional: Add a second image or gallery here */}
//             <div className="w-full aspect-video bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 relative group">
//               <div className="absolute inset-0 flex items-center justify-center text-zinc-700 text-sm">
//                 Project Gallery / Details Placeholder
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Footer Navigation */}
//       <div className="max-w-7xl mx-auto px-6 mt-32 pt-12 border-t border-zinc-900 flex justify-between">
//         <Link
//           href={`/project/${project.id > 1 ? project.id - 1 : 1}`}
//           className={`text-zinc-500 hover:text-white transition-colors ${
//             project.id === 1 ? "invisible" : ""
//           }`}
//         >
//           ← Previous Project
//         </Link>
//         <Link
//           href="/"
//           className="text-zinc-500 hover:text-white transition-colors"
//         >
//           All Projects
//         </Link>
//         <Link
//           href={`/project/${project.id + 1}`}
//           className="text-zinc-500 hover:text-white transition-colors"
//         >
//           Next Project →
//         </Link>
//       </div>
//     </main>
//   );
// }
