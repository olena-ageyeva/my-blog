import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ReportCard from "../components/css-challenge/report-card"
import styled from "styled-components"

class News extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Wrapper>
        <Layout location={this.props.location} title={siteTitle}>
          <SEO title="News: 100 days css challenge" />
          <div className="news">
            <div class="fullscreen">
              <div class="challenge">
                <div class="bg"></div>
              </div>

              <div class="tutorial">
                <div class="logo">
                  <div class="number">
                    <div class="one-one"></div>
                    <div class="one-two"></div>
                    <div class="zero-one"></div>
                    <div class="zero-two"></div>
                  </div>
                  <div class="text">
                    <div class="big">Days</div>
                    <div class="small">CSS Challenge</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
        <div class="work">
          <iframe
            height="450"
            width="410"
            scrolling="no"
            title="LYNepzy"
            src="https://codepen.io/olena-ageyeva/embed/LYNepzy?height=450&theme-id=light&default-tab=result"
            frameborder="no"
            loading="lazy"
            allowtransparency="true"
            allowfullscreen="true"
          >
            See the Pen{" "}
            <a href="https://codepen.io/olena-ageyeva/pen/LYNepzy">LYNepzy</a>{" "}
            by Olena (
            <a href="https://codepen.io/olena-ageyeva">@olena-ageyeva</a>) on{" "}
            <a href="https://codepen.io">CodePen</a>.
          </iframe>
          <p>Day #1</p>
        </div>
      </Wrapper>
    )
  }
}

export default News

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const Wrapper = styled.div`
  //   min-height: 100vh;

  h3 {
    margin: 0;
  }

  .work {
    position: absolute;
    top: 10rem;
    left: 3rem;
    z-index: 5;
    color: black;
  }

  .news a {
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 3;
    box-shadow: none;
  }

  //   h3 a {
  //     float: right;
  //   }

  div {
    -webkit-box-sizing: border-box;
    font-family: "Courier New", "Courier", monospace;
  }

  .fullscreen {
    position: absolute;
    width: 100%;
    height: 100vh;
    min-height: 600px;
    max-height: 960px;
    overflow-y: hidden;
  }
  @media (max-width: 920px) {
    .fullscreen {
      min-height: 0;
      max-height: none;
      height: auto;
    }
  }
  .fullscreen .challenge {
    position: relative;
    z-index: 5;
    float: left;
    height: 100%;
    width: 30%;
  }
  @media (max-width: 1100px) {
    .fullscreen .challenge {
      width: 30%;
    }
  }
  @media (max-width: 920px) {
    .fullscreen .challenge {
      float: none;
      width: 100%;
    }
  }
  .fullscreen .challenge .bg {
    position: absolute;
    height: 1200px;
    width: 700px;
    top: 50%;
    right: -140px;
    margin-top: -600px;
    background: #fff;
    -webkit-box-shadow: 4px 8px 16px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 4px 8px 16px 0 rgba(0, 0, 0, 0.1);
    border-radius: 50%;
  }
  @media (max-width: 920px) {
    .fullscreen .challenge .bg {
      display: none;
    }
  }
  .fullscreen .challenge .content {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-flow: column nowrap;
    flex-flow: column nowrap;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: baseline;
    position: absolute;
    z-index: 5;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    padding-left: 100px;
  }
  @media (max-width: 920px) {
    .fullscreen .challenge .content {
      position: relative;
      padding: 48px 16px;
    }
  }
  @media (max-width: 520px) {
    .fullscreen .challenge .content {
      padding-top: 16px;
    }
  }

  .fullscreen .tutorial {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: baseline;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-flow: column nowrap;
    flex-flow: column nowrap;
    position: relative;
    float: left;
    height: 100%;
    width: 70%;
    padding: 32px 32px 32px 140px;
    background: #77aee6;
    background: -webkit-linear-gradient(250deg, #406bd8 0%, #9cdbef 100%);
    background: linear-gradient(200deg, #406bd8 0%, #9cdbef 100%);
  }
  @media (max-width: 1100px) {
    .fullscreen .tutorial {
      width: 70%;
    }
  }
  @media (max-width: 920px) {
    .fullscreen .tutorial {
      float: none;
      width: 100%;
      padding: 48px 16px 96px 16px;
    }
  }
  .fullscreen .tutorial .logo {
    position: relative;
    z-index: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-flow: row nowrap;
    flex-flow: row nowrap;
    text-decoration: none;
  }
  .fullscreen .tutorial .logo .number {
    position: relative;
    height: 80px;
    width: 164px;
  }
  .fullscreen .tutorial .logo .number .one-one {
    position: absolute;
    z-index: 1;
    top: 1px;
    left: -12px;
    height: 36px;
    width: 20px;
    background: #fff;
    border-radius: 6px;
    -webkit-transform: rotate(50deg);
    transform: rotate(50deg);
    -webkit-box-shadow: 2px 4px 8px 0 rgba(74, 100, 164, 0.4);
    box-shadow: 2px 4px 8px 0 rgba(74, 100, 164, 0.4);
  }
  .fullscreen .tutorial .logo .number .one-two {
    position: absolute;
    z-index: 10;
    top: 1px;
    left: 0px;
    height: 78px;
    width: 24px;
    background: #fff;
    border-radius: 6px;
    -webkit-box-shadow: 2px 4px 8px 0 rgba(74, 100, 164, 0.4);
    box-shadow: 2px 4px 8px 0 rgba(74, 100, 164, 0.4);
  }
  .fullscreen .tutorial .logo .number .zero-one,
  .fullscreen .tutorial .logo .number .zero-two {
    position: absolute;
    z-index: 8;
    top: 0;
    left: 8px;
    height: 80px;
    width: 80px;
    border-radius: 50%;
    border: 22px solid #fff;
    -webkit-box-shadow: 2px 4px 8px 0 rgba(74, 100, 164, 0.4);
    box-shadow: 2px 4px 8px 0 rgba(74, 100, 164, 0.4);
  }
  .fullscreen .tutorial .logo .number .zero-two {
    z-index: 6;
    left: 72px;
  }
  .fullscreen .tutorial .logo .text {
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    text-shadow: 1px 2px 4px rgba(74, 100, 164, 0.4);
  }
  .fullscreen .tutorial .logo .big {
    font-size: 76px;
    line-height: 65px;
  }
`
