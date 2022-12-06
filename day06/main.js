import { readline } from '../utils/readline.js';
const path = './input';

const line = readline(path).trim();

const search = (line, L) => {
    let i = 0
    let found = false;

    while (!found) {
        const chars = line.substr(i, L)
        const charsSet = new Set([...chars]);
        if (charsSet.size === L) {
            found = true;
        }
        i++
    }
    return i + L - 1
}

const part1 = search(line, 4);
const part2 = search(line, 14);
console.log(part1);
console.log(part2);
