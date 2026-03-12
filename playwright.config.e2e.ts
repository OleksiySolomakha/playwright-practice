require('dotenv').config({
    path: `.env.${process.env.ENV}`
});

module.exports = {

    reporter: 'html',

    projects: [
      {
        name: 'avtoria',
        testMatch: 'avtoriaEnvTest.*.spec.ts',
        use: {
          baseURL: process.env.BASE_URL_STAGING || process.env.BASE_URL_DEV, 
          contextOptions: {
            ignoreHTTPSErrors: false,
            viewport: { width: 1920, height: 1080 },
          },
        },
      },
    ],
  };