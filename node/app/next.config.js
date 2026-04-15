/* eslint-disable
   @typescript-eslint/no-var-requires
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
