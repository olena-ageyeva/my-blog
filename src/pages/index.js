import React from "react"
import { Link } from "gatsby"
import { onPageRender } from "../utils/index/index"
import pifagoras from "../img/pifagoras-2.png"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  width: 100%;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`

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
          <div className="quote-wrapper">
            <img src={pifagoras} alt="Author" className="author-image" />
            <blockquote className="blockquote">
              <p className="quote">
                <span className="quote-icon">"</span>
                There is geometry in the humming of the strings, there is music in
                the spacing of the spheres.
              </p>
              <span className="quote_author">
                Pythagoras <em>in Ancient Texts</em>
              </span>
            </blockquote>
          </div>

          <StyledLink to="/blog/">
            <Button className="button">Go to Blog</Button>
          </StyledLink>
        </div>
      </Layout>
    )
  }
}

export default IndexPage
