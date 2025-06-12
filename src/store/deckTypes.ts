export interface Card {
    id:string,
    value: string,
    isFlipped: boolean,
    isMatched: boolean
  }

export interface DeckState {
    cards: Card[],
    actions: {
        flipCard: (clickedCardIndex: number) => void
    },
  }