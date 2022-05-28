"use strict";

const SUITS = ['clubs', 'diamonds', 'hearts', 'spades']

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function generateDeck() {
    const deck = []
    for (let suit in SUITS) {
        for (let rank = 2; rank < 15; rank++) {
            const card = new Card(suit, rank) 
            deck.push(Card(card))
        }
    }
    return deck
}

class Card {
    constructor(suit, rank) {
        this.suit = suit
        this.rank = rank
    }
}

class Game {
    constructor() {
        this.deck = generateDeck()
        shuffleArray(this.deck)
        this.daysLeft = 13
        this.energy = 3
        this.money = 8
        this.score = 0
        this.time = 5
        this.getHand()
    }

    getHand() {
        const i = (this.daysLeft - 1) * 4
        this.hand = this.deck.slice(i, i + 4)
        this.firstCardEnergyLoss()
    }

    firstCardEnergyLoss() {
        let cardValue = this.hand[0].rank
        if (cardValue == 14) {
            cardValue = 1
        } else if (cardValue > 10) {
            cardValue = 10
        }
        if (this.energy > cardValue) {
            this.energy -= 1
        }
    }

    play(cardIndex) {
        const card = this.hand[cardIndex]
        this.time -= cardIndex + 1
        this.energy += Game.suitToEnergy(card.suit)
        if (card.rank < 11) {
            this.money += card.rank
        } else {
            this.money -= 5
            this.score += Game.rankToScore(card.rank)
        }
    }

    timeForMoney() {
        this.time -= 1
        this.money += 1
    }

    timeForEnergy() {
        this.time -= 1
        this.energy += 1
    }

    endDay() {
        this.time = 5
        this.money -= 4
        this.energy -= 1
        this.daysLeft -= 1
        if (this.daysLeft < 1) {
            this.gameEnd()
        } else {
            this.getHand()
        }
    }

    gameEnd() {
        this.score += this.money
    }

    static rankToScore(rank) {
        const transform = [10, 20, 30, 50]
        return transform[rank - 11]
    }

    static suitToEnergy(suit) {
        const transform = {'clubs': 1, 'diamonds': 0, 'hearts': -1, 'spades': -3}
        return transform[suit]
    }
}
