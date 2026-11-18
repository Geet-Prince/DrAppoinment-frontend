import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://drappoinment.example.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/patient/secret', '/admin/private', '/api/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Google-Extended', 'Applebot-Extended'],
        allow: ['/', '/doctors', '/doctors/*', '/llms.txt'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
