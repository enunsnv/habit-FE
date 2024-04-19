/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        // / 에서 /home 으로 리디렉션
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true
            }
        ];
    },

    async rewrites() {
        return [
          {
            source: "/:path*",
            destination: "https://openapi.naver.com/:path*",
          },
        ];
    }
};

export default nextConfig;
