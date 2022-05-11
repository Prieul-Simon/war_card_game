export class Card {
    suit : Suit;
    value : Value;

    constructor(suit : Suit, value : Value) {
        this.suit = suit;
        this.value = value;
    }

    public toString() : string {
        return `${valueToString(this.value)} of ${this.suit.toString()}`;
    }

    public isEqual(other : Card) : boolean {
        return this.value === other.value;
    }

    public isHigher(other : Card) : boolean {
        // comparison of their numeric values (number)
        // so as to Queen > Four, Ace > Queen, etc.
        return this.value > other.value;
    }
}

export enum Suit {
    Spade = '♠️',
    Heart = '♥️',
    Diamond = '♦️',
    Club = '♣️',
}

// Getting instances of an enum is a pain in TS
export function allSuits() : Suit[] {
    return Object.values(Suit);
}

export enum Value {
    Two = 2,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Jack,
    Queen,
    King,
    Ace,
}

// Getting instances of an enum is a pain in TS
export function allCardValues() : Value[] {
    return Object.values(Value)
        .filter(v => !isNaN(Number(v)))
        .map(v => Number(v));
}

function valueToString(value : Value) : string {
    switch (value) {
        case Value.Jack:
            return 'J';
        case Value.Queen:
            return 'Q';
        case Value.King:
            return 'K';
        case Value.Ace:
            return 'A';
        default:
            return value.toString();
        }
}
