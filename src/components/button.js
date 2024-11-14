import React from "react"
import styled from "styled-components"

const Button = props => {
  const {id="", className=""}= props;
  console.log("********************************button", props)
  return(< ButtonWrapper props={props} id={id} className={className}> {props.children}</ButtonWrapper >)
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

  // display: block;
  border: none;  
  box-sizing: border-box;
  text-decoration: none;    

  background: ${props => props.props.background || "rgb(51, 51, 51)"};
  color: ${props => props.props.color || "rgb(255, 255, 255)"};
  font-size: ${props => props.props.fontSize || "15px"};
  font-weight: ${props => props.props.fontWeight || "600"};
  border-radius: ${props => props.props.radius || "6px"};
  margin-top: ${props => props.props.marginTop || "10px"};
  margin-bottom: ${props => props.props.marginBottom || "10px"};

  &:hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.25);
  }
`

export default Button