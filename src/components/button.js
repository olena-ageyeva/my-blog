import React from "react"
import styled from "styled-components"

const Button = ({ id = "", className = "", onClick = () => { }, children, ...rest }) => {
  return (< ButtonWrapper props={rest} id={id} className={className} onClick={onClick}> {children}</ButtonWrapper >)
}


const ButtonWrapper = styled.button`
  cursor: pointer;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 0.2em;
  padding: 5px 15px;
  margin: 10px 0;
  font-size: 0.9rem;
  border-radius: 6px;

  background: linear-gradient(135deg, #333, #555);
  color: white;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: light;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  

  &:hover { 
  transform: translateY(-2px); /* Slight lift effect */
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.25);
  }
  &:active {
  transform: translateY(1px); 
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
}
`

export default Button