import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter, Noto_Sans_Bengali, Noto_Serif_Bengali } from 'next/font/google';
import './globals.css';
import { BUSINESS } from '@/config/business';

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

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ['bengali'],
  weight: ['500', '600', '700'],
  variable: '--font-noto-serif-bengali',
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
  verification: {
    google: 'nqPa8PHljVi-i-sfRz0MqVm5XO5LaxZ12ydQN4lJ-aA',
  },
  openGraph: {
    title: BUSINESS.seo.title,
    description: BUSINESS.seo.description,
    url: BUSINESS.seo.canonical,
    siteName: `${BUSINESS.name.english} (${BUSINESS.name.bengali})`,
    images: [
      {
        url: '/brand/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${BUSINESS.name.english} - Authentic Bengali Sweets in Kalna`,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: BUSINESS.seo.title,
    description: BUSINESS.seo.description,
    images: ['/brand/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Valid Schema.org LocalBusiness (Bakery / Confectionery) structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    name: BUSINESS.name.english,
    alternateName: BUSINESS.name.bengali,
    image: `${BUSINESS.seo.canonical}/brand/og-image.jpg`,
    logo: `${BUSINESS.seo.canonical}/brand/logo.png`,
    description: BUSINESS.seo.description,
    url: BUSINESS.seo.canonical,
    telephone: BUSINESS.phone,
    priceRange: '₹',
    servesCuisine: 'Bengali Sweets',
    hasMap: BUSINESS.googleMaps.listingUrl,
    sameAs: [
      BUSINESS.instagram,
      BUSINESS.googleMaps.listingUrl,
    ],
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
      className={`${cormorant.variable} ${inter.variable} ${notoBengali.variable} ${notoSerifBengali.variable}`}
    >
      <head>
        <meta name="google-site-verification" content="nqPa8PHljVi-i-sfRz0MqVm5XO5LaxZ12ydQN4lJ-aA" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
