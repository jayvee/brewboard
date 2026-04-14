'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('brewboard-theme');
    const prefersDark =
      stored === 'dark' ||
      (stored === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDark(prefersDark);
    document.documentElement.classList.toggle('dark', prefersDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('brewboard-theme', next ? 'dark' : 'light');
  }

  return (
    <button onClick={toggle} aria-label="Toggle dark mode">
      {dark ? '☀️' : '🌙'}
    </button>
  );
}
