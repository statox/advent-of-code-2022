/*
 * This one is particularly messy and ugly 👍
 */

import { readline } from '../utils/readline.js';
const path_input = './input';

const lines = readline(path_input).trim().split('\n');

/*
 * Create the FS
 */
const fs = {
    '/': {}
}

const getFsDir = (path) => {
    let dir = fs;
    for (const subdir of path) {
        dir = dir[subdir]
    }
    return dir
}

let path = [];
let currentDir;
for (const line of lines) {
    if (line.match(/^\d/)) {
        const size = Number(line.split(' ')[0])
        const name = line.split(' ')[1];
        currentDir[name] = size;
        // console.log('file', { size, name });
    }
    if (line.match(/^dir/)) {
        const name = line.split(' ')[1];
        currentDir[name] = {};
        // console.log('dir:', { name });
    }
    if (line.match(/^\$/)) {
        const command = line.split(' ')[1];
        if (command === 'ls') {
            continue;
        }
        const arg = line.split(' ')[2];
        // console.log('command:', { command, arg });

        if (arg === '..') {
            path.pop();
        } else {
            path.push(arg);
        }
        currentDir = getFsDir(path);
    }

    // console.log(fs);
}

// console.log(JSON.stringify(fs, null, 2));


/*
 * Visit the GS calculating each directory size
 */
const getTotalSize = (fs) => {
    let size = 0;
    if (typeof (fs) === 'number') {
        size = fs;
    } else {
        for (const child of Object.keys(fs)) {
            size += getTotalSize(fs[child]);
        }

        if (size <= 100000) {
            // console.log('directory with size at most 100000', size);
            part1 += size;
        }
        deletables.push(size);
    }
    return size
}

let part1 = 0;
let deletables = [];
getTotalSize(fs);

/*
 * Once we have the size of the directories we can sort them
 * and find the smallest one bigger than the missing space
 */
deletables = deletables.sort((a, b) => a - b);
console.log({ deletables });

const totalDiskSpace = 70000000;
const requiredSpace = 30000000;
const totalUsedSpace = deletables[deletables.length - 1];
const unused = totalDiskSpace - totalUsedSpace;
const missingSpace = requiredSpace - unused

console.log({ missingSpace });

const part2 = deletables.find(d => {
    return d >= missingSpace
});

console.log({ part1 });
console.log({ part2 });
