"use client";

import { Project, PROJECTS } from "@/app/constants";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { use } from "react";
import { TechIcon } from "@/components/skills";

// Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = use(params);
  const project: Project | undefined = PROJECTS.find(
    (p) => p.id === Number(id)
  );

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 font-aoboshi">
        Project not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-aoboshi selection:bg-zinc-800 selection:text-white">
      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex justify-between">
          <Link href="/#projects" className="pointer-events-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors border border-zinc-800 rounded-full px-4 py-2 bg-black/60 backdrop-blur"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
              Back
            </motion.div>
          </Link>

          {project.projectUrl && (
            <motion.a
              href={project.projectUrl}
              target="_blank"
              rel="noreferrer"
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              variants={{
                rest: { scale: 1 },
                hover: { scale: 1.05 },
                tap: { scale: 0.95 },
              }}
              className="pointer-events-auto hidden md:flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors border border-zinc-800 rounded-full px-4 py-2 bg-black/60 backdrop-blur"
            >
              Visit
              {/* The arrow will automatically receive the "hover" state from the parent */}
              <motion.svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={{
                  rest: { x: 0, y: 0 },
                  hover: { x: 2, y: -2 },
                }}
                transition={{ duration: 0.2 }}
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </motion.svg>
            </motion.a>
          )}
        </div>
      </nav>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-40">
        {/* HEADER TEXT - Staggered entrance */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className={`inline-block mb-6 rounded-full px-4 py-1 text-xs tracking-wide
              ${
                project.tag === "Freelance"
                  ? "text-emerald-400 bg-emerald-500/10"
                  : project.tag === "Internal"
                  ? "text-purple-400 bg-purple-500/10"
                  : "text-blue-400 bg-blue-500/10"
              }`}
          >
            {project.tag}
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            {project.title}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-zinc-400 leading-relaxed max-w-2xl"
          >
            {project.description}
          </motion.p>
        </motion.header>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* CARD 1: THE IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 h-100 lg:h-125 relative rounded-3xl overflow-hidden group"
          >
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />
          </motion.div>

          {/* CARD 2: THE INFO SIDEBAR */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="lg:col-span-1 min-h-100 lg:h-125 rounded-3xl p-8 flex flex-col justify-center"
          >
            <div className="space-y-10">
              {project.details?.role && (
                <motion.div variants={fadeInUp}>
                  <p className="text-xs uppercase tracking-wider text-zinc-500 mb-3 font-medium">
                    Role
                  </p>
                  <p className="text-2xl text-zinc-100 font-semibold">
                    {project.details.role}
                  </p>
                </motion.div>
              )}

              {project.details?.techStack && (
                <motion.div variants={fadeInUp}>
                  <p className="text-xs uppercase tracking-wider text-zinc-500 mb-4 font-medium">
                    Stack
                  </p>
                  <ul className="flex flex-col gap-2">
                    {project.details.techStack.map((tech, i) => (
                      <motion.li
                        key={i}
                        variants={fadeInUp}
                        whileHover={{ x: 5, color: "#fff" }}
                        className="flex items-center gap-3 text-zinc-400 p-2 rounded-lg hover:bg-zinc-800/30 transition-colors cursor-default"
                      >
                        <span className="relative w-5 h-5 opacity-90 flex items-center justify-center text-black">
                          {!!tech.url ? (
                            <span className="relative w-5 h-5 opacity-90">
                              <Image
                                src={tech.url}
                                alt={tech.name}
                                fill
                                className="object-contain"
                              />
                            </span>
                          ) : (
                            <TechIcon icon={tech.icon} />
                          )}
                        </span>
                        <span className="text-sm font-medium">{tech.name}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* OVERVIEW SECTION */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-24 max-w-5xl mx-auto"
        >
          {/* Section Label */}
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px bg-zinc-800 flex-1" />
            <div className="h-px bg-zinc-800 flex-1" />
          </div>

          <div className="space-y-16">
            {project.details?.detailedDescription &&
              project.details.detailedDescription
                .split("## ")
                .filter(Boolean)
                .map((section, index) => {
                  const splitIndex = section.indexOf("\n");
                  const title =
                    splitIndex !== -1
                      ? section.slice(0, splitIndex).trim()
                      : section;
                  const content =
                    splitIndex !== -1 ? section.slice(splitIndex).trim() : "";

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 border-l border-zinc-800 pl-6 md:pl-0 md:border-l-0"
                    >
                      {/* Left Column: Number & Title */}
                      <div className="md:col-span-4 flex flex-col md:items-end md:text-right relative">
                        {/* Decorative dot for mobile timeline */}
                        <div className="absolute -left-7.25 top-0 w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-zinc-500 transition-colors md:hidden" />

                        <span className="text-6xl font-bold text-zinc-900 group-hover:text-zinc-800 transition-colors select-none font-sans">
                          0{index + 1}
                        </span>
                        <h3 className="text-xl font-bold text-zinc-100 mt-2 bg-linear-to-r from-white to-zinc-400 bg-clip-text">
                          {title}
                        </h3>
                      </div>

                      {/* Right Column: Content */}
                      <div className="md:col-span-8">
                        <p className="text-zinc-400 leading-8 text-lg md:text-lg whitespace-pre-line">
                          {content}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
          </div>
        </motion.section>
      </main>
    </div>
  );
}

// "use client";

// import { motion, useScroll, useTransform, Variants } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import { useParams, useRouter } from "next/navigation"; // Use 'next/router' if using Pages directory
// import { useEffect, useRef } from "react";

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
