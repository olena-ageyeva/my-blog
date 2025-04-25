import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { DiscussionEmbed } from "disqus-react"
import MenuButton from "../components/menu-button/menu-button"
import "./blog-post.css"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SideMenu from "../components/side-menu/side-menu"

const PostNav = ({ previous, next }) => (
  <nav className="post-nav">
    <div className="circle"></div>
    <div className="line left-line"></div>
    <div className="line right-line"></div>
    <ul className="post-nav__list">
      <li className="post-nav__item post-nav__item--prev">
        {previous && (
          <Link to={`/blog${previous.fields.slug}`} rel="prev">
            <span className="post-nav__full-title">
              <span className="nav-arrow left"></span> {previous.frontmatter.title}
            </span>
            <span className="post-nav__short-title">
              <span className="nav-arrow left"></span> Prev
            </span>
          </Link>
        )}
      </li>
      <li className="post-nav__item">
        <Link to="/blog/">
          <span className="post-nav__full-title">
            <div className="nav-all">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            All
          </span>
          <span className="post-nav__short-title">
            <div className="nav-all">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            All
          </span>
        </Link>
      </li>
      <li className="post-nav__item post-nav__item--next">
        {next && (
          <Link to={`/blog${next.fields.slug}`} rel="next">
            <span className="post-nav__full-title">
              {next.frontmatter.title} <span className="nav-arrow right"></span>
            </span>
            <span className="post-nav__short-title">
              Next <span className="nav-arrow right"></span>
            </span>
          </Link>
        )}
      </li>
    </ul>
    <div className="hide top"></div>
    <div className="hide bottom"></div>
  </nav>
);

const BlogPostTemplate = ({ data, pageContext, location }) => {
  // Get initial state from body class if it exists
  const [isPanelOpen, setIsPanelOpen] = useState(
    typeof document !== 'undefined' ?
    document.body.classList.contains('show-nav') :
    false
  )
  const post = data.mdx
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  const { title, description, slug } = post.frontmatter

  const disqusConfig = {
    shortname: 'olena-ageyeva',
    config: { identifier: slug, title },
  }

  // Only reset panel state when mounting if we're coming from /blog
  React.useEffect(() => {
    if (location.state?.from === '/blog' || !location.state) {
      setIsPanelOpen(false)
      document.body.classList.remove('show-nav')
    }
    return () => {
      // Only cleanup when navigating away from blog posts
      if (!location.pathname.includes('/blog/')) {
        setIsPanelOpen(false)
        document.body.classList.remove('show-nav')
      }
    }
  }, [location])

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen)
    document.body.classList.toggle('show-nav')
  }

  return (
    <Layout location={location} title={siteTitle}>
      <div className={isPanelOpen ? 'page-wrapper menu-open' : 'page-wrapper'}>
        <SEO
          title={title}
          description={description || post.excerpt}
        />
        <div className="post">
        <MenuButton onClick={togglePanel} />
        <PostNav previous={previous} next={next} />
        <div className="panel">
          <h1 className="post-title">
            {title.split(' ').map(word =>
              word.toLowerCase() === 'and' || word.toLowerCase() === 'or' || word.toLowerCase() === 'the' ||
                word.toLowerCase() === 'in' || word.toLowerCase() === 'on' || word.toLowerCase() === 'at' ||
                word.toLowerCase() === 'to' || word.toLowerCase() === 'for' || word.toLowerCase() === 'of' ||
                word.toLowerCase() === 'with'
                ? word.toLowerCase()
                : word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')}
          </h1>
          <p className="post-date">{post.frontmatter.date}</p>
          <div className="post-content">
            <MDXRenderer>{post.body}</MDXRenderer>
          </div>
          <hr className="post-divider" />
          <Bio />
          <DiscussionEmbed {...disqusConfig} />
        </div>
        <SideMenu currentSlug={location.pathname.replace('/blog', '')} />
        </div>
      </div>
    </Layout>
  )
}


export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      fields {
        timeToRead
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
