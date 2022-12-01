import { readline } from '../utils/readline.js';
const path = './input';

const part1 = Math.max(
    ...readline(path)
        .split(/\n\n/)
        .map(l => l.split('\n')
            .map(Number)
            .reduce((acc, l) => acc + l)
        )
);

console.log(part1);

const part2 =
    readline(path)
        .split(/\n\n/)
        .map(l => l.split('\n')
            .map(Number)
            .reduce((acc, l) => acc + l)
        )
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((acc, l) => acc + l);

console.log(part2);
