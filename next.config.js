/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withFonts = require('next-fonts');

module.exports = withFonts({
  /* enableSvg: true, */
  webpack(config) {
    config.resolve.fallback = { fs: false, path: false};
    return config;
  },
  i18n: {
    // defaultLocale: 'en',
    // locales: ['en', 'es'],
    defaultLocale: 'en',
    locales: ['en'],
  },
  serverRuntimeConfig: {
    // Configurar el tamaño máximo permitido de las solicitudes
    bodyParser: {
      sizeLimit: '100mb',
    },
  },
}); 