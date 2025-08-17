import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { AppProvider } from '@/context/AppProvider';
import { auth } from '@/auth';
import type { Progress, User } from '@prisma/client';
import { getUserByEmailAction } from '@/actions/user';
import { getUserAllProgressAction } from '@/actions/progress';

import './globals.css';
import 'react-responsive-modal/styles.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Mar',
  description: 'Mar progress, days, hours and mining',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  let user: User | null = null;
  let progress: Progress[] = [];

  if (session?.user?.email) {
    user = await getUserByEmailAction(session.user.email);
    if (user) {
      const progressResponse = await getUserAllProgressAction(user.id);
      if (progressResponse.success) {
        progress = progressResponse.data || [];
      }
    }
  }

  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon/./favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/./favicon.svg" />
        <link rel="shortcut icon" href="/favicon/./favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/./apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Mar" />
        <link rel="manifest" href="/favicon/./site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider currentUser={user} currentProgress={progress}>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
