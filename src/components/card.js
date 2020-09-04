/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"

import { rhythm } from "../utils/typography"

function Card({ repo, about, platform, author, photo }) {
  return (
    <Container>
      <a href={`https://${platform}/${repo}`} target="_blank">
        <div className="github_card">
          <div className="github_info">
            <h2>{repo}</h2>
            {about} <br />
            {platform}
            <br />
          </div>
          <img src={photo} alt="author" title={author} />
        </div>
      </a>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  font-family: medium-content-sans-serif-font, "Lucida Grande",
    "Lucida Sans Unicode", "Lucida Sans", Geneva, Arial, sans-serif;
  box-shadow: inset 0 0 0 1px rgba(230, 230, 230, 1);

  .github_card {
    // border: 1px solid black;
    width: 100%;
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    justify-content: space-between;
  }
  .github_info {
    padding: 1rem;
  }

  img {
    padding: 0;
    width: 25%;
    margin: 0;
  }
  h2 {
    font-size: 1.1rem;
    margin: 1rem 0;
    color: #292929;
  }

  a {
    box-shadow: none;
    width: 100%;
    color: #757575;
  }
`

export default Card
