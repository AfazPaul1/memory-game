import React from "react"
interface propTypes {
    value: string,
    isFlipped: boolean,
    isMatched: boolean,
    onClick: () => void,
    
}
let renderCount = 0

export const Card = React.memo(function Card({value, isFlipped, isMatched, onClick,} : propTypes) {
    renderCount++
    console.log('rendering', renderCount);
    
    return (
        <button onClick={onClick}  className="w-[64px] h-[64px] border-2 bg-sky-500 hover:bg-sky-700">
            {isFlipped || isMatched ? value : ""}
        </button>
    )
})
