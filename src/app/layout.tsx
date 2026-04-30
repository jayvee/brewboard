import type { Metadata } from 'next';
import './globals.css';
import { ThemeToggle } from '../components/theme-toggle'; // Import the ThemeToggle component

export const metadata: Metadata = {
  title: 'BrewBoard',
  description: 'Track and share your craft beer collection',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script>
          {`(function() {
            var theme = localStorage.getItem('brewboard-theme');
            if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark');
            }
          })()`}
        </script>
      </head>
      <body className="bg-amber-50 text-stone-800 min-h-screen">
        {children}
        <ThemeToggle /> {/* Render the ThemeToggle component */}
      </body>
    </html>
  );
}
