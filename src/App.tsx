import {  useEffect, useState } from 'react'
import './App.css'
import { Card } from './components/Card'

interface Card {
    id:string,
    value: string,
    isFlipped: boolean,
    isMatched: boolean
  }

const values = ["cat", "dog", "cow", "chicken", "donkey"]

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
  const [flipped, setFlipped] = useState<Card[]>([])
  //tracks the currently flipped cards
   
   const handleCardClick = (clickedCard: Card) => {
    if (clickedCard.isFlipped || clickedCard.isMatched) {
      return
    } 
    //card.isFlipped = true
    //not the way to do it
    //refer updating objects inside arrays learn react article
    setCards(cards?.map(card => {
      if (card.id === clickedCard.id) {
        return {...card, isFlipped: true}
      } else {
        return card
      }
    }))
    setFlipped([...flipped, clickedCard])
   }


  const content = cards?.map((card) =>  <Card key={card.id} onClick={() => handleCardClick(card)} value={card.value} isFlipped={card.isFlipped} isMatched={card.isMatched}  />)
  
  return (
    <>
      <div className='grid grid-cols-4 gap-3 p-3 justify-items-center' >
        {content}
      </div>
    </>
  )
}

export default App
