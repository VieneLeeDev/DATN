
const withVideos = require('next-videos')
const withSvgr = require('next-plugin-svgr');

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ['ts', 'tsx', 'mdx'],
	output: 'standalone',
	trailingSlash: true, 
	images: {
		domains: ['images.unsplash.com'],
		disableStaticImages: true
	},
	experimental: { serverActions: true },
}
module.exports = nextConfig
module.exports = withSvgr();

module.exports = withVideos()
