/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: [
			"firebasestorage.googleapis.com",
			"images.unsplash.com",
			"media4.giphy.com",
		],
	},
};

module.exports = nextConfig;
