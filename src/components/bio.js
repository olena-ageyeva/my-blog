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

  .title {
    font-size: 1em;
    line-height: 1.5em;
  }

  strong {
    font-size: 1.2em;
  }
`

const DesktopSpan = styled.span`
  display: inline;

  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`

const MobileSpan = styled.span`
  display: none;

  @media (max-width: ${breakpoints.mobile}) {
    display: inline;
  }
`

const StyledImage = styled(Image)`
  margin-right: ${rhythm(1/2)};
  margin-bottom: 0;
  min-width: 50px;

  @media (max-width: ${breakpoints.mobile}) {
    width: 40px !important;
    height: 40px !important;
  }
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
              by <strong>
                <DesktopSpan>{author}</DesktopSpan>
                <MobileSpan>Olena A</MobileSpan>
              </strong>
              <br />
              <a href={social.linkedIn} target="_blank" rel="noopener noreferrer">
                <DesktopSpan>Engineering Leader | Driving Innovation & Efficiency</DesktopSpan>
                <MobileSpan>Engineering Lead</MobileSpan>
              </a>
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
