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

            // Create a dummy function that does nothing
            window._statcounter = function() {};
          } catch(e) {
            // Silent catch - do nothing
          }
        `
      }
    })
  ]);
};

