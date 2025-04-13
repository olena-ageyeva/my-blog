import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
// import { rhythm } from "../utils/typography"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import SearchPosts from "../components/searchPosts"

const StyledLink = styled(Link)`
  box-shadow: none;
`

const breakpoints = {
  mobile: '768px',
};

const Wrapper = styled.div`
  @media (max-width: ${breakpoints.mobile}) {
     display: none;
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
            <Button>Go Home</Button>
          </StyledLink>
        </div>
        <Wrapper>
          <StyledLink to="/news">
            <div id="parent">
              {`Check out my 100 days css challenge --->>>`}
              <div id="border"></div>
            </div>
            <div id="animated_div">CSS</div>
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
