import {create} from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { DeckState } from './deckTypes'
import { createDeck, isFlippedUnmatched } from './deckUtils'
//tkdodo bolg working with zustand was helpful



const useDeckStore = create<DeckState>()(
    immer(
        (set) => ({
        cards: createDeck(),
        actions: {flipCard: (clickedCardIndex) => set((state) => {
            let flippedUnmatched = state.cards.filter(isFlippedUnmatched)       
            const clickedCard = state.cards[clickedCardIndex]
            if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched || flippedUnmatched.length >=2) return
            clickedCard.isFlipped = true            
            flippedUnmatched = state.cards.filter(isFlippedUnmatched)    
            if(flippedUnmatched.length == 2){
                const [a,b] = flippedUnmatched                
                if(a.value === b.value){
                    set(() => {
                        a.isMatched = true
                        b.isMatched = true
                    })
                }
                else{
                    setTimeout(() => {
                      set((state) => {
                        const [a,b] = state.cards.filter(isFlippedUnmatched) //have to recompute
                        //cant access a, b proxies defined outside  asynchronously
                        a.isFlipped = false
                        b.isFlipped = false
                        })
                    }, 500);
                }
            }
        }),
        }})
    )
)



//export const useFlipCard = useDeckStore((state) => state.flipCard) we need a function which return this. we can call that. we can call the useStore hook here
export const useActions = () => useDeckStore((state) => state.actions) //export actions separtely was tricky when we had to pass index export as whole is easy cab directly call and pass arg
export const useDeck = (index: number) => useDeckStore((state) => state.cards[index])

//this was dumb
// state.cards.forEach(card => { 
//                             console.log(isFlippedUnmatched(card));
//                             if(isFlippedUnmatched(card)) {
//                             card.isMatched = true
//                             }})