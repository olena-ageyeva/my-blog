/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <div className="bio-container">
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              className="bio-image"
              imgStyle={{
                borderRadius: `50%`,
              }}
            />
            <p className="bio-title">
              by <span className="bio-name">
                <span className="bio-desktop">{author}</span>
                <span className="bio-mobile">Olena A</span>
              </span>
              <br />

              <span className="bio-desktop bio-role">
                <a href={social.linkedIn} target="_blank" rel="noopener noreferrer">Engineering Leader</a> | Driving Innovation & Efficiency
              </span>
              <span className="bio-mobile bio-role">
                <a href={social.linkedIn} target="_blank" rel="noopener noreferrer">
                  Engineering Lead
                </a>
              </span>
            </p>
          </div>
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
