/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['ts', 'tsx', 'mdx'],
    // output: 'export',
    // trailingSlash: true, // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
    // skipTrailingSlashRedirect: true, // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
    // distDir: 'dist', // Optional: Change the output directory `out` -> `dist`
    images: {
        domains: ["themes.getmotopress.com","loremflickr.com","dynamic-media-cdn.tripadvisor.com","a25hotel.com"],
      },
}

module.exports = nextConfig
