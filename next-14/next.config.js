
const withVideos = require('next-videos')
const withSvgr = require('next-plugin-svgr');

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ['ts', 'tsx', 'mdx'],
	output: 'export',
	trailingSlash: true, // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
	// skipTrailingSlashRedirect: true, // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
	// distDir: 'dist', // Optional: Change the output directory `out` -> `dist`
	images: {
		unoptimized: true,
		domains: ['images.unsplash.com'],
	},
	experimental: { serverActions: true }
}
module.exports = nextConfig
module.exports = withSvgr();

module.exports = withVideos()
