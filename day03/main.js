import { readline } from '../utils/readline.js';
const path = './input';

const itemPriority = (item) => {
    let offset = 1;
    if (item.match(/[A-Z]/)) {
        offset = 27;
    }
    return offset + item.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
}

const part1 = readline(path)
    .split(/\n/)
    .filter(l => l)
    .map(l => [l.substring(0, l.length / 2), l.substring(l.length / 2)])
    .map(([left, right]) => [...left].find(c => right.includes(c)))
    .map(itemPriority)
    .reduce((t, v) => t + v, 0);
console.log(part1);

const part2 = readline(path)
    .split(/\n/)
    .filter(l => l)
    .reduce((groups, line) => {
        if (groups[groups.length - 1].length === 3) {
            groups.push([]);
        }
        groups[groups.length - 1].push(line)
        return groups;
    }, [[]])
    .map(([l1, l2, l3]) => [...l1].find(c => l2.includes(c) && l3.includes(c)))
    .map(itemPriority)
    .reduce((t, v) => t + v, 0);

console.log(part2);
