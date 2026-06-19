'use client';

import { useState } from 'react';
import { STACK, CHANNEL_COLORS } from '@/data/stack';

export default function StackView() {
  const [expanded, setExpanded] = useState<Set<number>>(new Set([0]));

  function toggle(i: number) {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  return (
    <div className="space-y-3">
      {STACK.map((section, i) => {
        const open = expanded.has(i);
        return (
          <div key={section.scenario} className="glass-card !rounded-2xl overflow-hidden">
            {/* Header */}
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-white/[0.03] transition-colors"
            >
              <span className="text-xl">{section.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wide">{section.scenario}</h3>
                <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                  {section.picks.length} 个工具 · 主力: {section.picks[0].name}
                </p>
              </div>
              {/* Tool avatars preview when collapsed */}
              {!open && (
                <div className="hidden sm:flex items-center -space-x-1.5 mr-2">
                  {section.picks.slice(0, 4).map((pick, j) => (
                    <div
                      key={pick.id}
                      className="w-7 h-7 rounded-full bg-white/[0.08] border border-white/[0.1] flex items-center justify-center text-[9px] font-bold text-[var(--text-secondary)] shadow-sm"
                      title={pick.name}
                    >
                      {pick.name.charAt(0)}
                    </div>
                  ))}
                </div>
              )}
              <svg
                className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-300 shrink-0 ${open ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Expandable content */}
            <div
              className="grid transition-all duration-300 ease-out"
              style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-4 pt-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {section.picks.map((pick, j) => (
                    <a
                      key={pick.id}
                      href={pick.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.1] transition-all hover:shadow-sm"
                    >
                      {/* Rank indicator */}
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                        j === 0
                          ? 'bg-[var(--accent)] text-white shadow-sm'
                          : 'bg-white/[0.06] text-[var(--text-muted)]'
                      }`}>
                        {j === 0 ? '★' : j + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[13px] font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
                            {pick.name}
                          </span>
                          <span className="text-[8px] opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-muted)]">↗</span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[9px] font-semibold uppercase tracking-wider px-1.5 py-px rounded-full ${
                            pick.isPaid
                              ? 'bg-white/[0.06] text-[var(--text-muted)]'
                              : 'bg-[#34c75915] text-[var(--green)]'
                          }`}>
                            {pick.role}
                          </span>
                          {!pick.isPaid && (
                            <span className="text-[9px] text-[var(--green)] font-medium">免费</span>
                          )}
                        </div>
                        <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{pick.note}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
