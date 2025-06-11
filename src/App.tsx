import { useEffect } from 'react'
import './App.css'
import { Card } from './components/Card'
import { useDeckStore } from './store/store'

 

function App() {

  const cardsZus = useDeckStore((state) => state.cards)
  const matched = useDeckStore((state) => state.matched)
  const unMatched = useDeckStore((state) => state.unMatched)
  
  
  

  useEffect(() => {
    //console.log('effect');
    
    const flippedUnmatched = cardsZus?.filter(card => card.isFlipped && !card.isMatched)
    if(flippedUnmatched?.length === 2){
      console.log('effect when length 2');
      
      const valuesAreEqual = flippedUnmatched[0]?.value === flippedUnmatched[1]?.value
      
      if(valuesAreEqual) matched()
      else unMatched()  
    }
  }, [cardsZus])

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
