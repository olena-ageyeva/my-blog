import React from "react"
import { Link } from "gatsby"
import { onPageRender } from "../utils/index/index"

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
        <div className="home">
          <div id="app">
            <div className="controls">       
              <Button className="button" id="wireframe">frame</Button>
              <Button className="button" id="shape">shape</Button> 
            </div>
          </div>
          <blockquote className="blockquote">
            <p className="quote">
              There is geometry in the humming of the strings, there is music in
              the spacing of the spheres.{" "}
            </p>
            <span className="quote_author">Pythagoras</span>
          </blockquote>

          <Link to="/blog/">
            <Button className="button">Go to Blog</Button>
          </Link>
        </div>
      </Layout>
    )
  }
}

export default IndexPage
