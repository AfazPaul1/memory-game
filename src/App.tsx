import { useEffect, useState } from 'react'
import './App.css'

interface Card {
    id:string,
    value: string,
    isFlipped: boolean,
    isMatched: boolean
  }

const values = ["cat", "dog"]

let createDeckCallCount = 0;
let didCreateDeck = false;
function secureShuffle(arr:Card[]):Card[] {
    
  const randomValues = new Uint32Array(arr.length)
  crypto.getRandomValues(randomValues)
  for (let i = arr.length-1; i > 0; i--) {
    const j = randomValues[i] % (i+1);
    
    
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr
}  

const createDeck = () => {
        createDeckCallCount++;
        console.log("createDeck called", createDeckCallCount, "time(s)");
        if (didCreateDeck) {
          console.warn("createDeck called AGAIN! This should only run once per app load!");
          return
        } else {
          console.log("createDeck running for the first time");
          didCreateDeck = true;
        }
        const deck =  secureShuffle(values.flatMap((value) => [
          {id:crypto.randomUUID(), value, isFlipped: false, isMatched:false},
          {id:crypto.randomUUID(), value, isFlipped: false, isMatched:false},
        ]))
        console.log(deck);
        return deck
      }
  
const deck = createDeck()

function App() {
  console.log('app render');
  const [cards, setCards] = useState<Card[] | undefined>(deck)
  
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
