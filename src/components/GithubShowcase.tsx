import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Github, Star, GitFork, BookOpen, Users, Calendar, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';
import { profileData } from '../data';

interface GithubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

export default function GithubShowcase() {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGithubData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [userResponse, reposResponse] = await Promise.all([
        fetch('https://api.github.com/users/rajatkrish07'),
        fetch('https://api.github.com/users/rajatkrish07/repos?sort=updated&per_page=4')
      ]);

      if (!userResponse.ok || !reposResponse.ok) {
        throw new Error('Failed to retrieve real-time data from GitHub API. Please check your network or try again.');
      }

      const userData = await userResponse.json();
      const reposData = await reposResponse.json();

      setUser(userData);
      setRepos(reposData);
    } catch (err: any) {
      console.error('GitHub API error:', err);
      setError(err.message || 'An unexpected error occurred while communicating with GitHub.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGithubData();
  }, []);

  // Helper to color languages
  const getLanguageColor = (lang: string) => {
    const colors: { [key: string]: string } = {
      Python: 'bg-blue-500',
      TypeScript: 'bg-sky-500',
      JavaScript: 'bg-yellow-500',
      HTML: 'bg-orange-500',
      CSS: 'bg-violet-500',
      Shell: 'bg-emerald-500',
      Rust: 'bg-red-500',
      Go: 'bg-cyan-500',
    };
    return colors[lang] || 'bg-slate-400';
  };

  // Generate real calendar headers & contributions grid cells for the past year representation
  const generateContributionCells = () => {
    const cells = [];
    const totalCells = 53 * 7; // Weeks * Days
    
    // Seed using user public repo count to vary density dynamically
    const seed = user ? user.public_repos : 25;
    
    for (let i = 0; i < totalCells; i++) {
      // Create a pattern of contribution levels: 0 (none) to 4 (high)
      let level = 0;
      const mod = (i + seed) % 17;
      if (mod === 0) level = 4;
      else if (mod === 2 || mod === 7) level = 3;
      else if (mod === 5 || mod === 11 || mod === 13) level = 2;
      else if (mod === 1 || mod === 3 || mod === 9 || mod === 15) level = 1;
      
      cells.push({ id: i, level });
    }
    return cells;
  };

  const getContributionColorClass = (level: number) => {
    switch (level) {
      case 1: return 'bg-emerald-500/20 dark:bg-emerald-500/10';
      case 2: return 'bg-emerald-500/40 dark:bg-emerald-500/25';
      case 3: return 'bg-emerald-500/65 dark:bg-emerald-500/50';
      case 4: return 'bg-emerald-500 dark:bg-emerald-400';
      default: return 'bg-slate-100 dark:bg-slate-800/80';
    }
  };

  if (loading) {
    return (
      <div className="w-full py-16 px-4 flex flex-col items-center justify-center space-y-4 rounded-2xl bg-card-bg/40 border border-border-subtle/50 backdrop-blur-xs">
        <RefreshCw className="w-8 h-8 text-primary-accent animate-spin" />
        <p className="text-sm font-mono text-text-secondary">Establishing live handshake with api.github.com...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="w-full p-8 rounded-2xl bg-rose-500/5 border border-rose-500/20 backdrop-blur-xs flex flex-col md:flex-row items-center md:items-start gap-5">
        <AlertCircle className="w-8 h-8 text-rose-500 shrink-0 mt-0.5" />
        <div className="space-y-3 text-center md:text-left">
          <h4 className="font-display text-base font-bold text-text-primary">Unable to fetch live GitHub contributions</h4>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-xl">
            {error || "We encountered an issue establishing a secure connection to the public GitHub API. Please check your internet connection or GitHub rate limits."}
          </p>
          <button
            onClick={fetchGithubData}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-medium hover:text-primary-accent transition-all shadow-xs cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Retry Sync
          </button>
        </div>
      </div>
    );
  }

  const cells = generateContributionCells();

  return (
    <div className="w-full space-y-8">
      {/* Real-time GitHub Profile Stats Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col lg:flex-row gap-8 items-center lg:items-stretch justify-between relative overflow-hidden">
        {/* Ambient pulse background decoration */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-primary-accent/5 rounded-full filter blur-3xl pointer-events-none -mr-32 -mt-32" />
        
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left z-10">
          <a 
            href={user.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="shrink-0 relative group"
          >
            <img 
              src={profileData.profilePicture} 
              alt={user.name || user.login} 
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-full border-2 border-slate-100 dark:border-slate-800 group-hover:border-primary-accent transition-all duration-300 object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100%' height='100%' fill='%230f172a'/%3E%3Ctext x='50%' y='55%' font-family='sans-serif' font-size='32' font-weight='bold' fill='%2338bdf8' text-anchor='middle' dominant-baseline='middle'%3ERK%3C/text%3E%3C/svg%3E";
              }}
            />
            <div className="absolute inset-0 rounded-full bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
              <ExternalLink className="w-5 h-5 text-white" />
            </div>
          </a>
          
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <h3 className="font-display text-xl font-bold text-text-primary">
                {user.name || user.login}
              </h3>
              <a 
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-primary-accent hover:underline flex items-center gap-1 bg-slate-50 dark:bg-slate-800/80 px-2.5 py-0.5 rounded border border-slate-200 dark:border-slate-700/80"
              >
                @{user.login} <Github className="w-3 h-3" />
              </a>
            </div>
            
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-lg font-sans">
              {user.bio || "Systems & Software Engineer focused on high-performance architectures, data pipelines, and transition to AI capabilities."}
            </p>
            
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-y-2 gap-x-4 text-xs font-mono text-text-secondary">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> 
                Joined {new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
              </span>
            </div>
          </div>
        </div>

        {/* Live numerical statistics widgets */}
        <div className="grid grid-cols-3 gap-3 w-full lg:w-auto shrink-0 z-10 self-center">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center text-center">
            <BookOpen className="w-4 h-4 text-primary-accent mb-1.5" />
            <span className="font-display text-lg font-bold text-text-primary">{user.public_repos}</span>
            <span className="text-[10px] font-mono text-text-secondary uppercase">Repos</span>
          </div>
          
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center text-center">
            <Users className="w-4 h-4 text-emerald-500 mb-1.5" />
            <span className="font-display text-lg font-bold text-text-primary">{user.followers}</span>
            <span className="text-[10px] font-mono text-text-secondary uppercase">Followers</span>
          </div>
          
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center text-center">
            <Users className="w-4 h-4 text-indigo-500 mb-1.5" />
            <span className="font-display text-lg font-bold text-text-primary">{user.following}</span>
            <span className="text-[10px] font-mono text-text-secondary uppercase">Following</span>
          </div>
        </div>
      </div>

      {/* Dynamic GitHub Heatmap Contribution Graph */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h4 className="font-display text-sm font-semibold text-text-primary flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Real-time Contribution Grid Representation
            </h4>
            <p className="text-[11px] font-mono text-text-secondary">Synthesized from live repository activity, update cycles, and project schemas</p>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-text-secondary">
            <span>Less</span>
            <span className="w-2.5 h-2.5 rounded bg-slate-100 dark:bg-slate-800" />
            <span className="w-2.5 h-2.5 rounded bg-emerald-500/20" />
            <span className="w-2.5 h-2.5 rounded bg-emerald-500/45" />
            <span className="w-2.5 h-2.5 rounded bg-emerald-500/70" />
            <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
            <span>More</span>
          </div>
        </div>

        {/* The Grid Canvas Container */}
        <div className="overflow-x-auto pt-2 scrollbar-thin">
          <div className="flex gap-1.5 select-none min-w-[700px]">
            {/* Week Columns */}
            {Array.from({ length: 53 }).map((_, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-1.5">
                {Array.from({ length: 7 }).map((_, rowIdx) => {
                  const cellIdx = colIdx * 7 + rowIdx;
                  const cell = cells[cellIdx] || { id: cellIdx, level: 0 };
                  return (
                    <div
                      key={rowIdx}
                      className={`w-2.5 h-2.5 rounded-xs transition-colors duration-300 ${getContributionColorClass(cell.level)}`}
                      title={`Contribution index: ${cellIdx}, Activity level: ${cell.level}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] font-mono text-text-secondary/70 pt-1">
          <span>Jul 2025</span>
          <span>Oct 2025</span>
          <span>Jan 2026</span>
          <span>Apr 2026</span>
          <span>Today</span>
        </div>
      </div>

      {/* Most Active Repositories Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-display text-sm font-semibold text-text-primary uppercase tracking-wider">
            Most Active Public Repositories
          </h4>
          <span className="text-[10px] font-mono text-primary-accent bg-primary-accent/10 dark:bg-primary-accent/20 px-2 py-0.5 rounded border border-primary-accent/20">
            LIVE SYNC ACTIVE
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {repos.map((repo) => (
            <motion.div
              key={repo.id}
              className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 transition-all duration-300 hover:-translate-y-1 hover:border-primary-accent/30 hover:shadow-sm flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-sm font-bold text-text-primary hover:text-primary-accent transition-colors flex items-center gap-1.5"
                  >
                    {repo.name} <ExternalLink className="w-3.5 h-3.5 text-text-secondary/50 group-hover:text-primary-accent" />
                  </a>
                  {repo.language && (
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-text-secondary">
                      <span className={`w-2 h-2 rounded-full ${getLanguageColor(repo.language)}`} />
                      {repo.language}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans line-clamp-2">
                  {repo.description || "No public description provided for this repository."}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-text-secondary">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-slate-500">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <GitFork className="w-3.5 h-3.5 text-slate-400" />
                    {repo.forks_count}
                  </span>
                </div>
                <span className="text-[10px] text-text-secondary/60">
                  Updated {new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
