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

const breakpoints = {
  mobile: '768px', // Or any size you define as the mobile breakpoint
};

const Container = styled.div`
  display: flex;
  margin-bottom: ${rhythm(1)};
  .title{
   font-size: 1em;
    line-height: 1.5em;
   }

  strong {
    font-size: 1.2em;
  }

  @media (max-width: ${breakpoints.mobile}) {
    display: block;
    max-width: 64%;
  }
`

const StyledImage = styled(Image)`
  margin-right: ${rhythm(1 / 2)};
  margin-bottom: 0;
  min-width: ${rhythm(2)};
  min-height: ${rhythm(2)};
  border-radius: 100%;
`

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <Container>
            <StyledImage
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              imgStyle={{
                borderRadius: `50%`,
              }}
            />
            <p className="title">
              by <strong>{author}</strong> <br />
              {/* <a href={cto}>Tech Strategist</a> {"-"}
              <a href={social.website}>Web Developer</a> {"-"}
              <a href={mentor}>Mentor</a> {"-"}
              <a href={social.mathwell}>Educator</a> */}
              <a href={social.linkedIn} target="_blank" >Engineering Leader</a> | Driving Innovation & Efficiency
            </p>
          </Container>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/olena-circle.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
          website
          mathwell
          linkedIn
          cto
          mentor
        }
      }
    }
  }
`

export default Bio
