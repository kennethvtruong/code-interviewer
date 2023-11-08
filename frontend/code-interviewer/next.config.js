/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/ap1/v1/:path*",
                destination: "http://localhost:5000/:path*"
            }
        ]
    }
}

module.exports = nextConfig
