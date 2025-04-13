import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { GlobalStyle } from "../styles/GlobalStyle"
import { rhythm } from "../utils/typography"

const Layout = ({ location, title, children }) => {
  const isHomePage = location.pathname === "/"

  return (
    <Wrapper>
      <GlobalStyle />
      <Header>
        <TitleLink to="/blog">
          <Title>{title}</Title>
        </TitleLink>
      </Header>
      <Main isHomePage={isHomePage}>{children}</Main>
      <Footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </Footer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Header = styled.header`
  padding: ${rhythm(1)};
  z-index: 10;
`

const TitleLink = styled(Link)`
  box-shadow: none;
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
  }
`

const Title = styled.h1`
  // margin-bottom: ${rhythm(1)};
  margin-top: 0;
`

const Main = styled.main`
  flex: 1;
  padding: ${rhythm(1)};
  max-width: ${props => props.isHomePage ? rhythm(24) : rhythm(32)};
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    max-width: ${rhythm(24)};
    padding: ${rhythm(1)};
  }
`

const Footer = styled.footer`
  padding: ${rhythm(1)};
  text-align: center;
`

export default Layout
