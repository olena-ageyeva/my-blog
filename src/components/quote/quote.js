import React from "react"
const Quote = ({ img = null, text = "", author = "", source = "" }) => {
    return (<div class="quote-wrapper">
        {img && <img src={img} alt="Author" class="author-image" />}
        <blockquote class="blockquote">
            <p class="quote">
                <span class="quote-icon">“</span>
                {text}
            </p>
            <span class="quote_author">
                {author} <em>{source && `in ${source}`}</em>
            </span>
        </blockquote>
    </div>)
}
export default Quote