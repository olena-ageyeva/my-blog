import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { GlobalStyle } from "../styles/GlobalStyle"
import { rhythm } from "../utils/typography"
import { useLocation } from '@reach/router';

const Layout = ({ title, children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/"

  return (
    <Wrapper>
      <GlobalStyle />
      <Header>
        <TitleLink to="/blog">
          <Title className="site-title">{title}</Title>
        </TitleLink>
      </Header>
      <Main isHomePage={isHomePage}>{children}</Main>
      <Footer>
        © {new Date().getFullYear()}
        {/* , Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a> */}
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
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
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
  margin-top: 0;
  color: var(--color-text-light); /* Using the light gray color (#999) */
`

const Main = styled.main`
  flex: 1;
  padding-inline: ${rhythm(1)};
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
  font-size: ${rhythm(0.75)};
`

export default Layout
