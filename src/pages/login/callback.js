import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import { useAuth0 } from '@auth0/auth0-react';

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
      <div>
        <h1>Authenticating...</h1>
        <p>Please wait while we complete your authentication.</p>
      </div>
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
        <div>
          <h1>Authenticating...</h1>
          <p>Please wait while we complete your authentication.</p>
        </div>
      </Layout>
    );
  }

  return <CallbackHandler />;
};

export default CallbackPage;
