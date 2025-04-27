import React from "react";
import MenuButton from "../menu-button/menu-button";
import { Link } from "gatsby";
import Tooltip from "../tooltip/tooltip";
import "./post-nav.css";

const PostNavigation = ({
  previous = "",
  next = "",
  onClick = () => { },
  isPanelOpen = false,
  setNavAnimation
}) => {

  const handleNavClick = () => {
    // Turn off animation when clicking menu button
    setNavAnimation(false);
    onClick();
  };

  const handleLinkClick = () => {
    // Turn off animation when navigating to next/prev post
    setNavAnimation(false);
  };

  return (
    <ul className="post-nav__list">
      <li className="post-nav__item post-nav__item--prev" >
        {previous && (
          <Link
            to={`/blog${previous.fields.slug}`}
            rel="prev"
            state={{ from: 'post-nav' }}
            onClick={handleLinkClick}
          >
            <span className="post-nav__full-title">
              <span className="nav-arrow left"></span>
              <span className="post-nav__title-text">{previous.frontmatter.title}</span>
            </span>
            <span className="post-nav__short-title">
              <span className="nav-arrow left"></span> Prev
            </span>
          </Link>
        )}
      </li>
      <li className="post-nav__item">
        <span className={`post-nav__full-title`}>
          <Tooltip text={isPanelOpen ? "Close menu" : "Show all posts"}>
            <MenuButton onClick={handleNavClick} />
          </Tooltip>
        </span>
        <span className="post-nav__short-title">
          <Tooltip text={isPanelOpen ? "Close menu" : "Show all posts"}>
            <MenuButton onClick={handleNavClick} />
          </Tooltip>
        </span>
      </li>
      <li className="post-nav__item post-nav__item--next">
        {next && (
          <Link
            to={`/blog${next.fields.slug}`}
            rel="next"
            state={{ from: 'post-nav' }}
            onClick={handleLinkClick}
          >
            <span className="post-nav__full-title">
              <span className="post-nav__title-text">{next.frontmatter.title}</span>
              <span className="nav-arrow right"></span>
            </span>
            <span className="post-nav__short-title">
              Next <span className="nav-arrow right"></span>
            </span>
          </Link>
        )}
      </li>
    </ul>
  )
}

export default PostNavigation;
