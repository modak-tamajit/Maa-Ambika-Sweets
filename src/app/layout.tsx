import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter, Noto_Sans_Bengali } from 'next/font/google';
import './globals.css';
import { BUSINESS } from '@/config/business';
import { Analytics } from '@vercel/analytics/next';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const notoBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bengali',
  display: 'swap',
});

export const metadata: Metadata = {
  title: BUSINESS.seo.title,
  description: BUSINESS.seo.description,
  metadataBase: new URL(BUSINESS.seo.canonical),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/brand/favicon/favicon.ico' },
      { url: '/brand/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/brand/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/brand/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/brand/favicon/site.webmanifest',
  openGraph: {
    title: BUSINESS.seo.title,
    description: BUSINESS.seo.description,
    url: BUSINESS.seo.canonical,
    siteName: `${BUSINESS.name.english} (${BUSINESS.name.bengali})`,
    images: [
      {
        url: '/brand/logo-reference.png',
        width: 1024,
        height: 1024,
        alt: `${BUSINESS.name.english} Logo`,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: BUSINESS.seo.title,
    description: BUSINESS.seo.description,
    images: ['/brand/logo-reference.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // LocalBusiness structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SweetShop',
    name: BUSINESS.name.english,
    alternateName: BUSINESS.name.bengali,
    image: `${BUSINESS.seo.canonical}/brand/logo-reference.png`,
    description: BUSINESS.seo.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.locality,
      addressRegion: BUSINESS.address.state,
      postalCode: BUSINESS.address.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.coordinates.lat,
      longitude: BUSINESS.coordinates.lng,
    },
    url: BUSINESS.seo.canonical,
    telephone: BUSINESS.phone,
    priceRange: '₹',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '08:00',
        closes: '22:00',
      },
    ],
    foundingDate: `${BUSINESS.established}`,
  };

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${notoBengali.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
