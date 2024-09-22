/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: `${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com`,
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
