
import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import SearchPosts from "../components/searchPosts"

const StyledLink = styled(Link)`
  box-shadow: none;

  :hover {
    text-decoration: none;
  }
`

const breakpoints = {
  mobile: '768px',
};

const Wrapper = styled.div`
  @media (max-width: ${breakpoints.mobile}) {
     display: none;
  }
`

const DesktopSpan = styled.span`
  display: inline;
  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`

const MobileSpan = styled.span`
  display: none;
  @media (max-width: ${breakpoints.mobile}) {
    display: inline;
  }
`

class Blog extends React.Component {
  render() {
    const { data, navigate, location } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMdx.edges
    const localSearchBlog = data.localSearchBlog

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <div className="header">
          <Bio />
          <StyledLink to="/">
            <Button>
              <DesktopSpan>Go Home</DesktopSpan>
              <MobileSpan>Home</MobileSpan>
            </Button>
          </StyledLink>
        </div>
        <Wrapper>
          <StyledLink to="/news">
            <div className="animation_wrapper">
              <div className="animated_div">CSS</div>
              <div id="parent">
                {`Check out my 100 days CSS Challenge --->>>`}
                <div id="border"></div>
              </div>
            </div>
          </StyledLink>
        </Wrapper>
        <br />
        <SearchPosts
          posts={posts}
          localSearchBlog={localSearchBlog}
          navigate={navigate}
          location={location}
        />
      </Layout>
    )
  }
}

export default Blog

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    localSearchBlog {
      index
      store
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
            timeToRead
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
