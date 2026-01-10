"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import MagneticButton from "./magnetic-button";
import { smoothScrollTo } from "./navigation/smooth-scroll";
import Image from "next/image";
import BadgeStack from "./leetcode-badge-stack";
import ClashRoyaleWidget from "./clash-royale-widget";

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

export type LeetCodeBadge = {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  hoverText: string;
  creationDate: number;
  category: string;
  medal: {
    slug: string;
    config: {
      iconGif: string;
    };
  };
};

export default function Footer() {
  const [time, setTime] = useState("");

  const [badges, setBadges] = useState<LeetCodeBadge[]>([]);

  useEffect(() => {
    fetch("/api/leetcode-badges?username=jagajith23")
      .then((res) => res.json())
      .then((data) => {
        setBadges(data.data.matchedUser?.badges ?? []);
      });
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
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

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-between min-h-150">
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
              //   title="Back to Top"
              onClick={() => smoothScrollTo("body")}
              arrowDirection="north"
              arrowHoverDirection="north"
            />
          </motion.div>
        </div>

        {/* --- SECTION 2: FUNCTIONAL GRID (LINKS & INFO) --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12 md:mb-24">
          {/* Column 1: Time & Location */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-zinc-400 border border-zinc-800 rounded-full px-4 py-2 w-fit bg-zinc-900/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium">Tamil Nadu, India</span>
              <span className="text-zinc-600">•</span>
              <span className="text-xs text-zinc-300">{time}</span>
            </div>

            <BadgeStack badges={badges} />

            {/* --- ADD THE WIDGET HERE --- */}
            <div className="mt-2">
              <ClashRoyaleWidget />
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
          <div className="flex flex-col justify-start md:items-end gap-3">
            {/* Image Container */}
            <div className="relative h-36 w-36 overflow-hidden rounded-lg border border-zinc-800 group-hover:border-zinc-600 transition-colors">
              <Image
                src="/me-cropped.jpg"
                alt="Jagajith"
                fill
                className="
                    object-cover
                    object-center
                    scale-105
                    hover:scale-115
                    transition-all
                    duration-500
                    ease-in-out
                "
              />
            </div>

            {/* Text */}
            <div className="flex flex-col md:items-end">
              <h3 className="text-white font-bold text-lg leading-tight">
                Jagajith
              </h3>
              <p className="text-zinc-500 text-sm">Software Engineer</p>
            </div>
          </div>
        </div>

        {/* --- SECTION 3: MASSIVE BRANDING & COPYRIGHT --- */}
        <div className="relative md:mt-10 h-[15vh]">
          {/* The Huge Name - Visual Anchor */}
          <h1
            className="
                absolute
                left-1/2
                -translate-x-1/2
                -bottom-1/3
                md:-bottom-6/10
                text-[15vw]
                leading-[0.8]
                font-bold
                text-zinc-900
                select-none
                text-center
                tracking-tighter
                mix-blend-difference
                pointer-events-none
            "
          >
            JAGAJITH
          </h1>

          {/* Copyright Overlay */}
          <div className="absolute bottom-1/2 md:bottom-2 w-full flex justify-center md:justify-between items-end px-2">
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
      className="cursor-pointer group relative flex items-center gap-3 text-lg md:text-2xl text-zinc-300 hover:text-white transition-colors duration-300 font-light"
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
// import { useEffect, useState } from "react";
// import MagneticButton from "./magnetic-button";
// import { smoothScrollTo } from "./navigation/smooth-scroll";
// import Image from "next/image";

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
//     <footer className="relative bg-black w-full pt-20 pb-10 font-aoboshi overflow-hidden">
//       <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-zinc-800 to-transparent" />

//       <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-between min-h-150">
//         {/* --- SECTION 1: THE HOOK & FORM --- */}
//         <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-24">
//           <div className="flex flex-col gap-8 max-w-2xl w-full">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8 }}
//             >
//               <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-2">
//                 Have an idea?
//               </h2>
//               <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-600 font-wind-song">
//                 Let's build it.
//               </h2>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: 0.1 }}
//               className="w-full"
//             >
//               {/* Mailto Form */}
//               <ContactForm />
//             </motion.div>
//           </div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="self-start lg:self-end"
//           >
//             <MagneticButton
//               title="Back to Top"
//               onClick={() => smoothScrollTo("body")}
//               arrowDirection="north"
//               arrowHoverDirection="north"
//             />
//           </motion.div>
//         </div>

//         {/* --- SECTION 2: FUNCTIONAL GRID --- */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24 border-t border-zinc-900 pt-16">
//           <div className="flex flex-col gap-4">
//             <div className="flex items-center gap-3 text-zinc-400 border border-zinc-800 rounded-full px-4 py-2 w-fit bg-zinc-900/50">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
//               </span>
//               <span className="text-xs font-medium">Tamil Nadu, India</span>
//               <span className="text-zinc-600">•</span>
//               <span className="text-xs text-zinc-300">{time}</span>
//             </div>
//           </div>

//           <div className="flex flex-col gap-4">
//             <span className="text-zinc-600 text-xs uppercase tracking-wider font-semibold">
//               Sitemap
//             </span>
//             <ul className="flex flex-col gap-2">
//               {NAV_LINKS.map((link) => (
//                 <li key={link.name}>
//                   <a
//                     href={link.href}
//                     onClick={() => smoothScrollTo(link.href)}
//                     className="text-zinc-400 hover:text-white transition-colors duration-300 text-sm"
//                   >
//                     {link.name}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="flex flex-col gap-4">
//             <span className="text-zinc-600 text-xs uppercase tracking-wider font-semibold">
//               Socials
//             </span>
//             <ul className="flex flex-col gap-2">
//               {SOCIALS.map((link) => (
//                 <li key={link.name}>
//                   <a
//                     href={link.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-zinc-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group w-fit text-sm"
//                   >
//                     {link.name}
//                     <ArrowIcon />
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="flex flex-col justify-start md:items-end gap-3">
//             <div className="relative h-36 w-36 overflow-hidden rounded-lg border border-zinc-800 group-hover:border-zinc-600 transition-colors">
//               <Image
//                 src="/me-cropped.jpg"
//                 alt="Jagajith"
//                 fill
//                 className="object-cover object-center scale-105 hover:scale-115 transition-all duration-500 ease-in-out"
//               />
//             </div>
//             <div className="flex flex-col md:items-end">
//               <h3 className="text-white font-bold text-lg leading-tight">
//                 Jagajith
//               </h3>
//               <p className="text-zinc-500 text-sm">Software Engineer</p>
//             </div>
//           </div>
//         </div>

//         {/* --- SECTION 3: MASSIVE BRANDING --- */}
//         <div className="relative mt-10 h-[15vh]">
//           <h1 className="absolute left-1/2 -translate-x-1/2 -bottom-3/4 text-[15vw] leading-[0.8] font-bold text-zinc-900 select-none text-center tracking-tighter mix-blend-difference pointer-events-none">
//             JAGAJITH
//           </h1>
//           <div className="absolute bottom-2 w-full flex justify-center md:justify-between items-end px-2">
//             <p className="hidden md:block text-zinc-700 text-xs">
//               Designed & Developed by Jagajith
//             </p>
//             <p className="text-zinc-600 text-sm text-center md:text-right">
//               © {currentYear} Jagajith. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// // --- Sub Components ---

// function ContactForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     subject: "",
//     message: "",
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // 1. Destructure data
//     const { name, subject, message } = formData;

//     // 2. Define the recipient
//     const mailTo = "jagajith23.work@gmail.com";

//     // 3. Construct the Body with proper encoding for line breaks
//     // %0D%0A adds a line break in mailto links
//     const emailBody = `Hi Jagajith,%0D%0A%0D%0A${encodeURIComponent(
//       message
//     )}%0D%0A%0D%0ABest,%0D%0A${encodeURIComponent(name)}`;

//     // 4. Construct the Subject
//     const emailSubject = encodeURIComponent(
//       subject || `Project Inquiry from ${name}`
//     );

//     // 5. Trigger the Mail Client
//     window.location.href = `mailto:${mailTo}?subject=${emailSubject}&body=${emailBody}`;
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <input
//             type="text"
//             placeholder="Your Name"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             className="w-full bg-zinc-900/30 border border-zinc-800 focus:border-zinc-500 text-white rounded-xl px-4 py-3 outline-none transition-all placeholder:text-zinc-600"
//             required
//           />
//         </div>
//         <div className="space-y-2">
//           {/* Changed from Email to Subject */}
//           <input
//             type="text"
//             placeholder="Subject (Optional)"
//             value={formData.subject}
//             onChange={(e) =>
//               setFormData({ ...formData, subject: e.target.value })
//             }
//             className="w-full bg-zinc-900/30 border border-zinc-800 focus:border-zinc-500 text-white rounded-xl px-4 py-3 outline-none transition-all placeholder:text-zinc-600"
//           />
//         </div>
//       </div>

//       <div className="space-y-2">
//         <textarea
//           placeholder="How can I help you?"
//           rows={4}
//           value={formData.message}
//           onChange={(e) =>
//             setFormData({ ...formData, message: e.target.value })
//           }
//           className="w-full bg-zinc-900/30 border border-zinc-800 focus:border-zinc-500 text-white rounded-xl px-4 py-3 outline-none transition-all placeholder:text-zinc-600 resize-none"
//           required
//         />
//       </div>

//       <div className="flex justify-end">
//         <button
//           type="submit"
//           className="
//                 group relative px-6 py-3 rounded-xl bg-white text-black font-semibold
//                 hover:bg-zinc-200 transition-all
//                 flex items-center gap-2 overflow-hidden
//             "
//         >
//           <span className="relative z-10">Start Email</span>
//           <svg
//             width="16"
//             height="16"
//             viewBox="0 0 24 24"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//             className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
//           >
//             <path
//               d="M7 17L17 7M17 7H7M17 7V17"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </button>
//       </div>
//     </form>
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
//       className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-zinc-500 group-hover:text-white"
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
