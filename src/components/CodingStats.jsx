import { motion } from "framer-motion";
import { Code, Flame, Github, Target, Trophy, Zap } from "lucide-react";
import { codingStats } from "../data/portfolio";
import { useInView } from "../hooks/useInView";

const LEETCODE_COLORS = {
  easy: "#22c55e",
  medium: "#eab308",
  hard: "#ef4444",
};

function CircularProgress({ value, max, color, label, size = 80 }) {
  const [ref, inView] = useInView();
  const circumference = 2 * Math.PI * 32;
  const progress = (value / max) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 80 80"
          className="-rotate-90"
        >
          <circle
            cx="40"
            cy="40"
            r="32"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="6"
          />
          <motion.circle
            cx="40"
            cy="40"
            r="32"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={
              inView ? { strokeDashoffset: circumference - progress } : {}
            }
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold font-mono">{value}</span>
        </div>
      </div>
      <span className="text-xs text-muted-foreground capitalize">{label}</span>
    </div>
  );
}

function StatCard({ icon: Icon, value, label, color, delay }) {
  const [ref, inView] = useInView();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className="glass rounded-xl p-4 text-center"
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 ${color}`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-2xl font-bold font-mono mb-1 gradient-text">
        {value}
      </div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </motion.div>
  );
}

export function CodingStats() {
  const [ref, inView] = useInView(0.1);
  const { leetcode, github, codeforces } = codingStats;

  const githubContribs = Array.from({ length: 52 }, (_, week) =>
    Array.from({ length: 7 }, (_, day) => ({
      count: Math.floor(Math.pow(Math.random(), 2.5) * 12),
      week,
      day,
    })),
  );

  const getContribColor = (count) => {
    if (count === 0) return "hsl(var(--muted))";
    if (count < 3) return "hsl(var(--primary) / 0.3)";
    if (count < 6) return "hsl(var(--primary) / 0.55)";
    if (count < 9) return "hsl(var(--primary) / 0.75)";
    return "hsl(var(--primary))";
  };

  return (
    <section id="stats" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/30 text-sm text-primary font-mono mb-4">
            <span className="text-accent">$</span> curl api.github.com/stats
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Coding <span className="gradient-text">Stats</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My competitive programming and open source activity at a glance.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                <Code className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="font-bold">LeetCode</h3>
                <p className="text-xs text-muted-foreground">@rishigurjar</p>
              </div>
              <div className="ml-auto text-right">
                <div className="text-xl font-bold gradient-text font-mono">
                  {leetcode.rating}
                </div>
                <div className="text-xs text-muted-foreground">Rating</div>
              </div>
            </div>

            <div className="flex justify-around mb-4">
              <CircularProgress
                value={leetcode.easy}
                max={200}
                color={LEETCODE_COLORS.easy}
                label="Easy"
              />
              <CircularProgress
                value={leetcode.medium}
                max={300}
                color={LEETCODE_COLORS.medium}
                label="Medium"
              />
              <CircularProgress
                value={leetcode.hard}
                max={100}
                color={LEETCODE_COLORS.hard}
                label="Hard"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="text-center">
                <div className="text-xl font-bold font-mono text-primary">
                  {leetcode.totalSolved}
                </div>
                <div className="text-xs text-muted-foreground">
                  Total Solved
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-orange-400 font-bold text-xl font-mono justify-center">
                  <Flame className="w-4 h-4" />
                  {leetcode.streak}
                </div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold font-mono text-accent">
                  {leetcode.rank}
                </div>
                <div className="text-xs text-muted-foreground">Global Rank</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Github className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold">GitHub</h3>
                <p className="text-xs text-muted-foreground">@rishigurjar</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {[
                {
                  label: "Repositories",
                  value: github.repositories,
                  icon: "📦",
                },
                { label: "Stars Earned", value: github.stars, icon: "⭐" },
                { label: "Followers", value: github.followers, icon: "👥" },
                {
                  label: "Contributions",
                  value: `${github.contributions}+`,
                  icon: "🔀",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-muted/30 rounded-xl p-3 text-center"
                >
                  <div className="text-lg mb-0.5">{item.icon}</div>
                  <div className="text-xl font-bold font-mono gradient-text">
                    {item.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border/50">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>Contribution Activity</span>
                <span className="text-green-400">Active</span>
              </div>
              <div className="flex gap-0.5 overflow-x-auto pb-1">
                {githubContribs.slice(0, 26).map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-0.5">
                    {week.map((day, di) => (
                      <motion.div
                        key={di}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.5 + (wi * 7 + di) * 0.003 }}
                        style={{ backgroundColor: getContribColor(day.count) }}
                        className="w-2.5 h-2.5 rounded-sm"
                        title={`${day.count} contributions`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold">Competitive Programming</h3>
                <p className="text-xs text-muted-foreground">
                  Multi-platform stats
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  platform: "Codeforces",
                  rating: codeforces.rating,
                  rank: codeforces.rank,
                  solved: codeforces.solved,
                  color: "text-blue-400",
                  bg: "bg-blue-500/10",
                },
                {
                  platform: "CodeChef",
                  rating: 1823,
                  rank: "4-Star",
                  solved: 250,
                  color: "text-amber-400",
                  bg: "bg-amber-500/10",
                },
                {
                  platform: "HackerRank",
                  rating: null,
                  rank: "5 Star",
                  solved: 120,
                  color: "text-green-400",
                  bg: "bg-green-500/10",
                },
              ].map((platform) => (
                <div
                  key={platform.platform}
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/20"
                >
                  <div
                    className={`w-8 h-8 rounded-lg ${platform.bg} flex items-center justify-center`}
                  >
                    <span
                      className={`text-xs font-bold font-mono ${platform.color}`}
                    >
                      {platform.platform.slice(0, 2)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">
                        {platform.platform}
                      </span>
                      <span
                        className={`text-sm font-bold font-mono ${platform.color}`}
                      >
                        {platform.rank}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {platform.rating ? `Rating: ${platform.rating} • ` : ""}
                      {platform.solved} solved
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Target className="w-4 h-4" />
                Total Problems Solved
              </div>
              <span className="font-bold font-mono gradient-text text-lg">
                800+
              </span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard
            icon={Zap}
            value="1847"
            label="Best LeetCode Rating"
            color="bg-yellow-500/20 text-yellow-400"
            delay={0.5}
          />
          <StatCard
            icon={Trophy}
            value="2 Wins"
            label="Hackathon Victories"
            color="bg-orange-500/20 text-orange-400"
            delay={0.6}
          />
          <StatCard
            icon={Github}
            value={`${github.contributions}+`}
            label="GitHub Contributions"
            color="bg-primary/20 text-primary"
            delay={0.7}
          />
          <StatCard
            icon={Flame}
            value={`${leetcode.streak} days`}
            label="Current Streak"
            color="bg-red-500/20 text-red-400"
            delay={0.8}
          />
        </div>
      </div>
    </section>
  );
}
