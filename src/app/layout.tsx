import type { Metadata } from 'next';
import './globals.css';
import { ThemeToggle } from '@/components/theme-toggle';

export const metadata: Metadata = {
  title: 'BrewBoard',
  description: 'Track and share your craft beer collection',
};

const themeScript = `
(function() {
  var stored = localStorage.getItem('brewboard-theme');
  var prefersDark = stored === 'dark' || (stored === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
  if (prefersDark) document.documentElement.classList.add('dark');
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-amber-50 text-stone-800 min-h-screen">
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
