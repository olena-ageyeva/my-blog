import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { DiscussionEmbed } from "disqus-react"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import { rhythm, scale } from "../utils/typography"



class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    const { title, description, slug } = post.frontmatter

    const disqusConfig = {
      shortname: process.env.GATSBY_DISQUS_NAME,
      config: { identifier: slug, title },
    }

    const post_nav = () => (
      <nav className="post_nav">
        <ul className="post-nav__list">
          <li className="post-nav__item post-nav__item--prev">
            {previous && (
              <Link to={`/blog${previous.fields.slug}`} rel="prev">
                <span className="post-nav__full-title">← {previous.frontmatter.title}</span>
                <span className="post-nav__short-title">← Prev</span>
              </Link>
            )}
          </li>
          <li className="post-nav__item">
            <Link to="/blog/">See All</Link>
          </li>
          <li className="post-nav__item post-nav__item--next">
            {next && (
              <Link to={`/blog${next.fields.slug}`} rel="next">
                <span className="post-nav__full-title">{next.frontmatter.title} →</span>
                <span className="post-nav__short-title">Next →</span>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    )

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={title}
          description={description || post.excerpt}
        />
        {post_nav()}
        <h1 className="post-title">{title}</h1>
        <p className="post-date">{post.frontmatter.date}</p>
        <div className="post-content">
          <MDXRenderer>{post.body}</MDXRenderer>
        </div>
        <hr className="post-divider" />
        <Bio />
        {post_nav()}
        <DiscussionEmbed {...disqusConfig} />
      </Layout>
    )
  }
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
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
