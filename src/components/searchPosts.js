
import React, { useState } from "react"
import { Link } from "gatsby"
import { useFlexSearch } from "react-use-flexsearch"
import * as queryString from "query-string"
import { FaGlobe, FaPen, FaLock } from "react-icons/fa"
import { useGlobalState } from "../context/GlobalContext"



const SearchedPosts = ({ results }) =>
  results.length > 0 ? (
    results.map(node => {
      const date = node.date
      const title = node.title || node.slug
      const description = node.description
      const excerpt = node.excerpt
      const slug = node.slug
      const timeToRead = node.timeToRead || 1
      let VisibilityIcon;
      const visibility = node.frontmatter.visibility;
      switch (visibility) {
        case "public":
          //visibilityIcon = '🌐';
          VisibilityIcon = <FaGlobe style={{ marginRight: '6px', fontSize: '0.8rem', verticalAlign: `middle`, marginBottom: `4px` }} />
          break;
        case "private":
          //visibilityIcon = '🔒';
          VisibilityIcon = <FaLock style={{ marginRight: '6px', fontSize: '0.8rem', verticalAlign: `middle`, marginBottom: `4px` }} />
          break;
        case "draft":
          //visibilityIcon = '✏️';
          VisibilityIcon = <FaPen style={{ marginRight: '6px', fontSize: '0.8rem', verticalAlign: `middle`, marginBottom: `4px` }} />
          break;
        default:
          //visibilityIcon = '🔒';
          VisibilityIcon = <FaLock style={{ marginRight: '6px', fontSize: '0.8rem', verticalAlign: `middle`, marginBottom: `4px` }} />
          break;
      }


      return (
        <Link to={`/blog${slug}`} className="card-link">
          <div key={slug} className="blog-post-item--card">
            <h3>
              <small><span className="visibility-icon">{VisibilityIcon}</span></small>
              {title}
            </h3>
            <small>{VisibilityIcon} {date} • <span role="img" aria-label="clock">⏱️</span> {timeToRead} min read</small>
            <p className="post-description">
              {description || excerpt}
              <span className="read-more">Read More
                <span class="nav-arrow right"></span>
              </span>
            </p>
          </div>
        </Link>
      )
    })
  ) : (
    <p style={{ textAlign: "center" }}>
      Sorry, couldn't find any posts matching this search.
    </p>
  )

const AllPosts = ({ posts, isLoggedIn }) => (
  <div style={{ margin: "20px 0 40px" }}>
    {posts.map(({ node }) => {

      const { frontmatter, fields } = node;
      const visibility = node.frontmatter.visibility;
      if (!isLoggedIn && visibility !== "public") {
        return null;
      }
      const title = frontmatter.title || fields.slug
      const timeToRead = fields.timeToRead || 1
      let VisibilityIcon;

      switch (visibility) {
        case "public":
          VisibilityIcon = <FaGlobe style={{ marginRight: '6px', fontSize: '0.8rem', verticalAlign: `middle`, marginBottom: `4px` }} />
          break;
        case "private":
          VisibilityIcon = <FaLock style={{ marginRight: '6px', fontSize: '0.8rem', verticalAlign: `middle`, marginBottom: `4px` }} />
          break;
        case "draft":
          VisibilityIcon = <FaPen style={{ marginRight: '6px', fontSize: '0.8rem', verticalAlign: `middle`, marginBottom: `4px` }} />
          break;
        default:
          VisibilityIcon = <FaLock style={{ marginRight: '6px', fontSize: '0.8rem', verticalAlign: `middle`, marginBottom: `4px` }} />
          break;
      }

      return (
        <Link to={`/blog${node.fields.slug}`} className="card-link">
          <div key={node.fields.slug} className="blog-post-item--card">
            <h3>
              {/* <small><span className="visibility-icon">{visibilityIcon}</span></small> */}
              {title}
            </h3>
            <small><span role="img" aria-label="visibility">{VisibilityIcon}</span>{node.frontmatter.date} •<span role="img" aria-label="clock">⏱️</span> {timeToRead} min read</small>
            <p className="post-description">
              {node.frontmatter.description || node.excerpt}
              <span className="read-more">Read More
                <span class="nav-arrow right read-more-icon"></span>
              </span>
            </p>
          </div>
        </Link>
      )
    })}
  </div>
)

const SearchPosts = ({ posts, localSearchBlog, location, navigate }) => {
  const { search } = queryString.parse(location.search)
  const [query, setQuery] = useState(search || "")
  const { state } = useGlobalState()
  const { isLoggedIn } = state;


  const results = useFlexSearch(
    query,
    localSearchBlog.index,
    JSON.parse(localSearchBlog.store)
  )

  return (
    <>
      <div className="search-bar">
        <svg
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 18"
        >
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
        </svg>
        <input
          id="search"
          type="search"
          placeholder="Search all posts"
          value={query}
          onChange={e => {
            navigate(
              e.target.value ? `/blog/?search=${e.target.value}` : "/blog/"
            )
            setQuery(e.target.value)
          }}
        />
      </div>
      {query ? <SearchedPosts results={results} isLoggedIn={isLoggedIn} /> : <AllPosts posts={posts} isLoggedIn={isLoggedIn} />}
    </>
  )
}

export default SearchPosts
