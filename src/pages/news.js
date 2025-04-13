import React, { useState } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import styled from "styled-components"
import CSSCard from "../components/css-card"
import challengeData from "../components/css-challenge/data.json"
import arrow from "../img/double_arrow.png"
import arrow_right from "../img/arrow-right.png"

const breakpoints = {
  mobile: '768px',
};

const News = ({ data, location }) => {
  const [currentSet, setCurrentSet] = useState(0)
  const max = Math.ceil(challengeData.length / 3) - 1

  const siteTitle = data.site.siteMetadata.title

  const challengeCards = [0, 1, 2].map(index => {
    const indexAdjustment = 2 - index + 3 * currentSet
    if (indexAdjustment >= challengeData.length) {
      return null
    }
    return (
      <CSSCard
        title={challengeData[indexAdjustment].title}
        info={`Day #${challengeData.length - indexAdjustment}. ${challengeData[indexAdjustment].info
          }`}
        description={challengeData[indexAdjustment].description}
      />
    )
  })

  return (
    <Wrapper>
      <Layout location={location} title={siteTitle}>
        <SEO title="News: 100 days css challenge" />
        <div className="news">
          <div className ="curved-bg">
            <div className ="white-curve"></div>
          </div>
          <div className ="fullscreen">
            {/* <div className ="challenge">
              <div className ="bg"></div>
            </div> */}


            <div className ="tutorial">
              <a href="https://100dayscss.com/">
                <div className ="logo">
                  <div className ="number">
                    <div className ="one-one"></div>
                    <div className ="one-two"></div>
                    <div className ="zero-one"></div>
                    <div className ="zero-two"></div>
                  </div>
                  <div className ="text">
                    <div className ="big">Days</div>
                    <div className ="small">CSS Challenge</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </Layout>
      <div className ="work">
        {currentSet < max && (
          <div
            className ="arrow"
            onClick={() => currentSet < max && setCurrentSet(currentSet + 1)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && currentSet < max && setCurrentSet(currentSet + 1)}
            role="button"
            tabIndex="0"
          >
            <img src={arrow} width="50px" alt="arrow" />
          </div>
        )}
        {challengeCards}
        {currentSet > 0 && (
          <div
            className ="arrow"
            onClick={() => currentSet > 0 && setCurrentSet(currentSet - 1)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && currentSet > 0 && setCurrentSet(currentSet - 1)}
            role="button"
            tabIndex="0"
          >
            <img src={arrow_right} width="37px" alt="arrow" />
          </div>
        )}
      </div>
    </Wrapper>
  )
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

  .work {
    position: absolute;
    top: 10rem;
    left: 3rem;
    z-index: 5;
    color: black;
    display: inline-block;
    max-width: 1700px;

    .arrow {
      height: 350px;
      vertical-align: middle;
      width: 50px;
      display: inline-block;
      background: transparent;
      z-index: 6;
      cursor: poiner;
    }
  }



  .fullscreen {
    float:right;
    top:0;
    width: 100%;
    height: 100vh;
    min-height: 600px;
    overflow-y: hidden;
    margin-top: -106px;
  }

  .challenge {
    position: relative;
    z-index: 5;
    float: left;
    height: 100vh;
    width: 30%;
  }

  .content {
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

  .tutorial {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-flow: column nowrap;
    height: 100%;
    width: 70%;
    padding: 32px 32px 32px 140px;
    position: absolute;
    right: 0px;
    top: 0px;
    z-index: 0;

    a {
      right: 0;
      position: absolute;
      top: 1rem;
      z-index: 3;
      box-shadow: none;
      margin: 0 2rem;
    }
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

      a {
        display: none
      }
    }
  }


  .fullscreen .tutorial .logo {
    position: relative;
    z-index: 5;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-flow: row nowrap;
    flex-flow: row nowrap;
    text-decoration: none;
    float:left;
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
  @media (max-width: ${breakpoints.mobile}) {
    .fullscreen {
      display: none;
    }
    .arrow {
      display: none;
    }
    .work{
      position: relative;
    }
  }

  .fullscreen .tutorial::before {
  content: "";
  position: absolute;
  top: 20%;
  left: 15%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
  z-index: 0;
}

.fullscreen .tutorial .logo .text {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  text-shadow: 1px 2px 4px rgba(74, 100, 164, 0.4);
}

.curved-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, #4da0ff, #bce0fd);
  z-index: 0;
  overflow: hidden;
}

.white-curve {
    position: absolute;
    top: -40%;
    left: -20%;
    width: 80%;
    height: 180%;
    background: white;
    border-radius: 60%;
    z-index: 1;
}

  @media (max-width: 600px) {
   .curved-bg {
    display: none;
  }
  }

`
