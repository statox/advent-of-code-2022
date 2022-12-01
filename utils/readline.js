import * as fs from 'fs';

export const readline = (path) => {
    try {
        // read contents of the file
        return fs.readFileSync(path, 'UTF-8');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
