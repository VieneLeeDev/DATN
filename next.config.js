
const withVideos = require('next-videos')
const withSvgr = require('next-plugin-svgr');

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ['ts', 'tsx', 'mdx'],
	output: 'standalone',
	trailingSlash: true, 
	images: {
		unoptimized: true,
		domains: ['images.unsplash.com'],
	},
	experimental: { serverActions: true }
}
module.exports = nextConfig
module.exports = withSvgr();

module.exports = withVideos()
