
import React from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SearchPosts from "../components/searchPosts"
import { useGlobalState } from "../context/GlobalContext"
import AnimatedButton from "../components/animated-button/animated-button"
import { FaHome } from "react-icons/fa"
import "./blog.css"

const Blog = (props) => {
  const { data, navigate, location } = props
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMdx.edges
  const localSearchBlog = data.localSearchBlog
  const { setNavAnimation, togglePanel } = useGlobalState()

  // Set navigation animation to true and close side menu when the blog page loads
  React.useEffect(() => {
    setNavAnimation(true)

    // Close the side menu if it's open
    if (typeof document !== 'undefined' && document.body.classList.contains('show-nav')) {
      togglePanel(false)
    }
  }, [setNavAnimation, togglePanel])

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <div className="header">
        <Bio />

        {/* Desktop: Animated Button */}
        <div className="desktop-nav">
          <AnimatedButton>
            <Link to="/" className="styled-link">
              <div className="button-content">
                <FaHome className="desktop-home-icon" />
                Go Home
              </div>
            </Link>
          </AnimatedButton>
        </div>

        {/* Mobile: Simple Icon */}
        <div className="mobile-nav">
          <Link to="/" className="styled-link">
            <div className="home-icon-button">
              <FaHome className="home-icon" />
            </div>
          </Link>
        </div>
      </div>
      <div className="css-challenge-wrapper">
        <Link to="/news" className="styled-link">
          <div className="animation_wrapper">
            <div className="animated_div">CSS</div>
            <div id="parent">
              {`Check out my 100 days CSS Challenge --->>>`}
              <div id="border"></div>
            </div>
          </div>
        </Link>
      </div>
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
