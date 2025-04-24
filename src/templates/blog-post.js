import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { DiscussionEmbed } from "disqus-react"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import { rhythm, scale } from "../utils/typography"



const BlogPostTemplate = ({ data, pageContext, location }) => {
  const [status, setStatus] = useState('close')

  const post = data.mdx
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  const { title, description, slug } = post.frontmatter

  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: slug, title },
  }

  // const handleClick = () => {
  //   setStatus(status === 'close' ? 'open' : 'close')
  // }

  const PostNav = () => (
    <nav className={`post-nav ${status === 'open' ? 'nav-open' : 'nav-open'}`} >

      <div className="circle"></div>
      <div class="line left-line"></div>
      <div class="line right-line"></div>

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

      <div class="hide top"></div>
      <div class="hide bottom"></div>

    </nav>
  )

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={title}
        description={description || post.excerpt}
      />
      <PostNav />
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
