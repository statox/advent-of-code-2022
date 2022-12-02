import { readline } from '../utils/readline.js';
const path = './input';

// Rock        A
// Paper       B
// Scisors     C

// Lose   X
// Draw   Y
// Win    Z

const shapeScore = {
    A: 1,
    B: 2,
    C: 3
}
const outcomeScore = {
    X: 0,
    Y: 3,
    Z: 6
}

const outcome = {
    A: {
        X: 'C',
        Y: 'A',
        Z: 'B'
    },
    B: {
        X: 'A',
        Y: 'B',
        Z: 'C'
    },
    C: {
        X: 'B',
        Y: 'C',
        Z: 'A'
    }
}

const computeRoundScore = ([opponent, desiredOutcome]) => {
    const toPlay = outcome[opponent][desiredOutcome];
    return outcomeScore[desiredOutcome] + shapeScore[toPlay];
};

const part2 = readline(path).split(/\n/).filter(l => l).map(l => l.split(' ')).map(computeRoundScore).reduce((t, score) => t + score);

console.log(part2);
