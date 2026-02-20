import { Inter } from 'next/font/google';
import './globals.css';

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
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
