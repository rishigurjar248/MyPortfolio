import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "../data/portfolio";
import { useInView } from "../hooks/useInView";
import { Cpu, Server, Database, Wrench, BrainCircuit } from "lucide-react";

const categories = [
  { key: "frontend", label: "Frontend", icon: Cpu, color: "text-blue-400" },
  { key: "backend", label: "Backend", icon: Server, color: "text-green-400" },
  { key: "databases", label: "Databases", icon: Database, color: "text-yellow-400" },
  { key: "tools", label: "Tools", icon: Wrench, color: "text-purple-400" },
  { key: "dsa", label: "DSA", icon: BrainCircuit, color: "text-red-400" },
]


function SkillCard({ name, level, icon, index }) {
  const [ref, inView] = useInView(0.1);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="glass rounded-xl p-4 hover:border-primary/30 transition-all group"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span className="font-medium text-sm">{name}</span>
        </div>
        <span className="text-xs font-mono text-primary font-bold">{level}%</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: 0.2 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  );
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState("frontend");
  const [ref, inView] = useInView(0.1);

  const currentSkills = skills[activeCategory];

  return (
    <section id="skills" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/30 text-sm text-primary font-mono mb-4">
            <span className="text-accent">$</span> skills --list-all
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise across different domains.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat.key
                  ? "bg-primary text-primary-foreground glow-primary"
                  : "glass border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <cat.icon className={`w-4 h-4 ${activeCategory === cat.key ? "" : cat.color}`} />
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {currentSkills.map((skill, i) => (
              <SkillCard key={skill.name} {...skill} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { label: "Languages Known", value: "6+", desc: "JS, TS, Python, Java, C++, SQL" },
            { label: "Frameworks Used", value: "10+", desc: "React, Next, Node, Express, etc." },
            { label: "DSA Problems", value: "500+", desc: "Across LeetCode, CF, CodeChef" },
            { label: "Projects Built", value: "10+", desc: "Full-stack and web applications" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="glass rounded-2xl p-5 text-center"
            >
              <div className="text-3xl font-bold gradient-text font-mono mb-1">{item.value}</div>
              <div className="text-sm font-semibold mb-1">{item.label}</div>
              <div className="text-xs text-muted-foreground">{item.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
