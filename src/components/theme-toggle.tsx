'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'brewboard-theme';

function prefersDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function readStored(): 'light' | 'dark' | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === 'light' || raw === 'dark') return raw;
  return null;
}

function applyHtmlClass(isDark: boolean): void {
  document.documentElement.classList.toggle('dark', isDark);
}

export function ThemeToggle() {
  const [mode, setMode] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    const stored = readStored();
    const isDark = stored === 'dark' || (stored !== 'light' && prefersDark());
    applyHtmlClass(isDark);
    setMode(isDark ? 'dark' : 'light');

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onPrefChange = () => {
      if (readStored() === null) {
        const next = prefersDark();
        applyHtmlClass(next);
        setMode(next ? 'dark' : 'light');
      }
    };
    mq.addEventListener('change', onPrefChange);
    return () => mq.removeEventListener('change', onPrefChange);
  }, []);

  const toggle = () => {
    const nextDark = !document.documentElement.classList.contains('dark');
    localStorage.setItem(STORAGE_KEY, nextDark ? 'dark' : 'light');
    applyHtmlClass(nextDark);
    setMode(nextDark ? 'dark' : 'light');
  };

  const resolved = mode ?? 'light';
  const label = resolved === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-md border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-800 shadow-sm hover:bg-stone-50 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100 dark:hover:bg-stone-700"
      aria-pressed={resolved === 'dark'}
      aria-label={label}
    >
      {resolved === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
}
