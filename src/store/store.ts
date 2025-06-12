import {create} from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface Card {
    id:string,
    value: string,
    isFlipped: boolean,
    isMatched: boolean
  }

  interface DeckState {
    cards: Card[],
    flipCard: (clickedCardIndex: number) => void,
    matched: () => void,
    unMatched: () => void,
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
    immer(
        (set) => ({
        cards: createDeck(),
        flipCard: (clickedCardIndex) => set((state) => {
            const flippedUnmatched = state.cards.filter(card => card.isFlipped && !card.isMatched)
            const clickedCard = state.cards[clickedCardIndex]
            if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched || flippedUnmatched.length >=2) return
            clickedCard.isFlipped = true
        }),
        matched: () => set((state) => {
            state.cards.map(card => {if(card.isFlipped && !card.isMatched) return card.isMatched = true})
        }),
        unMatched: () => {
        setTimeout(() => set((state) => {
            state.cards.map(card => {if(card.isFlipped && !card.isMatched) return card.isFlipped = false})
        }), 500)
        }
        })
    )
)


export {useDeckStore}