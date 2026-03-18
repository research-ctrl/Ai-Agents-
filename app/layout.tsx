import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shipyard Material Control Prototype',
  description: 'Prototype workflow system for requirement raise through recovery and AI reuse review.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
