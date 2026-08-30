import type { MetadataRoute } from 'next';
import { BUSINESS } from '@/config/business';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BUSINESS.seo.canonical,
      lastModified: new Date('2026-08-30'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}

