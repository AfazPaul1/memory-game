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
export const isFlippedUnmatched = (card: Card) => card.isFlipped && !card.isMatched 

const useDeckStore = create<DeckState>()(
    immer(
        (set) => ({
        cards: createDeck(),
        flipCard: (clickedCardIndex) => set((state) => {
            const flippedUnmatched = state.cards.filter(isFlippedUnmatched)
            const clickedCard = state.cards[clickedCardIndex]
            if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched || flippedUnmatched.length >=2) return
            clickedCard.isFlipped = true
        }),
        matched: () => set((state) => {
            state.cards.forEach(card => { if(isFlippedUnmatched(card)) card.isMatched = true}) //if is a statement not a expression so need the braces around if
            //no need for map we are just performing side effects we do not need the transformed array
        }),
        unMatched: () => {
        setTimeout(() => set((state) => {
            state.cards.forEach(card => {if(isFlippedUnmatched(card)) card.isFlipped = false})
        }), 500)
        }
        })
    )
)


export {useDeckStore}