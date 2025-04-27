import React from "react"
import PostNavigation from "./post-nav"
import "./post-nav-animated.css"
import { useGlobalState } from "../../context/GlobalContext"

const PostNavigationAnimated = ({ ...rest }) => {
  const { state, setNavAnimation } = useGlobalState()
  const { showNavAnimation } = state.navigation

  return (
    <nav className={`post-nav`}>
      {showNavAnimation ? (
        <>
          <div className="circle"></div>
          <div className="line left-line"></div>
          <div className="line right-line"></div>
        </>
      ) : (
        <>
          <div className="line top-line"></div>
          <div className="line bottom-line"></div>
        </>
      )}
      <PostNavigation setNavAnimation={setNavAnimation} {...rest} />
      {showNavAnimation && (
        <>
          <div className="hide top"></div>
          <div className="hide bottom"></div>
        </>
      )}
    </nav>
  )
}

export default PostNavigationAnimated
