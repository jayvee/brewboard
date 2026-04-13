import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BrewBoard',
  description: 'Track and share your craft beer collection',
};

const themeScript = `
(function() {
  var stored = localStorage.getItem('brewboard-theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (stored === 'dark' || (!stored && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-amber-50 text-stone-800 min-h-screen dark:bg-stone-900 dark:text-amber-50">
        {children}
      </body>
    </html>
  );
}
