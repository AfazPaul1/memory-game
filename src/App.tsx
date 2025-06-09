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
  //tracks the currently flipped cards
  const [lockBoard, setLockBoard] = useState(false)
  //use ref rules
  //useRef is a React Hook that lets you reference a value that’s not needed for rendering.
  //first thought - but cards is used for rendering right?
  //chatgpt says its okay as long as we do not use cardRef for rendering
  //Do not write or read ref.current during rendering, except for initialization. This makes your component’s behavior unpredictable.
  //but what we are doing is ok cause it inside a effect
  const cardsRef = useRef(cards);
  useEffect(() => { cardsRef.current = cards; }, [cards]);
  const lockBoardRef = useRef(lockBoard);
  useEffect(() => { lockBoardRef.current = lockBoard; }, [lockBoard]);
  const handleCardClick = useCallback(
    (clickedCardId: string) => {
      const clickedCard = cardsRef.current?.find(card => card.id === clickedCardId)
  if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched || lockBoardRef.current) {
    return
  } 
  //card.isFlipped = true
  //not the way to do it
  //refer updating objects inside arrays learn react article
  setCards(prev => prev?.map(card => {
    if (card.id === clickedCard.id) {
      return {...card, isFlipped: true}
    } else {
      return card
    }
  }))
  setFlipped(prev => [...prev, clickedCard])
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
