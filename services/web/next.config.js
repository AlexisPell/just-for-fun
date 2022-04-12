const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');

// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
/** @type {import('next').NextConfig} */
module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
  // when `next build` or `npm run build` is used
  const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`);

  const env = {
    BACKEND_API: (() => {
      if (isDev) return 'http://localhost:8080/api/v1';
      if (isProd) return 'NOT DEFINED YET';
      if (isStaging) return 'NOT DEFINED YET';
      return 'process.env.API IS NOT DEFINED...';
    })(),
    BACKEND_URI: (() => {
      if (isDev) return 'http://localhost:8080';
      if (isProd) return 'NOT DEFINED YET';
      if (isStaging) return 'NOT DEFINED YET';
      return 'process.env.API IS NOT DEFINED...';
    })(),
  };

  return {
    env,
  };
};
