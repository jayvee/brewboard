'use client';

import { useEffect, useState } from 'react';

const themeKey = 'brewboard-theme';

type Theme = 'light' | 'dark';

function getPreferredTheme(): Theme {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem(themeKey) as Theme | null;
    const initialTheme = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : getPreferredTheme();

    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    localStorage.setItem(themeKey, nextTheme);
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="fixed right-4 top-4 rounded-full border border-stone-300 bg-white/90 px-4 py-2 text-sm font-semibold text-stone-800 shadow-sm transition hover:bg-amber-100 dark:border-amber-200/30 dark:bg-stone-900/90 dark:text-amber-50 dark:hover:bg-stone-800"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? 'Light mode' : 'Dark mode'}
    </button>
  );
}
