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

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <Container>
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                minWidth: 50,
                borderRadius: `100%`,
              }}
              imgStyle={{
                borderRadius: `50%`,
              }}
            />
            <p class="title">
              by <strong>{author}</strong> <br />
              <a href={social.cto}>Tech Strategist</a> {"-"}
              <a href={social.website}>Web Developer</a> {"-"}
              <a href={social.mentor}>Mentor</a>  {"-"}
              <a href="">Educator</a>
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
        }
      }
    }
  }
`

const Container = styled.div`  
  display: flex;
  
  @media (max-width: ${breakpoints.mobile}) {    
     display: block;
     max-width: 64%;
  }   
`

export default Bio
