
import { useDeck, useActions } from "../store/store"
interface propTypes {
    index:number,
}
//let renderCount = 0

export const Card = function Card({ index} : propTypes) {
    //renderCount++
    //console.log('rendering', renderCount, index);
    //gameover in 10 moves took just 100 rerenders - strict mode
    const {isFlipped, isMatched, value} = useDeck(index)
    const {flipCard} = useActions()
    const handleCardClick = (index: number) => flipCard(index)
    const disabledClass = isMatched? "bg-gray-50 hover: bg-gray-50" : "bg-sky-500 hover:bg-sky-700"
    return (
        <button disabled={isMatched} onClick={() => handleCardClick(index)}  className={`w-20 h-28 sm:w-24 sm:h-32 md:w-40 md:h-45 lg:h-50 lg:w-40 rounded border-2 ${disabledClass}  `}>
            {isFlipped || isMatched ? value : ""}
        </button>
    )
}