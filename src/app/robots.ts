import type { MetadataRoute } from 'next';
import { BUSINESS } from '@/config/business';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BUSINESS.seo.canonical}/sitemap.xml`,
  };
}

