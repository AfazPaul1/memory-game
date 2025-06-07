import { useState } from 'react'
import './App.css'

interface Card {
    id:string,
    value: string,
    isFlipped: boolean,
    isMatched: boolean
  }

const values = ["cat", "dog"]

function secureShuffle(arr:Card[]):Card[] {
    //uint32 for cryptographically strong shuffles
    const randomValues = new Uint32Array(arr.length)
    crypto.getRandomValues(randomValues)
    console.log(randomValues);
    console.log([...arr]);
    
    for (let i = arr.length-1; i > 0; i--) {
      const j = randomValues[i] % (i+1);
      console.log(randomValues[i], i+1,i, j);
      
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    console.log(arr);
    

    return arr
  }  

function App() {
 
  const [cards, setCards] = useState<Card[]>([])

  const createDeck = () => {
    //removed flatmap note
    return secureShuffle(values.flatMap((value) => [
      {id:crypto.randomUUID(), value, isFlipped: false, isMatched:false},
      {id:crypto.randomUUID(), value, isFlipped: false, isMatched:false},
    ]))
  }
  createDeck()
  

  return (
    <>
      
    </>
  )
}

export default App
