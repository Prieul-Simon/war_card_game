import { Card } from "./card";
import { Player } from "./player";

export class Turn {
    private index : number;
    private playerA : Player;
    private playerB : Player;
    private stagingCards : Card[] = [];
    private instantLose : boolean = false;
    private out : Console;

    constructor(index : number, playerA : Player, playerB : Player, out : Console) {
        this.index = index;
        this.playerA = playerA;
        this.playerB = playerB;
        this.out = out;
    }

    /*
     * Both player in inputs must have at least one card remaining, i.e. there is no winner yet
     */
    public resolveTurn() : TurnResult {
        this.out.log('~~~~~ Turn %i ~~~~~', this.index);
        this.stagingCards = [];
        
        // First, play "normally"
        const cardA : Card = this.playerA.play();
        const cardB : Card = this.playerB.play();
        this.stagingCards.push(cardA, cardB);

        // Log revealed cards
        this.out.log('\tPlayer "%s" reveals the top card "%s"', this.playerA, cardA);
        this.out.log('\tPlayer "%s" reveals the top card "%s"', this.playerB, cardB);
        
        // Then determinate the winner, with potential multiple wars in a row
        const winnerOfTurn = this.compareCardsOrMakeWar(cardA, cardB);
        this.out.log('\t# \\o/ Player "%s" wins the turn', winnerOfTurn);

        // Is there the special case where it is instant lose ?
        if (this.instantLose) {
            this.out.log('\tEnd of turn %i; the game stops immediatly because a player has only one or zero remaining card, he is the loser', this.index);
            this.out.log();
            return { hasGameWinner: true, winner: winnerOfTurn, };
        }

        // Resolve the won cards
        this.out.log('\tEnd of turn %i; the following cards will be taken by the winner and put randomly at the bottom of his pile => %s',
            this.index, prettyPrintCards(this.stagingCards));
        winnerOfTurn.takeCards(...this.stagingCards);

        // Extra information logs
        this.out.log('\tPlayer "%s" has %i cards remaining', this.playerA, this.playerA.pile.length);
        this.out.log('\tPlayer "%s" has %i cards remaining', this.playerB, this.playerB.pile.length);

        // New empty line
        this.out.log();

        // Is the game finished ?
        const loserOfTurn : Player = winnerOfTurn === this.playerA ? this.playerB : this.playerA;
        if (loserOfTurn.hasLostGame()) {
            return { hasGameWinner: true, winner: winnerOfTurn, };
        } else {
            return { hasGameWinner: false, winner: undefined, };
        }
    }

    compareCardsOrMakeWar(cardA : Card, cardB : Card) : Player {
        if (cardA.isEqual(cardB)) {
            this.out.log('\tCards are equal => WAR');
            // LET'S MAKE WAR
            return this.makeWar();
        } else if (cardA.isHigher(cardB)) {
            // Player A wins the turn
            return this.playerA;
        } else {
            // Player B wins the turn
            return this.playerB;
        }
    }

    makeWar() : Player {
        const resultA = this.playerA.resultOfWar();
        if (resultA === true) {
            this.out.log('\tPlayer "%s" has only one or zero card remaining => INSTANT LOSE', this.playerA);
            this.instantLose = true;
            return this.playerB;
        }
        const { faceDown: faceDownA, faceUp: cardA, } = resultA;
        const resultB = this.playerB.resultOfWar();
        if(resultB === true) {
            this.out.log('\tPlayer "%s" has only one or zero card remaining => INSTANT LOSE', this.playerB);
            this.instantLose = true;
            return this.playerA;
        }
        const { faceDown: faceDownB, faceUp: cardB, } = resultB;

        this.stagingCards.push(faceDownA, faceDownB, cardA, cardB);

        this.out.log('\tPlayer "%s" places face down the card "%s"', this.playerA, faceDownA);
        this.out.log('\tPlayer "%s" places face down the card "%s"', this.playerB, faceDownB);
        this.out.log('\tPlayer "%s" places face up the card "%s" and is ready for combat', this.playerA, cardA);
        this.out.log('\tPlayer "%s" places face up the card "%s" and is ready for combat', this.playerB, cardB);

        return this.compareCardsOrMakeWar(cardA, cardB);
    }
}

export interface TurnResult {
    hasGameWinner : boolean;
    winner : Player | undefined;
}

function prettyPrintCards(cards : Card[]) : string {
    return `[${cards.join(', ')}]`;
}
