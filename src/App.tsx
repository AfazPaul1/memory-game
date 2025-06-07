import { useEffect, useState } from 'react'
import './App.css'

interface Card {
    id:string,
    value: string,
    isFlipped: boolean,
    isMatched: boolean
  }

const values = ["cat", "dog"]


function secureShuffle(arr:Card[]):Card[] {
    
  const randomValues = new Uint32Array(arr.length)
  crypto.getRandomValues(randomValues)
  for (let i = arr.length-1; i > 0; i--) {
    const j = randomValues[i] % (i+1);
    
    
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr
}  

function App() {
  
  const [cards, setCards] = useState<Card[] | undefined>(() => {
        const deck =  secureShuffle(values.flatMap((value) => [
          {id:crypto.randomUUID(), value, isFlipped: false, isMatched:false},
          {id:crypto.randomUUID(), value, isFlipped: false, isMatched:false},
        ]))
        return deck
      })
  
  // const handleCardClick = (card: Card) => {
  //   onClick={() => handleCardClick(card)}
  // }
  const content = cards?.map((card) => {
      return <div key={card.id} >
        
                {!card.isFlipped && card.value}
              </div>
  })
  
  return (
    <>
      <div className=''>
        {content}
      </div>
    </>
  )
}

export default App
