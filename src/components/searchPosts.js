
import React, { useState } from "react"
import { Link } from "gatsby"
// import styled from "styled-components"
import { useFlexSearch } from "react-use-flexsearch"
import * as queryString from "query-string"

// import { rhythm } from "../utils/typography"

const SearchedPosts = ({ results }) =>
  results.length > 0 ? (
    results.map(node => {
      const date = node.date
      const title = node.title || node.slug
      const description = node.description
      const excerpt = node.excerpt
      const slug = node.slug
      const timeToRead = node.timeToRead || 1

      return (
        <Link to={`/blog${slug}`} className="card-link">
          <div key={slug} className="blog-post-item--card">
            <h3>
              {title}
            </h3>
            <small>{date} • ⏱️ {timeToRead} min read</small>
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

const AllPosts = ({ posts }) => (
  <div style={{ margin: "20px 0 40px" }}>
    {posts.map(({ node }) => {
      const title = node.frontmatter.title || node.fields.slug
      const timeToRead = node.fields.timeToRead || 1
      return (
        <Link to={`/blog${node.fields.slug}`} className="card-link">
          <div key={node.fields.slug} className="blog-post-item--card">
            <h3>
              {title}
            </h3>
            <small>{node.frontmatter.date} • ⏱️ {timeToRead} min read</small>
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
      {query ? <SearchedPosts results={results} /> : <AllPosts posts={posts} />}
    </>
  )
}

export default SearchPosts
