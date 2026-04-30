import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { ThemeToggle } from '@/components/theme-toggle';

export const metadata: Metadata = {
  title: 'BrewBoard',
  description: 'Track and share your craft beer collection',
};

const themeInitScript = `
(function(){
  try {
    var k = 'brewboard-theme';
    var v = localStorage.getItem(k);
    var d = v === 'dark' || (v !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', d);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-amber-50 text-stone-800 min-h-screen dark:bg-stone-950 dark:text-stone-100">
        <Script
          id="brewboard-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <div className="fixed right-4 top-4 z-50">
          <ThemeToggle />
        </div>
        {children}
      </body>
    </html>
  );
}
