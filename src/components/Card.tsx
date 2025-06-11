import React from "react"
interface propTypes {
    value: string,
    isFlipped: boolean,
    isMatched: boolean,
    onClick: (clickedCardId: string) => void,
    id:string
}
let renderCount = 0

export const Card = React.memo(function Card({id, value, isFlipped, isMatched, onClick,} : propTypes) {
    renderCount++
    //console.log('rendering', renderCount);
    //gameover in 10 moves took just 100 rerenders - strict mode
    
    return (
        <button disabled={isMatched} onClick={() => onClick(id)}  className="w-20 h-28 sm:w-24 sm:h-32 md:w-40 md:h-45 lg:h-50 lg:w-40 rounded border-2 bg-sky-500 hover:bg-sky-700">
            {isFlipped || isMatched ? value : ""}
        </button>
    )
})
