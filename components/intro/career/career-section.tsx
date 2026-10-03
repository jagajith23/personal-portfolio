"use client";

import { motion, Variants } from "framer-motion";
import CompanyMark, { XOME } from "@/components/company-mark";
import SectionHeading from "@/components/section-heading";

// One short summary per role, drawn from the resume (Sep 2026).
export const CAREER = [
  {
    id: "xome-sde",
    period: "2024 - Now",
    role: "Software Development Engineer I",
    summary:
      "Modernizing Xome's offer and auction platform. I build .NET microservices that serve 2M+ requests a day, turned a 5-minute polling job into event-driven processing that finishes in under a second, and ship real-time React dashboards for 16K daily users.",
  },
  {
    id: "xome-intern",
    period: "Jan - Jun 2024",
    role: "Software Engineer Intern",
    summary:
      "Built responsive React interfaces and optimized MongoDB schemas and CRUD features for faster queries.",
  },
];

const EASE = [0.23, 1, 0.32, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 12 },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const Career = () => (
  <section
    id="career"
    className="relative w-full overflow-hidden bg-black font-aoboshi"
  >
    <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
      {/* Heading on the left (only as wide as it needs), roles on the right.
          1fr:2fr keeps the summaries near a 70ch measure with no dead gutter. */}
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
        <SectionHeading
          title="Career"
          subtitle="The places I've worked and the problems I've helped solve."
          className="mb-0 self-start lg:sticky lg:top-32"
        />

        <motion.dl
          className="flex flex-col gap-12 lg:pt-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {CAREER.map((entry) => (
            <motion.div
              key={entry.id}
              variants={reveal}
              className="grid gap-x-8 gap-y-2 sm:grid-cols-[8rem_1fr]"
            >
              <dt className="career-date text-sm tabular-nums text-zinc-500 sm:pt-2">
                {entry.period}
              </dt>
              <dd className="flex flex-col gap-3">
                <h3 className="career-role text-xl tracking-tight text-zinc-100 md:text-2xl">
                  {entry.role}{" "}
                  <span className="whitespace-nowrap">
                    at <CompanyMark {...XOME} />
                  </span>
                </h3>
                <p className="career-summary max-w-[62ch] text-pretty text-base leading-relaxed text-zinc-400 md:text-[17px]">
                  {entry.summary}
                </p>
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </div>
  </section>
);

export default Career;
