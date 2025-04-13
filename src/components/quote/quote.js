import React from "react"
const Quote = ({ img = null, text = "", author = "", source = "" }) => {
    return (<div className ="quote-wrapper">
        {img && <img src={img} alt="Author" className ="author-image" />}
        <blockquote className ="blockquote">
            <p className ="quote">
                <span className ="quote-icon">“</span>
                {text}
            </p>
            <span className ="quote_author">
                {author} <em>{source && `in ${source}`}</em>
            </span>
        </blockquote>
    </div>)
}
export default Quote