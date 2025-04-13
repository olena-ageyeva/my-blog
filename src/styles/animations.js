import { keyframes, css } from 'styled-components'
import { theme } from './theme'

export const animations = {
  fadeIn: keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
  `,
  
  slideUp: keyframes`
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  `,

  rotate360: keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `,

  typing: keyframes`
    from { width: 0; }
    to { width: 40rem; }
  `,

  blink: keyframes`
    from { border-color: rgba(0, 255, 0, 0.75); }
    to { border-color: transparent; }
  `,

  float: keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  `
}

export const transitions = {
  default: 'all 0.3s ease',
  slow: 'all 0.6s ease-in-out',
  bounce: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
}

// Reusable animation mixins
export const animationMixins = {
  fadeIn: css`
    animation: ${animations.fadeIn} 0.3s ease-in;
  `,
  
  buttonHover: css`
    transition: ${transitions.default};
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
    }
    &:active {
      transform: translateY(1px);
    }
  `,

  smoothReveal: css`
    opacity: 0;
    transform: translateY(20px);
    animation: ${animations.slideUp} 0.5s ease-out forwards;
  `
}

export const pageTransitions = {
  fadeUp: css`
    opacity: 0;
    animation: ${animations.slideUp} ${theme.animation.durations.default} ${theme.animation.timingFunctions.smooth};
    animation-fill-mode: forwards;
  `,
  
  stagger: (delay = 0) => css`
    opacity: 0;
    animation: ${animations.fadeIn} ${theme.animation.durations.default} ${theme.animation.timingFunctions.smooth};
    animation-fill-mode: forwards;
    animation-delay: ${delay}s;
  `
}

export const hoverEffects = {
  grow: css`
    transition: transform ${theme.animation.durations.fast} ${theme.animation.timingFunctions.default};
    &:hover {
      transform: scale(1.05);
    }
  `,
  
  lift: css`
    transition: all ${theme.animation.durations.fast} ${theme.animation.timingFunctions.bounce};
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${theme.shadows.medium};
    }
  `
}

