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
exports.onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    React.createElement('script', {
      key: 'statcounter',
      type: 'text/javascript',
      dangerouslySetInnerHTML: {
        __html: `
          try {
          var sc_project = 13133304;
          var sc_invisible = 1;
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
          catch(e) {
            // Silent catch - do nothing
          }
        `
      }
    })
  ]);
};

