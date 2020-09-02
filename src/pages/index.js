import React from "react"
import { Link } from "gatsby"
//import "./index/styles.css"
//import { onInitialClientRender } from "../../gatsby-browser.js"
import { onPageRender } from "./index/index"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"

class IndexPage extends React.Component {
  componentDidMount() {
    onPageRender()
  }

  render() {
    const siteTitle = "Hello, World!"

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Home"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />

        <div id="app">
          <div className="controls">
            <div className="button" id="wireframe">
              solid
            </div>
            <div className="button" id="shape">
              cube
            </div>
          </div>
        </div>

        <Link to="/blog/">
          <button className="button">
            Go to Blog <i class="fas fa-arrow-right"></i>
          </button>
        </Link>
      </Layout>
    )
  }
}

export default IndexPage
