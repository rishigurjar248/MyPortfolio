import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Star } from "lucide-react";
import { projects, projectFilters } from "../data/portfolio";
import { useInView } from "../hooks/useInView";

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView(0.1);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={`project-card glass rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 group`}
    >
      <div className={`h-40 bg-gradient-to-br ${project.color} relative overflow-hidden flex items-center justify-center`}>
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="text-center z-10">
          <div className="text-5xl mb-2 float-animation">{project.featured ? "⭐" : "🚀"}</div>
          {project.featured && (
            <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-mono">
              Featured
            </span>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md text-xs font-mono bg-primary/10 text-primary border border-primary/20"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <motion.a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border border-border/50 text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-3.5 h-3.5" />
            Code
          </motion.a>
          <motion.a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-sm text-primary hover:bg-primary/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Live Demo
          </motion.a>
          {project.featured && (
            <div className="ml-auto flex items-center gap-1 text-yellow-400 text-xs">
              <Star className="w-3 h-3 fill-current" />
              <span>Featured</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [ref, inView] = useInView(0.1);

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category.includes(activeFilter));

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/30 text-sm text-primary font-mono mb-4">
            <span className="text-accent">$</span> git log --projects
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-world applications I&apos;ve built with modern tech stacks. Each project solves a genuine problem.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {projectFilters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all ${
                activeFilter === filter
                  ? "bg-primary text-primary-foreground"
                  : "glass border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-muted-foreground"
          >
            <div className="text-4xl mb-4">🔍</div>
            <p>No projects found for this filter. Try another one!</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/rishigurjar248"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-border/50 text-sm font-medium hover:border-primary/50 hover:text-primary transition-all"
          >
            <Github className="w-4 h-4" />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
