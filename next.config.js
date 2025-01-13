
const withVideos = require('next-videos')
const withSvgr = require('next-plugin-svgr');

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ['ts', 'tsx', 'mdx'],
	output: 'standalone',
	trailingSlash: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'plus.unsplash.com',
				port: '',
				pathname: '',
				search: '',
			},
		],
		domains: ['images.unsplash.com', 'plus.unsplash.com'],
		disableStaticImages: true
	},
	experimental: { serverActions: true },
}
module.exports = nextConfig
module.exports = withSvgr();

module.exports = withVideos()
