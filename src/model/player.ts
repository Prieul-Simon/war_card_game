import { Card } from "./card";
import { shuffle } from "./classicCardSet";

export class Player {
    public name : string;
    public pile : Card[]; // first element is the top of the pile, last element is the bottom

    constructor(name : string, pile : Card[]) {
        this.name = name;
        this.pile = pile;
    }

    public play() : Card {
        // Remove and return the top of the pile (first element of the array)
        const topCard = this.pile.shift();
        if (topCard === undefined) {
            throw `Pile is empty, player ${this.name} cannot play`;
        }
        return topCard;
    }
    
    public resultOfWar() : WarResult {
        if (this.pile.length <= 1) {
            /* This case is not impossible, this can happen if a player is engaged in a war but has no remaining cards in his pile 
             * (but some can be staging)
             * https://en.wikipedia.org/wiki/War_(card_game) says :
             * 
             * Most descriptions of War are unclear about what happens if a player runs out of cards during a war.[2] 
             * In some variants, that player immediately loses. In others, the player may play the last card in their deck 
             * as their face-up card for the remainder of the war or replay the game from the beginning.[2]
             * 
             * Here we decide to declare an "instant lose" for this player for more fun :D
             * 
             * Note : if both players are in the same situation here (very very rare), i.e. they had at the beginning of the turn
             * the same number of cards and they revealed equal cards each time until this if statement, then code will be executed
             * first for playerA, and then playerB will win. Too bad for him ;)
             *
             */
            return true;
        }

        // Here length >= 2
        // @ts-ignore => we checked before that length >= 2
        const first : Card = this.pile.shift();
        // @ts-ignore => we checked before that length >= 2
        const second : Card = this.pile.shift();
        return {
            faceDown: first,
            faceUp: second,
        };
    }

    public takeCards(...cards : Card[]) : void {
        // Shuffle the cards that the player won
        const shuffledCards : Card[] = shuffle(cards);
        // Adds them in the bottom of the pile (last elements of the array)
        this.pile.push(...shuffledCards);
    }

    public hasLostGame() : boolean {
        return this.pile.length === 0;
    }

    public toString() : string {
        return this.name;
    }
}

export type WarResult = StrictWarResult | InstantLose;
type InstantLose = true;

interface StrictWarResult {
    faceDown : Card;
    faceUp : Card;
}
