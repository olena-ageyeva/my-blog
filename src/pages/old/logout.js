import React, { useEffect } from "react"
import { navigate } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import styled from "styled-components"

const LogoutPage = ({ location }) => {
  // Get return URL from query parameters
  const params = new URLSearchParams(location.search)
  const returnTo = params.get('returnTo') || "/"

  useEffect(() => {
    // Clear user data from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem("username")

      // Redirect to return URL after a short delay
      const timer = setTimeout(() => {
        navigate(returnTo)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [returnTo])

  return (
    <Layout location={location} title="Signing Out">
      <SEO title="Signing Out" />
      <LogoutContainer>
        <h1>Signing Out</h1>
        <Message>
          You have been successfully signed out.
          <br />
          Redirecting you back...
        </Message>
      </LogoutContainer>
    </Layout>
  )
}

const LogoutContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem 1rem;
  text-align: center;
`

const Message = styled.p`
  margin: 2rem 0;
  color: var(--color-text-secondary);
  line-height: 1.6;
`

export default LogoutPage
