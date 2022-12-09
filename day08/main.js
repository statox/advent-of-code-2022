/*
 * This one is particularly messy and ugly 👍
 */

import { readline } from '../utils/readline.js';
const path_input = './input_test';

const g = readline(path_input).trim().split('\n').map(l => l.split('').map(Number));

console.log(g);

const isVisibleInnerTree = (tx, ty) => {
    let top = true;
    for (let y = 0; y < ty; y++) {
        if (g[y][tx] >= g[ty][tx]) {
            top = false;
        }
    }

    let bottom = true;
    for (let y = g.length - 1; y > ty; y--) {
        if (g[y][tx] >= g[ty][tx]) {
            bottom = false;
        }
    }

    let left = true;
    for (let x = 0; x < tx; x++) {
        if (g[ty][x] >= g[ty][tx]) {
            left = false;
        }
    }

    let right = true;
    for (let x = g[0].length - 1; x > tx; x--) {
        if (g[ty][x] >= g[ty][tx]) {
            right = false;
        }
    }

    return top || bottom || left || right;
};

const scenicScore = (tx, ty) => {
    const treeHeight = g[ty][tx]
    let y = ty - 1;
    while (y > 0 && g[y][tx] < treeHeight) {
        y--;
    }
    let scoreUp = Math.abs(ty - y);

    y = ty + 1;
    while (y < g.length - 1 && g[y][tx] < treeHeight) {
        y++;
    }
    let scoreDown = Math.abs(ty - y);

    let x = tx - 1;
    while (x > 0 && g[ty][x] < treeHeight) {
        x--;
    }
    let scoreLeft = Math.abs(tx - x);

    x = tx + 1;
    while (x < g[0].length - 1 && g[ty][x] < treeHeight) {
        x++;
    }
    let scoreRight = Math.abs(tx - x);

    const score = scoreUp * scoreDown * scoreRight * scoreLeft;
    return score;
};

let seeable = (g.length + g[0].length - 2) * 2;
let highestScore = 0;

const scores = g.map(l => l.map((_) => 0));
for (let y = 1; y < g.length - 1; y++) {
    for (let x = 1; x < g[y].length - 1; x++) {
        if (isVisibleInnerTree(x, y)) {
            seeable++;
        }
        const score = scenicScore(x, y);
        if (score > highestScore) {
            highestScore = score;
        }
        scores[y][x] = score;
    }
}

console.log(scores);
const part1 = seeable
const part2 = highestScore;
console.log(part1);
console.log(part2);
