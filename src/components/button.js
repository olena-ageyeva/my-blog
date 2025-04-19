import React from "react"
import styled from "styled-components"
import { theme } from "../styles/theme"
import { animationMixins } from "../styles/animations"

const Button = ({ id = "", className = "", onClick = () => { }, children, ...rest }) => {
  return (
    <ButtonWrapper
      {...rest}
      id={id}
      className={className}
      onClick={onClick}
    >
      {children}
    </ButtonWrapper>
  )
}


const ButtonWrapper = styled.button`
  cursor: pointer;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: ${theme.typography.letterSpacing.wide};
  padding: ${theme.spacing.small} ${theme.spacing.medium};
  margin: ${theme.spacing.small} 0;
  font-size: ${theme.typography.fontSizes.small};
  border-radius: 8px;
  background: linear-gradient(135deg, ${theme.colors.primary}, #555);
  color: ${theme.colors.background.primary};
  border: none;
  font-weight: light;
  box-shadow: ${theme.shadows.small};

  ${animationMixins.buttonHover}
`

export default Button
