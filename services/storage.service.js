import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const homeDir = join(homedir(), '.weather-cli');
const storagePath = join(homeDir, `storage.json`);
export const TOKEN_DICT = {
    token: 'token',
    city: 'city'
}

// console.log(basename(storagePath));
// console.log(dirname(storagePath));
// console.log(extname(storagePath));
// console.log(relative(storagePath, dirname(storagePath)));
// console.log(isAbsolute(storagePath));
// console.log(resolve(storagePath));
// console.log(sep);
export const saveKeyValue = async (key, value) => {
    let data = {}

    if (!await isExists(homeDir)) {
        await createHomeDir(homeDir)
    }

    if (await isExists(storagePath)) {
        const file = await promises.readFile(storagePath);
        data = JSON.parse(file);
    }

    data[key] = value;
    await promises.writeFile(storagePath, JSON.stringify(data))
}

export const getKeyValue = async (key) => {
    if (await isExists(storagePath)) {
        let data = {}
        const file = await promises.readFile(storagePath);
        data = JSON.parse(file);
        return data[key];
    }

    return undefined;
}

const createHomeDir = async (path, recursive = true) => {
    try {
        await promises.mkdir(path, {recursive});
    } catch (e) {
        throw new Error(e);
        process.exit(1)
    }
}
const isExists = async (path) => {
    try {
        await promises.stat(path);
        return true;
    } catch (err) {
        return false;
    }
}
