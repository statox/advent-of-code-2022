import { readline } from '../utils/readline.js';
const path = './input';

// Rock        A   X
// Paper       B   Y
// Scisors     C   Z

const shapeScore = {
    X: 1,
    Y: 2,
    Z: 3
}
const outcomeScore = {
    lost: 0,
    draw: 3,
    won: 6
}

const outcome = {
    X: {
        A: 'draw',
        B: 'lost',
        C: 'won'
    },
    Y: {
        A: 'won',
        B: 'draw',
        C: 'lost'
    },
    Z: {
        A: 'lost',
        B: 'won',
        C: 'draw'
    }
}

const computeRoundScore = ([opponent, you]) => {
    const roundOutcome = outcome[you][opponent];
    return outcomeScore[roundOutcome] + shapeScore[you];
};

const part1 = readline(path).split(/\n/).filter(l => l).map(l => l.split(' ')).map(computeRoundScore).reduce((t, score) => t + score);

console.log(part1);
