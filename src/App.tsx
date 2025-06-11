import { useEffect, useState } from 'react'
import './App.css'
import { Card } from './components/Card'
import { useDeckStore } from './store/store'

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

  const cardsZus = useDeckStore((state) => state.cards)
  
  
  const createDeck = () => {
        const deck =  secureShuffle(values.flatMap((value) => [
          {id:crypto.randomUUID(), value, isFlipped: false, isMatched:false},
          {id:crypto.randomUUID(), value, isFlipped: false, isMatched:false},
        ]))
        return deck
      }
  const [cards, setCards] = useState<Card[] | undefined>(createDeck())
  
  
  

  useEffect(() => {
    //console.log('effect');
    
    const flippedUnmatched = cards?.filter(card => card.isFlipped && !card.isMatched)
    if(flippedUnmatched?.length === 2){
      console.log('effect when length 2');
      
      const valuesAreEqual = flippedUnmatched[0]?.value === flippedUnmatched[1]?.value
      
      const matched = () => {
        //console.log('matched');
        
        const value = flippedUnmatched[0].value
          setCards(prev => prev?.map(card => {
          if (card.value === value) {
            return {...card, isMatched: true}
          } else {
            return card
          }
          }))
          
      }
      const notMatched = () => {
        //console.log('unmatched');
        
        setTimeout(() => {
          setCards(prev => prev?.map(card => {
          if (card.id === flippedUnmatched[0].id || card.id === flippedUnmatched[1].id) {
            return {...card, isFlipped:false}
          } else {
            return card
          }
        }))
        
        }, 500)
      }
      if(valuesAreEqual) matched()
      else notMatched()  
    }
  }, [cards])

const content = cardsZus?.map((card, index) =>  <Card key={card.id} index={index} {...card}  />)
  
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 p-1 sm:gap-4 sm:p-2 justify-items-center align-items-center' >
        {content}
      </div>
    </div>
  )
}

export default App
