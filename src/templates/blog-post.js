import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { DiscussionEmbed } from "disqus-react"
import { useGlobalState } from "../context/GlobalContext"
import "./blog-post.css"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SideMenu from "../components/side-menu/side-menu"
import PostNavigationAnimated from "../components/post-nav/post-nav-animated"


const BlogPostTemplate = ({ data, pageContext, location }) => {
  const { setNavAnimation } = useGlobalState();

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

  // Set animation to true when component mounts
  useEffect(() => {
    // setNavAnimation(true);

    // Reset animation flag when unmounting
    return () => {
      setNavAnimation(false);
    };
  }, [setNavAnimation]);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen)
    document.body.classList.toggle('show-nav')
  }

  return (
    <Layout location={location} title={siteTitle}>
      <div className={isPanelOpen ? 'page-wrapper menu-open' : 'page-wrapper'}>
        <SEO title={title} description={description || post.excerpt} />
        <div className="post">
          <PostNavigationAnimated
            previous={previous}
            next={next}
            onClick={togglePanel}
            isPanelOpen={isPanelOpen}
          />
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
