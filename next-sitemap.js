/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://wisedroids.ai',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/dashboard', '/api/*', '/admin/*', '/auth/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/api/*', '/admin/*', '/auth/*']
      }
    ],
    additionalSitemaps: [
      'https://wisedroids.ai/sitemap.xml'
    ]
  }
}
