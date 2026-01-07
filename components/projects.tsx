import { motion } from "framer-motion";

const ProjectSection = () => {
  return (
    <section
      className="min-h-screen bg-black mx-auto w-full font-aoboshi max-w-7xl px-6 md:px-12 py-32 flex flex-col justify-between h-full"
      id="projects"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12 space-y-4"
      >
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-b from-zinc-100 via-zinc-300 to-zinc-600 font-wind-song">
          Selected Projects
        </h2>
      </motion.div>
    </section>
  );
};

export default ProjectSection;
