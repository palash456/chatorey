import './globals.css';
import type { Metadata, Viewport } from 'next';

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

const fontUrl =
  'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;500;600;700&family=Outfit:wght@500;600;700;800&display=swap';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={fontUrl} rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
