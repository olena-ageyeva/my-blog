import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link
          type="application/opensearchdescription+xml"
          rel="search"
          href="opensearch.xml"
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
        {/* Default Statcounter code for olena-ageyeva https://olena-ageyeva.netlify.app/ */}
        <script type="text/javascript">
          var sc_project=13133304;
          var sc_invisible=1;
          var sc_security="065fb3a1";
        </script>
        <script type="text/javascript"
          src="https://www.statcounter.com/counter/counter.js"
          async></script>
        <noscript><div class="statcounter"><a title="Web Analytics
Made Easy - Statcounter" href="https://statcounter.com/"
          target="_blank"><img class="statcounter"
            src="https://c.statcounter.com/13133304/0/065fb3a1/1/"
            alt="Web Analytics Made Easy - Statcounter"
            referrerPolicy="no-referrer-when-downgrade" /></a></div></noscript>
        {/* End of Statcounter Code */}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
