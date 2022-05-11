import test from "ava";
import { Card, Suit, Value } from "../../src/model/card";
import { Player, WarResult } from "../../src/model/player"

test('player name', t => {
    const p : Player = new Player('John', []);
    t.is(p.name, 'John');
});

test('player initial cards', t => {
    const p : Player = new Player('John', [
        new Card(Suit.Heart, Value.Queen),
        new Card(Suit.Club, Value.Ace),
        new Card(Suit.Spade, Value.Four),
    ]);
    t.is(p.pile.length, 3);
    t.deepEqual(p.pile[0], new Card(Suit.Heart, Value.Queen));
    t.deepEqual(p.pile[1], new Card(Suit.Club, Value.Ace));
    t.deepEqual(p.pile[2], new Card(Suit.Spade, Value.Four));
});

test('player play()', t => {
    const p : Player = new Player('John', [
        new Card(Suit.Heart, Value.Queen),
        new Card(Suit.Club, Value.Ace),
        new Card(Suit.Spade, Value.Four),
    ]);
    
    const playedCard : Card = p.play();
    t.is(p.pile.length, 2);
    t.deepEqual(playedCard, new Card(Suit.Heart, Value.Queen));
    t.deepEqual(p.pile[0], new Card(Suit.Club, Value.Ace));
    t.deepEqual(p.pile[1], new Card(Suit.Spade, Value.Four));
});

test('player resultOfWar()', t => {
    let p : Player = new Player('John', []);
    let result : WarResult = p.resultOfWar();
    t.is(result, true); // instant lose

    p = new Player('John', [
        new Card(Suit.Heart, Value.Queen),
    ]);
    result = p.resultOfWar();
    t.is(result, true); // instant lose

    p = new Player('John', [
        new Card(Suit.Heart, Value.Queen),
        new Card(Suit.Club, Value.Ace),
    ]);
    result = p.resultOfWar();
    t.deepEqual(result, {
        faceDown: new Card(Suit.Heart, Value.Queen),
        faceUp: new Card(Suit.Club, Value.Ace),
    });
    t.is(p.pile.length, 0);
});

test('player takeCards()', t => {
    const p : Player = new Player('John', [
        new Card(Suit.Heart, Value.Queen),
        new Card(Suit.Club, Value.Ace),
        new Card(Suit.Spade, Value.Four),
    ]);
    const addedCard1 : Card = new Card(Suit.Diamond, Value.Two);
    const addedCard2 : Card = new Card(Suit.Diamond, Value.Three);
    p.takeCards(addedCard1, addedCard2);
    t.is(p.pile.length, 5);
    t.deepEqual(p.pile[0], new Card(Suit.Heart, Value.Queen));
    t.deepEqual(p.pile[1], new Card(Suit.Club, Value.Ace));
    t.deepEqual(p.pile[2], new Card(Suit.Spade, Value.Four));
    // Cards must be shuffled before taken, so order must be unknown here
    t.is([addedCard1, addedCard2].includes(p.pile[3]), true);
    t.is([addedCard1, addedCard2].includes(p.pile[4]), true);
});

test('player hasLostGame()', t => {
    let p : Player = new Player('John', [
        new Card(Suit.Heart, Value.Queen),
        new Card(Suit.Club, Value.Ace),
        new Card(Suit.Spade, Value.Four),
    ]);
    t.is(p.hasLostGame(), false);
    
    p = new Player('John', []);
    t.is(p.hasLostGame(), true);
});
