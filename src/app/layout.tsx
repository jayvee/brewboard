import type { Metadata } from 'next';
import { ThemeToggle } from '../components/theme-toggle';
import './globals.css';

export const metadata: Metadata = {
  title: 'BrewBoard',
  description: 'Track and share your craft beer collection',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                const storedTheme = localStorage.getItem('brewboard-theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                document.documentElement.classList.toggle('dark', storedTheme ? storedTheme === 'dark' : prefersDark);
              })();
            `,
          }}
        />
      </head>
      <body className="bg-amber-50 text-stone-800 min-h-screen dark:bg-stone-950 dark:text-amber-50">
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
