/*
 * This one is particularly messy and ugly 👍
 */

import { readline } from '../utils/readline.js';
import { xyToStr } from '../utils/coord.js';
const path_input = './input';

const moves = readline(path_input).trim().split('\n').map(l => l.split(' ')).map(([m, n]) => [m, Number(n)]);

const showGrid = (g, H, T) => {
    const h = JSON.parse(JSON.stringify(g));
    h[T.y][T.x] = 'T';
    h[H.y][H.x] = 'H';
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

const H = { x: 0, y: 5 };
const T = { x: 0, y: 5 };

const makeMove = (H, T, direction) => {
    if (direction === 'U') {
        H.y -= 1;
    }
    if (direction === 'D') {
        H.y += 1;
    }
    if (direction === 'L') {
        H.x -= 1;
    }
    if (direction === 'R') {
        H.x += 1;
    }

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

// showGrid(g, H, T);
const tailPositions = new Set();
for (const move of moves) {
    const [direction, steps] = move;
    console.log(`== ${direction} ${steps} ==`);
    for (let _ = 0; _ < steps; _++) {
        makeMove(H, T, direction);
        // showGrid(g, H, T);
        tailPositions.add(xyToStr(T.x, T.y));
    }
}

// showTailPositions(g, tailPositions);
console.log([...tailPositions.values()]);

const part1 = tailPositions.size;

console.log({ part1 });
