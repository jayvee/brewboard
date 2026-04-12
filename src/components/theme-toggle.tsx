'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'brewboard-theme';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const prefersDark =
      stored !== null
        ? stored === 'dark'
        : window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDark(prefersDark);
    document.documentElement.classList.toggle('dark', prefersDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="fixed top-4 right-4 rounded-full p-2 bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-100 shadow"
    >
      {dark ? '☀️' : '🌙'}
    </button>
  );
}
