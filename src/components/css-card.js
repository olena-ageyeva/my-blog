import React from "react"
import styled from "styled-components"

function CSSCard({ title, info, description }) {
  return (
    <Container>
      <iframe
        height="450"
        width="410"
        scrolling="no"
        title={title}
        src={`https://codepen.io/olena-ageyeva/embed/${title}?height=450&theme-id=light&default-tab=result`}
        frameborder="no"
        loading="lazy"
        allowtransparency="true"
        allowfullscreen="true"
      >
        See the Pen{" "}
        <a href={`https://codepen.io/olena-ageyeva/pen/${title}`}>{title}</a> by
        Olena (<a href="https://codepen.io/olena-ageyeva">@olena-ageyeva</a>) on{" "}
        <a href="https://codepen.io">CodePen</a>.
      </iframe>
      <p class="title">{info}</p>
      <p class="description">{description}</p>
    </Container>
  )
}

const Container = styled.div`
  width: 470px;
  margin: 0.5rem;
  padding: 1rem;
  display: inline-grid;
  box-shadow: 4px 8px 16px 0 rgba(0, 0, 0, 0.1);

  iframe {
    margin: 0 auto;
  }
  .title {
    font-family: "Open Sans", Helvetica, sans-serif;
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
  }

  .description {
    min-height: 6rem;
  }
`

export default CSSCard
