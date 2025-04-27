import React from "react"
import "./animated-button.css"

const AnimatedButton = ({children}) => {
    return (
        <div className="animated-button">
            <div class="center">
                <div class="button" onclick="void(0);">
                    <span>{children}</span>
                    <svg width="170px" height="50px" viewBox="0 0 170 50" class="border">
                        <polyline points="168,1 168,48 1,48 1,1 168,1" class="bg-line" />
                        <polyline points="168,1 168,48 1,48 1,1 168,1" class="hl-line" />
                    </svg>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnimatedButton
