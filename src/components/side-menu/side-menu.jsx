import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import "./side-menu.css"

const SideMenu = ({ currentSlug }) => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              date
            }
          }
        }
      }
    }
  `)

  const POSTS_PER_PAGE = 5;
  const posts = data.allMdx.edges;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  // Get date range - from earliest post to today
  const lastPost = posts[posts.length - 1]; // Get the last (oldest) post
  const earliestDate = lastPost ? new Date(lastPost.node.frontmatter.date) : new Date();
  const today = new Date();

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  // Decode the URL-encoded currentSlug
  const decodedCurrentSlug = decodeURIComponent(currentSlug);

  // Find the index of the current post and set the correct page
  useEffect(() => {
    const currentPostIndex = posts.findIndex(
      ({ node }) => node.fields.slug === decodedCurrentSlug
    );

    if (currentPostIndex !== -1) {
      const pageNumber = Math.floor(currentPostIndex / POSTS_PER_PAGE) + 1;
      setCurrentPage(pageNumber);
    }
  }, [decodedCurrentSlug, posts]);

  // Get current posts
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="side-menu">
      <div className="date-range">
        <span>{formatDate(earliestDate)}</span>
        <span className="date-separator">—</span>
        <span>{formatDate(today)}</span>
      </div>

      <ul>
        {currentPosts.map(({ node }) => (
          <li
            key={node.fields.slug}
            className={decodedCurrentSlug === node.fields.slug ? 'current' : ''}
          >
            <Link to={`/blog${node.fields.slug}`}>
              {node.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button
          className="pagination-arrow left"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <span className="nav-arrow left"></span>
        </button>

        <span className="page-indicator">
          {currentPage} / {totalPages}
        </span>

        <button
          className="pagination-arrow right"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <span className="nav-arrow right"></span>
        </button>
      </div>
    </div>
  )
}

export default SideMenu
