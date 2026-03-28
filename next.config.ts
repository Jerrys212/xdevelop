import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "reqres.in",
            },
            {
                protocol: "https",
                hostname: "covers.openlibrary.org",
            },
        ],
    },
};

export default nextConfig;
