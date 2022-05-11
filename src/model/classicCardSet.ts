/* 
 * Implementation of a 52-card classic card set
 */

import { allCardValues, allSuits, Card, Suit } from "./card";

export const CARDS_NUMBER : number = 52;

export class ClassicCardSet {
    public cards : Card[];

    constructor() {
        this.cards = [];
        this.createAllCards();
    }

    createAllCards() {
        for (const currentSuit of allSuits()) {
            this.createAllCardsForSuit(currentSuit);
        }
    }

    createAllCardsForSuit(suit : Suit) {
        for (const currentCardValue of allCardValues()) {
            this.cards.push(new Card(suit, currentCardValue));
        }
    }

    public shuffle() : void {
        this.cards = shuffle(this.cards);
    }
}

export function shuffle(cards : Card[]) : Card[] {
    // cards.length is 52 or less, so efficiency is not the priority here, but readability
    // could have use an external library though
    // thanks to https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#answer-46545530
    return cards
        .map(card => ({card: card, sorting: Math.random(), }))
        .sort((a, b) => a.sorting - b.sorting)
        .map(wrapped => wrapped.card);
}
