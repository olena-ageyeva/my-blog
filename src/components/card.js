import React from "react"
import styled from "styled-components"

function Card({ repo, about, platform, author, photo }) {
  return (
    <Container>
      <a href={`https://${platform}/${repo}`} target="_blank" rel="noopener noreferrer">
        <div className="github_card">
          <div className="github_info">
            <h2>{repo}</h2>
            <span className="about">{about} </span>
            <div className="platform">{platform}</div>
          </div>
          <div className="img">
            <img src={photo} alt="author" title={author} />
          </div>
        </div>
      </a>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  font-family: medium-content-sans-serif-font, "Lucida Grande",
    "Lucida Sans Unicode", "Lucida Sans", Geneva, Arial, sans-serif;
  box-shadow: inset 0 0 0 1px rgba(230, 230, 230, 1);

  .github_card {
    width: 100%;
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    justify-content: space-between;
    box-shadow: 4px 8px 4px 0 rgba(0, 0, 0, 0.1);
  }
  .github_info {
    padding: 16px 20px;
    border: 1px solid #dfe1e5;
    width: 75%;
  }
  .img {
    width: 25%;
  }
  img {
    padding: 0;
    margin: 0;
    height: 100%;
  }
  h2 {
    font-size: 16px;
    margin: 1rem 0;
    color: #292929;
    max-height: 40px;
    width: 75%;
    line-height: 20px;
  }
  .about {
    margin-top: 8px;
  }
  .platform{
    font-size: 12px;
        margin-top: 12px;
  }
  a {
    box-shadow: none;
    width: 100%;
    color: #757575;
  }
`

export default Card
