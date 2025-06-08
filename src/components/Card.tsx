interface propTypes {
    value: string,
    isFlipped: boolean,
    isMatched: boolean,
    onClick: () => void,
    
}


export function Card({value, isFlipped, isMatched, onClick,} : propTypes) {

    return (
        <button onClick={onClick}  className="w-[64px] h-[64px] border-2 bg-sky-500 hover:bg-sky-700">
            {isFlipped || isMatched ? value : ""}
        </button>
    )
}
