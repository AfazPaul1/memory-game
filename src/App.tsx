import './App.css'
import { Card } from './components/Card'
function App() {
//console.log('render app');
//const cardsZus = useDeckStore((state) => state.cards) //app will rerender on every state change
const content = Array(10).fill(null).map((_, index) =>  <Card key={index} index={index}  />)
  
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 p-1 sm:gap-4 sm:p-2 justify-items-center align-items-center' >
        {content}
      </div>
    </div>
  )
}

export default App
