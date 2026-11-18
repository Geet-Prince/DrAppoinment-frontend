import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DrAppoinmentChat } from '@/components/chat/DrAppoinmentChat';
import { JsonLd } from '@/components/seo/JsonLd';
import { getMedicalBusinessSchema, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Verified Doctor Appointments & Clinical AI Assistant`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'doctor appointment booking',
    'find doctor near me',
    'hospital slot booking',
    'cardiology appointment',
    'dermatologist consultation',
    'AI medical triage',
    'Gemini clinical assistant',
    'telehealth and in-clinic consultation',
  ],
  authors: [{ name: 'Dr.Appoinment Medical Network' }],
  creator: 'Dr.Appoinment Healthcare Systems',
  publisher: 'Dr.Appoinment',
  formatDetection: {
    email: true,
    telephone: true,
    address: true,
  },
  openGraph: {
    title: `${SITE_NAME} — Instant Doctor Booking & AI Healthcare Triage`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Instant Doctor Booking & AI Healthcare Triage`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clinicSchema = getMedicalBusinessSchema();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <JsonLd data={clinicSchema} />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 selection:bg-teal-100 selection:text-teal-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <DrAppoinmentChat />
      </body>
    </html>
  );
}
