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
exports.onRenderBody = ({ setPostBodyComponents, setHeadComponents }) => {
  // Add components to the <head>
  setHeadComponents([
    React.createElement('script', {
      key: 'google-analytics',
      async: true,
      src: "https://www.googletagmanager.com/gtag/js?id=G-P8R0XLH57E"
    }),
    React.createElement('script', {
      key: 'google-analytics-config',
      dangerouslySetInnerHTML: {
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-P8R0XLH57E');
        `
      }
    })
  ]);

  // Add components to the end of the <body>
  setPostBodyComponents([
    React.createElement('script', {
      key: 'statcounter',
      type: 'text/javascript',
      dangerouslySetInnerHTML: {
        __html: `
          try {
          var sc_project = 13133304;
          var sc_invisible = 0;
          var sc_text=2;
          var sc_security = "065fb3a1";
          var scJsHost = "https://";

          (function() {
            var sc = document.createElement("script");
            sc.type = "text/javascript";
            sc.async = true;
            sc.src = scJsHost + "statcounter.com/counter/counter.js";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(sc, s);
          })();
          } catch(e) {
            // Silent catch - do nothing
          }
        `
      }
    }),

    // Fix: Convert JSX to React.createElement for the additional Google Analytics script
    React.createElement('script', {
      key: 'google-analytics-additional',
      async: true,
      src: "https://www.googletagmanager.com/gtag/js?id=G-P8R0XLH57E"
    }),
    React.createElement('script', {
      key: 'google-analytics-config-additional',
      dangerouslySetInnerHTML: {
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-P8R0XLH57E');
        `
      }
    })
  ]);
};



