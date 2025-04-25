import React from "react"
import "./menu-button.css"

const MenuButton = ({ onClick }) => {
    return (
        <button
            className="menu-button"
            onClick={onClick}
            type="button"
        >
            <div className="dash-top"></div>
            <div className="menu-button-circle"></div>
            <div className="dash-bottom"></div>
        </button>
    )
}

export default MenuButton
