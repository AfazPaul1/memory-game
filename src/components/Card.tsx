import React from "react"
import { useDeckStore } from "../store/store"
interface propTypes {
    value: string,
    isFlipped: boolean,
    isMatched: boolean,
    index:number,
}
let renderCount = 0

export const Card = React.memo(function Card({ value, isFlipped, isMatched, index} : propTypes) {
    renderCount++
    console.log('rendering', renderCount);
    //gameover in 10 moves took just 100 rerenders - strict mode
    const flipCard = useDeckStore((state) => state.flipCard)
    const handleCardClick = (clickedCardIndex: number) => flipCard(clickedCardIndex)
    const disabledClass = isMatched? "bg-gray-50 hover: bg-gray-50" : "bg-sky-500 hover:bg-sky-700"
    return (
        <button disabled={isMatched} onClick={() => handleCardClick(index)}  className={`w-20 h-28 sm:w-24 sm:h-32 md:w-40 md:h-45 lg:h-50 lg:w-40 rounded border-2 ${disabledClass}  `}>
            {isFlipped || isMatched ? value : ""}
        </button>
    )
})
