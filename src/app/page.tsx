'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { SOURCES, UPCOMING, STATUS_MAP, PLATFORM_ICON, LAST_UPDATED, type Source } from '@/data/stack';

const MindMap = dynamic(() => import('@/components/MindMap'), { ssr: false });

const NAV = [
  { key: 'stack', label: '工具实况' },
  { key: 'sources', label: '关注源' },
  { key: 'upcoming', label: '选题预告' },
] as const;

const TITLES: Record<string, { title: string; desc: string }> = {
  stack: { title: '我实际在用的', desc: '我当前的AI工作流 — 每周完成制作后更新。不是推荐列表，是正在使用的工具。' },
  sources: { title: '我在关注谁', desc: '我持续追踪的创作者、研究者和竞品。出现在这里的，都在影响我下一条视频。' },
  upcoming: { title: '接下来做什么', desc: '我正在制作的内容。欢迎关注或提建议。' },
};

const EMAIL = 'kikiyu795@gmail.com';

export default function Home() {
  const [view, setView] = useState<string>('stack');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [channelFilter, setChannelFilter] = useState('All');

  const platforms = ['All', ...Array.from(new Set(SOURCES.map(s => s.platform)))];
  const channels = ['All', ...Array.from(new Set(SOURCES.filter(s => s.channel).map(s => s.channel!)))];

  let filteredSources: Source[] = SOURCES;
  if (platformFilter !== 'All') filteredSources = filteredSources.filter(s => s.platform === platformFilter);
  if (channelFilter !== 'All') filteredSources = filteredSources.filter(s => s.channel === channelFilter);

  return (
    <div className="grain min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-60 border-b md:border-b-0 md:border-r border-[var(--border)] p-6 md:p-8 md:min-h-screen md:sticky md:top-0 flex md:flex-col gap-4 md:gap-0 overflow-x-auto md:overflow-x-visible bg-[var(--bg-secondary)]">
        <div className="md:mb-12 shrink-0">
          <h1 className="font-bold text-xs tracking-widest uppercase text-[var(--text-primary)] whitespace-nowrap">
            Kiki 的创作者工具栈
          </h1>
          <div className="h-0.5 w-8 bg-gradient-to-r from-indigo-500 to-purple-500 mt-2 hidden md:block" />
        </div>

        <nav className="flex md:flex-col gap-2 md:gap-1">
          {NAV.map(item => (
            <button
              key={item.key}
              onClick={() => setView(item.key)}
              className={`text-xs md:text-sm tracking-wide transition-all whitespace-nowrap px-3 py-1.5 md:px-3 md:py-2 rounded-lg text-left ${
                view === item.key
                  ? 'text-white font-semibold bg-indigo-500/10 border border-indigo-500/20'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/[0.02]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {view === 'sources' && (
          <div className="hidden md:block mt-8 space-y-6">
            <div>
              <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Platform</p>
              {platforms.map(p => (
                <button key={p} onClick={() => setPlatformFilter(p)}
                  className={`block text-xs mb-1 transition-colors ${platformFilter === p ? 'text-indigo-400 font-semibold' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
                >{p === 'All' ? '全部' : `${PLATFORM_ICON[p] || ''} ${p}`}</button>
              ))}
            </div>
            <div>
              <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Channel</p>
              {channels.map(c => (
                <button key={c} onClick={() => setChannelFilter(c)}
                  className={`block text-xs mb-1 transition-colors ${channelFilter === c ? 'text-indigo-400 font-semibold' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
                >{c === 'All' ? '全部' : c}</button>
              ))}
            </div>
          </div>
        )}

        <div className="hidden md:block mt-auto pt-8 space-y-3">
          <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-[10px] text-[var(--text-muted)] hover:text-indigo-400 transition-colors">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            联系我
          </a>
          <p className="text-[9px] text-[var(--text-muted)]/50 uppercase tracking-wider">© 2026 · Kiki Yu</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 md:p-12 max-w-6xl">
        <header className="mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="py-1 px-3 border border-indigo-500/30 text-[9px] font-bold uppercase tracking-widest text-indigo-400 rounded">
              {NAV.find(n => n.key === view)?.label}
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">最后更新: {LAST_UPDATED}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-5 leading-none bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            {TITLES[view].title}
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)] font-light border-l-2 border-indigo-500/40 pl-4 max-w-xl">
            {TITLES[view].desc}
          </p>
        </header>

        {/* STACK VIEW - Mind Map */}
        {view === 'stack' && (
          <div>
            <p className="text-[10px] text-[var(--text-muted)] mb-4 uppercase tracking-wider">
              可缩放 · 可拖拽 · 点击工具名访问官网
            </p>
            <MindMap />
          </div>
        )}

        {/* SOURCES VIEW */}
        {view === 'sources' && (
          <div>
            <div className="flex flex-wrap gap-1.5 mb-6 md:hidden">
              {platforms.map(p => (
                <button key={p} onClick={() => setPlatformFilter(p)}
                  className={`text-[10px] px-2.5 py-1 rounded border ${platformFilter === p ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : 'text-[var(--text-muted)] border-[var(--border)]'}`}
                >{p === 'All' ? '全部' : `${PLATFORM_ICON[p] || ''} ${p}`}</button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredSources.map(s => (
                <div key={s.id} className="group border border-[var(--border)] hover:border-indigo-500/30 rounded-lg p-4 transition-all bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] cursor-pointer flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm text-[var(--text-primary)] truncate group-hover:text-indigo-300 transition-colors">{s.name}</h4>
                      <span className="text-[10px] text-[var(--text-muted)]">{s.handle}</span>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5 text-[var(--text-muted)] shrink-0 ml-2">
                      {PLATFORM_ICON[s.platform] || ''} {s.platform}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2 flex-1">{s.reason}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {s.tags.map(tag => <span key={tag} className="text-[9px] text-indigo-400/60">#{tag}</span>)}
                    </div>
                    {s.channel && <span className="text-[8px] text-[var(--text-muted)] bg-white/5 px-1.5 py-0.5 rounded">{s.channel}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* UPCOMING VIEW */}
        {view === 'upcoming' && (
          <div className="space-y-3">
            {UPCOMING.map(item => {
              const s = STATUS_MAP[item.status];
              return (
                <div key={item.id} className="border border-[var(--border)] rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] transition-colors">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 w-fit shrink-0 rounded border ${s.color}`}>{s.label}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-[var(--text-primary)]">{item.title}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">{item.channel}</span>
                      {item.targetDate && <span className="text-[10px] text-[var(--text-muted)]/50">→ {item.targetDate}</span>}
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    {item.tags.map(tag => <span key={tag} className="text-[9px] text-indigo-400/50">#{tag}</span>)}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <footer className="md:hidden mt-12 pt-6 border-t border-[var(--border)] flex items-center justify-between">
          <a href={`mailto:${EMAIL}`} className="text-xs text-indigo-400">联系我</a>
          <p className="text-[9px] text-[var(--text-muted)]">© 2026 · Kiki Yu</p>
        </footer>
      </main>
    </div>
  );
}
