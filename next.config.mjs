import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true', // Only run analyzer when ANALYZE=true
});


/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Add loader to handle .glsl files
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/i, // This regex catches all shader extensions
      type: "asset/source", // Use 'raw-loader' functionality in Webpack 5+
    });

    return config;
  },

  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default bundleAnalyzer(nextConfig);
