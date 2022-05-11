import test from 'ava';
import { Card, Suit, Value } from '../../src/model/card';
import { CARDS_NUMBER, ClassicCardSet } from '../../src/model/classicCardSet';

test('card set number', t => {
    t.is(CARDS_NUMBER, 52);
    
    const set : ClassicCardSet = new ClassicCardSet();
    t.is(set.cards.length, 52);
});

test('card set is initialized "ordered"', t => {
    const set : ClassicCardSet = new ClassicCardSet();
    const card0 : Card = set.cards[0];
    const card1 : Card = set.cards[1];
    const card2 : Card = set.cards[2];
    const card11 : Card = set.cards[11];
    const card13 : Card = set.cards[13];
    const card26 : Card = set.cards[26];
    const card39 : Card = set.cards[39];
    
    t.is(card0.suit, Suit.Spade);
    t.is(card0.value, Value.Two);

    t.is(card1.suit, Suit.Spade);
    t.is(card1.value, Value.Three);

    t.is(card2.suit, Suit.Spade);
    t.is(card2.value, Value.Four);

    t.is(card11.suit, Suit.Spade);
    t.is(card11.value, Value.King);

    t.is(card13.suit, Suit.Heart);
    t.is(card13.value, Value.Two);

    t.is(card26.suit, Suit.Diamond);
    t.is(card26.value, Value.Two);

    t.is(card39.suit, Suit.Club);
    t.is(card39.value, Value.Two);
});

test('card set shuffle()', t => {
    const cards : ClassicCardSet = new ClassicCardSet();
    const initialOrder : Card[] = [...cards.cards];

    cards.shuffle();

    // test the elements are all kept
    t.is(cards.cards.length, 52);
    t.is(allElementsIncluded(cards.cards, initialOrder), true);
    t.is(allElementsIncluded(initialOrder, cards.cards), true);
    // if shuffle() method is correctly implemented, it highly highly HIGHLY improbable that the order is the initial one
    // so consider that after calling the function, if the order is different then the shuffle() method is well implemented
    const isOrderDifferent : boolean = differentOrder(initialOrder, cards.cards);
    t.is(isOrderDifferent, true);
});

/*
 * Checks that every element in "from" are contained in "toTest"
 * ['a', 'b', 'c'], ['b', 'a'] => true
 * ['a', 'b'], ['b', 'a', 'c'] => false
 */
function allElementsIncluded<T>(toTest : T[], from : T[]) : boolean {
    const isContained : (el : T) => boolean = el => toTest.includes(el);
    return from.every(isContained)
}

function differentOrder<T>(arr1 : T[], arr2 : T[]) : boolean {
    if (arr1.length !== arr2.length) {
        return true;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return true;
        }
    }

    return false;
}
