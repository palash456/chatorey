import './globals.css';
import type { Metadata, Viewport } from 'next';
import { DM_Sans, Outfit } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700']
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600', '700', '800']
});

export const metadata: Metadata = {
  title: "Chatorey · Find what's actually worth eating",
  description: 'Discover, order, and get local Jaipur street food delivered.',
  icons: { icon: '/images/icon.jpg', apple: '/images/icon.jpg' },
  manifest: '/manifest.json',
  appleWebApp: { capable: true, title: 'Chatorey' }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
};

const themeBoot = `(function(){try{var d=JSON.parse(localStorage.getItem('chatorey:v1')||'null');var t=d&&d.theme||'light';var dark=t==='dark'||(t==='auto'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',dark);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
