'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  COMPANY_BENCHMARKS, PERSONAL_BENCHMARKS, UPCOMING, TOPIC_LIBRARY, PERSONAL_ACCOUNT,
  STATUS_MAP, PLATFORM_ICON, LAST_UPDATED, CHANNEL_COLORS,
  type BenchmarkAccount, type UpcomingItem,
} from '@/data/stack';

import StackView from '@/components/StackView';

const NAV = [
  { key: 'stack', label: '工具实况', icon: '🧠' },
  { key: 'benchmarks', label: '对标账号', icon: '📡' },
  { key: 'upcoming', label: '选题预告', icon: '📋' },
] as const;

const TITLES: Record<string, { title: string; desc: string }> = {
  stack: { title: '我实际在用的', desc: '我当前的AI工作流 — 每周完成制作后更新。不是推荐列表，是正在使用的工具。' },
  benchmarks: { title: '我在关注谁', desc: '持续追踪的创作者、研究者和行业账号。出现在这里的，都在影响我下一条视频。' },
  upcoming: { title: '接下来做什么', desc: '我正在制作的内容和关注的对标爆款。欢迎关注或提建议。' },
};

const EMAIL = 'kikiyu795@gmail.com';

function AccountCard({ account }: { account: BenchmarkAccount }) {
  const channelColor = account.channel ? CHANNEL_COLORS[account.channel] : undefined;
  const Wrapper = account.url ? 'a' : 'div';
  const linkProps = account.url ? { href: account.url, target: '_blank' as const, rel: 'noopener noreferrer' } : {};
  return (
    <Wrapper
      {...linkProps}
      className={`glass-card block p-4 group${account.url ? ' cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-sm text-[var(--text-primary)] truncate group-hover:text-[var(--accent)] transition-colors">
            {account.name}
            <span className="ml-1.5 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
          </h4>
          <span className="text-[10px] text-[var(--text-muted)]">{account.handle}</span>
        </div>
        <span className="text-[9px] font-medium px-2 py-0.5 rounded-full bg-white/[0.06] text-[var(--text-secondary)] shrink-0 ml-2">
          {PLATFORM_ICON[account.platform] || ''} {account.platform}
        </span>
      </div>
      <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2.5">{account.reason}</p>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {account.tags.map(tag => <span key={tag} className="tag-pill">#{tag}</span>)}
        </div>
        {account.channel && (
          <span
            className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
            style={{ background: `${channelColor}10`, color: channelColor }}
          >
            {account.channel}
          </span>
        )}
      </div>
    </Wrapper>
  );
}

function UpcomingCard({ item }: { item: UpcomingItem }) {
  const s = STATUS_MAP[item.status];
  const channelColor = CHANNEL_COLORS[item.channel] || '#888';
  const Wrapper = item.url ? 'a' : 'div';
  const linkProps = item.url ? { href: item.url, target: '_blank' as const, rel: 'noopener noreferrer' } : {};
  return (
    <Wrapper {...linkProps} className={`glass-card p-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4${item.url ? ' cursor-pointer group' : ''}`}>
      <span
        className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 w-fit shrink-0 rounded-full"
        style={{ background: s.bg, color: s.color }}
      >
        {s.label}
      </span>
      <div className="flex-1 min-w-0">
        <h4 className={`font-semibold text-sm text-[var(--text-primary)]${item.url ? ' group-hover:text-[var(--accent)] transition-colors' : ''}`}>
          {item.title}
          {item.url && <span className="ml-1.5 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">↗</span>}
        </h4>
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className="text-[10px] font-semibold"
            style={{ color: channelColor }}
          >
            {item.channel}
          </span>
          {item.targetDate && <span className="text-[10px] text-[var(--text-muted)]">→ {item.targetDate}</span>}
        </div>
      </div>
      <div className="flex gap-1.5">
        {item.tags.map(tag => <span key={tag} className="tag-pill">#{tag}</span>)}
      </div>
    </Wrapper>
  );
}

export default function Home() {
  const [view, setView] = useState<string>('stack');
  const [benchmarkTab, setBenchmarkTab] = useState<'company' | 'personal'>('company');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [upcomingTab, setUpcomingTab] = useState<'all' | 'company' | 'personal'>('all');

  const currentBenchmarks = benchmarkTab === 'company' ? COMPANY_BENCHMARKS : PERSONAL_BENCHMARKS;
  const platforms = ['All', ...Array.from(new Set(currentBenchmarks.map(s => s.platform)))];
  const filteredBenchmarks = platformFilter === 'All' ? currentBenchmarks : currentBenchmarks.filter(s => s.platform === platformFilter);

  const filteredUpcoming = upcomingTab === 'all' ? UPCOMING
    : UPCOMING.filter(u => u.scope === upcomingTab);

  return (
    <div className="mesh-bg min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[var(--border-subtle)] p-5 md:p-6 md:min-h-screen md:sticky md:top-0 flex md:flex-col gap-3 md:gap-0 overflow-x-auto md:overflow-x-visible">
        <div className="md:mb-10 shrink-0">
          <h1 className="font-bold text-[13px] tracking-tight text-[var(--text-primary)] whitespace-nowrap">
            Kiki 的创作者工具栈
          </h1>
          <div className="h-[2px] w-8 bg-gradient-to-r from-[var(--accent)] to-[var(--purple)] mt-2 rounded-full hidden md:block" />
        </div>

        <nav className="flex md:flex-col gap-1">
          {NAV.map(item => (
            <button
              key={item.key}
              onClick={() => { setView(item.key); setPlatformFilter('All'); }}
              className={`text-[13px] tracking-normal transition-all whitespace-nowrap px-3 py-2 rounded-xl text-left flex items-center gap-2 ${
                view === item.key
                  ? 'glass-heavy text-[var(--text-primary)] font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/[0.04]'
              }`}
            >
              <span className="text-sm">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {view === 'benchmarks' && (
          <div className="hidden md:block mt-6">
            <p className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-2 px-1">Platform</p>
            {platforms.map(p => (
              <button key={p} onClick={() => setPlatformFilter(p)}
                className={`block text-xs mb-0.5 px-2 py-1 rounded-lg transition-colors w-full text-left ${
                  platformFilter === p
                    ? 'text-[var(--accent)] font-semibold bg-[var(--accent-light)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/[0.04]'
                }`}
              >{p === 'All' ? '全部' : `${PLATFORM_ICON[p] || ''} ${p}`}</button>
            ))}
          </div>
        )}

        <div className="hidden md:block mt-auto pt-6 space-y-3">
          <a href={`mailto:${EMAIL}`} className="glass-card !rounded-xl flex items-center gap-2 text-[11px] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors px-3 py-2">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            联系我
          </a>
          <p className="text-[10px] text-[var(--text-muted)] px-1">© 2026 · Kiki Yu</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-5 md:p-10 max-w-6xl">
        <header className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="glass py-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-[var(--accent)] rounded-full">
              {NAV.find(n => n.key === view)?.label}
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">最后更新: {LAST_UPDATED}</span>
          </div>
          <h2 className="text-3xl md:text-[44px] font-bold tracking-tight mb-4 leading-[1.1] gradient-text">
            {TITLES[view].title}
          </h2>
          <p className="text-sm text-[var(--text-secondary)] font-normal max-w-xl leading-relaxed">
            {TITLES[view].desc}
          </p>
        </header>

        {/* STACK VIEW */}
        {view === 'stack' && <StackView />}

        {/* BENCHMARKS VIEW */}
        {view === 'benchmarks' && (
          <div>
            {/* Company / Personal tabs */}
            <div className="glass-heavy inline-flex rounded-xl p-1 mb-6">
              {([['company', 'AI应用类官方账号'], ['personal', '生活/科技类IP']] as const).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => { setBenchmarkTab(key); setPlatformFilter('All'); }}
                  className={`text-[13px] px-4 py-1.5 rounded-lg transition-all font-medium ${
                    benchmarkTab === key
                      ? 'bg-white/[0.1] text-[var(--text-primary)] shadow-sm'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Mobile platform pills */}
            <div className="flex flex-wrap gap-1.5 mb-5 md:hidden">
              {platforms.map(p => (
                <button key={p} onClick={() => setPlatformFilter(p)}
                  className={`text-[10px] px-2.5 py-1 rounded-full font-medium transition-all ${
                    platformFilter === p
                      ? 'bg-[var(--accent)] text-white'
                      : 'glass text-[var(--text-secondary)]'
                  }`}
                >{p === 'All' ? '全部' : `${PLATFORM_ICON[p] || ''} ${p}`}</button>
              ))}
            </div>

            {/* Channel grouping for company */}
            {benchmarkTab === 'company' ? (
              <div className="space-y-8">
                {Array.from(new Set(filteredBenchmarks.map(b => b.channel))).map(channel => {
                  const items = filteredBenchmarks.filter(b => b.channel === channel);
                  if (!items.length) return null;
                  const color = channel ? CHANNEL_COLORS[channel] : '#888';
                  return (
                    <div key={channel}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                        <h3 className="text-sm font-bold text-[var(--text-primary)]">{channel}</h3>
                        <span className="text-[10px] text-[var(--text-muted)]">{items.length} 个账号</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {items.map(a => <AccountCard key={a.id} account={a} />)}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredBenchmarks.map(a => <AccountCard key={a.id} account={a} />)}
              </div>
            )}
          </div>
        )}

        {/* UPCOMING VIEW */}
        {view === 'upcoming' && (
          <div>
            <div className="glass-heavy inline-flex rounded-xl p-1 mb-6">
              {([['all', '全部'], ['company', 'AI应用类官方账号'], ['personal', '生活/科技类IP']] as const).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setUpcomingTab(key)}
                  className={`text-[13px] px-4 py-1.5 rounded-lg transition-all font-medium ${
                    upcomingTab === key
                      ? 'bg-white/[0.1] text-[var(--text-primary)] shadow-sm'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {/* Topic Library Link */}
            <a
              href={TOPIC_LIBRARY.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card block p-5 mb-6 group cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-lg">📊</span>
                <h3 className="font-semibold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                  {TOPIC_LIBRARY.label}
                  <span className="ml-1.5 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </h3>
                <span className="text-[9px] font-medium px-2 py-0.5 rounded-full bg-[var(--accent-light)] text-[var(--accent)] ml-auto">
                  每日更新
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{TOPIC_LIBRARY.desc}</p>
            </a>

            {(upcomingTab === 'all' || upcomingTab === 'personal') && (
              <a
                href={PERSONAL_ACCOUNT.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card block p-5 mb-6 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">📕</span>
                  <h3 className="font-semibold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                    {PERSONAL_ACCOUNT.label}
                    <span className="ml-1.5 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                  </h3>
                  <span className="text-[9px] font-medium px-2 py-0.5 rounded-full bg-[var(--accent-light)] text-[var(--accent)] ml-auto">
                    {PERSONAL_ACCOUNT.platform}
                  </span>
                </div>
              </a>
            )}

            <div className="space-y-2.5">
              {filteredUpcoming.map(item => <UpcomingCard key={item.id} item={item} />)}
            </div>
          </div>
        )}

        <footer className="md:hidden mt-10 pt-5 border-t border-[var(--border-subtle)] flex items-center justify-between">
          <a href={`mailto:${EMAIL}`} className="text-xs text-[var(--accent)] font-medium">联系我</a>
          <p className="text-[10px] text-[var(--text-muted)]">© 2026 · Kiki Yu</p>
        </footer>
      </main>
    </div>
  );
}
