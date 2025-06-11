import {create} from 'zustand'


interface Card {
    id:string,
    value: string,
    isFlipped: boolean,
    isMatched: boolean
  }

  interface DeckState {
    cards: Card[],
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
const createDeck = () => {
        const deck =  secureShuffle(values.flatMap((value) => [
          {id:crypto.randomUUID(), value, isFlipped: false, isMatched:false},
          {id:crypto.randomUUID(), value, isFlipped: false, isMatched:false},
        ]))
        return deck
      }

const useDeckStore = create<DeckState>()(
    (set) => ({
        cards: createDeck(),
    })
)

export {useDeckStore}