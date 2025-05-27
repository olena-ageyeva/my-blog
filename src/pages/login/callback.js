import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import { useAuth0 } from '@auth0/auth0-react';
import styled, { keyframes } from 'styled-components';

// Spinner animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  min-height: 200px;
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid var(--color-secondary, #007acc);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 1rem;
`;

const SpinnerText = styled.p`
  color: var(--color-text-secondary, #666);
  font-size: 1rem;
  margin: 0;
`;

// Client-side only component that handles the actual callback
const CallbackHandler = () => {
  const { handleRedirectCallback, isLoading, error } = useAuth0();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await handleRedirectCallback();
        // Redirect to blog after successful authentication
        navigate('/blog');
      } catch (err) {
        console.error('Auth callback error:', err);
        navigate('/blog');
      }
    };

    if (!isLoading && !error) {
      handleCallback();
    }
  }, [handleRedirectCallback, isLoading, error]);

  if (error) {
    return (
      <Layout title="Authentication Error">
        <SEO title="Authentication Error" />
        <div>
          <h1>Authentication Error</h1>
          <p>There was an error during authentication. Redirecting...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Authenticating">
      <SEO title="Authenticating" />
      <SpinnerContainer>
        <Spinner />
        <SpinnerText>Authenticating...</SpinnerText>
      </SpinnerContainer>
    </Layout>
  );
};

// Main component with SSR safety
const CallbackPage = ({ location }) => {
  // Only render the callback handler on the client side
  if (typeof window === 'undefined') {
    return (
      <Layout title="Authenticating">
        <SEO title="Authenticating" />
        <SpinnerContainer>
          <Spinner />
          <SpinnerText>Authenticating...</SpinnerText>
        </SpinnerContainer>
      </Layout>
    );
  }

  return <CallbackHandler />;
};

export default CallbackPage;
