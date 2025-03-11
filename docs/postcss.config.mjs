/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    /*'postcss-discard-duplicates': {},
    cssnano: process.env.NODE_ENV === 'production'
      ? {
        preset: [
          'default',
          {
            discardComments: { removeAll: true },
          },
        ],
      }
      : false,*/
  },
};

export default config;
