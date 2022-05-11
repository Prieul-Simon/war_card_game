import { CARDS_NUMBER, ClassicCardSet } from "../model/classicCardSet";
import { Player } from "../model/player";
import { Turn, TurnResult } from "../model/turn";

const MAX_ITER : number = 1_000;

console.log('Hello, welcome to the War Card Game');
console.log();

// Create a pile of cards,then shuffle up and deal !
const gameSet : ClassicCardSet = new ClassicCardSet();
gameSet.shuffle();

// Cut the common pile of cards in two and distribute it among the two players
const part1 = gameSet.cards.slice(0, CARDS_NUMBER / 2);
const part2 = gameSet.cards.slice(CARDS_NUMBER / 2, CARDS_NUMBER);
const playerA = new Player('Player A', part1);
const playerB = new Player('Player B', part2);

// Do as many turns as needed for having a game winner (except if it exceeds a certain high number)
let winner : Player | undefined = undefined;
for (let count = 0; count < MAX_ITER; count++) {
    const turn = new Turn(count, playerA, playerB, console);
    const result : TurnResult = turn.resolveTurn();
    if (result.hasGameWinner) {
        winner = result.winner;
        break;
    }
}

console.log();
if (winner === undefined) {
    console.log('No winner, the game exceeded the max number of allowed turns (%i)', MAX_ITER);
} else {
    console.log('And the winner is... %s ! Congratulations !', winner);
}
