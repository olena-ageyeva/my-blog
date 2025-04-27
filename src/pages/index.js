import React from "react"
import { Link } from "gatsby"
import { onPageRender } from "../utils/index/index"
import pifagoras from "../img/pifagoras-2.png"
import styled from "styled-components"
import { FaHome, FaBook } from "react-icons/fa"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import AnimatedButton from "../components/animated-button/animated-button"

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
          <div className="header">
            {/* Desktop: Animated Button */}
            <div className="desktop-nav">
              <AnimatedButton>
                <StyledLink to="/blog/">
                  <div className="button-content">
                    <FaBook className="desktop-book-icon" />
                    Go to Blog
                  </div>
                </StyledLink>
              </AnimatedButton>
            </div>

            {/* Mobile: Simple Icon */}
            <div className="mobile-nav">
              <Link to="/blog/" className="styled-link">
                <div className="book-icon-button">
                  <FaBook className="book-icon" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default IndexPage
