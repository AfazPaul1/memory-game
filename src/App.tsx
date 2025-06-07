import { useState } from 'react'
import './App.css'

function App() {
 

  interface Card {
    id:string,
    value: string,
    isFlipped: boolean,
    isMatched: boolean
  }

  const values = ["cat", "dog"]

  let cardList:Card[] = []

  const createDeck = () => {
    //tried using map initially but realised i could only map over that particular value and return but i have to return 2 values in the array for each value
    //decided to use a for loop
    //flatMap
    //but later learned about flatMap
    //It’s a method that maps over an array and flattens the result by one level.
    //flat()
    //its an array method which creates a new array with all sub array elements concatenated into it recursively upto a depth
    //flat(1) does [0, 1, [2, [3, [4, 5]]]]; - [0, 1, 2, Array [3, Array [4, 5]]]
    //use flatmap if for every element we want n element in the transformed array

    cardList = values.flatMap((value) => [
      {id:crypto.randomUUID(), value, isFlipped: false, isMatched:false},
      {id:crypto.randomUUID(), value, isFlipped: false, isMatched:false},
    ])
  }
  createDeck()
  console.log(cardList);
  
  // for (let i = 0; i < values.length*2; i++) {
  //   cardList.push({
  //     id: i,
  //     //how do i assign value? this is a struggle? have to write some complicated logic
  //     value, 
  //     isFlipped: false,
  //     isMatched:false
  //   })
  // }



  return (
    <>
      
    </>
  )
}

export default App
