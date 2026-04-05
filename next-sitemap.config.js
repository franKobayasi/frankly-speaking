/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://franklin0407.github.io/frankly-speaking',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  changefreq: 'weekly',
  priority: 0.7,
  sitemapBaseFileName: 'sitemap',
  exclude: [],
  trailingSlash: true,
}
