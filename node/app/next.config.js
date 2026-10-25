/* eslint-disable
   @typescript-eslint/no-require-imports
*/

const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  compiler: {
    styledComponents: true,
  },
};

module.exports = withMDX(nextConfig);
