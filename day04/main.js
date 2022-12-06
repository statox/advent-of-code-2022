import { readline } from '../utils/readline.js';
const path = './input';

const fullyContains = ([[a, b], [c, d]]) => (a <= c && b >= d) || (c <= a && d >= b)


const part1 = readline(path)
    .split(/\n/)
    .filter(l => l)
    .map(l => l.split(','))
    .map(([left, right]) => [left.split('-').map(Number), right.split('-').map(Number)])
    .map(fullyContains)
    .reduce((count, contains) => count + (contains ? 1 : 0))
console.log(part1);

const partiallyContains = ([[a, b], [c, d]]) => (a <= c && b >= c) || (a <= d && b >= d) || (c <= a && d >= a) || (c <= b && d >= b)
const part2 = readline(path)
    .split(/\n/)
    .filter(l => l)
    .map(l => l.split(','))
    .map(([left, right]) => [left.split('-').map(Number), right.split('-').map(Number)])
    .map(partiallyContains)
    .reduce((count, contains) => count + (contains ? 1 : 0))
console.log(part2);
