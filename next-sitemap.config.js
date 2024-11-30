/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
module.exports = {
  siteUrl: 'https://ffmpeg.ai',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/404'],
};
