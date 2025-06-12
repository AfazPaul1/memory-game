import type { Card } from "./deckTypes";
import { secureShuffle } from "../utils/array";
const values = ["cat", "dog", "cow", "chicken", "donkey"]
//finally actual reason to use a generic

export const createDeck = () => {
        const deck =  secureShuffle<Card>(values.flatMap((value) => [
          {id:crypto.randomUUID(), value, isFlipped: false, isMatched:false},
          {id:crypto.randomUUID(), value, isFlipped: false, isMatched:false},
        ]))
        return deck
}
export const isFlippedUnmatched = (card: Card) => card.isFlipped && !card.isMatched 