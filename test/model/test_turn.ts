import test from "ava";
import { Card, Suit, Value } from "../../src/model/card";
import { Player } from "../../src/model/player";
import { Turn, TurnResult } from "../../src/model/turn";

const queenOfHeart : Card = new Card(Suit.Heart, Value.Queen);
const queenOfSpade : Card = new Card(Suit.Spade, Value.Queen);
const aceOfClub : Card = new Card(Suit.Club, Value.Ace);
const fourOfSpade : Card = new Card(Suit.Spade, Value.Four);
const jackOfClub : Card = new Card(Suit.Club, Value.Jack);
const jackOfDiamond : Card = new Card(Suit.Diamond, Value.Jack);
const twoOfSpade : Card = new Card(Suit.Spade, Value.Two);
const twoOfHeart : Card = new Card(Suit.Heart, Value.Two);
const threeOfSpade : Card = new Card(Suit.Spade, Value.Three);
const threeOfHeart : Card = new Card(Suit.Heart, Value.Three);

test('resolution of a simple turn with winner', t => {
    const p1 : Player = new Player('John', [queenOfHeart]);
    const p2 : Player = new Player('Jack', [aceOfClub]);

    const turn : Turn = new Turn(42, p1, p2, console);
    const result : TurnResult = turn.resolveTurn();
    t.is(p1.pile.length, 0);
    t.is(p2.pile.length, 2);
    t.is(result.hasGameWinner, true);
    t.is(result.winner, p2);
});

test('resolution of a simple turn with no winner', t => {
    const p1 : Player = new Player('John', [aceOfClub, fourOfSpade]);
    const p2 : Player = new Player('Jack', [queenOfHeart, queenOfSpade]);

    const turn : Turn = new Turn(42, p1, p2, console);
    const result : TurnResult = turn.resolveTurn();
    t.is(p1.pile.length, 3);
    t.is(fourOfSpade, p1.pile[0]);
    t.is(p2.pile.length, 1);
    t.is(queenOfSpade, p2.pile[0]);
    t.is(result.hasGameWinner, false);
    t.is(result.winner, undefined);
});

test('resolution of a turn with 1 war and no winner', t => {
    const p1 : Player = new Player('John', [queenOfSpade, jackOfClub, fourOfSpade, twoOfSpade]);
    const p2 : Player = new Player('Jack', [queenOfHeart, jackOfDiamond, aceOfClub, twoOfHeart]);

    const turn : Turn = new Turn(42, p1, p2, console);
    const result : TurnResult = turn.resolveTurn();
    t.is(p1.pile.length, 1);
    t.is(p2.pile.length, 7);
    t.is(result.hasGameWinner, false);
    t.is(result.winner, undefined);
});

test('resolution of a turn with 2 wars and a winner', t => {
    const p1 : Player = new Player('John', [queenOfSpade, fourOfSpade, jackOfClub, twoOfHeart, threeOfHeart]);
    const p2 : Player = new Player('Jack', [queenOfHeart, aceOfClub, jackOfDiamond, threeOfSpade, twoOfSpade]);

    const turn : Turn = new Turn(42, p1, p2, console);
    const result : TurnResult = turn.resolveTurn();
    t.is(p1.pile.length, 10);
    t.is(p2.pile.length, 0);
    t.is(result.hasGameWinner, true);
    t.is(result.winner, p1);
});
