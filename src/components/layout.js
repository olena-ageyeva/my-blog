import React, { useEffect } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { GlobalStyle } from "../styles/GlobalStyle"
import { rhythm } from "../utils/typography"
import { useLocation } from '@reach/router';
import { FaLock, FaSignOutAlt } from "react-icons/fa"
import { useGlobalState } from "../context/GlobalContext"
import { useAuth0 } from "@auth0/auth0-react";

const AUTH_ADMIN = process.env.GATSBY_ADMIN_EMAIL;

const Layout = ({ title, children }) => {
  console.log('Layout component called', { title, children: !!children });

  const location = useLocation();
  const isHomePage = location.pathname === "/"


  const { state, setUsername, setLoginStatus, setIsAdmin } = useGlobalState()
  const { username, isAdmin } = state;

  // Use Auth0 with proper error handling
  const auth0 = useAuth0();
  console.log('Auth0 hook result:', auth0);

  // Extract values safely with fallbacks
  const user = auth0?.user || null;
  const isAuthenticated = auth0?.isAuthenticated || false;
  const isLoading = auth0?.isLoading || false;
  const loginWithRedirect = auth0?.loginWithRedirect || (() => {
    console.log('Auth0 loginWithRedirect not available');
  });
  const logout = auth0?.logout || (() => {
    console.log('Auth0 logout not available');
  });

  console.log('Auth0 state:', { user, isAuthenticated, isLoading });

  // All hooks must be called before any conditional returns
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedInUser = localStorage.getItem("username")
      setLoginStatus(!!loggedInUser)
      setUsername(loggedInUser || "")
    }
  }, [setLoginStatus, setUsername])

  useEffect(() => {
    if (isAuthenticated && user) {
      setLoginStatus(true);
      setUsername(user.name || user.email || "User");
      setIsAdmin(user.email === AUTH_ADMIN);
      localStorage.setItem("username", user.name || user.email || "User");
      localStorage.setItem("isAdmin", user.email === AUTH_ADMIN);
    } else {
      setLoginStatus(false);
      setUsername("");
      setIsAdmin(false);
    }
  }, [isAuthenticated, user, setLoginStatus, setUsername, isAdmin, setIsAdmin]);

  // Show loading state if Auth0 is still initializing
  if (isLoading) {
    console.log('Auth0 is loading, showing loading state');
    return (
      <Wrapper>
        <GlobalStyle />
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Loading...</h2>
          <p>Initializing authentication...</p>
        </div>
      </Wrapper>
    );
  }

  const logoutWithRedirect = () => {
    if (typeof window !== 'undefined') {
      logout({
        logoutParams: {
          returnTo: window.location.origin + '/blog'
        }
      });
    }
  };







  return (
    <Wrapper>
      <GlobalStyle />
      {isAuthenticated ? (
        <AuthBanner>
          <BannerContent>
            {user?.picture &&
              <>
                <img src={user.picture} alt={username} style={{ width: '24px', height: '24px', borderRadius: '50%', margin: '0 8px 0 0' }} />
              </>
            }

            <span>
              {`Welcome, ${username}!   `}
            </span>
            <AuthLink
              onClick={logoutWithRedirect}
            >
              <FaSignOutAlt style={{ fontSize: '0.8rem', verticalAlign: `middle`, marginBottom: `4px` }} /> Sign out
            </AuthLink>

          </BannerContent>
        </AuthBanner>
      ) : (
        <AuthBanner>
          <BannerContent>
            <span>
              <FaLock style={{ marginRight: '6px', fontSize: '0.8rem', verticalAlign: `middle`, marginBottom: `4px` }} />
              {/* {`To see more posts   `}<StyledLink to={`/login?returnTo=${encodeURIComponent(location.pathname)}`}> Login</StyledLink> / <StyledLink to={`/register?returnTo=${encodeURIComponent(location.pathname)}`}>Sign up</StyledLink></span> */}

              {`To see more posts   `}<AuthLink onClick={() => loginWithRedirect({
                appState: { returnTo: typeof window !== 'undefined' ? window.location.pathname : location.pathname }
              })}>Login / Sign Up</AuthLink> </span>
          </BannerContent>
        </AuthBanner>
      )}
      <Header>
        <HeaderContent>
          <TitleLink to="/blog">
            <Title className="site-title">{title}</Title>
          </TitleLink>
        </HeaderContent>
      </Header>
      <Main isHomePage={isHomePage}>{children}</Main>
      <Footer>
        © {new Date().getFullYear()}
      </Footer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const AuthBanner = styled.div`
  background-color: var(--color-banner);
  border-bottom: 1px solid var(--color-border);
  padding: 6px 0;
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  width: 100%;
  // display: flex;
  // justify-content: center;
  text-align: center;
`

const BannerContent = styled.div`
  display: inline-flex;
  align-items: center;
  align-text: center;
  width: 100%;
  // max-width: ${rhythm(32)};
  padding: 0 ${rhythm(1)};
  justify-content: center;
  align-items: center;
  gap: 2px;
`

const AuthLink = styled.span`
  color: var(--color-text-secondary);
  text-decoration: none;
  box-shadow: none;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0;
  margin: 0;
  margin-left: 16px;

 &:hover {
    color: var(--color-secondary);
  }
`

const Header = styled.header`
     z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`

const HeaderContent = styled.div`
  width: 100%;
  // max-width: ${rhythm(32)};
  // padding: 0 ${rhythm(1)};
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
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
  font-size: ${rhythm(0.5)};
`

export default Layout
