import React, { useState, useEffect, useCallback } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import DateRangeSelector from "../date-range-selector/date-range-selector"
import PaperClip from "../paper-clip/paper-clip"
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
  const allPosts = data.allMdx.edges;
  const [filteredPosts, setFilteredPosts] = useState(allPosts);
  const [currentPage, setCurrentPage] = useState(1);

  // Get date range - from earliest post to today
  const lastPost = allPosts[allPosts.length - 1];
  const earliestDate = lastPost ? new Date(lastPost.node.frontmatter.date) : new Date();
  const today = new Date();

  // Initialize dateRange from localStorage or default values
  const [dateRange, setDateRange] = useState(() => {
    const savedRange = localStorage.getItem('blogDateRange');
    if (savedRange) {
      const parsed = JSON.parse(savedRange);
      return {
        start: new Date(parsed.start),
        end: new Date(parsed.end)
      };
    }
    return {
      start: earliestDate,
      end: today
    };
  });


  const filterPosts = useCallback((start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Set to start of day for start date and end of day for end date
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    const filtered = allPosts.filter(({ node }) => {
      const postDate = new Date(node.frontmatter.date);
      return postDate >= startDate && postDate <= endDate;
    });

    setFilteredPosts(filtered);
  }, [allPosts]);

  // Apply initial filter on mount
  useEffect(() => {
    filterPosts(dateRange.start, dateRange.end);
  }, [dateRange, filterPosts]);

  function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    })
  }

  const handleDateRangeChange = (start, end) => {
    const newRange = { start, end };
    setDateRange(newRange);

    // Save to localStorage
    localStorage.setItem('blogDateRange', JSON.stringify({
      start: start.toISOString(),
      end: end.toISOString()
    }));

    filterPosts(start, end);
    setCurrentPage(1);
  };

  // Decode the URL-encoded currentSlug
  const decodedCurrentSlug = decodeURIComponent(currentSlug);

  // Find the index of the current post and set the correct page
  useEffect(() => {
    const currentPostIndex = filteredPosts.findIndex(
      ({ node }) => node.fields.slug === decodedCurrentSlug
    );

    if (currentPostIndex !== -1) {
      const pageNumber = Math.floor(currentPostIndex / POSTS_PER_PAGE) + 1;
      setCurrentPage(pageNumber);
    }
  }, [decodedCurrentSlug, filteredPosts]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="side-menu">
      <div className="date-range">
        <span>{formatDate(dateRange.start)}</span>
        <span className="date-separator">—</span>
        <span>{formatDate(dateRange.end)}</span>
        <DateRangeSelector
          earliestDate={earliestDate}
          initialDateRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
        />
      </div>

      {filteredPosts.length === 0 ? (
        <p className="no-posts">No posts found in selected date range</p>
      ) : (
        <>
          <ul>
            {currentPosts.map(({ node }) => {
              const isCurrent = decodedCurrentSlug === node.fields.slug;
              return (
                <li
                  key={node.fields.slug}
                  className={isCurrent ? 'current' : ''}
                >
                  <Link to={`/blog${node.fields.slug}`}>
                    {node.frontmatter.title}
                  </Link>
                  <PaperClip /> {/* Add PaperClip to all items */}
                </li>
              )
            })}
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
        </>
      )}
    </div>
  )
}

export default SideMenu
