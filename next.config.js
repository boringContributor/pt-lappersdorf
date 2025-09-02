/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ucarecdn.com', 'media.graphassets.com', 'graphassets.com'],
    minimumCacheTTL: 31536000
  },
  i18n: {
    locales: ['de'],
    defaultLocale: 'de'
  },
  env: {
    graphql: 'https://api-eu-central-1.graphcms.com/v2/cl1gmn8vw4kir01xiala193ff/master'
  }
}

module.exports = nextConfig
