const { withContentlayer } = require('next-contentlayer')
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true, 
  swcMinify: true 
  // Optionally, add any other Next.js config below
}
 
module.exports = withContentlayer(nextConfig)