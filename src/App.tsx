import {  useCallback, useEffect, useState, useRef } from 'react'
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
  const createDeck = () => {
        const deck =  secureShuffle(values.flatMap((value) => [
          {id:crypto.randomUUID(), value, isFlipped: false, isMatched:false},
          {id:crypto.randomUUID(), value, isFlipped: false, isMatched:false},
        ]))
        return deck
      }
  const [cards, setCards] = useState<Card[] | undefined>(createDeck())
  const [flipped, setFlipped] = useState<Card[]>([])
  const [lockBoard, setLockBoard] = useState(false)
  const cardsRef = useRef(cards);
  useEffect(() => { cardsRef.current = cards; }, [cards]);
  const lockBoardRef = useRef(lockBoard);
  useEffect(() => { lockBoardRef.current = lockBoard; }, [lockBoard]);
  const handleCardClick = useCallback(
    (clickedCardId: string) => {
  
  const clickedCard = cardsRef.current?.find(card => card.id === clickedCardId)
  
  setCards(prev => {
    if(!prev) return prev;
    const flippedUnmatched = prev.filter(card => card.isFlipped && !card.isMatched)
    const clickedCard = prev.find(card => card.id === clickedCardId)
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched || flippedUnmatched.length >=2) {
      console.log('no');
      
    return prev
    }
    return prev?.map(card => {
    if (card.id === clickedCard.id) {
      return {...card, isFlipped: true}
    } else {
      return card
    }
  })})
  
  setFlipped(prev => {
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return prev
    if((prev.find(card => card.id === clickedCardId))) return prev
    return [...prev, clickedCard]
  }
  )
   
  }, []
  )
  
  

  useEffect(() => {
    
    if(flipped.length === 2){
      const valuesAreEqual = flipped[0]?.value === flipped[1]?.value
      const reset = () => {
        setFlipped([])
        setLockBoard(false)
      }
      const matched = () => {
        const value = flipped[0].value
          setCards(prev => prev?.map(card => {
          if (card.value === value) {
            return {...card, isMatched: true}
          } else {
            return card
          }
          }))
          reset()
      }
      const notMatched = () => {
        setTimeout(() => {
          setCards(prev => prev?.map(card => {
          if (card.id === flipped[0].id || card.id === flipped[1].id) {
            return {...card, isFlipped:false}
          } else {
            return card
          }
        }))
        reset()
        }, 500)
      }
      setLockBoard(true)
      if(valuesAreEqual) matched()
      else notMatched()  
    }
  }, [flipped])

const content = cards?.map((card) =>  <Card key={card.id} onClick={handleCardClick} {...card}  />)
  
  return (
    <>
      <div className='grid grid-cols-4 gap-3 p-3 justify-items-center align-items-center' >
        {content}
      </div>
    </>
  )
}

export default App
