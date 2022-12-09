/*
 * This one is particularly messy and ugly 👍
 */

import { readline } from '../utils/readline.js';
import { xyToStr } from '../utils/coord.js';
const path_input = './input';

const moves = readline(path_input).trim().split('\n').map(l => l.split(' ')).map(([m, n]) => [m, Number(n)]);

const showGrid = (g, rope) => {
    const h = JSON.parse(JSON.stringify(g));
    for (let i = rope.length - 1; i >= 0; i--) {
        const p = rope[i];
        const char = i === 0 ? 'H' : (i === rope.length - 1 ? 'T' : i)
        h[p.y][p.x] = char;
    }
    console.log(h.map(l => l.join('')).join('\n'));
    console.log();
}

const showTailPositions = (g, tailPositions) => {
    const h = JSON.parse(JSON.stringify(g));
    for (const pos of tailPositions.values()) {
        const [x, y] = pos.split(';');
        h[y][x] = '#';
    }
    console.log(h.map(l => l.join('')).join('\n'));
    console.log();
}

const g = [];
for (let y = 0; y < 6; y++) {
    g.push([]);
    for (let x = 0; x < 6; x++) {
        g[g.length - 1].push('.');
    }
}
console.log(moves);

const rope = [];
for (let i = 0; i < 10; i++) {
    rope.push({ x: 0, y: 5 })
}

const makeMove = (rope, direction) => {
    if (direction === 'U') {
        rope[0].y -= 1;
    }
    if (direction === 'D') {
        rope[0].y += 1;
    }
    if (direction === 'L') {
        rope[0].x -= 1;
    }
    if (direction === 'R') {
        rope[0].x += 1;
    }

    for (let i = 1; i < rope.length; i++) {
        const H = rope[i - 1];
        const T = rope[i];
        const dist = Math.sqrt((H.x - T.x) * (H.x - T.x) + (H.y - T.y) * (H.y - T.y));
        if (dist > 1.5 && H.y < T.y) {
            T.y -= 1;
        } else if (dist > 1.5 && H.y > T.y) {
            T.y += 1;
        }
        if (dist > 1.5 && H.x < T.x) {
            T.x -= 1;
        } else if (dist > 1.5 && H.x > T.x) {
            T.x += 1;
        }
    }
}

// showGrid(g, rope);
const tailPositions = new Set();
for (const move of moves) {
    const [direction, steps] = move;
    console.log(`== ${direction} ${steps} ==`);
    for (let _ = 0; _ < steps; _++) {
        makeMove(rope, direction);
        // showGrid(g, rope);
        tailPositions.add(xyToStr(rope[9].x, rope[9].y));
    }
}

// showTailPositions(g, tailPositions);
console.log([...tailPositions.values()]);

const part2 = tailPositions.size;

console.log({ part2 });
