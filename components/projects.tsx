import { AnimatePresence, motion, useInView, Variants } from "framer-motion";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import MagneticButton from "./magnetic-button";
import { PROJECTS } from "@/app/constants";
import { useRouter } from "next/navigation";

const INITIAL_COUNT = 3;

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),

  exit: {
    opacity: 0,
    y: 40,
  },
};

const ProjectSection = () => {
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [collapsedHeight, setCollapsedHeight] = useState<number | null>(null);
  const [expandedHeight, setExpandedHeight] = useState<number | null>(null);
  const [isExpandedReady, setIsExpandedReady] = useState(false);

  const getColumnCount = () => {
    if (window.innerWidth >= 768) return 3;
    return 1;
  };

  useLayoutEffect(() => {
    if (!gridRef.current) return;

    const cards = Array.from(gridRef.current.children) as HTMLElement[];
    if (!cards.length) return;

    const columns = getColumnCount();
    const rowsToShow = Math.ceil(INITIAL_COUNT / columns);

    let height = 0;

    for (let row = 0; row < rowsToShow; row++) {
      const firstCardInRow = cards[row * columns];
      if (firstCardInRow) {
        height += firstCardInRow.offsetHeight;
        if (rowsToShow === 3) height += 32;
      }
    }

    setCollapsedHeight(height);
    setExpandedHeight(gridRef.current.scrollHeight);
  }, []);

  const hasMore = PROJECTS.length > INITIAL_COUNT;

  return (
    <section
      className="bg-black mx-auto w-full font-aoboshi max-w-7xl px-6 md:px-12 py-32"
      id="projects"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold bg-clip-text h-10 text-transparent bg-linear-to-b from-zinc-100 via-zinc-300 to-zinc-600 font-wind-song">
          Projects
        </h2>
      </motion.div>

      <motion.div
        ref={containerRef}
        initial={false}
        animate={{
          maxHeight: showAll
            ? expandedHeight ?? "none"
            : collapsedHeight ?? "none",
        }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        onAnimationComplete={() => {
          if (showAll) {
            setIsExpandedReady(true);
          }
        }}
        className="overflow-hidden"
      >
        <motion.div
          ref={gridRef}
          layout
          transition={{ layout: { duration: 0.6, ease: "easeInOut" } }}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}
        >
          {PROJECTS.map((item, index) => (
            <motion.div
              key={item.id}
              layout="position"
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <ProjectCard
                {...item}
                index={index}
                isExpandedReady={isExpandedReady}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {hasMore && !showAll && (
          <motion.button
            key="see-more"
            onClick={() => {
              setIsExpandedReady(false);
              setShowAll(true);
            }}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: 6 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer group mx-auto mt-20 flex flex-col items-center gap-2 text-zinc-300 hover:text-white"
          >
            <span className="text-sm tracking-tight">See more</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="stroke-current transition-transform duration-300 group-hover:translate-y-1"
            >
              <path
                d="M6 9L12 15L18 9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
};

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  projectUrl?: string;
  id: number;
  index?: number;
  isExpandedReady: boolean;
  tag: "Freelance" | "Side Project" | "Internal";
}

const ProjectCard = ({
  title,
  description,
  imageUrl,
  projectUrl,
  id,
  index,
  isExpandedReady,
  tag,
}: ProjectCardProps) => {
  const router = useRouter();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleClick = () => {
    if (!projectUrl) return;
    window.open(projectUrl, "_blank");
  };

  return (
    <div>
      <div ref={ref}>
        <div className="flex flex-col gap-2 overflow-hidden duration-300 text-white w-full h-full rounded-t-xl">
          <div className="relative w-full h-56 overflow-hidden rounded-xl transition-colors duration-300 items-start md:items-center justify-center flex group">
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{
                y: isInView ? "0%" : "100%",
                opacity: isInView ? 1 : 0,
                transition: {
                  duration: 0.75,
                  ease: [0.33, 1, 0.68, 1],
                  delay: 0.2 * (((index ?? 0) + 1) % 3),
                },
              }}
              className="w-full h-full overflow-hidden rounded-xl bg-zinc-800 group-hover:bg-zinc-700 transition-colors duration-300 items-center justify-center flex"
            >
              <Image
                src={imageUrl}
                alt={`${title} preview`}
                width={500}
                height={400}
                className="rounded-xl transition-transform duration-300 group-hover:scale-105"
              />
            </motion.div>
            <div
              className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 ${
                projectUrl && (isInView || isExpandedReady)
                  ? "opacity-0 group-hover:opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <MagneticButton
                onClick={handleClick}
                arrowHoverDirection="north-east"
              />
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <h3 className="text-lg font-semibold">{title}</h3>
            <span
              className={`
                w-fit rounded-full py-0.5 px-3 text-xs font-medium tracking-wide
                ${
                  tag === "Freelance"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : tag === "Internal"
                    ? "bg-purple-500/10 text-purple-400"
                    : "bg-blue-500/10 text-blue-400"
                }
            `}
            >
              {tag}
            </span>
          </div>

          <p className="text-sm text-zinc-400">{description}</p>

          <div className="mt-2">
            <p
              onClick={(e) => {
                router.push(`/project/${id}`);
                e.stopPropagation();
              }}
              className="cursor-pointer inline-block text-sm text-zinc-300 hover:text-white transition-colors underline underline-offset-4 group"
            >
              <span className="flex items-center gap-1 underline underline-offset-4">
                Read more
                <svg
                  width="16px"
                  height="16px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#ffffff"
                  className="mt-1 group-hover:translate-x-1 transition duration-200"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <title></title>
                    <g id="Complete">
                      <g id="arrow-right">
                        <g>
                          <polyline
                            data-name="Right"
                            fill="none"
                            id="Right-2"
                            points="16.4 7 21.5 12 16.4 17"
                            stroke="#ffffff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          ></polyline>
                          <line
                            fill="none"
                            stroke="#ffffff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            x1="2.5"
                            x2="19.2"
                            y1="12"
                            y2="12"
                          ></line>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
