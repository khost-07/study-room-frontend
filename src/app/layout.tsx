import { Inter } from 'next/font/google';
import './globals.css';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { BootAnimation } from '@/components/ui/BootAnimation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Collaborative Study Room',
  description: 'Real-time online study space supporting chat, whiteboard, flashcards, quizzes, scheduling, and group productivity.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen flex flex-col antialiased selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden`}>
        <CustomCursor />
        <BootAnimation>
          {children}
        </BootAnimation>
      </body>
    </html>
  );
}
