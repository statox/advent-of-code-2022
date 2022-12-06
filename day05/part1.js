import { readline } from '../utils/readline.js';
const path = './input';

const lines = readline(path);

const [stackStr, instructionsStr] = lines.split(/\n\n/)

const stacks = stackStr.split('\n').map(l => l.split(''));
const instructions = instructionsStr
    .split('\n')
    .filter(l => l)
    .map(l => l.split(/move|from|to/)
        .filter(d => d)
        .map(Number)
    )
    .map(([step, from, to]) => { return { step, from, to } });

for (const { step, from, to } of instructions) {
    for (let i = 0; i < step; i++) {
        const item = stacks[from - 1].pop();
        stacks[to - 1].push(item);
    }
}

const part1 = stacks.map(s => s[s.length - 1]).join('');
console.log(part1);
