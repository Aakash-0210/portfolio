export interface DayActivity {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

// Generate realistic commit distribution for the past 52 weeks (364 days)
export function generateGitHubContributions(): DayActivity[][] {
  const weeks: DayActivity[][] = [];
  const today = new Date();
  
  // Seeded pseudo-random generator for consistent, realistic patterns
  let seed = 42;
  const pseudoRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const totalDays = 52 * 7;
  const daysList: DayActivity[] = [];

  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];

    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseProb = isWeekend ? 0.45 : 0.85;
    
    let count = 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;

    if (pseudoRandom() < baseProb) {
      const r = pseudoRandom();
      if (r < 0.3) {
        count = Math.floor(pseudoRandom() * 3) + 1;
        level = 1;
      } else if (r < 0.65) {
        count = Math.floor(pseudoRandom() * 4) + 4;
        level = 2;
      } else if (r < 0.9) {
        count = Math.floor(pseudoRandom() * 5) + 8;
        level = 3;
      } else {
        count = Math.floor(pseudoRandom() * 8) + 13;
        level = 4;
      }
    }

    daysList.push({
      date: dateStr,
      count,
      level
    });
  }

  // Group into 52 weeks of 7 days
  for (let w = 0; w < 52; w++) {
    weeks.push(daysList.slice(w * 7, (w + 1) * 7));
  }

  return weeks;
}

export const githubStats = {
  totalContributions: 1248,
  currentStreak: 84,
  longestStreak: 142,
  repositories: 42,
  starsEarned: 184,
  languages: [
    { name: 'JavaScript', percentage: 41, color: '#FBBF24' },
    { name: 'React / TSX', percentage: 29, color: '#38BDF8' },
    { name: 'Java', percentage: 18, color: '#EA580C' },
    { name: 'HTML & CSS', percentage: 12, color: '#A855F7' }
  ],
  recentActivity: [
    { repo: 'crypto-tracker', action: 'feat: add stale-while-revalidate caching with TanStack Query', time: '2 hours ago' },
    { repo: 'laundry-service-platform', action: 'refactor: enforce JDBC transactional boundaries & prepared statements', time: 'Yesterday' },
    { repo: 'task-management-system', action: 'perf: optimize MongoDB compound index for Kanban queries', time: '3 days ago' },
    { repo: 'portfolio-v2', action: 'style: glassmorphic design system and custom Web Audio synthesis', time: '5 days ago' }
  ]
};
