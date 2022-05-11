import test from "ava";
import { allCardValues, allSuits, Card, Suit, Value } from "../../src/model/card"

const queenOfClub : Card = new Card(Suit.Club, Value.Queen);
const queenOfSpade : Card = new Card(Suit.Spade, Value.Queen);
const aceOfDiamond : Card = new Card(Suit.Diamond, Value.Ace);
const fourOfHeart : Card = new Card(Suit.Heart, Value.Four);

test('card equality', t => {
    t.is(queenOfClub.isEqual(queenOfSpade), true);
});

test('card inequality', t => {
    t.is(queenOfClub.isEqual(aceOfDiamond), false);
});

test('card ordering', t => {
    t.is(aceOfDiamond.isHigher(queenOfClub), true);
    t.is(queenOfClub.isHigher(aceOfDiamond), false);

    t.is(fourOfHeart.isHigher(queenOfClub), false);
    t.is(queenOfClub.isHigher(fourOfHeart), true);
});

test('card toString()', t => {
    t.is(queenOfClub.toString(), 'Q of ♣️');
    t.is(fourOfHeart.toString(), '4 of ♥️');
});

test('all suits are unique and exhaustive', t => {
    const suits = allSuits();
    t.is(suits.length, 4);
    t.is(suits.includes(Suit.Club), true);
    t.is(suits.includes(Suit.Diamond), true);
    t.is(suits.includes(Suit.Heart), true);
    t.is(suits.includes(Suit.Spade), true);
});

test('all card values are unique and exhaustive', t => {
    const values = allCardValues();
    t.is(values.length, 13);
    t.is(values.includes(Value.Two), true);
    t.is(values.includes(Value.Three), true);
    t.is(values.includes(Value.Four), true);
    t.is(values.includes(Value.Five), true);
    t.is(values.includes(Value.Six), true);
    t.is(values.includes(Value.Seven), true);
    t.is(values.includes(Value.Eight), true);
    t.is(values.includes(Value.Nine), true);
    t.is(values.includes(Value.Ten), true);
    t.is(values.includes(Value.Jack), true);
    t.is(values.includes(Value.Queen), true);
    t.is(values.includes(Value.King), true);
    t.is(values.includes(Value.Ace), true);
});
