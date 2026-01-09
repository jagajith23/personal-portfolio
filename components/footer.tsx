// "use client";

// import { AnimatePresence, motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import MagneticButton from "./magnetic-button"; // Assuming this is in the same directory
// import { smoothScrollTo } from "./navigation/smooth-scroll"; // Assuming you have this helper

// const SOCIALS = [
//   { name: "GitHub", url: "https://github.com/jagajith23/" },
//   { name: "LinkedIn", url: "https://linkedin.com/in/jagajith23/" },
//   { name: "Instagram", url: "https://instagram.com/_jaga_jith_23/" },
//   { name: "LeetCode", url: "https://leetcode.com/u/jagajith23/" },
// ];

// const NAV_LINKS = [
//   { name: "About", href: "#about" },
//   { name: "Career", href: "#career" },
//   { name: "Projects", href: "#projects" },
//   { name: "Skills", href: "#skills" },
// ];

// export default function Footer() {
//   const [time, setTime] = useState("");

//   useEffect(() => {
//     // Update time every second for Chennai (IST)
//     const updateTime = () => {
//       const now = new Date();
//       const options: Intl.DateTimeFormatOptions = {
//         timeZone: "Asia/Kolkata",
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       };
//       setTime(now.toLocaleTimeString("en-US", options));
//     };

//     updateTime();
//     const interval = setInterval(updateTime, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="relative bg-black w-full py-12 md:py-24 font-aoboshi overflow-hidden">
//       {/* Decorative Gradient Background */}
//       <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent" />

//       <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
//           {/* Left Side: Call to Action */}
//           <div className="flex flex-col gap-6 max-w-2xl">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8 }}
//             >
//               <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-2">
//                 Have an idea?
//               </h2>
//               <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-500 font-wind-song">
//                 Let's build it.
//               </h2>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: 0.1 }}
//               className="mt-4"
//             >
//               <CopyEmail email="your.email@example.com" />
//             </motion.div>
//           </div>

//           {/* Right Side: Back to Top Button */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <MagneticButton
//               title="Back to Top"
//               onClick={() => smoothScrollTo("body")}
//               arrowDirection="north-east"
//               arrowHoverDirection="north-east"
//             />
//           </motion.div>
//         </div>

//         {/* Divider */}
//         <div className="w-full h-px bg-zinc-900 mb-12" />

//         {/* Bottom Section: Links & Info */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-4 text-sm md:text-base">
//           {/* Column 1: Brand & Time */}
//           <div className="flex flex-col justify-between h-full gap-4">
//             <div>
//               <h3 className="text-white font-bold text-lg mb-1">Jagajith</h3>
//               <p className="text-zinc-500">Software Engineer</p>
//             </div>
//             <div className="flex items-center gap-2 text-zinc-400">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
//               </span>
//               <span>Chennai, India</span>
//               <span className="text-zinc-600">•</span>
//               <span className="font-mono text-zinc-300">{time}</span>
//             </div>
//           </div>

//           {/* Column 2: Navigation */}
//           <div className="flex flex-col gap-4">
//             <span className="text-zinc-600 text-xs uppercase tracking-wider font-semibold">
//               Sitemap
//             </span>
//             <ul className="flex flex-col gap-3">
//               {NAV_LINKS.map((link) => (
//                 <li key={link.name}>
//                   <a
//                     href={link.href}
//                     onClick={() => smoothScrollTo(link.href)}
//                     className="text-zinc-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group w-fit"
//                   >
//                     {link.name}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Column 3: Socials */}
//           <div className="flex flex-col gap-4">
//             <span className="text-zinc-600 text-xs uppercase tracking-wider font-semibold">
//               Socials
//             </span>
//             <ul className="flex flex-col gap-3">
//               {SOCIALS.map((link) => (
//                 <li key={link.name}>
//                   <a
//                     href={link.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-zinc-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group w-fit"
//                   >
//                     {link.name}
//                     <ArrowIcon />
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Column 4: Copyright */}
//           <div className="md:text-right flex flex-col justify-end">
//             <p className="text-zinc-600 text-sm">
//               © {currentYear} Jagajith.
//               <br />
//               All rights reserved.
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// // --- Sub Components ---

// function CopyEmail({ email }: { email: string }) {
//   const [copied, setCopied] = useState(false);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(email);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <button
//       onClick={handleCopy}
//       className="group relative flex items-center gap-3 text-lg md:text-2xl text-zinc-300 hover:text-white transition-colors duration-300"
//     >
//       <span className="border-b border-zinc-700 group-hover:border-white transition-colors pb-1">
//         {email}
//       </span>

//       <div className="relative">
//         <AnimatePresence mode="wait">
//           {copied ? (
//             <motion.span
//               key="copied"
//               initial={{ opacity: 0, scale: 0.5 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.5 }}
//               className="text-emerald-500 text-sm font-bold px-2 py-1 bg-emerald-500/10 rounded-full"
//             >
//               Copied!
//             </motion.span>
//           ) : (
//             <motion.svg
//               key="copy-icon"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               xmlns="http://www.w3.org/2000/svg"
//               width="20"
//               height="20"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-zinc-500 group-hover:text-white"
//             >
//               <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
//               <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
//             </motion.svg>
//           )}
//         </AnimatePresence>
//       </div>
//     </button>
//   );
// }

// function ArrowIcon() {
//   return (
//     <svg
//       width="12"
//       height="12"
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
//     >
//       <path
//         d="M7 17L17 7M17 7H7M17 7V17"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// }

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import MagneticButton from "./magnetic-button";
import { smoothScrollTo } from "./navigation/smooth-scroll";

const SOCIALS = [
  { name: "GitHub", url: "https://github.com/jagajith23/" },
  { name: "LinkedIn", url: "https://linkedin.com/in/jagajith23/" },
  { name: "Instagram", url: "https://instagram.com/_jaga_jith_23/" },
  { name: "LeetCode", url: "https://leetcode.com/u/jagajith23/" },
];

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Career", href: "#career" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
];

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      setTime(now.toLocaleTimeString("en-US", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black w-full pt-20 pb-10 font-aoboshi overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-zinc-800 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-between min-h-[600px]">
        {/* --- SECTION 1: THE HOOK (CTA & BUTTONS) --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
          <div className="flex flex-col gap-4 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
                Have an idea?
              </h2>
              <div className="flex items-center gap-3">
                <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-600 font-wind-song">
                  Let's build it.
                </h2>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-6"
            >
              <CopyEmail email="jagajith23.work@gmail.com" />
            </motion.div>
          </div>

          {/* Back to Top */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <MagneticButton
              title="Back to Top"
              onClick={() => smoothScrollTo("body")}
              arrowDirection="north"
              arrowHoverDirection="north"
            />
          </motion.div>
        </div>

        {/* --- SECTION 2: FUNCTIONAL GRID (LINKS & INFO) --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24">
          {/* Column 1: Time & Location */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-zinc-400 border border-zinc-800 rounded-full px-4 py-2 w-fit bg-zinc-900/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium">Chennai, India</span>
              <span className="text-zinc-600">•</span>
              <span className="text-xs text-zinc-300">{time}</span>
            </div>
          </div>

          {/* Column 2: Sitemap */}
          <div className="flex flex-col gap-4">
            <span className="text-zinc-600 text-xs uppercase tracking-wider font-semibold">
              Sitemap
            </span>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => smoothScrollTo(link.href)}
                    className="text-zinc-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Socials */}
          <div className="flex flex-col gap-4">
            <span className="text-zinc-600 text-xs uppercase tracking-wider font-semibold">
              Socials
            </span>
            <ul className="flex flex-col gap-2">
              {SOCIALS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group w-fit text-sm"
                  >
                    {link.name}
                    <ArrowIcon />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Info */}
          <div className="flex flex-col justify-start md:items-end">
            <h3 className="text-white font-bold text-lg">Jagajith</h3>
            <p className="text-zinc-500 text-sm">Software Engineer</p>
          </div>
        </div>

        {/* --- SECTION 3: MASSIVE BRANDING & COPYRIGHT --- */}
        <div className="relative mt-10">
          {/* The Huge Name - Visual Anchor */}
          <h1 className="-mb-20 text-[15vw] leading-[0.8] font-bold text-zinc-900 select-none text-center tracking-tighter mix-blend-difference pointer-events-none">
            JAGAJITH
          </h1>

          {/* Copyright Overlay */}
          <div className="absolute bottom-2 w-full flex justify-center md:justify-between items-end px-2">
            <p className="hidden md:block text-zinc-700 text-xs">
              Designed & Developed by Jagajith
            </p>
            <p className="text-zinc-600 text-sm text-center md:text-right">
              © {currentYear} Jagajith. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Sub Components ---

function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="group relative flex items-center gap-3 text-lg md:text-2xl text-zinc-300 hover:text-white transition-colors duration-300 font-light"
    >
      <span className="border-b border-zinc-700 group-hover:border-white transition-colors pb-1">
        {email}
      </span>

      <div className="relative">
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span
              key="copied"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-emerald-500 text-xs font-bold px-2 py-1 bg-emerald-500/10 rounded-full"
            >
              Copied!
            </motion.span>
          ) : (
            <motion.svg
              key="copy-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-zinc-500 group-hover:text-white"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </motion.svg>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-zinc-500 group-hover:text-white"
    >
      <path
        d="M7 17L17 7M17 7H7M17 7V17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// "use client";

// import { motion } from "framer-motion";
// import MagneticButton from "./magnetic-button";

// export default function FooterConversational() {
//   return (
//     <footer className="bg-black py-32 px-6 md:px-12 font-aoboshi relative overflow-hidden">
//       <div className="max-w-5xl mx-auto relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <h2 className="text-3xl md:text-5xl leading-snug text-zinc-400 font-light">
//             I'm currently looking to join a cross-functional team that values
//             improving people's lives through accessible design.
//             <br />
//             <br />
//             If you're interested in my work, feel free to{" "}
//             <a
//               href="mailto:your@email.com"
//               className="text-white underline decoration-zinc-700 underline-offset-4 hover:decoration-white transition-all cursor-pointer"
//             >
//               drop me a mail
//             </a>{" "}
//             or say hello on{" "}
//             <a
//               href="https://linkedin.com/in/jagajith23/"
//               target="_blank"
//               className="text-[#0A66C2] font-normal hover:opacity-80 transition-opacity"
//             >
//               LinkedIn
//             </a>
//             .
//           </h2>
//         </motion.div>

//         <div className="mt-24 pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-600">
//           <div className="flex gap-8">
//             <FooterLink href="#" label="Instagram" />
//             <FooterLink href="#" label="GitHub" />
//             <FooterLink href="#" label="Resume" />
//           </div>
//           <p>© {new Date().getFullYear()} Jagajith. Built with Next.js</p>
//         </div>
//       </div>

//       {/* Subtle Background Glow */}
//       <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-zinc-900/20 blur-[120px] rounded-full pointer-events-none" />
//     </footer>
//   );
// }

// const FooterLink = ({ href, label }: { href: string; label: string }) => (
//   <a
//     href={href}
//     className="hover:text-white transition-colors uppercase tracking-wider text-xs font-medium"
//   >
//     {label}
//   </a>
// );
