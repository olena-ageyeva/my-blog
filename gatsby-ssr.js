const React = require('react');
const { GlobalProvider } = require('./src/context/GlobalContext');
const { GlobalStyle } = require('./src/styles/GlobalStyle');

// Use CommonJS exports
exports.wrapRootElement = ({ element }) => (
  <GlobalProvider>
    <GlobalStyle />
    {element}
  </GlobalProvider>
);

// This is the proper place to add scripts to your site
exports.onRenderBody = ({ setHeadComponents }) => {
  // Get environment variables with fallbacks
  const GOOGLE_ANALYTICS_ID = process.env.GATSBY_GOOGLE_ANALYTICS_ID;

  // Only add analytics in production
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    // Add components to the <head> - only in production
    setHeadComponents([
      React.createElement('script', {
        key: 'google-analytics',
        async: true,
        src: `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`
      }),
      React.createElement('script', {
        key: 'google-analytics-config',
        dangerouslySetInnerHTML: {
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_ID}');
          `
        }
      })
    ]);
  }


};

