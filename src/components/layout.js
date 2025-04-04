import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    // const rootPath = `${__PATH_PREFIX__}/`
    // const blogPath = `${__PATH_PREFIX__}/blog/`

    const isNews = location.pathname.includes("/news")
    const isBlog = location.pathname.includes("/blog")

    const header = (
      <h1
        style={{
          ...scale(1.2),
          marginBottom: rhythm(1.2),
          marginTop: 0,
          float: isNews ? "left" : "center"
        }}        
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={isBlog || isNews ? `/blog/` : "/"}
        >
          {title}
        </Link>

      </h1>
    )

    return (
      <Wrapper>
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: isNews ? "100%" : rhythm(24)
          }}
        >
          <header>{header}</header>
          <main>{children}</main>
        </div>
        <Footer style={{display: isNews ? "none" : "block"}}>
          © {new Date().getFullYear()}
          <br />
          Built with {` `} <a href="https://www.gatsbyjs.org">Gatsby</a> ~
          Powered with {` `} <a href="https://www.netlify.com/">Netlify</a>
        </Footer>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  font-size: 1.2em;
  
  padding: 1em;

  header h1 {    
    position: relative;
    z-index: 10;      
  a {
    font-size: 3rem;    
  }  
}
`

const Footer = styled.footer`
  text-align: center;
  margin: 24px auto;
`

export default Layout
