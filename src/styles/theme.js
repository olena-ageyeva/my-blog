export const theme = {
  colors: {
    primary: '#333',
    secondary: '#7FB7E4',
    text: {
      primary: '#333',
      secondary: 'hsla(0, 0%, 0%, 0.59)',
      muted: '#666',
    },
    background: {
      primary: '#fff',
      secondary: '#f5f5f5',
    }
  },
  typography: {
    fonts: {
      primary: '"Open Sans", sans-serif',
      secondary: '"Source Code Pro", monospace',
      heading: 'Montserrat, sans-serif',
      body: 'Merriweather, serif'
    },
    fontSizes: {
      small: '0.9rem',
      body: '1.2rem',
      large: '1.5rem',
      heading: '3rem'
    },
    letterSpacing: {
      normal: '0.1em',
      wide: '0.2em'
    }
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px'
  },
  spacing: {
    small: '0.5rem',
    medium: '1rem',
    large: '2rem'
  },
  shadows: {
    small: '4px 8px 4px 0 rgba(0, 0, 0, 0.1)',
    medium: '4px 8px 16px 0 rgba(0, 0, 0, 0.1)',
    large: '10px 10px 15px 0 rgba(0, 0, 0, 0.3)'
  },
  animation: {
    durations: {
      fast: '0.2s',
      default: '0.3s',
      slow: '0.6s',
      verySlow: '1s'
    },
    timingFunctions: {
      default: 'ease',
      smooth: 'ease-in-out',
      sharp: 'ease-in',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  },
  zIndex: {
    modal: 1000,
    overlay: 900,
    dropdown: 800,
    header: 700,
    footer: 600
  }
}

